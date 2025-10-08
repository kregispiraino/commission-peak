// ============================================
// API DE LANÇAMENTOS (VENDAS PENDENTES)
// ============================================
// Este arquivo contém as rotas simuladas para gerenciar lançamentos de vendas
// TODO: Implementar lógica real de conexão com banco de dados

export interface Lancamento {
  id: string;
  vendedor: string;
  cliente: string;
  produto: string;
  valor: number;
  pedido: string;
  data: string;
  status: 'pendente' | 'aprovado' | 'negado';
  id_ascora?: string;
  created_at?: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// LISTAR LANÇAMENTOS PENDENTES
// ============================================
export const listarLancamentosPendentes = async (idAscora: string): Promise<Lancamento[]> => {
  console.log('📋 [API] Listando lançamentos pendentes para id_ascora:', idAscora);
  
  // TODO: Substituir por chamada real ao banco de dados
  // Exemplo: const response = await fetch(`/api/lancamentos/pendentes?id_ascora=${idAscora}`);
  
  // Mock data temporário
  return [
    { 
      id: '1', 
      vendedor: 'Ana Silva', 
      cliente: 'Tech Corp',
      produto: 'Software License',
      valor: 8500, 
      pedido: 'PED-2024-001',
      data: '2024-01-15',
      status: 'pendente'
    },
    { 
      id: '2', 
      vendedor: 'João Oliveira', 
      cliente: 'Digital Solutions',
      produto: 'Consultoria',
      valor: 3200, 
      pedido: 'PED-2024-002',
      data: '2024-01-15',
      status: 'pendente'
    },
    { 
      id: '3', 
      vendedor: 'Luiza Ferreira', 
      cliente: 'InnovaWeb',
      produto: 'Desenvolvimento Web',
      valor: 12800, 
      pedido: 'PED-2024-003',
      data: '2024-01-14',
      status: 'pendente'
    },
  ];
};

// ============================================
// CADASTRAR LANÇAMENTO (REGISTRAR VENDA)
// ============================================
export const cadastrarLancamento = async (lancamento: Omit<Lancamento, 'id' | 'status'>): Promise<ApiResponse> => {
  console.log('➕ [API] Cadastrando novo lançamento:', lancamento);
  
  // TODO: Implementar lógica de validação
  // TODO: Implementar conexão com banco de dados
  // Exemplo: 
  // const response = await fetch('/api/lancamentos', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(lancamento)
  // });
  
  // Simular resposta de sucesso
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: { id: Date.now().toString(), ...lancamento, status: 'pendente' }
  };
};

// ============================================
// APROVAR LANÇAMENTO INDIVIDUAL
// ============================================
export const aprovarLancamento = async (id: string): Promise<ApiResponse> => {
  console.log('✅ [API] Aprovando lançamento:', id);
  
  // TODO: Implementar conexão com banco de dados
  // Exemplo:
  // const response = await fetch(`/api/lancamentos/${id}/aprovar`, {
  //   method: 'PUT'
  // });
  
  // Simular resposta de sucesso
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: { id, status: 'aprovado' }
  };
};

// ============================================
// NEGAR LANÇAMENTO INDIVIDUAL
// ============================================
export const negarLancamento = async (id: string): Promise<ApiResponse> => {
  console.log('❌ [API] Negando lançamento:', id);
  
  // TODO: Implementar conexão com banco de dados
  // Exemplo:
  // const response = await fetch(`/api/lancamentos/${id}/negar`, {
  //   method: 'PUT'
  // });
  
  // Simular resposta de sucesso
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: { id, status: 'negado' }
  };
};

// ============================================
// APROVAR TODOS OS LANÇAMENTOS PENDENTES
// ============================================
export const aprovarTodosLancamentos = async (idAscora: string): Promise<ApiResponse> => {
  console.log('✅✅ [API] Aprovando todos os lançamentos para id_ascora:', idAscora);
  
  // TODO: Implementar conexão com banco de dados
  // Exemplo:
  // const response = await fetch(`/api/lancamentos/aprovar-todos`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ id_ascora: idAscora })
  // });
  
  // Simular resposta de sucesso
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    data: { message: 'Todos os lançamentos foram aprovados' }
  };
};

// ============================================
// NEGAR TODOS OS LANÇAMENTOS PENDENTES
// ============================================
export const negarTodosLancamentos = async (idAscora: string): Promise<ApiResponse> => {
  console.log('❌❌ [API] Negando todos os lançamentos para id_ascora:', idAscora);
  
  // TODO: Implementar conexão com banco de dados
  // Exemplo:
  // const response = await fetch(`/api/lancamentos/negar-todos`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ id_ascora: idAscora })
  // });
  
  // Simular resposta de sucesso
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    data: { message: 'Todos os lançamentos foram negados' }
  };
};
