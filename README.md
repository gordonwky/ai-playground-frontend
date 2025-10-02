#  AI Playground Frontend

An AI Model Playground web app where users enter a single prompt and instantly see responses from multiple AI models side-by-side.  
The platform supports real-time streaming, cost metrics, and error handling.

---

##  Frontend Setup (Next.js)

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Environment variables (`.env.example`)
```env
# API proxy target (backend deployed on Railway or local)
NEXT_PUBLIC_API_URL= "your backend url"
```

### 3. Development server
```bash
npm run dev
```

### 4. Deployment (Vercel)
- Push `frontend/` to GitHub  
- Connect repo to [Vercel](https://vercel.com/)  
- Add env vars in Vercel dashboard  

---

##  Authentication Flow

- **Login** → `/auth/login` issues a secure `httpOnly` cookie (`token`).  
- **Middleware (Next.js)** → protects routes (`/`). If no cookie, redirects to `/login`.  
- **Logout** → backend clears the cookie (`/auth/logout`).  

---

## Dashboard UI

### **Single-Page Interface**
- **Prompt Input Area** → user enters one prompt at the top.  
- **Submit Button** → sends prompt to backend, streams responses.  

### **Three-Column Layout**
- **Model A (e.g., GPT-4)**  
- **Model B (e.g., Claude)**  
- **Model C (e.g., Gemini)**  

Each column shows:
- **Streaming text** (live updates while model generates)  
- **Status indicator** (`typing... → streaming... → complete` or `error`)  
- **Response in Markdown** (headings, code blocks, lists, tables all rendered nicely)  

---

## 🔄 Real-time Updates

- Uses **Server-Sent Events (SSE)** or WebSockets for streaming.  
- Each model streams independently → UI updates as chunks arrive.  
- Status is updated live (`typing → streaming → complete → error`).  

---

## 🧪 Example Flow

1. User logs in at `/login`  
2. User redirected to `/`  
3. Types:  
   ```
   Explain the concept of Reinforcement Learning in simple terms.
   ```
4. Sees **three AI models** answer side-by-side in real-time.  

---

##  Scripts

### Frontend
```bash
npm run dev         # start Next.js dev server
npm run build       # production build
npm run start       # serve production build
```

---

##  Tech Stack

- **Backend**: NestJS, Prisma, PostgreSQL, Redis, JWT Auth  
- **Frontend**: Next.js 14, React, Tailwind, SWR  
- **AI Providers**: OpenAI, OpenRouter, (extensible to Anthropic, Gemini)  
- **Deployment**: Railway (backend), Vercel (frontend)  
