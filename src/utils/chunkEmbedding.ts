
/**
 * Recibe un texto y lo divide en bloques (chunks) para embeddings.
 * Usa el mismo algoritmo simple que el edge function.
 */
export function chunkMarkdown(text: string, maxLen: number = 1200): string[] {
  const paragraphs = text.split(/\n{2,}/g);
  const chunks = [];
  let current = "";
  for (const para of paragraphs) {
    if ((current + "\n\n" + para).length > maxLen && current) {
      chunks.push(current.trim());
      current = para;
    } else {
      current += "\n\n" + para;
    }
  }
  if (current) chunks.push(current.trim());
  return chunks;
}
