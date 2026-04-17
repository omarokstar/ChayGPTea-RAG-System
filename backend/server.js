import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import chatRoute from './routes/chat.js';

dotenv.config();
const app = express();

// Security Headers
app.use(helmet());

// CORS configuration
app.use(cors());

// Body parser with strict size limit to prevent payload attacks
app.use(express.json({ limit: '10kb' }));

// Rate Limiting to protect tokens
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { reply: 'Too many requests, please take a tea break and try again later!' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
app.use('/api/chat', chatLimiter, chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));