// Backend API - Metas
// Rotas para integração futura com banco de dados

export interface Meta {
  id?: string;
  titulo: string;
  descricao?: string;
  tipo: string;
  valor_alvo: number;
  data_inicio?: string;
  data_fim?: string;
  empresa_id?: string | null;
  equipe_id?: string | null;
  id_ascora?: string;
  ativo?: boolean;
}

// ROTA: Listar metas
export async function listarMetas(idAscora: string): Promise<Meta[]> {
  console.log('🔵 Backend - Listar metas para id_ascora:', idAscora);
  
  // TODO: Implementar lógica de busca no banco de dados
  
  return [];
}

// ROTA: Cadastrar nova meta
export async function cadastrarMeta(meta: Meta): Promise<{ success: boolean; data?: Meta; error?: string }> {
  console.log('🔵 Backend - Cadastrar meta:', meta);
  
  // TODO: Implementar lógica de inserção no banco de dados
  
  return {
    success: true,
    data: { ...meta, id: 'temp-id-' + Date.now() }
  };
}

// ROTA: Editar meta existente
export async function editarMeta(id: string, meta: Partial<Meta>): Promise<{ success: boolean; data?: Meta; error?: string }> {
  console.log('🔵 Backend - Editar meta:', { id, meta });
  
  // TODO: Implementar lógica de atualização no banco de dados
  
  return {
    success: true,
    data: { ...meta, id } as Meta
  };
}

// ROTA: Excluir meta
export async function excluirMeta(id: string): Promise<{ success: boolean; error?: string }> {
  console.log('🔵 Backend - Excluir meta com ID:', id);
  
  // TODO: Implementar lógica de exclusão no banco de dados
  
  return {
    success: true
  };
}
