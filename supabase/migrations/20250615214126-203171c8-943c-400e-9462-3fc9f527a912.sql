
-- Extensión necesaria para soporte vectorial (si aún no está instalada; ignorar error si ya existe)
create extension if not exists vector;

-- Tabla para almacenar los fragmentos ("chunks") de la documentación y sus embeddings
create table public.doc_chunks (
  id uuid primary key default gen_random_uuid(),
  doc_path text not null,          -- Ruta o nombre del archivo de origen
  chunk_index int not null,        -- Posición del bloque dentro del documento
  content text not null,           -- Texto del bloque de documento
  embedding vector(1536),          -- Embedding (OpenAI ada-002 = 1536 dims)
  created_at timestamp with time zone default now()
);

-- Índice para acelerar vector search
create index on public.doc_chunks using ivfflat (embedding vector_cosine_ops);

-- Opcional: índice por doc_path
create index on public.doc_chunks(doc_path);

-- (No es necesario RLS, ya que solo nosotros gestionamos este recurso y no hay datos sensibles de usuario, pero se puede añadir si se desea)
