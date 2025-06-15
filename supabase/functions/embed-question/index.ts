
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const EMBEDDING_MODEL = "text-embedding-ada-002";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, content-type" } });
  }
  try {
    const { input } = await req.json();
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input,
        model: EMBEDDING_MODEL,
      }),
    });
    const result = await response.json();
    if (result.data && result.data[0] && result.data[0].embedding) {
      return new Response(JSON.stringify({ embedding: result.data[0].embedding }), { headers: { "Access-Control-Allow-Origin": "*" } });
    }
    throw new Error("Embedding error: " + result.error?.message || "unknown");
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
  }
});
