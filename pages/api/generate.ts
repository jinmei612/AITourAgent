import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method Not Allowed");

  const { query } = req.body;

  const prompt = `
你是一个专业的旅行规划师。以下是用户的需求，请为他设计每日详细自由行行程，包括景点、交通、饮食推荐，最后提供预算估计。
用户输入："${query}"
请用 Markdown 格式输出。
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  res.status(200).json({ itinerary: completion.choices[0].message.content });
}
