// Backend API - Usuários
// Rotas para integração futura com banco de dados

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  senha?: string;
  acesso: 'master' | 'administrador' | 'vendedor';
  empresa_id?: string | null;
  equipe_id?: string | null;
  comissao_percentual?: number;
  meta_individual?: number;
  is_vendedor?: boolean;
  id_ascora?: string;
  ativo?: boolean;
}

// ROTA GET: Listar usuários
export async function listarUsuarios(idAscora: string): Promise<Usuario[]> {
  console.log('🔵 Backend - GET Listar usuários para id_ascora:', idAscora);
  
  // TODO: Implementar lógica de busca no banco de dados
  // Simulação de retorno do banco
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [];
}

// ROTA: Cadastrar novo usuário
export async function cadastrarUsuario(usuario: Usuario): Promise<{ success: boolean; data?: Usuario; error?: string }> {
  console.log('🔵 Backend - Cadastrar usuário:', usuario);
  
  // TODO: Implementar lógica de inserção no banco de dados
  // Validações, criação de conta de autenticação, etc.
  
  // Retorno simulado de sucesso
  return {
    success: true,
    data: { ...usuario, id: 'temp-id-' + Date.now() }
  };
}

// ROTA: Editar usuário existente
export async function editarUsuario(id: string, usuario: Partial<Usuario>): Promise<{ success: boolean; data?: Usuario; error?: string }> {
  console.log('🔵 Backend - Editar usuário:', { id, usuario });
  
  // TODO: Implementar lógica de atualização no banco de dados
  
  // Retorno simulado de sucesso
  return {
    success: true,
    data: { ...usuario, id } as Usuario
  };
}

// ROTA: Excluir usuário
export async function excluirUsuario(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('🔵 Backend - Excluir usuário com ID:', id);
  
  // TODO: Implementar lógica de exclusão (soft delete) no banco de dados
  
  // Retorno simulado de sucesso
  return {
    success: true
  };
}
