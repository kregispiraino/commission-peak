import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Hook para obter o ID Ascora do usuário logado
export const useIdAscora = () => {
  return useQuery({
    queryKey: ['id-ascora'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('id_ascora')
        .eq('id', user.id)
        .single();
      
      return profile?.id_ascora || 'ASC0001';
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
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          empresa:empresas(id, nome),
          equipe:equipes(id, nome)
        `)
        .eq('id_ascora', idAscora)
        .eq('ativo', true)
        .order('nome');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (usuario: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      // Primeiro, cria conta de autenticação se senha foi fornecida
      if (usuario.senha && usuario.email) {
        console.log('📤 Criando usuário com id_ascora:', idAscora);
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: usuario.email,
          password: usuario.senha,
          options: {
            data: {
              nome: usuario.nome,
              id_ascora: idAscora
            }
          }
        });
        
        if (authError) {
          console.error('❌ Erro ao criar autenticação:', authError);
          throw authError;
        }
        
        // A tabela profiles será criada automaticamente pelo trigger
        // Agora precisamos atualizar com os dados adicionais
        const { senha, ...usuarioData } = usuario;
        
        if (authData.user) {
          console.log('📤 Atualizando dados adicionais do usuário:', usuarioData);
          
          const { error: updateError } = await supabase
            .from('profiles')
            .update(usuarioData)
            .eq('id', authData.user.id);
          
          if (updateError) {
            console.error('❌ Erro ao atualizar perfil:', updateError);
            throw updateError;
          }
          
          console.log('✅ Usuário cadastrado com sucesso');
          return authData.user;
        }
      }
      
      throw new Error('Email e senha são obrigatórios');
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
      
      const { data, error } = await supabase
        .from('profiles')
        .update(usuarioData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
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
      const { error } = await supabase
        .from('profiles')
        .update({ ativo: false })
        .eq('id', id);
      
      if (error) throw error;
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
      
      const { data, error } = await supabase
        .from('empresas')
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
    mutationFn: async (empresa: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const dadosParaEnviar = { ...empresa, id_ascora: idAscora };
      console.log('📤 Enviando empresa para o banco:', dadosParaEnviar);
      
      const { data, error } = await supabase
        .from('empresas')
        .insert([dadosParaEnviar])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Erro ao cadastrar empresa:', error);
        throw error;
      }
      
      console.log('✅ Empresa cadastrada com sucesso:', data);
      return data;
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
      const { data, error } = await supabase
        .from('empresas')
        .update(empresa)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
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
      const { error } = await supabase
        .from('empresas')
        .update({ ativo: false })
        .eq('id', id);
      
      if (error) throw error;
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
      
      const { data, error } = await supabase
        .from('equipes')
        .select(`
          *,
          empresa:empresas(id, nome)
        `)
        .eq('id_ascora', idAscora)
        .eq('ativo', true)
        .order('nome');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!idAscora,
  });

  const createMutation = useMutation({
    mutationFn: async (equipe: any) => {
      if (!idAscora) {
        throw new Error('ID Ascora não encontrado. Por favor, faça login novamente.');
      }
      
      const dadosParaEnviar = { ...equipe, id_ascora: idAscora };
      console.log('📤 Enviando equipe para o banco:', dadosParaEnviar);
      
      const { data, error } = await supabase
        .from('equipes')
        .insert([dadosParaEnviar])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Erro ao cadastrar equipe:', error);
        throw error;
      }
      
      console.log('✅ Equipe cadastrada com sucesso:', data);
      return data;
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
      const { data, error } = await supabase
        .from('equipes')
        .update(equipe)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
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
      const { error } = await supabase
        .from('equipes')
        .update({ ativo: false })
        .eq('id', id);
      
      if (error) throw error;
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
