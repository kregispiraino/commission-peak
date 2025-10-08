// ============================================
// 💰 ROTAS DO BACKEND - DASHBOARD DE COMISSÕES
// ============================================
// Este arquivo contém todas as rotas para buscar dados da página de Comissões
// Separado do cadastro de comissões para evitar confusão
// Cada função está documentada com título e descrição para facilitar a implementação futura

// ============================================
// 📊 TIPOS DE DADOS
// ============================================

export interface VendasHoje {
  total: number;           // Total de vendas do dia
  quantidade: number;      // Número de vendas realizadas
  ticketMedio: number;     // Valor médio por venda
}

export interface ComissaoResumo {
  comissao: number;        // Valor da comissão
  vendasTotais: number;    // Total de vendas
  percentual: number;      // Percentual de comissão (ex: 5%)
}

export interface RankingInfo {
  posicao: number;         // Posição do vendedor no ranking
  totalVendedores: number; // Total de vendedores na competição
}

export interface EmpresaComissao {
  id: string;
  name: string;
  commission: number;      // Comissão da empresa
  sales: number;           // Vendas da empresa
}

export interface EquipeComissao {
  id: string;
  name: string;
  commission: number;      // Comissão da equipe
  sales: number;           // Vendas da equipe
}

export interface HistoricoMes {
  month: string;           // Nome do mês (ex: "Abril")
  commission: number;      // Comissão do mês
  sales: number;           // Vendas do mês
}

export interface DetalheVenda {
  id: string;
  description: string;     // Descrição da venda
  value: number;           // Valor da comissão desta venda
  date: string;            // Data da venda (formato ISO)
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// 📅 ROTA 1: BUSCAR VENDAS DE HOJE
// ============================================
// TÍTULO: Buscar Vendas do Dia Atual
// DESCRIÇÃO: Retorna estatísticas das vendas realizadas hoje incluindo:
//            - Total vendido no dia
//            - Quantidade de vendas
//            - Ticket médio (valor médio por venda)
// QUANDO USAR: Ao carregar o card "Vendas Hoje" no Dashboard de Comissões
export const buscarVendasHoje = async (): Promise<ApiResponse<VendasHoje>> => {
  console.log('🔵 Backend - 📅 Buscando vendas de hoje');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar todas as vendas do dia atual (data = hoje)
  // - Somar valores totais das vendas
  // - Contar número de vendas
  // - Calcular ticket médio (total / quantidade)
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      total: 28500,
      quantidade: 12,
      ticketMedio: 2375,
    }
  };
};

// ============================================
// 💵 ROTA 2: BUSCAR RESUMO DE COMISSÃO
// ============================================
// TÍTULO: Buscar Resumo de Comissão do Período
// DESCRIÇÃO: Retorna o resumo da comissão do vendedor no período filtrado:
//            - Valor total da comissão
//            - Total de vendas realizadas
//            - Percentual de comissão aplicado
// PARÂMETROS:
//   - empresaIds: Array de IDs de empresas para filtrar (opcional)
//   - equipeIds: Array de IDs de equipes para filtrar (opcional)
// QUANDO USAR: Ao carregar o card de "Comissão" no Dashboard
export const buscarResumoComissao = async (
  empresaIds?: string[],
  equipeIds?: string[]
): Promise<ApiResponse<ComissaoResumo>> => {
  console.log('🔵 Backend - 💵 Buscando resumo de comissão', { empresaIds, equipeIds });
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Filtrar vendas por empresas/equipes selecionadas
  // - Buscar percentual de comissão do vendedor
  // - Calcular comissão total baseado nas vendas
  // - Somar vendas totais do período
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      comissao: 25250,
      vendasTotais: 505000,
      percentual: 5,
    }
  };
};

// ============================================
// 🏆 ROTA 3: BUSCAR POSIÇÃO NO RANKING
// ============================================
// TÍTULO: Buscar Posição no Ranking de Comissões
// DESCRIÇÃO: Retorna a posição do vendedor no ranking de comissões:
//            - Posição atual do vendedor
//            - Total de vendedores no ranking
// QUANDO USAR: Ao carregar o card de "Ranking" no Dashboard
export const buscarPosicaoRanking = async (): Promise<ApiResponse<RankingInfo>> => {
  console.log('🔵 Backend - 🏆 Buscando posição no ranking');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar vendedor logado
  // - Calcular ranking baseado em comissões ou vendas
  // - Contar total de vendedores ativos
  // - Determinar posição do vendedor
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      posicao: 2,
      totalVendedores: 20,
    }
  };
};

// ============================================
// 🏢 ROTA 4: LISTAR EMPRESAS COM COMISSÕES
// ============================================
// TÍTULO: Listar Empresas com Dados de Comissão
// DESCRIÇÃO: Retorna lista de empresas com suas comissões e vendas
//            Usado no filtro de empresas e no card de comissões por empresa
// QUANDO USAR: Ao carregar filtros do Dashboard de Comissões (usuários master)
export const listarEmpresasComissoes = async (): Promise<ApiResponse<EmpresaComissao[]>> => {
  console.log('🔵 Backend - 🏢 Listando empresas com comissões');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar todas as empresas ativas
  // - Calcular comissão total de cada empresa no período
  // - Calcular vendas totais de cada empresa
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: [
      { id: 'company1', name: 'TechCorp', commission: 12000, sales: 240000 },
      { id: 'company2', name: 'InnovaSoft', commission: 8250, sales: 165000 },
      { id: 'company3', name: 'DigitalMax', commission: 5000, sales: 100000 },
    ]
  };
};

// ============================================
// 👥 ROTA 5: LISTAR EQUIPES COM COMISSÕES
// ============================================
// TÍTULO: Listar Equipes com Dados de Comissão
// DESCRIÇÃO: Retorna lista de equipes com suas comissões e vendas
//            Usado no filtro de equipes do Dashboard
// QUANDO USAR: Ao carregar filtros do Dashboard de Comissões
export const listarEquipesComissoes = async (): Promise<ApiResponse<EquipeComissao[]>> => {
  console.log('🔵 Backend - 👥 Listando equipes com comissões');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar todas as equipes ativas
  // - Calcular comissão total de cada equipe no período
  // - Calcular vendas totais de cada equipe
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: [
      { id: 'team1', name: 'Equipe A', commission: 10000, sales: 200000 },
      { id: 'team2', name: 'Equipe B', commission: 7500, sales: 150000 },
      { id: 'team3', name: 'Equipe C', commission: 4750, sales: 95000 },
    ]
  };
};

// ============================================
// 📊 ROTA 6: BUSCAR HISTÓRICO DE COMISSÕES
// ============================================
// TÍTULO: Buscar Histórico de Comissões (Últimos 3 Meses)
// DESCRIÇÃO: Retorna o histórico das comissões dos últimos 3 meses incluindo:
//            - Nome do mês
//            - Valor da comissão do mês
//            - Total de vendas do mês
// QUANDO USAR: Ao carregar o card "Histórico de Comissões"
export const buscarHistoricoComissoes = async (): Promise<ApiResponse<HistoricoMes[]>> => {
  console.log('🔵 Backend - 📊 Buscando histórico de comissões');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Obter os últimos 3 meses completos
  // - Para cada mês, buscar:
  //   * Total de comissões do vendedor
  //   * Total de vendas do mês
  // - Ordenar do mais recente para o mais antigo
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: [
      { month: 'Abril', commission: 22500, sales: 450000 },
      { month: 'Março', commission: 19800, sales: 396000 },
      { month: 'Fevereiro', commission: 21200, sales: 424000 },
    ]
  };
};

// ============================================
// 📋 ROTA 7: BUSCAR DETALHES DE VENDAS POR MÊS
// ============================================
// TÍTULO: Buscar Detalhes das Vendas de um Mês Específico
// DESCRIÇÃO: Retorna lista detalhada de todas as vendas de um mês incluindo:
//            - Descrição da venda
//            - Valor da comissão
//            - Data da venda
// PARÂMETROS:
//   - mes: Nome do mês (ex: "Abril", "Março")
// QUANDO USAR: Ao expandir um mês no histórico de comissões
export const buscarDetalhesVendasMes = async (
  mes: string
): Promise<ApiResponse<DetalheVenda[]>> => {
  console.log('🔵 Backend - 📋 Buscando detalhes de vendas do mês:', mes);
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Identificar o mês/ano solicitado
  // - Buscar todas as vendas do vendedor naquele mês
  // - Para cada venda, retornar:
  //   * Descrição da venda (produto/serviço + cliente)
  //   * Valor da comissão calculada
  //   * Data da venda
  // - Ordenar por data (mais recente primeiro)
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data baseado no mês
  const mockData: Record<string, DetalheVenda[]> = {
    'Abril': [
      { id: '1', description: 'Venda Sistema CRM - Empresa ABC', value: 8500, date: '2024-04-28' },
      { id: '2', description: 'Licenças Software - Tech Solutions', value: 6200, date: '2024-04-25' },
      { id: '3', description: 'Consultoria ERP - InnovaCorp', value: 4500, date: '2024-04-22' },
      { id: '4', description: 'Manutenção Anual - Digital Plus', value: 3300, date: '2024-04-15' },
    ],
    'Março': [
      { id: '5', description: 'Venda Sistema ERP - MegaCorp', value: 7800, date: '2024-03-30' },
      { id: '6', description: 'Licenças Office - StartupXYZ', value: 5500, date: '2024-03-28' },
      { id: '7', description: 'Consultoria BI - DataTech', value: 3900, date: '2024-03-20' },
      { id: '8', description: 'Suporte Premium - CloudSys', value: 2600, date: '2024-03-12' },
    ],
    'Fevereiro': [
      { id: '9', description: 'Venda Plataforma E-commerce', value: 9200, date: '2024-02-28' },
      { id: '10', description: 'Licenças Antivírus - SecureIT', value: 6000, date: '2024-02-25' },
      { id: '11', description: 'Implantação Sistema - LogisCorp', value: 4100, date: '2024-02-18' },
      { id: '12', description: 'Treinamento Equipe - DevTeam', value: 2900, date: '2024-02-10' },
    ],
  };
  
  return {
    success: true,
    data: mockData[mes] || []
  };
};

// ============================================
// 💰 ROTA 8: CALCULAR TOTAL DO TRIMESTRE
// ============================================
// TÍTULO: Calcular Total de Comissões do Trimestre
// DESCRIÇÃO: Calcula o valor total de comissões dos últimos 3 meses
// QUANDO USAR: Ao exibir o card de "Total do Trimestre"
export const calcularTotalTrimestre = async (): Promise<ApiResponse<{
  total: number;
  meses: string[];
}>> => {
  console.log('🔵 Backend - 💰 Calculando total do trimestre');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar comissões dos últimos 3 meses completos
  // - Somar todas as comissões do período
  // - Retornar nomes dos meses incluídos
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      total: 63500, // 22500 + 19800 + 21200
      meses: ['Fevereiro', 'Março', 'Abril']
    }
  };
};

// ============================================
// 🔄 ROTA 9: CALCULAR COMISSÕES FILTRADAS
// ============================================
// TÍTULO: Calcular Comissões com Filtros Aplicados
// DESCRIÇÃO: Calcula comissões baseado nos filtros de empresas e equipes selecionados
// PARÂMETROS:
//   - empresaIds: Array de IDs de empresas selecionadas
//   - equipeIds: Array de IDs de equipes selecionadas
// QUANDO USAR: Ao mudar filtros de empresa/equipe no Dashboard
export const calcularComissoesFiltradas = async (
  empresaIds: string[],
  equipeIds: string[]
): Promise<ApiResponse<{
  comissaoTotal: number;
  vendasTotais: number;
}>> => {
  console.log('🔵 Backend - 🔄 Calculando comissões filtradas', { empresaIds, equipeIds });
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Filtrar vendedores por empresa e equipe selecionadas
  // - Buscar vendas desses vendedores no período
  // - Calcular comissões totais
  // - Somar vendas totais
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      comissaoTotal: 25250,
      vendasTotais: 505000,
    }
  };
};

// ============================================
// 👤 ROTA 10: BUSCAR NÍVEL DE ACESSO DO USUÁRIO
// ============================================
// TÍTULO: Buscar Nível de Acesso para Filtros
// DESCRIÇÃO: Retorna o nível de acesso do usuário logado
//            (master, gerente, vendedor)
//            Usado para mostrar/ocultar filtros no Dashboard de Comissões
// QUANDO USAR: Ao carregar o Dashboard para verificar permissões
export const buscarNivelAcessoComissoes = async (): Promise<ApiResponse<{
  role: 'master' | 'gerente' | 'vendedor';
}>> => {
  console.log('🔵 Backend - 👤 Buscando nível de acesso do usuário');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar usuário logado
  // - Retornar seu nível de acesso (campo 'acesso' na tabela profiles)
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      role: 'master'
    }
  };
};
