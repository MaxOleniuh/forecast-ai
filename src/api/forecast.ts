import { serve } from "bun";

interface ForecastRequest {
  question: string;
}

interface ForecastResponse {
  probability: number;
  analysis: string;
  uncertainties: string;
}

async function callGemini(question: string): Promise<ForecastResponse> {
  const key = process.env.GEMINI_KEY;
  if (!key) throw new Error("GEMINI_KEY environment variable not set");

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are a forecasting expert.
Answer the following true/false forecasting question strictly in JSON format.

Question: "${question}"

Respond ONLY with valid JSON like this:
{
  "probability": 72,
  "analysis": "Provide a concise reasoning explaining why.",
  "uncertainties": "List key unknown factors or sources of uncertainty."
}

Do not include any other text, explanation, or markdown — only valid JSON.
            `.trim(),
          },
        ],
      },
    ],
  };

  console.log("[Server] Sending prompt to Gemini:", question);

  const resp = await fetch(`${endpoint}?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("[Server] Gemini API error:", resp.status, text);
    throw new Error(`Gemini API error: ${resp.status} ${text}`);
  }

  const json = await resp.json();
  // ✅ Correct field for Gemini 2.x
  const generatedText =
    json.candidates?.[0]?.content?.parts?.[0]?.text ??
    json.results?.[0]?.text ??
    "";

  console.log("[Server] Gemini returned raw text:", generatedText);

  // Parse response safely
  let parsed: ForecastResponse = {
    probability: 0,
    analysis: "",
    uncertainties: "",
  };

  try {
    // Extract JSON block if model adds extra text
    const match = generatedText.match(/\{[\s\S]*\}/);
    if (match) parsed = JSON.parse(match[0]);
    else throw new Error("No JSON found");
  } catch (err) {
    console.warn("[Server] Failed to parse JSON, falling back to heuristics");
    const m = generatedText.match(/(\d+(\.\d+)?)\s*%/);
    const prob = m ? parseFloat(m[1]) : 0;
    parsed = {
      probability: prob,
      analysis: generatedText.trim(),
      uncertainties: "Parsing failed",
    };
  }

  console.log("[Server] Parsed forecast:", parsed);
  return parsed;
}

serve({
  port: 3000,
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/api/forecast") {
      try {
        const body: ForecastRequest = await req.json();
        const { question } = body;
        console.log("[Server] Received question:", question);

        if (!question || typeof question !== "string") {
          return new Response(JSON.stringify({ error: "Invalid question" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const result = await callGemini(question);
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err: any) {
        console.error("[Server] Error in /api/forecast:", err);
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("[Server] 🚀 Bun server running on http://localhost:3000");
