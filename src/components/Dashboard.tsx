import { CountdownTimer } from './CountdownTimer';
import { SalesRanking } from './SalesRanking';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';

// Mock data para estatísticas gerais
const dashboardStats = {
  totalSales: 445000,
  totalSellers: 6,
  averageCommission: 7416,
  monthProgress: 78.5,
};

export function Dashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Vendas Totais"
            value={formatCurrency(dashboardStats.totalSales)}
            icon={DollarSign}
            trend="+12.5%"
          />
          <StatsCard
            title="Vendedores Ativos"
            value={dashboardStats.totalSellers.toString()}
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
          </div>
        </div>
      </div>
    </div>
  );
}