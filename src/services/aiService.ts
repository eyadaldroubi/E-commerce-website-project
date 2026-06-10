import { Product, Order } from "../types";

export const aiService = {
  /**
   * Recommends products based on user's viewed products and purchase history.
   */
  async getRecommendedProducts(
    viewedProducts: Product[],
    allProducts: Product[],
    purchaseHistory: Order[] = []
  ): Promise<string[]> {
    try {
      const response = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ viewedProducts, allProducts, purchaseHistory }),
      });
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      return [];
    }
  },

  /**
   * AI Chatbot to answer customer queries.
   */
  async chatWithAssistant(
    message: string,
    products: Product[],
    history: { role: "user" | "model"; parts: { text: string }[] }[] = []
  ): Promise<string> {
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, products, history }),
      });
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      return data.result || "عذراً، لم أتمكن من معالجة هذا الطلب.";
    } catch (error) {
      console.error("AI Chat Error:", error);
      return "أواجه حالياً صعوبة في الاتصال بخادمي. يرجى المحاولة لاحقاً!";
    }
  },

  /**
   * Smart search that understands intent.
   */
  async smartSearch(query: string, products: Product[]): Promise<string[]> {
    try {
      const response = await fetch("/api/gemini/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, products }),
      });
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error("Smart Search Error:", error);
      return [];
    }
  },

  /**
   * Predicts inventory needs based on current stock and sales trends.
   */
  async predictInventory(products: Product[], orders: Order[]): Promise<any[]> {
    try {
      const response = await fetch("/api/gemini/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, orders }),
      });
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error("Inventory Prediction Error:", error);
      return [];
    }
  }
};
