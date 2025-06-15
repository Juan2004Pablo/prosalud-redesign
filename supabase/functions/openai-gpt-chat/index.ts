
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders });
  }

  try {
    let messages;
    try {
      const body = await req.json();
      messages = body.messages;
    } catch (err) {
      console.error("No se pudo leer JSON de la request", err);
      return new Response(JSON.stringify({ error: 'Solicitud inválida. Debe enviarse JSON.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Llama OpenAI
    let openAIresp;
    try {
      openAIresp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          max_tokens: 300,
        }),
      });
    } catch (e) {
      console.error("Error al llamar API OpenAI:", e);
      return new Response(
        JSON.stringify({ error: 'Error de red contactando OpenAI.' }),
        { status: 502, headers: corsHeaders }
      );
    }
    let rawText = await openAIresp.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      console.error("Respuesta OpenAI NO es JSON válido:", rawText);
      return new Response(JSON.stringify({ error: 'Respuesta inválida desde OpenAI', openaiRaw: rawText }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    if (!openAIresp.ok) {
      const errMsg = (data && data.error && data.error.message) ? data.error.message : 'Error OpenAI API';
      console.error("OpenAI error data:", data);
      return new Response(JSON.stringify({ error: errMsg }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const generatedText = data.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ generatedText }), {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error in openai-gpt-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error inesperado en función OpenAI.' }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});
