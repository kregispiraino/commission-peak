import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpen } from 'lucide-react';

const Manuais = () => {
  const manuals = [
    {
      id: 'home',
      title: 'Home',
      content: 'A página inicial do Ascora apresenta um dashboard completo com visão geral das vendas, ranking dos vendedores e contagem regressiva para o fechamento do mês. Visualize estatísticas de vendas totais, progresso mensal e acompanhe a premiação do período.'
    },
    {
      id: 'lancamento',
      title: 'Lançamento',
      content: 'Na página de Lançamento, você pode registrar novas vendas no sistema. Preencha os dados do cliente, valor da venda e produto/serviço vendido. Os vendedores fazem lançamentos que ficam pendentes de aprovação, enquanto administradores podem aprovar ou negar as solicitações de lançamento através da seção de Liberações.'
    },
    {
      id: 'comissoes',
      title: 'Comissões',
      content: 'A página de Comissões exibe todas as vendas registradas e as comissões calculadas para cada vendedor. Visualize o histórico completo de vendas, valores de comissão por período, e acompanhe o desempenho individual. Inclui também o painel de "Vendas Hoje" com estatísticas em tempo real.'
    },
    {
      id: 'geral',
      title: 'Geral',
      content: 'As Configurações Gerais permitem ajustar parâmetros do sistema como percentuais de comissão, metas de vendas, período de fechamento, e outras configurações que afetam o funcionamento geral do Ascora. Apenas administradores têm acesso a esta área.'
    },
    {
      id: 'cadastros',
      title: 'Cadastros',
      content: 'Na página de Cadastros, gerencie os usuários do sistema, suas permissões e informações pessoais. Configure também os detalhes da premiação mensal, incluindo o upload da imagem do prêmio que será exibida no dashboard. Mantenha os dados dos vendedores sempre atualizados.'
    },
    {
      id: 'desenvolvedor',
      title: 'Desenvolvedor',
      content: 'A área de Desenvolvedor é dedicada a integrações via API com sistemas externos como ERPs e plataformas de e-commerce. Configure chaves de API, webhooks, sincronização automática de dados e conecte o Ascora com suas ferramentas de vendas existentes.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-backdrop p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            Manuais
          </h1>
          <p className="text-muted-foreground">
            Guias e instruções para usar o Ascora
          </p>
        </div>

        {/* Manuals Accordion */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <Accordion type="single" collapsible className="space-y-4">
            {manuals.map((manual) => (
              <AccordionItem 
                key={manual.id} 
                value={manual.id}
                className="border border-glass-border rounded-lg px-4 bg-card/50"
              >
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
                  {manual.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4 pb-2 leading-relaxed">
                  {manual.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
};

export default Manuais;
