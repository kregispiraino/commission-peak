import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { 
  listarUsuarios, cadastrarUsuario, editarUsuario, excluirUsuario 
} from '@/backend/api/usuarios';
import { 
  listarEmpresas, cadastrarEmpresa, editarEmpresa, excluirEmpresa 
} from '@/backend/api/empresas';
import { 
  listarEquipes, cadastrarEquipe, editarEquipe, excluirEquipe 
} from '@/backend/api/equipes';

// Hook para obter o ID Ascora do usuário logado
export const useIdAscora = () => {
  return useQuery({
    queryKey: ['id-ascora'],
    queryFn: async () => {
      // TODO: Implementar lógica de obtenção do ID Ascora do usuário logado
      console.log('🔵 Frontend - Obtendo ID Ascora do usuário logado');
      return 'ASC0001'; // Valor simulado
    },
  });
};

// Hook para Usuários
export const useUsuarios = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['usuarios', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      return await listarUsuarios(idAscora);
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (usuario: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const usuarioComIdAscora = { ...usuario, id_ascora: idAscora };
      const resultado = await cadastrarUsuario(usuarioComIdAscora);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao cadastrar usuário');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Usuário criado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao criar usuário', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...usuario }: any) => {
      const { senha, ...usuarioData } = usuario;
      const resultado = await editarUsuario(id, usuarioData);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao atualizar usuário');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Usuário atualizado com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao atualizar usuário', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const resultado = await excluirUsuario(id);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao excluir usuário');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast({ title: 'Usuário removido com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao remover usuário', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  return {
    usuarios: query.data || [],
    isLoading: query.isLoading,
    createUsuario: createMutation.mutate,
    updateUsuario: updateMutation.mutate,
    deleteUsuario: deleteMutation.mutate,
  };
};

// Hook para Empresas
export const useEmpresas = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['empresas', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      return await listarEmpresas(idAscora);
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (empresa: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const empresaComIdAscora = { ...empresa, id_ascora: idAscora };
      const resultado = await cadastrarEmpresa(empresaComIdAscora);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao cadastrar empresa');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      toast({ title: 'Empresa criada com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao criar empresa', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...empresa }: any) => {
      const resultado = await editarEmpresa(id, empresa);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao atualizar empresa');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      toast({ title: 'Empresa atualizada com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao atualizar empresa', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const resultado = await excluirEmpresa(id);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao excluir empresa');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      toast({ title: 'Empresa removida com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao remover empresa', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  return {
    empresas: query.data || [],
    isLoading: query.isLoading,
    createEmpresa: createMutation.mutate,
    updateEmpresa: updateMutation.mutate,
    deleteEmpresa: deleteMutation.mutate,
  };
};

// Hook para Equipes
export const useEquipes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: idAscora } = useIdAscora();

  const query = useQuery({
    queryKey: ['equipes', idAscora],
    queryFn: async () => {
      if (!idAscora) return [];
      return await listarEquipes(idAscora);
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (equipe: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const equipeComIdAscora = { ...equipe, id_ascora: idAscora };
      const resultado = await cadastrarEquipe(equipeComIdAscora);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao cadastrar equipe');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipes'] });
      toast({ title: 'Equipe criada com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao criar equipe', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...equipe }: any) => {
      const resultado = await editarEquipe(id, equipe);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao atualizar equipe');
      }
      
      return resultado.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipes'] });
      toast({ title: 'Equipe atualizada com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao atualizar equipe', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const resultado = await excluirEquipe(id);
      
      if (!resultado.success) {
        throw new Error(resultado.error || 'Erro ao excluir equipe');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipes'] });
      toast({ title: 'Equipe removida com sucesso!' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Erro ao remover equipe', 
        description: error.message,
        variant: 'destructive' 
      });
    },
  });

  return {
    equipes: query.data || [],
    isLoading: query.isLoading,
    createEquipe: createMutation.mutate,
    updateEquipe: updateMutation.mutate,
    deleteEquipe: deleteMutation.mutate,
  };
};

// Continua nos próximos hooks...
