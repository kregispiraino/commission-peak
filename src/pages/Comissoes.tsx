import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Target, Trophy, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export default function Comissoes() {
  const totalSales = 450000;
  const commission = 22500;
  const goalProgress = 82;
  const ranking = 2;
  
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
