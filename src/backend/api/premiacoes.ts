// Backend API - Premiações
// Rotas para integração futura com banco de dados

export interface Premiacao {
  id?: string;
  descricao: string;
  foto_url?: string;
  empresa_id: string;
  equipe_id?: string | null;
  id_ascora?: string;
  ativo?: boolean;
}

// ROTA GET: Listar premiações
export async function listarPremiacoes(idAscora: string): Promise<Premiacao[]> {
  console.log('🔵 Backend - GET Listar premiações para id_ascora:', idAscora);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // TODO: Implementar lógica de busca no banco de dados
  
  return [];
}

// ROTA: Cadastrar nova premiação
export async function cadastrarPremiacao(premiacao: Premiacao): Promise<{ success: boolean; data?: Premiacao; error?: string }> {
  console.log('🔵 Backend - Cadastrar premiação:', premiacao);
  
  // TODO: Implementar lógica de inserção no banco de dados
  // TODO: Implementar upload da foto para storage
  
  return {
    success: true,
    data: { ...premiacao, id: 'temp-id-' + Date.now() }
  };
}

// ROTA: Editar premiação existente
export async function editarPremiacao(id: string, premiacao: Partial<Premiacao>): Promise<{ success: boolean; data?: Premiacao; error?: string }> {
  console.log('🔵 Backend - Editar premiação:', { id, premiacao });
  
  // TODO: Implementar lógica de atualização no banco de dados
  // TODO: Se houver nova foto, fazer upload e atualizar URL
  
  return {
    success: true,
    data: { ...premiacao, id } as Premiacao
  };
}

// ROTA: Excluir premiação
export async function excluirPremiacao(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('🔵 Backend - Excluir premiação com ID:', id);
  
  // TODO: Implementar lógica de exclusão (soft delete) no banco de dados
  // TODO: Remover foto do storage se necessário
  
  return {
    success: true
  };
}

// ROTA: Upload de foto da premiação
export async function uploadFotoPremiacao(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  console.log('🔵 Backend - Upload de foto da premiação:', file.name);
  
  // TODO: Implementar lógica de upload para storage (Supabase Storage)
  // Por enquanto, retorna uma URL simulada
  
  return {
    success: true,
    url: `https://placeholder.co/400x300?text=${encodeURIComponent(file.name)}`
  };
}
