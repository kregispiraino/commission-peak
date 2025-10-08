import { CountdownTimer } from './CountdownTimer';
import { SalesRanking } from './SalesRanking';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { TrendingUp, Users, Target, DollarSign, BarChart3, Building2, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  buscarEstatisticasGerais,
  listarEmpresasFiltro,
  listarEquipesFiltro,
  buscarNivelAcessoUsuario,
  calcularVendasFiltradas,
  type DashboardStats,
  type Company,
  type Team,
} from '@/backend/api/home';

export function Dashboard() {
  const { toast } = useToast();
  
  // Estados para dados do backend
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [userRole, setUserRole] = useState<'master' | 'gerente' | 'vendedor'>('vendedor');
  const [loading, setLoading] = useState(true);
  
  // Estados para filtros
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  
  // Estados para dados filtrados
  const [filteredSales, setFilteredSales] = useState({ totalSales: 0, totalSellers: 0 });

  // Carregar dados iniciais
  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  // Recalcular vendas quando filtros mudarem
  useEffect(() => {
    if (selectedCompanies.length > 0 || selectedTeams.length > 0) {
      atualizarVendasFiltradas();
    }
  }, [selectedCompanies, selectedTeams]);

  const carregarDadosIniciais = async () => {
    console.log('🔵 Frontend - Carregando dados iniciais do Dashboard');
    setLoading(true);
    
    try {
      // Buscar dados em paralelo
      const [statsRes, empresasRes, equipesRes, roleRes] = await Promise.all([
        buscarEstatisticasGerais(),
        listarEmpresasFiltro(),
        listarEquipesFiltro(),
        buscarNivelAcessoUsuario(),
      ]);

      if (statsRes.success && statsRes.data) {
        setDashboardStats(statsRes.data);
      }

      if (empresasRes.success && empresasRes.data) {
        setCompaniesData(empresasRes.data);
        setSelectedCompanies(empresasRes.data.map(c => c.id));
      }

      if (equipesRes.success && equipesRes.data) {
        setTeamsData(equipesRes.data);
        setSelectedTeams(equipesRes.data.map(t => t.id));
      }

      if (roleRes.success && roleRes.data) {
        setUserRole(roleRes.data.role);
      }

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do dashboard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const atualizarVendasFiltradas = async () => {
    console.log('🔵 Frontend - Atualizando vendas filtradas');
    
    try {
      const response = await calcularVendasFiltradas(selectedCompanies, selectedTeams);
      
      if (response.success && response.data) {
        setFilteredSales(response.data);
      }
    } catch (error) {
      console.error('Erro ao calcular vendas filtradas:', error);
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Calcular dados filtrados baseado nas empresas e equipes selecionadas
  const filteredCompaniesData = companiesData.filter(c => selectedCompanies.includes(c.id));
  const filteredTeamsData = teamsData.filter(t => selectedTeams.includes(t.id));
  
  const totalFilteredSales = filteredSales.totalSales;
  const totalFilteredSellers = filteredSales.totalSellers;

  const toggleCompany = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const toggleTeam = (teamId: string) => {
    setSelectedTeams(prev => 
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const selectAllCompanies = () => {
    setSelectedCompanies(companiesData.map(c => c.id));
  };

  const selectAllTeams = () => {
    setSelectedTeams(teamsData.map(t => t.id));
  };

  const StatsCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    subtitle 
  }: { 
    title: string; 
    value: string; 
    icon: any; 
    trend?: string; 
    subtitle?: string;
  }) => (
    <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">{trend}</span>
              <span className="text-sm text-muted-foreground">vs mês anterior</span>
            </div>
          )}
        </div>
        <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow flex-shrink-0 ml-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-backdrop">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard de Vendas
          </h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho da sua equipe em tempo real
          </p>
        </div>

        {/* Filters for master users */}
        {userRole === 'master' && (
          <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Filtros
              </h2>
              
              <div className="flex items-center gap-4 flex-wrap">
                {/* Company filter */}
                <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-64 justify-between">
                    {selectedCompanies.length === companiesData.length
                      ? 'Todas as Empresas'
                      : selectedCompanies.length === 1
                      ? companiesData.find(c => c.id === selectedCompanies[0])?.name
                      : `${selectedCompanies.length} empresas selecionadas`}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="start">
                  <div className="p-3 border-b">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={selectAllCompanies}
                      className="w-full justify-start"
                    >
                      Todas as Empresas
                    </Button>
                  </div>
                  <div className="p-3 space-y-2">
                    {companiesData.map((company) => (
                      <div key={company.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={company.id}
                          checked={selectedCompanies.includes(company.id)}
                          onCheckedChange={() => toggleCompany(company.id)}
                        />
                        <label
                          htmlFor={company.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {company.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Team filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-64 justify-between">
                    {selectedTeams.length === teamsData.length
                      ? 'Todas as Equipes'
                      : selectedTeams.length === 1
                      ? teamsData.find(t => t.id === selectedTeams[0])?.name
                      : `${selectedTeams.length} equipes selecionadas`}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="start">
                  <div className="p-3 border-b">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={selectAllTeams}
                      className="w-full justify-start"
                    >
                      Todas as Equipes
                    </Button>
                  </div>
                  <div className="p-3 space-y-2">
                    {teamsData.map((team) => (
                      <div key={team.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={team.id}
                          checked={selectedTeams.includes(team.id)}
                          onCheckedChange={() => toggleTeam(team.id)}
                        />
                        <label
                          htmlFor={team.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {team.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              </div>
            </div>
            
            {/* Chart visualization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Vendas por Empresa</h3>
              <div className="space-y-4">
                {filteredCompaniesData.map((company) => {
                  const percentage = totalFilteredSales > 0 ? (company.sales / totalFilteredSales) * 100 : 0;
                  
                  return (
                    <div key={company.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full shadow-sm" 
                            style={{ backgroundColor: company.color }}
                          />
                          <span className="font-semibold text-foreground">{company.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-muted-foreground">
                            {percentage.toFixed(1)}%
                          </span>
                          <span className="font-bold text-success min-w-[120px] text-right">
                            {formatCurrency(company.sales)}
                          </span>
                        </div>
                      </div>
                      <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full rounded-full transition-all duration-500 shadow-sm"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: company.color 
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Stats Cards */}
        {loading ? (
          <div className="text-center text-muted-foreground">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatsCard
              title="Vendas Totais"
              value={formatCurrency(totalFilteredSales)}
              icon={DollarSign}
              trend="+12.5%"
            />
            <StatsCard
              title="Progresso"
              value={dashboardStats ? `${dashboardStats.monthProgress}%` : '0%'}
              icon={TrendingUp}
              trend="+8.3%"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Ranking - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SalesRanking />
          </div>
          
          {/* Countdown Timer - Takes 1 column */}
          <div className="space-y-6">
            <CountdownTimer />
            
            {/* Prize card */}
            <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-warning rounded-full flex items-center justify-center mx-auto shadow-glow">
                  {/* Prize image will be uploaded by admin */}
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Premiação do Mês</h3>
                  <p className="text-lg font-bold text-primary mb-2">
                    iPhone 17 Pro Max
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <span className="font-medium text-foreground">Ana Silva</span> está liderando e próxima do prêmio!
                  </p>
                  <Badge className="bg-warning/10 text-warning border-warning/20">
                    🏆 1º Lugar
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}