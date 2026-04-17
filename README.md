#  ChaYGPTea
An intelligent, context-aware AI chatbot specializing exclusively in all things tea. Built with a modern React frontend and a powerful Node.js backend using Retrieval-Augmented Generation (RAG) through MongoDB, Groq, and Cohere to answer your deepest tea-related queries.

---

##  Features

- **Hyper-focused AI:** Strictly trained to only converse about tea (Oolong, Matcha, Earl Grey, Chamomile, etc).
- **Bilingual Interface:** Real-time toggling between English and Arabic (`English` / `عربي`).
- **Contextual Memory:** Remembers the flow of conversation across your session for natural interactions.
- **RAG Architecture:** Leverages Vector Search via MongoDB to fetch accurate, curated knowledge base snippets before answering.
- **Robust Security:** Pre-configured with Helmet HTTP headers, body-size limits, and Express rate-limiters.
- **Docker Ready:** Fully containerized for local orchestration and production deployments.

## 🛠️z Tech Stack

**Frontend:**
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/) (Custom UI patterns and scrollbars)
- [React Hot Toast](https://react-hot-toast.com/) (Clean notification handling)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [Groq SDK](https://console.groq.com/) (Using `llama-3.3-70b-versatile` for lightning-fast LLM inferences)
- [Cohere AI](https://cohere.com/) (For generating Vector Embeddings)
- [MongoDB](https://www.mongodb.com/) (Vector Database storage)

---

##  Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and [Docker](https://www.docker.com/) installed on your machine. You will also need API keys from:
- **Groq**
- **Cohere**
- **MongoDB Atlas**

### 1. Environment Setup

Copy the example environment variables to your own `.env` file in the backend directory:

```bash
cd backend
cp .env.example .env
```
Open `backend/.env` and fill in your API keys!

### 2. Local Development (Standard)
*Run these commands in two separate terminal windows.*
**Backend:**
```bash
cd backend
npm install
npm run start
```
**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Your app should now be running at `http://localhost:5173`.

### 3. Local Development (Docker Orchestration)

If you have Docker running, you can orchestrate both the frontend and backend simultaneously without installing dependencies linearly:

```bash
docker compose up --build
```
This mounts the backend to `http://localhost:5000` and the frontend to `http://localhost:5173`.

---
