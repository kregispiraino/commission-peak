// ============================================
// 🏠 ROTAS DO BACKEND - HOME/DASHBOARD
// ============================================
// Este arquivo contém todas as rotas para buscar dados da página inicial (Dashboard)
// Cada função está documentada com título e descrição para facilitar a implementação futura

// ============================================
// 📊 TIPOS DE DADOS
// ============================================

export interface DashboardStats {
  totalSales: number;         // Vendas totais do período
  totalSellers: number;        // Número total de vendedores ativos
  averageCommission: number;   // Comissão média dos vendedores
  monthProgress: number;       // Progresso do mês em porcentagem (0-100)
}

export interface Company {
  id: string;
  name: string;
  sales: number;              // Vendas da empresa
  sellers: number;            // Número de vendedores da empresa
  color: string;              // Cor para visualização (hex)
}

export interface Team {
  id: string;
  name: string;
  sales: number;              // Vendas da equipe
  sellers: number;            // Número de vendedores na equipe
}

export interface RankingVendedor {
  id: number;
  name: string;
  sales: number;              // Vendas realizadas
  target: number;             // Meta do vendedor
  avatar?: string;            // URL da foto do vendedor
  position: number;           // Posição no ranking
  commission: number;         // Comissão calculada
  trend: 'up' | 'down' | 'stable'; // Tendência de vendas
}

export interface MonthPrize {
  title: string;              // Nome do prêmio (ex: "iPhone 17 Pro Max")
  description: string;        // Descrição do prêmio
  imageUrl?: string;          // URL da imagem do prêmio
  leadingSellerName: string;  // Nome do vendedor em 1º lugar
  leadingSellerPosition: number; // Posição do vendedor líder
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// 📈 ROTA 1: ESTATÍSTICAS GERAIS DO DASHBOARD
// ============================================
// TÍTULO: Buscar Estatísticas Gerais
// DESCRIÇÃO: Retorna dados gerais do dashboard incluindo:
//            - Vendas totais do período
//            - Total de vendedores ativos
//            - Comissão média
//            - Progresso do mês
// QUANDO USAR: Ao carregar a página inicial do Dashboard
export const buscarEstatisticasGerais = async (): Promise<ApiResponse<DashboardStats>> => {
  console.log('🔵 Backend - 📊 Buscando estatísticas gerais do dashboard');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Calcular vendas totais do período atual
  // - Contar vendedores ativos
  // - Calcular comissão média
  // - Calcular progresso do mês baseado nas metas
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      totalSales: 445000,
      totalSellers: 6,
      averageCommission: 7416,
      monthProgress: 78.5,
    }
  };
};

// ============================================
// 🏢 ROTA 2: LISTAR EMPRESAS (PARA FILTROS)
// ============================================
// TÍTULO: Listar Empresas para Filtro
// DESCRIÇÃO: Retorna lista de todas as empresas com suas vendas e vendedores
//            Usado no filtro de empresas do Dashboard (usuários master)
// QUANDO USAR: Ao carregar filtros do Dashboard (somente para master)
export const listarEmpresasFiltro = async (): Promise<ApiResponse<Company[]>> => {
  console.log('🔵 Backend - 🏢 Listando empresas para filtro');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar todas as empresas ativas
  // - Calcular vendas totais de cada empresa
  // - Contar vendedores de cada empresa
  // - Retornar com cores para visualização
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: [
      { id: 'company1', name: 'TechCorp', sales: 180000, sellers: 3, color: '#3b82f6' },
      { id: 'company2', name: 'InnovaSoft', sales: 165000, sellers: 2, color: '#10b981' },
      { id: 'company3', name: 'DigitalMax', sales: 100000, sellers: 1, color: '#f59e0b' },
    ]
  };
};

// ============================================
// 👥 ROTA 3: LISTAR EQUIPES (PARA FILTROS)
// ============================================
// TÍTULO: Listar Equipes para Filtro
// DESCRIÇÃO: Retorna lista de todas as equipes com suas vendas e vendedores
//            Usado no filtro de equipes do Dashboard
// QUANDO USAR: Ao carregar filtros do Dashboard
export const listarEquipesFiltro = async (): Promise<ApiResponse<Team[]>> => {
  console.log('🔵 Backend - 👥 Listando equipes para filtro');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar todas as equipes ativas
  // - Calcular vendas totais de cada equipe
  // - Contar vendedores de cada equipe
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: [
      { id: 'team1', name: 'Equipe A', sales: 200000, sellers: 3 },
      { id: 'team2', name: 'Equipe B', sales: 150000, sellers: 2 },
      { id: 'team3', name: 'Equipe C', sales: 95000, sellers: 1 },
    ]
  };
};

// ============================================
// 🏆 ROTA 4: BUSCAR RANKING DE VENDEDORES
// ============================================
// TÍTULO: Buscar Ranking de Vendedores
// DESCRIÇÃO: Retorna lista ordenada de vendedores por desempenho incluindo:
//            - Posição no ranking
//            - Vendas realizadas vs meta
//            - Comissão calculada
//            - Tendência (subindo, descendo, estável)
// PARÂMETROS: 
//   - empresaIds: Array de IDs de empresas para filtrar (opcional)
//   - equipeIds: Array de IDs de equipes para filtrar (opcional)
// QUANDO USAR: Ao carregar o componente de Ranking de Vendas
export const buscarRankingVendedores = async (
  empresaIds?: string[], 
  equipeIds?: string[]
): Promise<ApiResponse<RankingVendedor[]>> => {
  console.log('🔵 Backend - 🏆 Buscando ranking de vendedores', { empresaIds, equipeIds });
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar vendedores filtrados por empresa/equipe (se fornecido)
  // - Calcular vendas de cada vendedor no período
  // - Comparar com meta individual
  // - Calcular comissão baseada nas vendas
  // - Determinar tendência comparando com período anterior
  // - Ordenar por vendas (descendente)
  // - Atribuir posições no ranking
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: [
      { id: 1, name: "Ana Silva", sales: 95000, target: 100000, position: 1, commission: 9500, trend: 'up' },
      { id: 2, name: "Carlos Santos", sales: 87000, target: 90000, position: 2, commission: 8700, trend: 'up' },
      { id: 3, name: "Maria Costa", sales: 75000, target: 80000, position: 3, commission: 7500, trend: 'stable' },
      { id: 4, name: "João Oliveira", sales: 68000, target: 75000, position: 4, commission: 6800, trend: 'up' },
      { id: 5, name: "Luiza Ferreira", sales: 62000, target: 70000, position: 5, commission: 6200, trend: 'down' },
      { id: 6, name: "Pedro Almeida", sales: 58000, target: 65000, position: 6, commission: 5800, trend: 'stable' },
    ]
  };
};

// ============================================
// 🎁 ROTA 5: BUSCAR PREMIAÇÃO DO MÊS
// ============================================
// TÍTULO: Buscar Premiação do Mês
// DESCRIÇÃO: Retorna informações sobre a premiação do mês atual incluindo:
//            - Nome do prêmio
//            - Descrição
//            - Imagem do prêmio
//            - Nome do vendedor líder
//            - Posição do vendedor líder
// QUANDO USAR: Ao carregar o card de premiação no Dashboard
export const buscarPremiacaoMes = async (): Promise<ApiResponse<MonthPrize>> => {
  console.log('🔵 Backend - 🎁 Buscando premiação do mês');
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Buscar premiação ativa do mês atual
  // - Buscar vendedor em 1º lugar no ranking
  // - Retornar informações da premiação e do líder
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      title: "iPhone 17 Pro Max",
      description: "Prêmio para o vendedor #1 do mês",
      imageUrl: undefined, // URL será carregada do admin
      leadingSellerName: "Ana Silva",
      leadingSellerPosition: 1,
    }
  };
};

// ============================================
// 📅 ROTA 6: CALCULAR TEMPO RESTANTE DO MÊS
// ============================================
// TÍTULO: Calcular Tempo Restante do Mês
// DESCRIÇÃO: Retorna o tempo restante até o fim do mês atual
//            Usado no countdown timer do Dashboard
// QUANDO USAR: Ao carregar o componente de Countdown Timer
export const calcularTempoRestanteMes = async (): Promise<ApiResponse<{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}>> => {
  console.log('🔵 Backend - 📅 Calculando tempo restante do mês');
  
  // TODO: Implementar lógica para calcular tempo
  // - Obter data/hora atual
  // - Obter último dia do mês às 23:59:59
  // - Calcular diferença em dias, horas, minutos, segundos
  
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const diff = endOfMonth.getTime() - now.getTime();
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return {
    success: true,
    data: { days, hours, minutes, seconds }
  };
};

// ============================================
// 💰 ROTA 7: CALCULAR VENDAS FILTRADAS
// ============================================
// TÍTULO: Calcular Vendas Totais Filtradas
// DESCRIÇÃO: Calcula vendas totais baseado nos filtros selecionados
//            (empresas e equipes específicas)
// PARÂMETROS:
//   - empresaIds: Array de IDs de empresas selecionadas
//   - equipeIds: Array de IDs de equipes selecionadas
// QUANDO USAR: Ao mudar filtros de empresa/equipe no Dashboard
export const calcularVendasFiltradas = async (
  empresaIds: string[], 
  equipeIds: string[]
): Promise<ApiResponse<{
  totalSales: number;
  totalSellers: number;
}>> => {
  console.log('🔵 Backend - 💰 Calculando vendas filtradas', { empresaIds, equipeIds });
  
  // TODO: Implementar lógica para buscar do banco de dados
  // - Filtrar vendedores por empresa e equipe selecionadas
  // - Somar vendas de todos os vendedores filtrados
  // - Contar número de vendedores filtrados
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    data: {
      totalSales: 445000,
      totalSellers: 6,
    }
  };
};

// ============================================
// 👤 ROTA 8: BUSCAR NÍVEL DE ACESSO DO USUÁRIO
// ============================================
// TÍTULO: Buscar Nível de Acesso do Usuário
// DESCRIÇÃO: Retorna o nível de acesso do usuário logado
//            (master, gerente, vendedor)
//            Usado para mostrar/ocultar filtros no Dashboard
// QUANDO USAR: Ao carregar o Dashboard para verificar permissões
export const buscarNivelAcessoUsuario = async (): Promise<ApiResponse<{
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
