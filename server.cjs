var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_http = require("http");
var import_ws = require("ws");
var import_vite = require("vite");
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_genai = require("@google/genai");
var import_meta = {};
var getFilename = () => {
  try {
    return (0, import_url.fileURLToPath)(import_meta.url);
  } catch {
    return typeof __filename !== "undefined" ? __filename : "";
  }
};
var __filename = getFilename();
var __dirname = import_path.default.dirname(__filename);
function getGeminiClient() {
  const apiKey = "AIzaSyDqE8t7nECJoKrWTQnXXCktRdcW9S7TnQw";
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
async function startServer() {
  const app = (0, import_express.default)();
  const server = (0, import_http.createServer)(app);
  const wss = new import_ws.WebSocketServer({ server });
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/gemini/recommend", async (req, res) => {
    try {
      const { viewedProducts, allProducts, purchaseHistory } = req.body;
      const viewedNames = (viewedProducts || []).map((p) => p.name).join(", ");
      const purchasedNames = (purchaseHistory || []).flatMap((o) => (o.items || []).map((i) => i.name)).join(", ");
      const availableProducts = (allProducts || []).map((p) => ({ id: p.id, name: p.name, category: p.category }));
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `Analyze user behavior to provide highly accurate product recommendations. 
        User viewed: [${viewedNames}]. 
        User purchased: [${purchasedNames}]. 
        Available products: ${JSON.stringify(availableProducts)}. 
        Select the 4 most relevant product IDs. Ensure the selection is logical and precise based on categories and user interests. 
        Return ONLY a JSON array of product IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.ARRAY,
            items: { type: import_genai.Type.STRING }
          }
        }
      });
      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error) {
      console.error("Server AI Recommendation Error:", error);
      res.status(500).json({ error: error.message || "AI Error", result: [] });
    }
  });
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, products, history } = req.body;
      const productContext = (products || []).map((p) => `${p.name} (${p.category}): ${p.description} - Price: ${p.price}`).join("\n");
      const formattedHistory = (history || []).map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: Array.isArray(h.parts) ? h.parts : [{ text: String(h.parts) }]
      }));
      const ai = getGeminiClient();
      const chat = ai.chats.create({
        model: "gemini-3.1-flash-lite",
        config: {
          systemInstruction: `\u0623\u0646\u062A \u0645\u0633\u0627\u0639\u062F \u062A\u0633\u0648\u0642 \u0630\u0643\u064A \u0648\u0631\u0627\u0642\u064A \u0644\u0645\u062A\u062C\u0631 "BeePharma & More". 
          \u0645\u0647\u0645\u062A\u0643 \u0647\u064A \u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0628\u0623\u0633\u0644\u0648\u0628 \u0623\u0646\u064A\u0642\u060C \u0645\u0646\u0638\u0645\u060C \u0648\u062F\u0642\u064A\u0642 \u0644\u0644\u063A\u0627\u064A\u0629.
          \u0627\u0633\u062A\u062E\u062F\u0645 \u0644\u063A\u0629 \u0639\u0631\u0628\u064A\u0629 \u0641\u0635\u062D\u0649 \u0628\u0633\u064A\u0637\u0629 \u0648\u0623\u0646\u064A\u0642\u0629 (\u0623\u0648 \u0644\u0647\u062C\u0629 \u0628\u064A\u0636\u0627\u0621 \u0645\u0647\u0630\u0628\u0629 \u062C\u062F\u0627\u064B).
          \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0625\u062C\u0627\u0628\u0627\u062A\u0643 \u0645\u0631\u062A\u0628\u0629 \u0648\u0645\u0646\u0638\u0645\u0629 (\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0646\u0642\u0627\u0637 \u0625\u0630\u0627 \u0644\u0632\u0645 \u0627\u0644\u0623\u0645\u0631).
          \u0643\u0646 \u062F\u0642\u064A\u0642\u0627\u064B \u062C\u062F\u0627\u064B \u0641\u064A \u0648\u0635\u0641 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u062F\u0645\u0629.
          \u0625\u0630\u0627 \u0633\u0623\u0644\u0643 \u0627\u0644\u0639\u0645\u064A\u0644 \u0639\u0646 \u0645\u0646\u062A\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u060C \u0627\u0642\u062A\u0631\u062D \u0628\u062F\u0627\u0626\u0644 \u0645\u0634\u0627\u0628\u0647\u0629 \u0628\u0630\u0643\u0627\u0621.
          
          \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629:
          ${productContext}
          
          \u0642\u0648\u0627\u0639\u062F \u0627\u0644\u062A\u0639\u0627\u0645\u0644:
          1. \u0627\u0644\u0623\u0646\u0627\u0642\u0629: \u0627\u0633\u062A\u062E\u062F\u0645 \u0639\u0628\u0627\u0631\u0627\u062A \u062A\u0631\u062D\u064A\u0628\u064A\u0629 \u0648\u0648\u062F\u0627\u0639\u064A\u0629 \u0631\u0627\u0642\u064A\u0629.
          2. \u0627\u0644\u062F\u0642\u0629: \u0644\u0627 \u062A\u0642\u062F\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u063A\u0644\u0648\u0637\u0629 \u0639\u0646 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0623\u0648 \u0627\u0644\u0645\u0643\u0648\u0646\u0627\u062A.
          3. \u0627\u0644\u062A\u0631\u062A\u064A\u0628: \u0627\u062C\u0639\u0644 \u0627\u0644\u0631\u062F\u0648\u062F \u0633\u0647\u0644\u0629 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0648\u0645\u0646\u0638\u0645\u0629.
          4. \u0641\u064A \u062D\u0627\u0644 \u0639\u062F\u0645 \u0627\u0644\u0645\u0639\u0631\u0641\u0629: \u0648\u062C\u0647 \u0627\u0644\u0639\u0645\u064A\u0644 \u0628\u0644\u0628\u0627\u0642\u0629 \u0644\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A \u0627\u0644\u0628\u0634\u0631\u064A.`
        },
        history: formattedHistory
      });
      const response = await chat.sendMessage({ message });
      res.json({ result: response.text || "\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u0645 \u0623\u062A\u0645\u0643\u0646 \u0645\u0646 \u0645\u0639\u0627\u0644\u062C\u0629 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628." });
    } catch (error) {
      console.error("Server AI Chat Error:", error);
      const errStr = String(error);
      const isLeakedKey = errStr.includes("leaked") || errStr.includes("leak") || errStr.includes("403") || errStr.includes("PERMISSION_DENIED") || errStr.includes("key");
      const errorMessage = isLeakedKey ? "\u26A0\uFE0F \u0631\u0645\u0632 \u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0627\u0644\u062D\u0627\u0644\u064A \u0644\u0644\u0645\u0646\u0635\u0629 \u062A\u0645 \u062D\u0638\u0631\u0647 \u0623\u0648 \u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0639\u0646 \u062A\u0633\u0631\u064A\u0628\u0647 (403 Leaked API Key). \u0644\u062D\u0644 \u0647\u0630\u0647 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0641\u0648\u0631\u0627\u064B\u060C \u064A\u0631\u062C\u0649 \u0625\u0646\u0634\u0627\u0621 \u0645\u0641\u062A\u0627\u062D \u0645\u062C\u0627\u0646\u064A \u062E\u0627\u0635 \u0628\u0643 \u0645\u0646 Google AI Studio \u0648\u0648\u0636\u0639\u0647 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 'Settings' (\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A) \u0641\u064A \u0627\u0644\u0632\u0627\u0648\u064A\u0629 \u0627\u0644\u0639\u0644\u0648\u064A\u0629 \u0627\u0644\u064A\u0645\u0646\u0649 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 \u062A\u062D\u062A \u0627\u0633\u0645 \u0627\u0644\u0628\u064A\u0626\u0629 GEMINI_API_KEY \u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u0648\u0631\u0627\u064B!" : "\u0623\u0648\u0627\u062C\u0647 \u062D\u0627\u0644\u064A\u0627\u064B \u0635\u0639\u0648\u0628\u0629 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u062E\u0627\u062F\u0645\u064A. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B!";
      res.status(500).json({ error: error.message || "AI Chat Error", result: errorMessage });
    }
  });
  app.post("/api/gemini/search", async (req, res) => {
    try {
      const { query, products } = req.body;
      const productList = (products || []).map((p) => ({ id: p.id, name: p.name, description: p.description }));
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `User search query: "${query}". 
        Perform a sophisticated semantic search to find the most relevant product IDs from: ${JSON.stringify(productList)}. 
        Understand the underlying intent, synonyms, and context. 
        Prioritize accuracy and relevance. Return ONLY a JSON array of product IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.ARRAY,
            items: { type: import_genai.Type.STRING }
          }
        }
      });
      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error) {
      console.error("Server Smart Search Error:", error);
      res.status(500).json({ error: error.message || "AI Search Error", result: [] });
    }
  });
  app.post("/api/gemini/inventory", async (req, res) => {
    try {
      const { products, orders } = req.body;
      const inventoryData = (products || []).map((p) => ({
        id: p.id,
        name: p.name,
        currentStock: p.quantity,
        salesCount: (orders || []).reduce((acc, o) => acc + (o.items || []).filter((i) => i.productId === p.id).reduce((sum, item) => sum + item.quantity, 0), 0)
      }));
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `Analyze the following inventory and sales data with high precision: ${JSON.stringify(inventoryData)}. 
        Predict restocking needs based on sales velocity and current stock. 
        For each prediction, provide a professional, elegant, and accurate reason in Arabic (\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629).
        The reason should be concise yet insightful.
        Return a JSON array of objects with {id, name, prediction, reason}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.ARRAY,
            items: {
              type: import_genai.Type.OBJECT,
              properties: {
                id: { type: import_genai.Type.STRING },
                name: { type: import_genai.Type.STRING },
                prediction: { type: import_genai.Type.STRING },
                reason: { type: import_genai.Type.STRING }
              },
              required: ["id", "name", "prediction", "reason"]
            }
          }
        }
      });
      res.json({ result: JSON.parse(response.text || "[]") });
    } catch (error) {
      console.error("Server Inventory Prediction Error:", error);
      res.status(500).json({ error: error.message || "AI Inventory Error", result: [] });
    }
  });
  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");
    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("Received message:", message.type);
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === import_ws.WebSocket.OPEN) {
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
