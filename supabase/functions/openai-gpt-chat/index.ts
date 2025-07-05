
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

    // Mejorar el sistema de instrucciones para ser más inclusivo
    const enhancedMessages = messages.map((msg: any) => {
      if (msg.role === 'system') {
        return {
          ...msg,
          content: `${msg.content}

INSTRUCCIONES IMPORTANTES PARA RESPONDER:
- Eres el asistente oficial de ProSalud, el Sindicato de Profesionales de la Salud
- Puedes responder sobre TODOS los temas que se mencionan en la documentación proporcionada
- Esto incluye: servicios, trámites, EPS Sura, convenios, contacto, estructura organizacional, etc.
- Si la información está en el contexto proporcionado, úsala para responder de manera completa y útil
- NO rechaces preguntas solo porque no mencionen directamente "ProSalud"
- Si la pregunta es sobre EPS Sura, certificados, incapacidades, turnos, etc., y tienes información en el contexto, responde con esa información
- Mantén un tono profesional y útil
- Si realmente no tienes información sobre el tema consultado, entonces indica que no puedes ayudar con eso

RECUERDA: Tu función es ayudar con TODA la información disponible de ProSalud, no solo cuando se mencione explícitamente el nombre del sindicato.`
        };
      }
      return msg;
    });

    // Llama OpenAI con las instrucciones mejoradas
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
          messages: enhancedMessages,
          max_tokens: 400, // Aumentado para respuestas más completas
          temperature: 0.7, // Poco de creatividad para respuestas más naturales
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
