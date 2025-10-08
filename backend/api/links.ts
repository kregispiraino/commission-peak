// Backend API - Links
// Rotas para integração futura com banco de dados

export interface Link {
  id?: string;
  titulo: string;
  url: string;
  descricao?: string;
  categoria?: string;
  vendedor_id?: string;
  empresa_id?: string;
  equipe_id?: string;
  id_ascora?: string;
  ativo?: boolean;
}

// ROTA: Listar links
export async function listarLinks(idAscora: string): Promise<Link[]> {
  console.log('🔵 Backend - Listar links para id_ascora:', idAscora);
  
  // TODO: Implementar lógica de busca no banco de dados
  
  return [];
}

// ROTA: Cadastrar novo link
export async function cadastrarLink(link: Link): Promise<{ success: boolean; data?: Link; error?: string }> {
  console.log('🔵 Backend - Cadastrar link:', link);
  
  // TODO: Implementar lógica de inserção no banco de dados
  
  return {
    success: true,
    data: { ...link, id: 'temp-id-' + Date.now() }
  };
}

// ROTA: Editar link existente
export async function editarLink(id: string, link: Partial<Link>): Promise<{ success: boolean; data?: Link; error?: string }> {
  console.log('🔵 Backend - Editar link:', { id, link });
  
  // TODO: Implementar lógica de atualização no banco de dados
  
  return {
    success: true,
    data: { ...link, id } as Link
  };
}

// ROTA: Excluir link
export async function excluirLink(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('🔵 Backend - Excluir link com ID:', id);
  
  // TODO: Implementar lógica de exclusão (soft delete) no banco de dados
  
  return {
    success: true
  };
}
