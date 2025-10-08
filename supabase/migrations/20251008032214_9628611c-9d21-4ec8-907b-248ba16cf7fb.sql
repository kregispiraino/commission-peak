-- Ensure id_ascora is set on inserts using a BEFORE INSERT trigger
CREATE OR REPLACE FUNCTION public.enforce_id_ascora()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If id_ascora is not provided, set it from the logged user's profile
  IF NEW.id_ascora IS NULL OR NEW.id_ascora = '' THEN
    NEW.id_ascora := public.get_user_id_ascora();
  END IF;
  RETURN NEW;
END;
$$;

-- Attach trigger to all tables that use id_ascora for multi-tenancy
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['empresas','equipes','metas','comissoes','produtos','clientes','links']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS enforce_id_ascora_%I ON public.%I;', tbl, tbl);
    EXECUTE format('CREATE TRIGGER enforce_id_ascora_%I BEFORE INSERT ON public.%I FOR EACH ROW EXECUTE FUNCTION public.enforce_id_ascora();', tbl, tbl);
  END LOOP;
END $$;