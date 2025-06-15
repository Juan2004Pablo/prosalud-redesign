
-- Crea una función SQL para recuperar los chunks más similares por embedding (cosine distance)
create or replace function public.match_doc_chunks(
  query_embedding vector(1536),
  match_count integer default 3
)
returns table (
  id uuid,
  doc_path text,
  chunk_index integer,
  content text,
  embedding vector(1536),
  created_at timestamptz,
  similarity float
)
language sql
stable
as $$
  select 
    id,
    doc_path,
    chunk_index,
    content,
    embedding,
    created_at,
    1 - (embedding <=> query_embedding) as similarity
  from doc_chunks
  order by embedding <=> query_embedding
  limit match_count
$$;
