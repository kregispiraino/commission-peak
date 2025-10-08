-- Add WITH CHECK to ALL/INSERT policies to allow inserts when id_ascora matches the logged user

-- PROFILES
DROP POLICY IF EXISTS "Usuários gerenciam profiles do seu id_ascora" ON public.profiles;
CREATE POLICY "Usuários gerenciam profiles do seu id_ascora"
ON public.profiles
FOR ALL
USING ((id_ascora)::text = get_user_id_ascora())
WITH CHECK ((id_ascora)::text = get_user_id_ascora());

-- EMPRESAS
DROP POLICY IF EXISTS "Usuários gerenciam empresas do seu id_ascora" ON public.empresas;
CREATE POLICY "Usuários gerenciam empresas do seu id_ascora"
ON public.empresas
FOR ALL
USING ((id_ascora)::text = get_user_id_ascora())
WITH CHECK ((id_ascora)::text = get_user_id_ascora());

-- EQUIPES
DROP POLICY IF EXISTS "Usuários gerenciam equipes do seu id_ascora" ON public.equipes;
CREATE POLICY "Usuários gerenciam equipes do seu id_ascora"
ON public.equipes
FOR ALL
USING ((id_ascora)::text = get_user_id_ascora())
WITH CHECK ((id_ascora)::text = get_user_id_ascora());

-- METAS
DROP POLICY IF EXISTS "Usuários gerenciam metas do seu id_ascora" ON public.metas;
CREATE POLICY "Usuários gerenciam metas do seu id_ascora"
ON public.metas
FOR ALL
USING ((id_ascora)::text = get_user_id_ascora())
WITH CHECK ((id_ascora)::text = get_user_id_ascora());

-- COMISSOES
DROP POLICY IF EXISTS "Usuários gerenciam comissoes do seu id_ascora" ON public.comissoes;
CREATE POLICY "Usuários gerenciam comissoes do seu id_ascora"
ON public.comissoes
FOR ALL
USING ((id_ascora)::text = get_user_id_ascora())
WITH CHECK ((id_ascora)::text = get_user_id_ascora());

-- PRODUTOS
DROP POLICY IF EXISTS "Usuários gerenciam produtos do seu id_ascora" ON public.produtos;
CREATE POLICY "Usuários gerenciam produtos do seu id_ascora"
ON public.produtos
FOR ALL
USING ((id_ascora)::text = get_user_id_ascora())
WITH CHECK ((id_ascora)::text = get_user_id_ascora());

-- CLIENTES
DROP POLICY IF EXISTS "Usuários gerenciam clientes do seu id_ascora" ON public.clientes;
CREATE POLICY "Usuários gerenciam clientes do seu id_ascora"
ON public.clientes
FOR ALL
USING ((id_ascora)::text = get_user_id_ascora())
WITH CHECK ((id_ascora)::text = get_user_id_ascora());

-- LINKS
DROP POLICY IF EXISTS "Usuários gerenciam links do seu id_ascora" ON public.links;
CREATE POLICY "Usuários gerenciam links do seu id_ascora"
ON public.links
FOR ALL
USING ((id_ascora)::text = get_user_id_ascora())
WITH CHECK ((id_ascora)::text = get_user_id_ascora());