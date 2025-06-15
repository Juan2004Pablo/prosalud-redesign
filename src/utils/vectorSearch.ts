import { supabase } from "@/integrations/supabase/client";

// Definir tipo para los chunks recuperados
export type RelevantChunk = {
  id: string;
  doc_path: string;
  chunk_index: number;
  content: string;
  embedding: any; // Puede ser string o vector, depende de configuración
  created_at: string;
  similarity: number;
};

// Genera embedding en frontend usando OpenAI
export async function getQuestionEmbedding(text: string): Promise<number[]> {
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
 * @param query Texto de la pregunta del usuario
 * @param topK Número de bloques a devolver (default: 3)
 * @returns Lista de objetos RelevantChunk
 */
export async function searchRelevantChunks(query: string, topK: number = 3): Promise<RelevantChunk[]> {
  const questionEmbedding = await getQuestionEmbedding(query);

  // Convertir embedding a string antes de enviar a Supabase
  const { data, error } = await supabase.rpc("match_doc_chunks", {
    query_embedding: JSON.stringify(questionEmbedding), // <-- fix: stringify the array!
    match_count: topK
  }) as { data: RelevantChunk[] | null, error: any };

  if (error) throw error;
  return data || [];
}
