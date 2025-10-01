import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, HeadphonesIcon } from 'lucide-react';

const Suporte = () => {
  return (
    <div className="min-h-screen bg-gradient-backdrop p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <HeadphonesIcon className="w-6 h-6 text-white" />
            </div>
            Suporte
          </h1>
          <p className="text-muted-foreground">
            Entre em contato com nossa equipe de suporte
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6">
          {/* Email Card */}
          <Card className="p-8 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow flex-shrink-0">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <h3 className="text-xl font-semibold text-foreground">E-mail</h3>
                <p className="text-muted-foreground">
                  Envie suas dúvidas e solicitações para nossa equipe
                </p>
                <div className="pt-2">
                  <a 
                    href="mailto:suporte@ascora.com.br"
                    className="text-lg font-semibold text-primary hover:text-primary-glow transition-colors"
                  >
                    suporte@ascora.com.br
                  </a>
                </div>
                <Button 
                  className="mt-4"
                  onClick={() => window.location.href = 'mailto:suporte@ascora.com.br'}
                >
                  Enviar E-mail
                </Button>
              </div>
            </div>
          </Card>

          {/* WhatsApp Card */}
          <Card className="p-8 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center shadow-glow flex-shrink-0">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <h3 className="text-xl font-semibold text-foreground">WhatsApp</h3>
                <p className="text-muted-foreground">
                  Fale diretamente com nossa equipe via WhatsApp
                </p>
                <div className="pt-2">
                  <a 
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-success hover:text-success/80 transition-colors"
                  >
                    +55 11 9999-9999
                  </a>
                </div>
                <Button 
                  className="mt-4 bg-success hover:bg-success/90"
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                >
                  Abrir WhatsApp
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Horário de Atendimento</h3>
          <div className="space-y-2 text-muted-foreground">
            <p>Segunda a Sexta: 9h às 18h</p>
            <p>Sábado: 9h às 13h</p>
            <p className="text-sm pt-2">
              * Mensagens recebidas fora do horário serão respondidas no próximo dia útil
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Suporte;
