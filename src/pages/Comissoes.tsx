import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Target, Trophy, Users, Award, Building2, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Mock data
const salesData = [
  { name: "Ana Silva", sales: 145000, avatar: "AS" },
  { name: "Carlos Santos", sales: 132000, avatar: "CS" },
  { name: "Maria Costa", sales: 98000, avatar: "MC" },
];

// Mock data para empresas
const companiesData = [
  { id: 'company1', name: 'TechCorp', commission: 12000, sales: 240000 },
  { id: 'company2', name: 'InnovaSoft', commission: 8250, sales: 165000 },
  { id: 'company3', name: 'DigitalMax', commission: 5000, sales: 100000 },
];

// Mock data para equipes
const teamsData = [
  { id: 'team1', name: 'Equipe A', commission: 10000, sales: 200000 },
  { id: 'team2', name: 'Equipe B', commission: 7500, sales: 150000 },
  { id: 'team3', name: 'Equipe C', commission: 4750, sales: 95000 },
];

// Mock data para vendas detalhadas por mês
const salesDetailsByMonth: Record<string, Array<{id: string, description: string, value: number, date: string}>> = {
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

export default function Comissoes() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(companiesData.map(c => c.id));
  const [selectedTeams, setSelectedTeams] = useState<string[]>(teamsData.map(t => t.id));
  const [userRole] = useState('master'); // Mock user role
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  
  // Calcular dados filtrados
  const filteredCompaniesData = companiesData.filter(c => selectedCompanies.includes(c.id));
  const filteredTeamsData = teamsData.filter(t => selectedTeams.includes(t.id));
  
  const totalSales = filteredCompaniesData.reduce((acc, curr) => acc + curr.sales, 0);
  const commission = filteredCompaniesData.reduce((acc, curr) => acc + curr.commission, 0);
  const goalProgress = 82;
  const ranking = 2;

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
  
  // Histórico dos últimos 3 meses
  const commissionHistory = [
    { month: 'Abril', commission: 22500, sales: 450000 },
    { month: 'Março', commission: 19800, sales: 396000 },
    { month: 'Fevereiro', commission: 21200, sales: 424000 },
  ];
  
  const quarterTotal = commissionHistory.reduce((acc, month) => acc + month.commission, 0);

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
            <p className="text-2xl font-bold text-foreground">R$ 28.500</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Vendas</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Target className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold text-foreground">R$ 2.375</p>
            <p className="text-sm text-muted-foreground">Ticket Médio</p>
          </div>
        </div>
      </Card>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Comissão</p>
              <h3 className="text-2xl font-bold text-foreground">{formatCurrency(commission)}</h3>
              <p className="text-sm text-muted-foreground">
                5% sobre vendas
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
              <h3 className="text-2xl font-bold text-foreground">{ranking}º Lugar</h3>
              <p className="text-sm text-primary">
                Top {Math.round((ranking / 20) * 100)}%
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
          {commissionHistory.map((item, index) => (
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
                <p className="text-sm text-muted-foreground">Fevereiro - Abril</p>
              </div>
              <p className="text-2xl font-bold text-primary">{formatCurrency(quarterTotal)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
