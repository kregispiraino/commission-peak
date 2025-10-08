// Backend API - Clientes
// Rotas para integração futura com banco de dados

export interface Cliente {
  id?: string;
  empresa_id: string;
  nome: string;
  email?: string;
  telefone?: string;
  cpf_cnpj?: string;
  id_ascora?: string;
  ativo?: boolean;
}

// ROTA GET: Listar clientes
export async function listarClientes(idAscora: string): Promise<Cliente[]> {
  console.log('🔵 Backend - GET Listar clientes para id_ascora:', idAscora);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // TODO: Implementar lógica de busca no banco de dados
  
  return [];
}

// ROTA: Cadastrar novo cliente
export async function cadastrarCliente(cliente: Cliente): Promise<{ success: boolean; data?: Cliente; error?: string }> {
  console.log('🔵 Backend - Cadastrar cliente:', cliente);
  
  // TODO: Implementar lógica de inserção no banco de dados
  
  return {
    success: true,
    data: { ...cliente, id: 'temp-id-' + Date.now() }
  };
}

// ROTA: Editar cliente existente
export async function editarCliente(id: string, cliente: Partial<Cliente>): Promise<{ success: boolean; data?: Cliente; error?: string }> {
  console.log('🔵 Backend - Editar cliente:', { id, cliente });
  
  // TODO: Implementar lógica de atualização no banco de dados
  
  return {
    success: true,
    data: { ...cliente, id } as Cliente
  };
}

// ROTA: Excluir cliente
export async function excluirCliente(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('🔵 Backend - Excluir cliente com ID:', id);
  
  // TODO: Implementar lógica de exclusão (soft delete) no banco de dados
  
  return {
    success: true
  };
}
