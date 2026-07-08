import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const getFilename = () => {
  try {
    return fileURLToPath(import.meta.url);
  } catch {
    return typeof __filename !== "undefined" ? __filename : "";
  }
};
const __filename = getFilename();
const __dirname = path.dirname(__filename);

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

  // API route: Recommend
  app.post("/api/gemini/recommend", async (req, res) => {
    try {
      const { viewedProducts, allProducts, purchaseHistory } = req.body;
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
      console.error("Server AI Recommendation Error:", error);
      res.status(500).json({ error: error.message || "AI Error", result: [] });
    }
  });

  // API route: Chat
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, products, history } = req.body;
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
      console.error("Server AI Chat Error:", error);
      const errStr = String(error).toLowerCase();
      const isLeakedKey = errStr.includes("leaked") || errStr.includes("leak") || errStr.includes("403") || errStr.includes("permission_denied") || errStr.includes("key") || errStr.includes("api_key_invalid") || errStr.includes("not valid");
      const errorMessage = isLeakedKey 
        ? "⚠️ تم اكتشاف مشكلة في صلاحية مفتاح الوصول (API Key) للذكاء الاصطناعي. لحلها فوراً، يرجى إدخال مفتاح مجاني خاص بك من Google AI Studio ووضعه في قائمة 'Settings' (الإعدادات) في الزاوية العلوية اليمنى للمشروع تحت اسم البيئة GEMINI_API_KEY لتفعيل المساعد الذكي فوراً وبدون أي قيود!"
        : "أواجه حالياً صعوبة في الاتصال بخادمي بسبب ضغط الطلبات. يرجى المحاولة بعد قليل!";
      res.status(500).json({ error: error.message || "AI Chat Error", result: errorMessage });
    }
  });

  // API route: Smart Search
  app.post("/api/gemini/search", async (req, res) => {
    try {
      const { query, products } = req.body;
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
      console.error("Server Smart Search Error:", error);
      res.status(500).json({ error: error.message || "AI Search Error", result: [] });
    }
  });

  // API route: Predict Inventory
  app.post("/api/gemini/inventory", async (req, res) => {
    try {
      const { products, orders } = req.body;
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
      console.error("Server Inventory Prediction Error:", error);
      res.status(500).json({ error: error.message || "AI Inventory Error", result: [] });
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
