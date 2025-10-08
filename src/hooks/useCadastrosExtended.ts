import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useIdAscora } from './useCadastros';

// Hook para Metas
export const useMetas = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['metas', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      
      const { data, error } = await supabase
        .from('metas')
        .select(`
          *,
          empresa:empresas(id, nome),
          equipe:equipes(id, nome)
        `)
        .eq('id_ascora', idAscora)
        .eq('ativo', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (meta: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      // Verificar se já existe meta para essa empresa/equipe
      const { data: existingMetas } = await supabase
        .from('metas')
        .select('*')
        .eq('id_ascora', idAscora)
        .eq('ativo', true);

      if (meta.tipo === 'empresa' && existingMetas?.some(m => m.empresa_id === meta.empresa_id)) {
        throw new Error('Já existe uma meta cadastrada para esta empresa');
      }
      
      if (meta.tipo === 'equipe' && existingMetas?.some(m => m.equipe_id === meta.equipe_id)) {
        throw new Error('Já existe uma meta cadastrada para esta equipe');
      }

      const dadosParaEnviar = { ...meta, id_ascora: idAscora };
      console.log('📤 Enviando meta para o banco:', dadosParaEnviar);
      
      const { data, error } = await supabase
        .from('metas')
        .insert([dadosParaEnviar])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Erro ao cadastrar meta:', error);
        throw error;
      }
      
      console.log('✅ Meta cadastrada com sucesso:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metas'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Meta criada e distribuída aos vendedores!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao criar meta', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...meta }: any) => {
      const { data, error } = await supabase
        .from('metas')
        .update(meta)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metas'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Meta atualizada e redistribuída!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao atualizar meta', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('metas')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metas'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Meta removida e vendedores atualizados!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao remover meta', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  return {
    metas: query.data || [],
    isLoading: query.isLoading,
    createMeta: createMutation.mutate,
    updateMeta: updateMutation.mutate,
    deleteMeta: deleteMutation.mutate,
  };
};

// Hook para Comissões
export const useComissoes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['comissoes', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      
      const { data, error } = await supabase
        .from('comissoes')
        .select(`
          *,
          empresa:empresas(id, nome),
          equipe:equipes(id, nome)
        `)
        .eq('id_ascora', idAscora)
        .eq('ativo', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (comissao: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const dadosParaEnviar = { ...comissao, id_ascora: idAscora };
      console.log('📤 Enviando comissão para o banco:', dadosParaEnviar);
      
      const { data, error } = await supabase
        .from('comissoes')
        .insert([dadosParaEnviar])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Erro ao cadastrar comissão:', error);
        throw error;
      }
      
      console.log('✅ Comissão cadastrada com sucesso:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comissoes'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Comissão criada e adicionada aos vendedores!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao criar comissão', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...comissao }: any) => {
      const { data, error } = await supabase
        .from('comissoes')
        .update(comissao)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comissoes'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Comissão atualizada nos vendedores!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao atualizar comissão', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('comissoes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comissoes'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Comissão removida dos vendedores!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao remover comissão', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  return {
    comissoes: query.data || [],
    isLoading: query.isLoading,
    createComissao: createMutation.mutate,
    updateComissao: updateMutation.mutate,
    deleteComissao: deleteMutation.mutate,
  };
};

// Hook para Produtos
export const useProdutos = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['produtos', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('id_ascora', idAscora)
        .eq('ativo', true)
        .order('nome');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (produto: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const dadosParaEnviar = { ...produto, id_ascora: idAscora };
      console.log('📤 Enviando produto para o banco:', dadosParaEnviar);
      
      const { data, error } = await supabase
        .from('produtos')
        .insert([dadosParaEnviar])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Erro ao cadastrar produto:', error);
        throw error;
      }
      
      console.log('✅ Produto cadastrado com sucesso:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
      toast({ title: 'Produto criado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao criar produto', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...produto }: any) => {
      const { data, error } = await supabase
        .from('produtos')
        .update(produto)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
      toast({ title: 'Produto atualizado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao atualizar produto', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('produtos')
        .update({ ativo: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
      toast({ title: 'Produto removido com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao remover produto', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  return {
    produtos: query.data || [],
    isLoading: query.isLoading,
    createProduto: createMutation.mutate,
    updateProduto: updateMutation.mutate,
    deleteProduto: deleteMutation.mutate,
  };
};

// Hook para Clientes
export const useClientes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['clientes', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id_ascora', idAscora)
        .eq('ativo', true)
        .order('nome');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (cliente: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const dadosParaEnviar = { ...cliente, id_ascora: idAscora };
      console.log('📤 Enviando cliente para o banco:', dadosParaEnviar);
      
      const { data, error } = await supabase
        .from('clientes')
        .insert([dadosParaEnviar])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Erro ao cadastrar cliente:', error);
        throw error;
      }
      
      console.log('✅ Cliente cadastrado com sucesso:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast({ title: 'Cliente criado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao criar cliente', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...cliente }: any) => {
      const { data, error } = await supabase
        .from('clientes')
        .update(cliente)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast({ title: 'Cliente atualizado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao atualizar cliente', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('clientes')
        .update({ ativo: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast({ title: 'Cliente removido com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao remover cliente', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  return {
    clientes: query.data || [],
    isLoading: query.isLoading,
    createCliente: createMutation.mutate,
    updateCliente: updateMutation.mutate,
    deleteCliente: deleteMutation.mutate,
  };
};

// Hook para Links
export const useLinks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['links', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      
      const { data, error } = await supabase
        .from('links')
        .select(`
          *,
          vendedor:profiles(id, nome),
          empresa:empresas(id, nome),
          equipe:equipes(id, nome)
        `)
        .eq('id_ascora', idAscora)
        .eq('ativo', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (link: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const dadosParaEnviar = { ...link, id_ascora: idAscora };
      console.log('📤 Enviando link para o banco:', dadosParaEnviar);
      
      const { data, error } = await supabase
        .from('links')
        .insert([dadosParaEnviar])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Erro ao cadastrar link:', error);
        throw error;
      }
      
      console.log('✅ Link cadastrado com sucesso:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast({ title: 'Link criado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao criar link', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...link }: any) => {
      const { data, error } = await supabase
        .from('links')
        .update(link)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast({ title: 'Link atualizado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao atualizar link', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('links')
        .update({ ativo: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast({ title: 'Link removido com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao remover link', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  return {
    links: query.data || [],
    isLoading: query.isLoading,
    createLink: createMutation.mutate,
    updateLink: updateMutation.mutate,
    deleteLink: deleteMutation.mutate,
  };
};
