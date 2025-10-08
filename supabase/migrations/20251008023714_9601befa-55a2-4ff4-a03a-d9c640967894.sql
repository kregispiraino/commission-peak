-- Remover políticas antigas que causam recursão
DROP POLICY IF EXISTS "Usuários veem profiles do seu id_ascora" ON public.profiles;
DROP POLICY IF EXISTS "Usuários gerenciam profiles do seu id_ascora" ON public.profiles;

-- Criar função security definer para obter id_ascora do usuário atual
CREATE OR REPLACE FUNCTION public.get_user_id_ascora()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id_ascora
  FROM public.profiles
  WHERE id = auth.uid()
  LIMIT 1;
$$;

-- Criar novas políticas usando a função
CREATE POLICY "Usuários veem profiles do seu id_ascora"
ON public.profiles
FOR SELECT
USING (id_ascora = public.get_user_id_ascora());

CREATE POLICY "Usuários gerenciam profiles do seu id_ascora"
ON public.profiles
FOR ALL
USING (id_ascora = public.get_user_id_ascora());

-- Atualizar foreign keys da tabela equipes que ainda referenciavam usuarios
ALTER TABLE public.equipes 
DROP CONSTRAINT IF EXISTS equipes_lider_id_fkey;

ALTER TABLE public.equipes
ADD CONSTRAINT equipes_lider_id_fkey 
FOREIGN KEY (lider_id) 
REFERENCES public.profiles(id) 
ON DELETE SET NULL;

-- Atualizar foreign keys da tabela links
ALTER TABLE public.links 
DROP CONSTRAINT IF EXISTS links_vendedor_id_fkey;

ALTER TABLE public.links
ADD CONSTRAINT links_vendedor_id_fkey 
FOREIGN KEY (vendedor_id) 
REFERENCES public.profiles(id) 
ON DELETE SET NULL;