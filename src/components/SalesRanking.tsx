import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { buscarRankingVendedores, type RankingVendedor } from '@/backend/api/home';

export function SalesRanking() {
  const { toast } = useToast();
  const [salesData, setSalesData] = useState<RankingVendedor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarRanking();
  }, []);

  const carregarRanking = async () => {
    console.log('🔵 Frontend - Carregando ranking de vendedores');
    setLoading(true);
    
    try {
      const response = await buscarRankingVendedores();
      
      if (response.success && response.data) {
        setSalesData(response.data);
      } else {
        toast({
          title: "Erro ao carregar ranking",
          description: response.error || "Não foi possível carregar o ranking de vendedores.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
      toast({
        title: "Erro ao carregar ranking",
        description: "Não foi possível carregar o ranking de vendedores.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">{position}</span>
          </div>
        );
    }
  };

  const getRankBadgeVariant = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-glow";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-destructive rotate-180" />;
      default:
        return <Target className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            Ranking de Vendas
          </h2>
          <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
            {salesData.length} Vendedores
          </Badge>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-8">Carregando ranking...</div>
        ) : (
          <div className="space-y-3">
          {salesData.map((person) => {
            const progressPercentage = (person.sales / person.target) * 100;
            const isTopThree = person.position <= 3;
            
            return (
              <div
                key={person.id}
                className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                  isTopThree 
                    ? 'bg-gradient-to-r from-primary/5 to-transparent border-primary/20 shadow-sm' 
                    : 'bg-card border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(person.position)}
                      <Badge 
                        className={`px-2 py-1 text-xs font-semibold ${getRankBadgeVariant(person.position)}`}
                      >
                        #{person.position}
                      </Badge>
                    </div>
                    
                    <Avatar className="w-10 h-10 border-2 border-primary/20">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-semibold text-foreground">{person.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{formatCurrency(person.sales)} / {formatCurrency(person.target)}</span>
                        {getTrendIcon(person.trend)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso da Meta</span>
                    <span className={`font-semibold ${progressPercentage >= 100 ? 'text-success' : 'text-primary'}`}>
                      {progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(progressPercentage, 100)} 
                    className={`h-2 ${isTopThree ? 'shadow-sm' : ''}`}
                  />
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </Card>
  );
}