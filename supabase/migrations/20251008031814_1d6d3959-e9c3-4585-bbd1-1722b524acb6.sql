-- Atualizar políticas RLS para usar a função get_user_id_ascora()

-- EMPRESAS
DROP POLICY IF EXISTS "Usuários veem empresas do seu id_ascora" ON public.empresas;
DROP POLICY IF EXISTS "Usuários gerenciam empresas do seu id_ascora" ON public.empresas;

CREATE POLICY "Usuários veem empresas do seu id_ascora" 
ON public.empresas 
FOR SELECT 
USING ((id_ascora)::text = get_user_id_ascora());

CREATE POLICY "Usuários gerenciam empresas do seu id_ascora" 
ON public.empresas 
FOR ALL 
USING ((id_ascora)::text = get_user_id_ascora());

-- EQUIPES
DROP POLICY IF EXISTS "Usuários veem equipes do seu id_ascora" ON public.equipes;
DROP POLICY IF EXISTS "Usuários gerenciam equipes do seu id_ascora" ON public.equipes;

CREATE POLICY "Usuários veem equipes do seu id_ascora" 
ON public.equipes 
FOR SELECT 
USING ((id_ascora)::text = get_user_id_ascora());

CREATE POLICY "Usuários gerenciam equipes do seu id_ascora" 
ON public.equipes 
FOR ALL 
USING ((id_ascora)::text = get_user_id_ascora());

-- METAS
DROP POLICY IF EXISTS "Usuários veem metas do seu id_ascora" ON public.metas;
DROP POLICY IF EXISTS "Usuários gerenciam metas do seu id_ascora" ON public.metas;

CREATE POLICY "Usuários veem metas do seu id_ascora" 
ON public.metas 
FOR SELECT 
USING ((id_ascora)::text = get_user_id_ascora());

CREATE POLICY "Usuários gerenciam metas do seu id_ascora" 
ON public.metas 
FOR ALL 
USING ((id_ascora)::text = get_user_id_ascora());

-- COMISSOES
DROP POLICY IF EXISTS "Usuários veem comissoes do seu id_ascora" ON public.comissoes;
DROP POLICY IF EXISTS "Usuários gerenciam comissoes do seu id_ascora" ON public.comissoes;

CREATE POLICY "Usuários veem comissoes do seu id_ascora" 
ON public.comissoes 
FOR SELECT 
USING ((id_ascora)::text = get_user_id_ascora());

CREATE POLICY "Usuários gerenciam comissoes do seu id_ascora" 
ON public.comissoes 
FOR ALL 
USING ((id_ascora)::text = get_user_id_ascora());

-- PRODUTOS
DROP POLICY IF EXISTS "Usuários veem produtos do seu id_ascora" ON public.produtos;
DROP POLICY IF EXISTS "Usuários gerenciam produtos do seu id_ascora" ON public.produtos;

CREATE POLICY "Usuários veem produtos do seu id_ascora" 
ON public.produtos 
FOR SELECT 
USING ((id_ascora)::text = get_user_id_ascora());

CREATE POLICY "Usuários gerenciam produtos do seu id_ascora" 
ON public.produtos 
FOR ALL 
USING ((id_ascora)::text = get_user_id_ascora());

-- CLIENTES
DROP POLICY IF EXISTS "Usuários veem clientes do seu id_ascora" ON public.clientes;
DROP POLICY IF EXISTS "Usuários gerenciam clientes do seu id_ascora" ON public.clientes;

CREATE POLICY "Usuários veem clientes do seu id_ascora" 
ON public.clientes 
FOR SELECT 
USING ((id_ascora)::text = get_user_id_ascora());

CREATE POLICY "Usuários gerenciam clientes do seu id_ascora" 
ON public.clientes 
FOR ALL 
USING ((id_ascora)::text = get_user_id_ascora());

-- LINKS
DROP POLICY IF EXISTS "Usuários veem links do seu id_ascora" ON public.links;
DROP POLICY IF EXISTS "Usuários gerenciam links do seu id_ascora" ON public.links;

CREATE POLICY "Usuários veem links do seu id_ascora" 
ON public.links 
FOR SELECT 
USING ((id_ascora)::text = get_user_id_ascora());

CREATE POLICY "Usuários gerenciam links do seu id_ascora" 
ON public.links 
FOR ALL 
USING ((id_ascora)::text = get_user_id_ascora());