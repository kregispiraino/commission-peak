-- Adicionar coluna senha na tabela usuarios
ALTER TABLE public.usuarios 
ADD COLUMN senha text;