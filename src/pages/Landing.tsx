import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Trophy, BarChart3, ShieldCheck, Zap } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: 'Acompanhamento em Tempo Real',
      description: 'Monitore suas vendas e comissões instantaneamente com dashboards interativos'
    },
    {
      icon: Users,
      title: 'Gestão de Equipes',
      description: 'Organize vendedores, empresas e equipes em uma única plataforma'
    },
    {
      icon: Trophy,
      title: 'Ranking e Gamificação',
      description: 'Incentive sua equipe com rankings competitivos e premiações mensais'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Detalhados',
      description: 'Análises completas de desempenho com filtros personalizáveis'
    },
    {
      icon: ShieldCheck,
      title: 'Seguro e Confiável',
      description: 'Sistema robusto com controle de permissões e segurança de dados'
    },
    {
      icon: Zap,
      title: 'Rápido e Eficiente',
      description: 'Interface moderna e intuitiva para máxima produtividade'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Ascora</h1>
              <p className="text-xs text-muted-foreground">Sales Management</p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-primary text-white"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Potencialize Suas{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Vendas
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema completo de gestão de vendas, comissões e performance para empresas que buscam excelência
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-primary text-white"
            >
              Começar Agora
            </Button>
            <Button 
              size="lg"
              variant="outline"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Tudo que você precisa para gerenciar vendas
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ferramentas profissionais para otimizar processos e maximizar resultados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-glass border-glass-border backdrop-blur-sm hover:shadow-elegant transition-all"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-primary p-12 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Usuários Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">R$ 10M+</div>
              <div className="text-white/80">Em Vendas Gerenciadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/80">Satisfação dos Clientes</div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl font-bold text-foreground">
            Pronto para transformar suas vendas?
          </h3>
          <p className="text-muted-foreground">
            Junte-se a centenas de empresas que já confiam na Ascora
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-gradient-primary text-white"
          >
            Acessar Sistema
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Ascora Sales Management. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
