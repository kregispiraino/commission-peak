-- Adicionar campos faltantes em usuarios
ALTER TABLE public.usuarios 
ADD COLUMN IF NOT EXISTS empresa_id UUID REFERENCES public.empresas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS equipe_id UUID REFERENCES public.equipes(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS meta_individual NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS comissao_percentual NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_vendedor BOOLEAN DEFAULT true;

-- Adicionar empresa_id em equipes
ALTER TABLE public.equipes 
ADD COLUMN IF NOT EXISTS empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE;

-- Adicionar campos em metas
ALTER TABLE public.metas 
ADD COLUMN IF NOT EXISTS tipo TEXT CHECK (tipo IN ('empresa', 'equipe')),
ADD COLUMN IF NOT EXISTS empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE;

-- Adicionar campos em comissoes
ALTER TABLE public.comissoes 
ADD COLUMN IF NOT EXISTS empresa_id UUID REFERENCES public.empresas(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS equipe_id UUID REFERENCES public.equipes(id) ON DELETE CASCADE;

-- Adicionar campos em links
ALTER TABLE public.links 
ADD COLUMN IF NOT EXISTS vendedor_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS empresa_id UUID REFERENCES public.empresas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS equipe_id UUID REFERENCES public.equipes(id) ON DELETE SET NULL;

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_usuarios_empresa ON public.usuarios(empresa_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_equipe ON public.usuarios(equipe_id);
CREATE INDEX IF NOT EXISTS idx_equipes_empresa ON public.equipes(empresa_id);
CREATE INDEX IF NOT EXISTS idx_metas_empresa ON public.metas(empresa_id);
CREATE INDEX IF NOT EXISTS idx_metas_tipo ON public.metas(tipo);
CREATE INDEX IF NOT EXISTS idx_comissoes_empresa ON public.comissoes(empresa_id);
CREATE INDEX IF NOT EXISTS idx_comissoes_equipe ON public.comissoes(equipe_id);
CREATE INDEX IF NOT EXISTS idx_links_vendedor ON public.links(vendedor_id);

-- Função para distribuir meta aos vendedores quando meta é criada/atualizada
CREATE OR REPLACE FUNCTION public.distribuir_meta_vendedores()
RETURNS TRIGGER AS $$
DECLARE
  num_vendedores INTEGER;
  meta_individual NUMERIC;
BEGIN
  IF NEW.tipo = 'empresa' THEN
    -- Contar vendedores da empresa
    SELECT COUNT(*) INTO num_vendedores
    FROM public.usuarios
    WHERE empresa_id = NEW.empresa_id 
      AND is_vendedor = true 
      AND ativo = true
      AND id_ascora = NEW.id_ascora;
    
    IF num_vendedores > 0 THEN
      meta_individual := NEW.valor_alvo / num_vendedores;
      
      -- Atualizar meta individual dos vendedores
      UPDATE public.usuarios
      SET meta_individual = meta_individual
      WHERE empresa_id = NEW.empresa_id 
        AND is_vendedor = true 
        AND ativo = true
        AND id_ascora = NEW.id_ascora;
    END IF;
    
  ELSIF NEW.tipo = 'equipe' THEN
    -- Contar vendedores da equipe
    SELECT COUNT(*) INTO num_vendedores
    FROM public.usuarios
    WHERE equipe_id = NEW.equipe_id 
      AND is_vendedor = true 
      AND ativo = true
      AND id_ascora = NEW.id_ascora;
    
    IF num_vendedores > 0 THEN
      meta_individual := NEW.valor_alvo / num_vendedores;
      
      -- Atualizar meta individual dos vendedores
      UPDATE public.usuarios
      SET meta_individual = meta_individual
      WHERE equipe_id = NEW.equipe_id 
        AND is_vendedor = true 
        AND ativo = true
        AND id_ascora = NEW.id_ascora;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para distribuir meta após INSERT
CREATE TRIGGER trigger_distribuir_meta_insert
AFTER INSERT ON public.metas
FOR EACH ROW
EXECUTE FUNCTION public.distribuir_meta_vendedores();

-- Trigger para distribuir meta após UPDATE
CREATE TRIGGER trigger_distribuir_meta_update
AFTER UPDATE ON public.metas
FOR EACH ROW
WHEN (OLD.valor_alvo IS DISTINCT FROM NEW.valor_alvo OR OLD.tipo IS DISTINCT FROM NEW.tipo)
EXECUTE FUNCTION public.distribuir_meta_vendedores();

-- Função para remover meta dos vendedores quando meta é deletada
CREATE OR REPLACE FUNCTION public.remover_meta_vendedores()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.tipo = 'empresa' THEN
    UPDATE public.usuarios
    SET meta_individual = 0
    WHERE empresa_id = OLD.empresa_id 
      AND is_vendedor = true
      AND id_ascora = OLD.id_ascora;
      
  ELSIF OLD.tipo = 'equipe' THEN
    UPDATE public.usuarios
    SET meta_individual = 0
    WHERE equipe_id = OLD.equipe_id 
      AND is_vendedor = true
      AND id_ascora = OLD.id_ascora;
  END IF;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para remover meta antes de DELETE
CREATE TRIGGER trigger_remover_meta_delete
BEFORE DELETE ON public.metas
FOR EACH ROW
EXECUTE FUNCTION public.remover_meta_vendedores();

-- Função para adicionar comissão aos vendedores quando comissão é criada/atualizada
CREATE OR REPLACE FUNCTION public.adicionar_comissao_vendedores()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.empresa_id IS NOT NULL THEN
    UPDATE public.usuarios
    SET comissao_percentual = comissao_percentual + COALESCE(NEW.percentual, 0)
    WHERE empresa_id = NEW.empresa_id 
      AND is_vendedor = true 
      AND ativo = true
      AND id_ascora = NEW.id_ascora;
      
  ELSIF NEW.equipe_id IS NOT NULL THEN
    UPDATE public.usuarios
    SET comissao_percentual = comissao_percentual + COALESCE(NEW.percentual, 0)
    WHERE equipe_id = NEW.equipe_id 
      AND is_vendedor = true 
      AND ativo = true
      AND id_ascora = NEW.id_ascora;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para adicionar comissão após INSERT
CREATE TRIGGER trigger_adicionar_comissao_insert
AFTER INSERT ON public.comissoes
FOR EACH ROW
EXECUTE FUNCTION public.adicionar_comissao_vendedores();

-- Função para atualizar comissão dos vendedores quando comissão é atualizada
CREATE OR REPLACE FUNCTION public.atualizar_comissao_vendedores()
RETURNS TRIGGER AS $$
DECLARE
  diferenca NUMERIC;
BEGIN
  diferenca := COALESCE(NEW.percentual, 0) - COALESCE(OLD.percentual, 0);
  
  IF NEW.empresa_id IS NOT NULL THEN
    UPDATE public.usuarios
    SET comissao_percentual = comissao_percentual + diferenca
    WHERE empresa_id = NEW.empresa_id 
      AND is_vendedor = true
      AND id_ascora = NEW.id_ascora;
      
  ELSIF NEW.equipe_id IS NOT NULL THEN
    UPDATE public.usuarios
    SET comissao_percentual = comissao_percentual + diferenca
    WHERE equipe_id = NEW.equipe_id 
      AND is_vendedor = true
      AND id_ascora = NEW.id_ascora;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para atualizar comissão após UPDATE
CREATE TRIGGER trigger_atualizar_comissao_update
AFTER UPDATE ON public.comissoes
FOR EACH ROW
WHEN (OLD.percentual IS DISTINCT FROM NEW.percentual)
EXECUTE FUNCTION public.atualizar_comissao_vendedores();

-- Função para remover comissão dos vendedores quando comissão é deletada
CREATE OR REPLACE FUNCTION public.remover_comissao_vendedores()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.empresa_id IS NOT NULL THEN
    UPDATE public.usuarios
    SET comissao_percentual = comissao_percentual - COALESCE(OLD.percentual, 0)
    WHERE empresa_id = OLD.empresa_id 
      AND is_vendedor = true
      AND id_ascora = OLD.id_ascora;
      
  ELSIF OLD.equipe_id IS NOT NULL THEN
    UPDATE public.usuarios
    SET comissao_percentual = comissao_percentual - COALESCE(OLD.percentual, 0)
    WHERE equipe_id = OLD.equipe_id 
      AND is_vendedor = true
      AND id_ascora = OLD.id_ascora;
  END IF;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para remover comissão antes de DELETE
CREATE TRIGGER trigger_remover_comissao_delete
BEFORE DELETE ON public.comissoes
FOR EACH ROW
EXECUTE FUNCTION public.remover_comissao_vendedores();