import { CountdownTimer } from './CountdownTimer';
import { SalesRanking } from './SalesRanking';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, Target, DollarSign, BarChart3, Building2 } from 'lucide-react';
import { useState } from 'react';

// Mock data para estatísticas gerais
const dashboardStats = {
  totalSales: 445000,
  totalSellers: 6,
  averageCommission: 7416,
  monthProgress: 78.5,
};

// Mock data para empresas (para usuários master)
const companiesData = [
  { id: 'all', name: 'Todas as Empresas', sales: 445000, sellers: 6 },
  { id: 'company1', name: 'TechCorp', sales: 180000, sellers: 3 },
  { id: 'company2', name: 'InnovaSoft', sales: 165000, sellers: 2 },
  { id: 'company3', name: 'DigitalMax', sales: 100000, sellers: 1 },
];

const chartData = [
  { company: 'TechCorp', sales: 180000, color: '#3b82f6' },
  { company: 'InnovaSoft', sales: 165000, color: '#10b981' },
  { company: 'DigitalMax', sales: 100000, color: '#f59e0b' },
];

export function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [userRole] = useState('master'); // Mock user role - in real app this would come from auth context
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const currentCompanyData = companiesData.find(c => c.id === selectedCompany) || companiesData[0];

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
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-success">{trend}</span>
          <span className="text-sm text-muted-foreground">vs mês anterior</span>
        </div>
      )}
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

        {/* Company selector for master users */}
        {userRole === 'master' && (
          <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Seleção de Empresa
              </h2>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Selecione uma empresa" />
                </SelectTrigger>
                <SelectContent>
                  {companiesData.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Chart visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-muted-foreground">Vendas por Empresa</h3>
                <div className="space-y-3">
                  {chartData.map((item) => (
                    <div key={item.company} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.company}</span>
                      </div>
                      <span className="font-semibold text-success">
                        {formatCurrency(item.sales)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-muted-foreground">Resumo Geral</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total de Empresas:</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendas Totais:</span>
                    <span className="font-semibold text-success">{formatCurrency(445000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendedores Ativos:</span>
                    <span className="font-semibold">6</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Vendas Totais"
            value={formatCurrency(currentCompanyData.sales)}
            icon={DollarSign}
            trend="+12.5%"
          />
          <StatsCard
            title="Vendedores Ativos"
            value={currentCompanyData.sellers.toString()}
            icon={Users}
            subtitle="Equipe completa"
          />
          <StatsCard
            title="Comissão Média"
            value={formatCurrency(dashboardStats.averageCommission)}
            icon={Target}
            trend="+8.2%"
          />
          <StatsCard
            title="Progresso do Mês"
            value={`${dashboardStats.monthProgress}%`}
            icon={TrendingUp}
            subtitle="Meta mensal"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Ranking - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SalesRanking />
          </div>
          
          {/* Countdown Timer - Takes 1 column */}
          <div className="space-y-6">
            <CountdownTimer />
            
            {/* Additional info card */}
            <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto shadow-glow">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Meta do Mês</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Faltam apenas alguns dias para o fechamento. Mantenha o ritmo!
                  </p>
                  <Badge className="bg-success/10 text-success border-success/20">
                    78.5% Concluído
                  </Badge>
                </div>
              </div>
            </Card>

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