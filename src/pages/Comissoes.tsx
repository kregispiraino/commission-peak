import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Target, Trophy, Users, Award, Building2, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  buscarVendasHoje,
  buscarResumoComissao,
  buscarPosicaoRanking,
  listarEmpresasComissoes,
  listarEquipesComissoes,
  buscarHistoricoComissoes,
  buscarDetalhesVendasMes,
  calcularTotalTrimestre,
  calcularComissoesFiltradas,
  buscarNivelAcessoComissoes,
  type VendasHoje,
  type ComissaoResumo,
  type RankingInfo,
  type EmpresaComissao,
  type EquipeComissao,
  type HistoricoMes,
  type DetalheVenda,
} from '@/backend/api/dashboard_comissoes';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export default function Comissoes() {
  const { toast } = useToast();
  
  // Estados para dados do backend
  const [vendasHoje, setVendasHoje] = useState<VendasHoje | null>(null);
  const [resumoComissao, setResumoComissao] = useState<ComissaoResumo | null>(null);
  const [rankingInfo, setRankingInfo] = useState<RankingInfo | null>(null);
  const [companiesData, setCompaniesData] = useState<EmpresaComissao[]>([]);
  const [teamsData, setTeamsData] = useState<EquipeComissao[]>([]);
  const [historicoComissoes, setHistoricoComissoes] = useState<HistoricoMes[]>([]);
  const [totalTrimestre, setTotalTrimestre] = useState<number>(0);
  const [userRole, setUserRole] = useState<'master' | 'gerente' | 'vendedor'>('vendedor');
  const [loading, setLoading] = useState(true);
  
  // Estados para filtros
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  
  // Estados para detalhes de vendas por mês
  const [salesDetailsByMonth, setSalesDetailsByMonth] = useState<Record<string, DetalheVenda[]>>({});

  // Carregar dados iniciais
  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  // Recalcular comissões quando filtros mudarem
  useEffect(() => {
    if (selectedCompanies.length > 0 || selectedTeams.length > 0) {
      atualizarComissoesFiltradas();
    }
  }, [selectedCompanies, selectedTeams]);

  // Carregar detalhes do mês quando expandido
  useEffect(() => {
    if (expandedMonth && !salesDetailsByMonth[expandedMonth]) {
      carregarDetalhesVendasMes(expandedMonth);
    }
  }, [expandedMonth]);
  
  const carregarDadosIniciais = async () => {
    console.log('🔵 Frontend - Carregando dados iniciais do Dashboard de Comissões');
    setLoading(true);
    
    try {
      // Buscar dados em paralelo
      const [vendasRes, comissaoRes, rankingRes, empresasRes, equipesRes, historicoRes, trimestreRes, roleRes] = await Promise.all([
        buscarVendasHoje(),
        buscarResumoComissao(),
        buscarPosicaoRanking(),
        listarEmpresasComissoes(),
        listarEquipesComissoes(),
        buscarHistoricoComissoes(),
        calcularTotalTrimestre(),
        buscarNivelAcessoComissoes(),
      ]);

      if (vendasRes.success && vendasRes.data) {
        setVendasHoje(vendasRes.data);
      }

      if (comissaoRes.success && comissaoRes.data) {
        setResumoComissao(comissaoRes.data);
      }

      if (rankingRes.success && rankingRes.data) {
        setRankingInfo(rankingRes.data);
      }

      if (empresasRes.success && empresasRes.data) {
        setCompaniesData(empresasRes.data);
        setSelectedCompanies(empresasRes.data.map(c => c.id));
      }

      if (equipesRes.success && equipesRes.data) {
        setTeamsData(equipesRes.data);
        setSelectedTeams(equipesRes.data.map(t => t.id));
      }

      if (historicoRes.success && historicoRes.data) {
        setHistoricoComissoes(historicoRes.data);
      }

      if (trimestreRes.success && trimestreRes.data) {
        setTotalTrimestre(trimestreRes.data.total);
      }

      if (roleRes.success && roleRes.data) {
        setUserRole(roleRes.data.role);
      }

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard de comissões:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados de comissões.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const atualizarComissoesFiltradas = async () => {
    console.log('🔵 Frontend - Atualizando comissões filtradas');
    
    try {
      const response = await calcularComissoesFiltradas(selectedCompanies, selectedTeams);
      
      if (response.success && response.data) {
        setResumoComissao(prev => prev ? {
          ...prev,
          comissao: response.data!.comissaoTotal,
          vendasTotais: response.data!.vendasTotais,
        } : null);
      }
    } catch (error) {
      console.error('Erro ao calcular comissões filtradas:', error);
    }
  };

  const carregarDetalhesVendasMes = async (mes: string) => {
    console.log('🔵 Frontend - Carregando detalhes de vendas do mês:', mes);
    
    try {
      const response = await buscarDetalhesVendasMes(mes);
      
      if (response.success && response.data) {
        setSalesDetailsByMonth(prev => ({
          ...prev,
          [mes]: response.data!
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes de vendas:', error);
      toast({
        title: "Erro ao carregar detalhes",
        description: "Não foi possível carregar os detalhes das vendas.",
        variant: "destructive",
      });
    }
  };
  
  // Calcular dados filtrados
  const filteredCompaniesData = companiesData.filter(c => selectedCompanies.includes(c.id));
  const filteredTeamsData = teamsData.filter(t => selectedTeams.includes(t.id));

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

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Comissões</h1>
        <p className="text-muted-foreground">
          Acompanhe suas comissões e resultados de vendas
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
          
          {/* Comissões por Empresa */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Comissões por Empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredCompaniesData.map((company) => (
                <div key={company.id} className="p-4 bg-card rounded-lg border border-border space-y-2">
                  <p className="font-semibold text-foreground">{company.name}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Comissão:</span>
                      <span className="font-bold text-success">{formatCurrency(company.commission)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Vendas:</span>
                      <span className="font-medium text-foreground">{formatCurrency(company.sales)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Vendas Hoje */}
      {loading ? (
        <div className="text-center text-muted-foreground">Carregando...</div>
      ) : (
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Vendas Hoje</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {vendasHoje ? formatCurrency(vendasHoje.total) : 'R$ 0'}
              </p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
              <p className="text-2xl font-bold text-foreground">
                {vendasHoje?.quantidade || 0}
              </p>
              <p className="text-sm text-muted-foreground">Vendas</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold text-foreground">
                {vendasHoje ? formatCurrency(vendasHoje.ticketMedio) : 'R$ 0'}
              </p>
              <p className="text-sm text-muted-foreground">Ticket Médio</p>
            </div>
          </div>
        </Card>
      )}

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Comissão</p>
              <h3 className="text-2xl font-bold text-foreground">
                {resumoComissao ? formatCurrency(resumoComissao.comissao) : 'R$ 0'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {resumoComissao ? `${resumoComissao.percentual}% sobre vendas` : 'Carregando...'}
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center shadow-glow flex-shrink-0 ml-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Ranking</p>
              <h3 className="text-2xl font-bold text-foreground">
                {rankingInfo ? `${rankingInfo.posicao}º Lugar` : 'Carregando...'}
              </h3>
              <p className="text-sm text-primary">
                {rankingInfo ? `Top ${Math.round((rankingInfo.posicao / rankingInfo.totalVendedores) * 100)}%` : ''}
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow flex-shrink-0 ml-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Histórico de Comissões */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Histórico de Comissões (Últimos 3 Meses)
        </h2>
        
        <div className="space-y-3">
          {historicoComissoes.map((item, index) => (
            <Collapsible 
              key={index}
              open={expandedMonth === item.month}
              onOpenChange={() => setExpandedMonth(expandedMonth === item.month ? null : item.month)}
            >
              <CollapsibleTrigger asChild>
                <div 
                  className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${expandedMonth === item.month ? 'rotate-90' : ''}`} />
                    <div>
                      <p className="font-medium text-foreground">{item.month}</p>
                      <p className="text-sm text-muted-foreground">Vendas: {formatCurrency(item.sales)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{formatCurrency(item.commission)}</p>
                    <p className="text-sm text-muted-foreground">Comissão</p>
                  </div>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-2 ml-8 mr-4 space-y-2">
                  {salesDetailsByMonth[item.month]?.map((sale) => (
                    <div 
                      key={sale.id}
                      className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{sale.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(sale.date).toLocaleDateString('pt-BR', { 
                              day: '2-digit', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                        <p className="font-bold text-success whitespace-nowrap">{formatCurrency(sale.value)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
          
          <div className="mt-4 p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Total do Trimestre</p>
                <p className="text-sm text-muted-foreground">
                  {historicoComissoes.length > 0 
                    ? `${historicoComissoes[historicoComissoes.length - 1].month} - ${historicoComissoes[0].month}`
                    : 'Carregando...'}
                </p>
              </div>
              <p className="text-2xl font-bold text-primary">{formatCurrency(totalTrimestre)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
