import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera, Trophy, Target, Award, Star, Calendar } from 'lucide-react';

export default function Perfil() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          Meu Perfil
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e acompanhe suas conquistas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações do perfil */}
        <Card className="lg:col-span-2 p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Informações Pessoais</h2>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                    CS
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-primary shadow-glow"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground">Carlos Santos</h3>
                <p className="text-muted-foreground">Vendedor Senior</p>
                <Badge className="mt-2 bg-success/10 text-success border-success/20">
                  Top Performer
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" defaultValue="Carlos Santos" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" defaultValue="carlos.santos@empresa.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" defaultValue="(11) 99999-9999" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input id="cargo" defaultValue="Vendedor Senior" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="equipe">Equipe</Label>
                <Input id="equipe" defaultValue="Vendas Corporativas" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                <Input id="dataAdmissao" type="date" defaultValue="2022-03-15" />
              </div>
            </div>
            
            <Button className="bg-gradient-primary text-white shadow-glow hover:shadow-xl transition-all">
              Salvar Alterações
            </Button>
          </div>
        </Card>

        {/* Conquistas e estatísticas */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Conquistas
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Top Vendedor</p>
                  <p className="text-sm text-muted-foreground">Setembro 2024</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg border border-success/20">
                <div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Meta Batida</p>
                  <p className="text-sm text-muted-foreground">3 meses seguidos</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Cliente Premium</p>
                  <p className="text-sm text-muted-foreground">50+ vendas</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Estatísticas</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Posição Atual</span>
                <Badge className="bg-primary/10 text-primary">2º Lugar</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Vendas Este Mês</span>
                <span className="font-semibold">15 vendas</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ticket Médio</span>
                <span className="font-semibold">R$ 5.800</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Taxa de Conversão</span>
                <span className="font-semibold text-success">78%</span>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-muted-foreground">Na empresa há</span>
                <span className="font-semibold">1 ano, 9 meses</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}