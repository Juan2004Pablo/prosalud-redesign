
import { supabase } from "@/integrations/supabase/client";

// Definir tipo para los chunks recuperados
export type RelevantChunk = {
  id: string;
  doc_path: string;
  chunk_index: number;
  content: string;
  embedding: any;
  created_at: string;
  similarity: number;
};

// Genera embedding usando la edge function de Supabase
export async function getQuestionEmbedding(text: string): Promise<number[]> {
  try {
    const { data, error } = await supabase.functions.invoke('embed-question', {
      body: { input: text }
    });

    if (error) {
      console.error('Error en embed-question:', error);
      throw new Error(`Error al generar embedding: ${error.message}`);
    }

    if (!data?.embedding) {
      throw new Error('No se recibió embedding válido de la función');
    }

    return data.embedding;
  } catch (error) {
    console.error('Error completo en getQuestionEmbedding:', error);
    throw error;
  }
}

/**
 * Recupera los N chunks más relevantes usando similitud de embeddings cosine.
 * @param query Texto de la pregunta del usuario
 * @param topK Número de bloques a devolver (default: 3)
 * @returns Lista de objetos RelevantChunk
 */
export async function searchRelevantChunks(query: string, topK: number = 3): Promise<RelevantChunk[]> {
  try {
    console.log('Generando embedding para query:', query);
    const questionEmbedding = await getQuestionEmbedding(query);
    
    console.log('Buscando chunks relevantes...');
    const { data, error } = await supabase.rpc("match_doc_chunks", {
      query_embedding: JSON.stringify(questionEmbedding),
      match_count: topK
    }) as { data: RelevantChunk[] | null, error: any };

    if (error) {
      console.error('Error en match_doc_chunks:', error);
      throw new Error(`Error en búsqueda vectorial: ${error.message}`);
    }

    const chunks = data || [];
    console.log(`Encontrados ${chunks.length} chunks relevantes`);
    
    return chunks;
  } catch (error) {
    console.error('Error en searchRelevantChunks:', error);
    // Fallback: devolver array vacío para que la consulta continúe sin contexto específico
    return [];
  }
}
