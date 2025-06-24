import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";


export class ChatGptController {
  async getChatGptData(req: Request | any, res: Response | any) {
    try {
      const message = req.body?.text;

      if (!message) {
        return res.status(400).json({ error: "Text message is required" });
      }

      const genAI = new GoogleGenerativeAI('AIzaSyABEnXEvKhSQOuImOT57-4PCjmUzy7vct0' as string);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

      const result = await model.generateContent(message);
      const response = await result.response;

      res.json({ reply: response.text() });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Gemini API call failed" });
    }
  }
}
