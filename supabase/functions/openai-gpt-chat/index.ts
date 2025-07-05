
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'text/plain',
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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

    // Llama OpenAI con streaming habilitado
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
          max_tokens: 400,
          temperature: 0.7,
          stream: true, // Habilitar streaming
        }),
      });
    } catch (e) {
      console.error("Error al llamar API OpenAI:", e);
      return new Response(
        JSON.stringify({ error: 'Error de red contactando OpenAI.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!openAIresp.ok) {
      const errorText = await openAIresp.text();
      console.error("OpenAI error:", errorText);
      return new Response(JSON.stringify({ error: 'Error OpenAI API' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Para streaming, necesitamos crear un ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        const reader = openAIresp.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = '';
        let fullResponse = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              // Enviar respuesta completa al final
              const finalData = JSON.stringify({ generatedText: fullResponse.trim() });
              controller.enqueue(new TextEncoder().encode(finalData + '\n'));
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (trimmedLine.startsWith('data: ')) {
                const data = trimmedLine.slice(6);
                
                if (data === '[DONE]') {
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  
                  if (content) {
                    fullResponse += content;
                    // Enviar chunk al cliente
                    const chunkData = JSON.stringify({ chunk: content });
                    controller.enqueue(new TextEncoder().encode(chunkData + '\n'));
                  }
                } catch (e) {
                  console.error('Error parsing streaming data:', e);
                }
              }
            }
          }
        } catch (error) {
          console.error('Error in streaming:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Error in openai-gpt-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error inesperado en función OpenAI.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
