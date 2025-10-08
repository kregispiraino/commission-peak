// Backend API - Produtos
// Rotas para integração futura com banco de dados

export interface Produto {
  id?: string;
  empresa_id: string;
  nome: string;
  descricao?: string;
  codigo?: string;
  preco?: number | null;
  id_ascora?: string;
  ativo?: boolean;
}

// ROTA GET: Listar produtos
export async function listarProdutos(idAscora: string): Promise<Produto[]> {
  console.log('🔵 Backend - GET Listar produtos para id_ascora:', idAscora);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // TODO: Implementar lógica de busca no banco de dados
  
  return [];
}

// ROTA: Cadastrar novo produto
export async function cadastrarProduto(produto: Produto): Promise<{ success: boolean; data?: Produto; error?: string }> {
  console.log('🔵 Backend - Cadastrar produto:', produto);
  
  // TODO: Implementar lógica de inserção no banco de dados
  
  return {
    success: true,
    data: { ...produto, id: 'temp-id-' + Date.now() }
  };
}

// ROTA: Editar produto existente
export async function editarProduto(id: string, produto: Partial<Produto>): Promise<{ success: boolean; data?: Produto; error?: string }> {
  console.log('🔵 Backend - Editar produto:', { id, produto });
  
  // TODO: Implementar lógica de atualização no banco de dados
  
  return {
    success: true,
    data: { ...produto, id } as Produto
  };
}

// ROTA: Excluir produto
export async function excluirProduto(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('🔵 Backend - Excluir produto com ID:', id);
  
  // TODO: Implementar lógica de exclusão (soft delete) no banco de dados
  
  return {
    success: true
  };
}
