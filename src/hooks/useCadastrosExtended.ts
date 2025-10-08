import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useIdAscora } from './useCadastros';
import {
  listarMetas, cadastrarMeta, editarMeta, excluirMeta
} from '@/backend/api/metas';
import {
  listarComissoes, cadastrarComissao, editarComissao, excluirComissao
} from '@/backend/api/comissoes';
import {
  listarProdutos, cadastrarProduto, editarProduto, excluirProduto
} from '@/backend/api/produtos';
import {
  listarClientes, cadastrarCliente, editarCliente, excluirCliente
} from '@/backend/api/clientes';
import {
  listarLinks, cadastrarLink, editarLink, excluirLink
} from '@/backend/api/links';

// Hook para Metas
export const useMetas = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['metas', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      return await listarMetas(idAscora);
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (meta: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const metaComIdAscora = { ...meta, id_ascora: idAscora };
      const resultado = await cadastrarMeta(metaComIdAscora);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao cadastrar meta');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metas'] });
      toast({ title: 'Meta criada com sucesso!' });
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
      const resultado = await editarMeta(id, meta);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao atualizar meta');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metas'] });
      toast({ title: 'Meta atualizada com sucesso!' });
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
      const resultado = await excluirMeta(id);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao excluir meta');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metas'] });
      toast({ title: 'Meta removida com sucesso!' });
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
      return await listarComissoes(idAscora);
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (comissao: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const comissaoComIdAscora = { ...comissao, id_ascora: idAscora };
      const resultado = await cadastrarComissao(comissaoComIdAscora);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao cadastrar comissão');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comissoes'] });
      toast({ title: 'Comissão criada com sucesso!' });
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
      const resultado = await editarComissao(id, comissao);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao atualizar comissão');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comissoes'] });
      toast({ title: 'Comissão atualizada com sucesso!' });
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
      const resultado = await excluirComissao(id);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao excluir comissão');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comissoes'] });
      toast({ title: 'Comissão removida com sucesso!' });
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
      return await listarProdutos(idAscora);
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (produto: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const produtoComIdAscora = { ...produto, id_ascora: idAscora };
      const resultado = await cadastrarProduto(produtoComIdAscora);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao cadastrar produto');
      }
      
      return resultado.data;
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
      const resultado = await editarProduto(id, produto);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao atualizar produto');
      }
      
      return resultado.data;
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
      const resultado = await excluirProduto(id);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao excluir produto');
      }
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
      return await listarClientes(idAscora);
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (cliente: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const clienteComIdAscora = { ...cliente, id_ascora: idAscora };
      const resultado = await cadastrarCliente(clienteComIdAscora);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao cadastrar cliente');
      }
      
      return resultado.data;
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
      const resultado = await editarCliente(id, cliente);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao atualizar cliente');
      }
      
      return resultado.data;
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
      const resultado = await excluirCliente(id);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao excluir cliente');
      }
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
      return await listarLinks(idAscora);
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (link: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const linkComIdAscora = { ...link, id_ascora: idAscora };
      const resultado = await cadastrarLink(linkComIdAscora);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao cadastrar link');
      }
      
      return resultado.data;
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
      const resultado = await editarLink(id, link);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao atualizar link');
      }
      
      return resultado.data;
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
      const resultado = await excluirLink(id);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao excluir link');
      }
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
