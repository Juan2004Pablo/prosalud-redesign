
import { supabase } from "@/integrations/supabase/client";

// Genera embedding en frontend usando OpenAI
export async function getQuestionEmbedding(text) {
  // Aquí deberías llamar a una edge function privada que hace la llamada real a OpenAI
  // Este simple ejemplo asume que tienes una edge function /embed-question
  const resp = await fetch("/functions/v1/embed-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: text }),
  });
  const { embedding } = await resp.json();
  return embedding;
}

/**
 * Recupera los N chunks más relevantes de la base de datos usando similitud de embeddings cosine.
 * @param {*} query Texto de la pregunta del usuario
 * @param {number} topK Número de bloques a devolver (default: 3)
 * @returns Lista de objetos {doc_path, chunk_index, content, embedding}
 */
export async function searchRelevantChunks(query: string, topK: number = 3) {
  const questionEmbedding = await getQuestionEmbedding(query);

  // Consulta vectorial en Supabase
  const { data, error } = await supabase.rpc("match_doc_chunks", {
    query_embedding: questionEmbedding,
    match_count: topK
  });

  if (error) throw error;
  return data || [];
}
