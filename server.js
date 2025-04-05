import express from "express";
import cors from "cors";
import "dotenv/config";
import OpenAI from "openai";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(path.resolve(), "public")));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Handle chat requests
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are SayLessAI 2.0, a no-fluff, fact-first assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to get response from SayLessAI" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("✅ SayLessAI backend is live on port 3000");
});
