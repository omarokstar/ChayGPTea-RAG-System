import Groq from 'groq-sdk';
import { embedText } from '../services/embeddings.js';
import { searchDocs } from '../services/vectorSearch.js';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_KEY });

const TEA_KEYWORDS = [
  'tea', 'شاي', 'brew', 'steep', 'matcha', 'oolong',
  'green', 'black', 'herbal', 'chamomile', 'jasmine',
  'chai', 'infusion', 'teapot', 'كوب', 'أخضر', 'أسود',
  'مشروب', 'تحضير', 'نقع', 'أعشاب',
];

function isAboutTea(message) {
  return TEA_KEYWORDS.some(keyword => message.toLowerCase().includes(keyword));
}

export const handleChat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ reply: 'Messages array is required.' });
    }

    const latestUserMessage = messages[messages.length - 1].text;
    const isArabic = /[\u0600-\u06FF]/.test(latestUserMessage);

    if (!isAboutTea(latestUserMessage)) {
      return res.json({
        reply: isArabic
          ? 'أنا بتكلم بس عن الشاي يا حب 🍵 هل لديك سؤال عن الشاي؟'
          : 'I only talk about tea 🍵 Do you have a tea-related question?',
      });
    }

    // Embed the user's latest query
    const queryVector = await embedText(latestUserMessage);

    // Get relevant tea docs from MongoDB
    const docs = await searchDocs(queryVector);
    const context = docs.map(d => d.text).join('\n\n');

    // Build system prompt
    const systemPrompt = `أنت خبير شاي متخصص. أجب فقط على الأسئلة المتعلقة بالشاي.
    You are a tea expert chatbot. You ONLY answer questions about tea.
    ${isArabic ? 'المستخدم يتحدث العربية — جاوب بالمصري دائماً.' : 'Respond in English.'}
    If asked about anything unrelated to tea, politely say you only discuss tea.

    Use this knowledge to answer:
    ${context}`;

    // Transform conversation array to Groq schema
    const conversationHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.text
    }));

    // Call Groq with full context
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory
      ],
      max_tokens: 1024,
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ reply: 'Server error, please try again.' });
  }
};
