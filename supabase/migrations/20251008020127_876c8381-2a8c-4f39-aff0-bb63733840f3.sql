-- Remover o campo cargo e adicionar campo acesso com enum
CREATE TYPE public.nivel_acesso AS ENUM ('master', 'administrador', 'vendedor');

ALTER TABLE public.usuarios 
DROP COLUMN IF EXISTS cargo,
ADD COLUMN acesso nivel_acesso DEFAULT 'vendedor';