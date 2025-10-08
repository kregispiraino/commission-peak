-- Adicionar colunas necessárias na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS acesso public.nivel_acesso DEFAULT 'vendedor',
ADD COLUMN IF NOT EXISTS empresa_id uuid REFERENCES public.empresas(id),
ADD COLUMN IF NOT EXISTS equipe_id uuid REFERENCES public.equipes(id),
ADD COLUMN IF NOT EXISTS comissao_percentual numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS meta_individual numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_vendedor boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS ativo boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS senha text;

-- Migrar dados da tabela usuarios para profiles (se houver dados)
UPDATE public.profiles p
SET 
  acesso = u.acesso,
  empresa_id = u.empresa_id,
  equipe_id = u.equipe_id,
  comissao_percentual = u.comissao_percentual,
  meta_individual = u.meta_individual,
  is_vendedor = u.is_vendedor,
  ativo = u.ativo,
  senha = u.senha
FROM public.usuarios u
WHERE p.id_ascora = u.id_ascora;

-- Atualizar RLS policies da tabela profiles
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON public.profiles;

-- Permitir que usuários vejam perfis do mesmo id_ascora
CREATE POLICY "Usuários veem profiles do seu id_ascora"
ON public.profiles
FOR SELECT
USING (
  id_ascora = (
    SELECT id_ascora 
    FROM public.profiles 
    WHERE id = auth.uid()
  )
);

-- Permitir que usuários gerenciem profiles do mesmo id_ascora
CREATE POLICY "Usuários gerenciam profiles do seu id_ascora"
ON public.profiles
FOR ALL
USING (
  id_ascora = (
    SELECT id_ascora 
    FROM public.profiles 
    WHERE id = auth.uid()
  )
);

-- Remover tabela usuarios e suas dependências
DROP TABLE IF EXISTS public.usuarios CASCADE;