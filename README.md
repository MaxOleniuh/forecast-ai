# 🔮 Forecast AI

<img width="721" height="915" alt="Screenshot 2025-11-07 at 16 10 57" src="https://github.com/user-attachments/assets/9c813db9-b773-4bb7-95ff-3be0525e4f25" />


A lightweight forecasting assistant built with **Bun**, **TypeScript**, and **React**.  
Users can ask **true/false forecasting questions** (e.g. _“Will the U.S. engage in armed conflict with Venezuela before November 30, 2025?”_)  
and receive a **probability estimate**, **analysis**, and **uncertainties** powered by the **Gemini 2.5 Flash model**.

---

## ✨ Features

- 🧠 Forecast question analysis using **Google Gemini 2.5 Flash**
- ⚡️ Fast Bun server + React frontend (Vite)
- 🎨 TailwindCSS for a clean, modern UI
- 🔒 Environment-based API key loading (`GEMINI_KEY`)
- 🧩 No authentication needed (intranet-ready)
- 🪵 Console logs on both client and server for traceability

---

## 🏗️ Tech Stack

| Layer         | Technology                    |
| ------------- | ----------------------------- |
| **Runtime**   | [Bun](https://bun.sh)         |
| **Frontend**  | React + TypeScript + Tailwind |
| **Bundler**   | Vite                          |
| **Model API** | Gemini 2.5 Flash (Google AI)  |

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

- [Bun](https://bun.sh) installed
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- Then, make sure Bun is in your PATH by adding this to your ~/.zshrc or ~/.bashrc:

```
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

### 2️⃣ Clone and Install

Clone the repository and install dependencies:

```
git clone https://github.com/MaxOleniuh/forecast-ai.git
cd forecast-ai
bun install
```

### 3️⃣ Set up Environment Variables

Create a .env file in the project root:

```
GEMINI_KEY=your_google_gemini_api_key_here
```

### 4️⃣ Run the Bun Server

```
bun run server.ts
```

You should see:

```
[Server] 🚀 Bun server running on http://localhost:3000
```

### 5️⃣ Run the Frontend (React + Vite)

```
bun run dev
```

### 🧩 Development Notes

Frontend: runs on port 5173 (Vite)

Backend: runs on port 3000 (Bun)

Proxy: /api/forecast is automatically forwarded to localhost:3000

Logging: both client and server log requests for clarity

#### Run tests

```
bun run build
```
