import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Target, Trophy, Users, Award, Building2, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function Comissoes() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(companiesData.map(c => c.id));
  const [selectedTeams, setSelectedTeams] = useState<string[]>(teamsData.map(t => t.id));
  const [userRole] = useState('master'); // Mock user role
  
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
  
  const commissionHistory = [
    { month: 'Janeiro', commission: 18500, sales: 370000 },
    { month: 'Fevereiro', commission: 21200, sales: 424000 },
    { month: 'Março', commission: 19800, sales: 396000 },
    { month: 'Abril', commission: 22500, sales: 450000 },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Vendas Totais</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{formatCurrency(totalSales)}</h3>
              <p className="text-sm text-success flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" />
                +15% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Comissão</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{formatCurrency(commission)}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                5% sobre vendas
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center shadow-glow">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Progresso da Meta</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{goalProgress}%</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Meta: {formatCurrency(550000)}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ranking</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{ranking}º Lugar</h3>
              <p className="text-sm text-primary mt-2">
                Top {Math.round((ranking / 20) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Progresso da Meta */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Meta Mensal
            </h2>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {goalProgress}% concluído
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Realizado</span>
              <span className="font-semibold">{formatCurrency(totalSales)} de {formatCurrency(550000)}</span>
            </div>
            <Progress value={goalProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Faltam {formatCurrency(550000 - totalSales)} para atingir sua meta
            </p>
          </div>

          {goalProgress >= 80 && (
            <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-success font-medium">
                🎉 Parabéns! Você está muito próximo de bater sua meta!
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Histórico de Comissões */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Histórico de Comissões
        </h2>
        
        <div className="space-y-3">
          {commissionHistory.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all"
            >
              <div>
                <p className="font-medium text-foreground">{item.month}</p>
                <p className="text-sm text-muted-foreground">Vendas: {formatCurrency(item.sales)}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{formatCurrency(item.commission)}</p>
                <p className="text-sm text-muted-foreground">Comissão</p>
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Total do Trimestre</p>
                <p className="text-sm text-muted-foreground">Janeiro - Abril</p>
              </div>
              <p className="text-2xl font-bold text-primary">{formatCurrency(quarterTotal)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
