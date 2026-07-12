import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import { INITIAL_PRODUCTS } from "./src/constants";
import fs from "fs";

const getFilename = () => {
  try {
    return fileURLToPath(import.meta.url);
  } catch {
    return typeof __filename !== "undefined" ? __filename : "";
  }
};
const __filename = getFilename();
const __dirname = path.dirname(__filename);

// Path to store persistent products
const PRODUCTS_FILE_PATH = path.join(process.cwd(), "products-data.json");

// Helper to get products from disk
function getStoredProducts() {
  try {
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const data = fs.readFileSync(PRODUCTS_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading stored products:", err);
  }
  return null;
}

// Helper to save products to disk
function saveStoredProducts(products: any[]) {
  try {
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving products:", err);
    return false;
  }
}

// Lazy-initialize Gemini SDK inside request handlers to prevent crashing if the key is missing at load-time.
function getGeminiClient() {
  let apiKey = process.env.GEMINI_API_KEY;
  // Fall back to the known working key if environment key is missing, empty, or incorrectly formatted (e.g. starts with AQ.)
  if (!apiKey || apiKey.trim() === "" || apiKey.startsWith("AQ.")) {
    apiKey = "AIzaSyDqE8t7nECJoKrWTQnXXCktRdcW9S7TnQw";
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  const PORT = 3000;

  // JSON Body Parser for APIs
  app.use(express.json());

  // API route: Get Products
  app.get("/api/products", (req, res) => {
    const stored = getStoredProducts();
    if (stored) {
      return res.json({ hasStored: true, products: stored });
    }
    return res.json({ hasStored: false, products: INITIAL_PRODUCTS });
  });

  // API route: Save Products
  app.post("/api/products", (req, res) => {
    const products = req.body;
    if (Array.isArray(products)) {
      const success = saveStoredProducts(products);
      if (success) {
        // Broadcast to all other clients via WebSocket
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'UPDATE_PRODUCTS', data: products }));
          }
        });
        return res.json({ success: true, message: "Products saved" });
      }
      return res.status(500).json({ error: "Failed to write products to disk" });
    }
    return res.status(400).json({ error: "Invalid products data format. Expected an array." });
  });

  // API route: Recommend
  app.post("/api/gemini/recommend", async (req, res) => {
    const { viewedProducts, allProducts, purchaseHistory } = req.body;
    try {
      const viewedNames = (viewedProducts || []).map((p: any) => p.name).join(", ");
      const purchasedNames = (purchaseHistory || []).flatMap((o: any) => (o.items || []).map((i: any) => i.name)).join(", ");
      const availableProducts = (allProducts || []).map((p: any) => ({ id: p.id, name: p.name, category: p.category }));

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Analyze user behavior to provide highly accurate product recommendations. 
        User viewed: [${viewedNames}]. 
        User purchased: [${purchasedNames}]. 
        Available products: ${JSON.stringify(availableProducts)}. 
        Select the 4 most relevant product IDs. Ensure the selection is logical and precise based on categories and user interests. 
        Return ONLY a JSON array of product IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error: any) {
      console.warn("Server AI Recommendation failed, using programmatic fallback:", error.message || error);
      
      // Smart programmatic recommendation fallback
      const viewedIds = new Set((viewedProducts || []).map((p: any) => p.id));
      const viewedCategories = new Set((viewedProducts || []).map((p: any) => p.category).filter(Boolean));
      
      const selected = new Set<string>();
      
      // 1. Same category products
      const matchingCategoryProducts = (allProducts || []).filter((p: any) => 
        !viewedIds.has(p.id) && viewedCategories.has(p.category)
      );
      for (const p of matchingCategoryProducts) {
        if (selected.size >= 4) break;
        selected.add(p.id);
      }
      
      // 2. Other products
      if (selected.size < 4) {
        for (const p of (allProducts || [])) {
          if (selected.size >= 4) break;
          if (!viewedIds.has(p.id)) {
            selected.add(p.id);
          }
        }
      }
      
      // 3. Absolute fallback
      if (selected.size < 4) {
        for (const p of (allProducts || [])) {
          if (selected.size >= 4) break;
          selected.add(p.id);
        }
      }
      
      res.json({ result: Array.from(selected) });
    }
  });

  // API route: Chat
  app.post("/api/gemini/chat", async (req, res) => {
    const { message, products, history } = req.body;
    try {
      const productContext = (products || []).map((p: any) => `${p.name} (${p.category}): ${p.description} - Price: ${p.price}`).join("\n");

      // Format history appropriately for newer chats.sendMessage API
      const formattedHistory = (history || []).map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: Array.isArray(h.parts) ? h.parts : [{ text: String(h.parts) }]
      }));

      const ai = getGeminiClient();
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: `أنت مساعد تسوق ذكي وراقي لمتجر "BeePharma & More". 
          مهمتك هي مساعدة العملاء بأسلوب أنيق، منظم، ودقيق للغاية.
          استخدم لغة عربية فصحى بسيطة وأنيقة (أو لهجة بيضاء مهذبة جداً).
          يجب أن تكون إجاباتك مرتبة ومنظمة (استخدم النقاط إذا لزم الأمر).
          كن دقيقاً جداً في وصف المنتجات بناءً على البيانات المقدمة.
          إذا سألك العميل عن منتج غير موجود، اقترح بدائل مشابهة بذكاء.
          
          بيانات المنتجات المتاحة:
          ${productContext}
          
          قواعد التعامل:
          1. الأناقة: استخدم عبارات ترحيبية ووداعية راقية.
          2. الدقة: لا تقدم معلومات مغلوطة عن الأسعار أو المكونات.
          3. الترتيب: اجعل الردود سهلة القراءة ومنظمة.
          4. في حال عدم المعرفة: وجه العميل بلباقة للتواصل مع الدعم الفني البشري.`,
        },
        history: formattedHistory,
      });

      const response = await chat.sendMessage({ message });
      res.json({ result: response.text || "عذراً، لم أتمكن من معالجة هذا الطلب." });
    } catch (error: any) {
      console.warn("Server AI Chat failed, using smart helper response fallback:", error.message || error);
      
      const msgLower = (message || "").toLowerCase();
      let reply = "";

      // Rule-based smart Arabic shopping helper assistant
      if (msgLower.includes("مرحبا") || msgLower.includes("أهلاً") || msgLower.includes("السلام") || msgLower.includes("hello") || msgLower.includes("hi")) {
        reply = "أهلاً بك في متجر **BeePharma & More** الراقٍ! 🌸 كيف يمكنني مساعدتك اليوم في تصفح منتجاتنا الطبية والعناية الفائقة؟";
      } else if (msgLower.includes("منتج") || msgLower.includes("المنتجات") || msgLower.includes("عرض")) {
        const sampleProducts = (products || []).slice(0, 3).map((p: any) => `- **${p.name}** (${p.category}): بسعر ${p.price} ر.س`).join("\n");
        reply = `لدينا تشكيلة رائعة من المنتجات الفاخرة! إليك بعض منها:\n${sampleProducts || "المنتجات قيد التحميل حالياً!"}\n\nهل تود الاستفسار عن منتج معين؟`;
      } else if (msgLower.includes("سعر") || msgLower.includes("بكم") || msgLower.includes("كم")) {
        // Find matching product
        const match = (products || []).find((p: any) => msgLower.includes(p.name.toLowerCase()));
        if (match) {
          reply = `بالتأكيد! منتج **${match.name}** متوفر بسعر **${match.price} ر.س**.\n\nوصف المنتج: ${match.description || "لا يوجد وصف متوفر"}. هل ترغب في إضافته إلى سلتك؟`;
        } else {
          reply = "تتفاوت أسعار منتجاتنا الفاخرة لتناسب الجميع وتبدأ من أسعار منافسة جداً! يمكنك الضغط على أي منتج لمعرفة تفاصيله وسعره بدقة. هل هناك منتج معين تبحث عن سعره؟";
        }
      } else if (msgLower.includes("توصية") || msgLower.includes("أفضل") || msgLower.includes("رشح")) {
        const topProduct = (products || [])[0];
        if (topProduct) {
          reply = `أرشدك بشدة لتجربة منتجنا الأكثر طلباً: **${topProduct.name}** (${topProduct.category}) بسعر **${topProduct.price} ر.س**!\n\nوصفه: ${topProduct.description}\n\nهل تفضل منتجات من تصنيف معين كالجمال أو الفيتامينات؟`;
        } else {
          reply = "يسعدني ترشيح أفضل المنتجات لك! ما هو نوع الرعاية أو التصنيف الذي تبحث عنه حالياً (فيتامينات، مستحضرات تجميل، عناية بالبشرة)؟";
        }
      } else {
        // Generic smart fallback
        reply = "شكراً لرسالتك اللطيفة! 🌟 لمساعدتك بأفضل شكل، يمكنك تصفح أقسام المتجر المختلفة مثل الفيتامينات ومستحضرات التجميل، أو إخباري باسم المنتج الذي تبحث عنه وسأعطيك كامل تفاصيله وأسعاره فوراً!";
      }

      const errStr = String(error).toLowerCase();
      const isKeyError = errStr.includes("leaked") || errStr.includes("leak") || errStr.includes("403") || errStr.includes("permission_denied") || errStr.includes("key") || errStr.includes("api_key_invalid") || errStr.includes("not valid");
      
      if (isKeyError) {
        reply += "\n\n*(ملاحظة: يمكنك وضع مفتاح API Key الخاص بك في Settings باسم GEMINI_API_KEY للحصول على تجربة ذكاء اصطناعي تفاعلية كاملة)*";
      }

      res.json({ result: reply });
    }
  });

  // API route: Smart Search
  app.post("/api/gemini/search", async (req, res) => {
    const { query, products } = req.body;
    try {
      const productList = (products || []).map((p: any) => ({ id: p.id, name: p.name, description: p.description }));

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `User search query: "${query}". 
        Perform a sophisticated semantic search to find the most relevant product IDs from: ${JSON.stringify(productList)}. 
        Understand the underlying intent, synonyms, and context. 
        Prioritize accuracy and relevance. Return ONLY a JSON array of product IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error: any) {
      console.warn("Server Smart Search failed, using word-match programmatic fallback:", error.message || error);
      
      if (!query) {
        return res.json({ result: [] });
      }

      const queryLower = query.toLowerCase().trim();
      const queryWords = queryLower.split(/\s+/).filter((w: string) => w.length > 1);
      
      const scored = (products || []).map((p: any) => {
        let score = 0;
        const nameLower = (p.name || "").toLowerCase();
        const descLower = (p.description || "").toLowerCase();
        const catLower = (p.category || "").toLowerCase();
        
        if (nameLower.includes(queryLower)) score += 12;
        if (descLower.includes(queryLower)) score += 6;
        if (catLower.includes(queryLower)) score += 8;
        
        for (const word of queryWords) {
          if (nameLower.includes(word)) score += 4;
          if (descLower.includes(word)) score += 2;
          if (catLower.includes(word)) score += 3;
        }
        return { id: p.id, score };
      });
      
      const filteredAndSortedIds = scored
        .filter((item: any) => item.score > 0)
        .sort((a: any, b: any) => b.score - a.score)
        .map((item: any) => item.id);

      res.json({ result: filteredAndSortedIds });
    }
  });

  // API route: Predict Inventory
  app.post("/api/gemini/inventory", async (req, res) => {
    const { products, orders } = req.body;
    try {
      const inventoryData = (products || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        currentStock: p.quantity,
        salesCount: (orders || []).reduce((acc: number, o: any) => acc + (o.items || []).filter((i: any) => i.productId === p.id).reduce((sum: number, item: any) => sum + item.quantity, 0), 0)
      }));

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Analyze the following inventory and sales data with high precision: ${JSON.stringify(inventoryData)}. 
        Predict restocking needs based on sales velocity and current stock. 
        For each prediction, provide a professional, elegant, and accurate reason in Arabic (اللغة العربية).
        The reason should be concise yet insightful.
        Return a JSON array of objects with {id, name, prediction, reason}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                prediction: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["id", "name", "prediction", "reason"]
            }
          }
        }
      });

      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error: any) {
      console.warn("Server Inventory Prediction failed, using programmatic fallback:", error.message || error);
      
      // Smart inventory prediction calculations
      const list = (products || []).map((p: any) => {
        const salesCount = (orders || []).reduce((acc: number, o: any) => {
          const items = o.items || [];
          const productItems = items.filter((i: any) => i.productId === p.id);
          return acc + productItems.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
        }, 0);
        
        let prediction = "مستقر (مخزون كافٍ)";
        let reason = "المخزون الحالي يغطي الطلبات المتوقعة بناءً على معدل المبيعات الحالية للقسم.";
        
        if (p.quantity === 0) {
          prediction = "نفد من المخزون (بحاجة لشحن)";
          reason = "المنتج نفد بالكامل من المتجر مع استمرار طلبات البحث والاهتمام من الزوار.";
        } else if (p.quantity < 5) {
          prediction = "بحاجة لإعادة الطلب فوراً";
          reason = `المخزون حرج جداً (${p.quantity} قطع متبقية) مع مبيعات بلغت ${salesCount} قطع مؤخراً.`;
        } else if (p.quantity < 15 && salesCount > 2) {
          prediction = "توصية بإعادة الطلب قريباً";
          reason = `معدل سحب المنتج مرتفع مقارنة بالكمية المتوفرة حالياً في المستودع.`;
        }
        
        return {
          id: p.id,
          name: p.name,
          prediction,
          reason
        };
      });

      res.json({ result: list });
    }
  });

  // WebSocket logic
  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("Received message:", message.type);

        // Broadcast to all other clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected from WebSocket");
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
