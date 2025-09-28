import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, DollarSign, Percent, Award } from 'lucide-react';

export default function Resultado() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          Resultados e Comissões
        </h1>
        <p className="text-muted-foreground">
          Acompanhe seus resultados e comissões em tempo real
        </p>
      </div>

      {/* Cards de métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Vendas Realizadas
              </p>
              <p className="text-2xl font-bold text-foreground">R$ 87.000</p>
              <p className="text-sm text-success">+12% vs mês anterior</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Comissão Acumulada
              </p>
              <p className="text-2xl font-bold text-success">R$ 8.700</p>
              <p className="text-sm text-success">10% sobre vendas</p>
            </div>
            <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center shadow-glow">
              <Percent className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Meta do Mês
              </p>
              <p className="text-2xl font-bold text-foreground">96.7%</p>
              <p className="text-sm text-warning">R$ 3.000 restantes</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Posição no Ranking
              </p>
              <p className="text-2xl font-bold text-foreground">2º Lugar</p>
              <p className="text-sm text-primary">Entre 6 vendedores</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progresso da meta */}
        <Card className="lg:col-span-2 p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Progresso da Meta</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Meta Mensal</span>
                <span className="font-semibold">R$ 90.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Realizado</span>
                <span className="font-semibold text-success">R$ 87.000</span>
              </div>
              <Progress value={96.7} className="h-3" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">96.7% concluído</span>
                <span className="text-warning font-medium">Faltam R$ 3.000</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-success/5 rounded-xl border border-success/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-success">Parabéns! Você está quase lá!</h3>
                  <p className="text-sm text-success/80">
                    Apenas mais R$ 3.000 para bater sua meta mensal
                  </p>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">
                  Meta Premium
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Histórico de comissões */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Histórico de Comissões</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-card rounded-lg">
              <div>
                <p className="font-medium">Setembro 2024</p>
                <p className="text-sm text-muted-foreground">85% da meta</p>
              </div>
              <span className="font-semibold text-success">R$ 7.650</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-card rounded-lg">
              <div>
                <p className="font-medium">Agosto 2024</p>
                <p className="text-sm text-muted-foreground">92% da meta</p>
              </div>
              <span className="font-semibold text-success">R$ 8.280</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-card rounded-lg">
              <div>
                <p className="font-medium">Julho 2024</p>
                <p className="text-sm text-muted-foreground">78% da meta</p>
              </div>
              <span className="font-semibold text-success">R$ 7.020</span>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground">Total Trimestre</span>
                <span className="font-bold text-success text-lg">R$ 22.950</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}