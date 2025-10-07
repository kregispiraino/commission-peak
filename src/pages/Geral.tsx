import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Bell, Shield, Palette, Database, User, Mail, Building2, Users, Camera, UserCog } from 'lucide-react';

export default function Geral() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          Configurações Gerais
        </h1>
        <p className="text-muted-foreground">
          Personalize sua experiência no sistema
        </p>
      </div>

      {/* Informações Pessoais */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-white text-xl font-bold">
                CS
              </AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-primary shadow-glow"
            >
              <Camera className="w-3.5 h-3.5" />
            </Button>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <User className="w-4 h-4" />
                <span className="font-medium">Nome</span>
              </div>
              <p className="text-foreground font-semibold">Carlos Santos</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                <span className="font-medium">E-mail</span>
              </div>
              <p className="text-foreground font-semibold">carlos@empresa.com</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">Empresa</span>
              </div>
              <p className="text-foreground font-semibold">Empresa Alpha, Empresa Beta</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Users className="w-4 h-4" />
                <span className="font-medium">Equipe</span>
              </div>
              <p className="text-foreground font-semibold">Equipe Vendas SP, Equipe Digital</p>
            </div>
          </div>
          
          <div className="flex-shrink-0 text-center px-4 py-3 bg-primary/10 rounded-lg border border-primary/20">
            <UserCog className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-xs font-medium text-muted-foreground">Acesso</p>
            <p className="text-sm font-bold text-foreground">Vendedor</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notificações */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Notificações</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Vendas registradas</p>
                  <p className="text-sm text-muted-foreground">Receba notificações quando uma venda for registrada</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ranking atualizado</p>
                  <p className="text-sm text-muted-foreground">Seja notificado sobre mudanças no ranking</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Meta próxima do fim</p>
                  <p className="text-sm text-muted-foreground">Alerta quando restarem 3 dias para o fechamento</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">E-mail resumo semanal</p>
                  <p className="text-sm text-muted-foreground">Receba um resumo das vendas da semana</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </Card>

        {/* Preferências */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Preferências</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Idioma</Label>
                <Select defaultValue="pt-br">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-br">Português (BR)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Fuso Horário</Label>
                <Select defaultValue="america/sao_paulo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america/sao_paulo">São Paulo (GMT-3)</SelectItem>
                    <SelectItem value="america/new_york">New York (GMT-5)</SelectItem>
                    <SelectItem value="europe/london">London (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Formato de Data</Label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Moeda</Label>
                <Select defaultValue="brl">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                    <SelectItem value="usd">Dólar Americano ($)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Segurança */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Segurança</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Senha Atual</Label>
                <Input id="senha-atual" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nova-senha">Nova Senha</Label>
                <Input id="nova-senha" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>  
                <Input id="confirmar-senha" type="password" />
              </div>
              
              <Button className="w-full bg-gradient-primary text-white shadow-glow">
                Alterar Senha
              </Button>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium">Autenticação de dois fatores</p>
                  <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </Card>

        {/* Sistema */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Sistema</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Backup automático</p>
                  <p className="text-sm text-muted-foreground">Faça backup dos dados diariamente</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Modo offline</p>
                  <p className="text-sm text-muted-foreground">Permita uso básico sem internet</p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-3 pt-4 border-t border-border">
                <p className="text-sm font-medium text-muted-foreground">Versão do Sistema</p>
                <p className="text-lg font-semibold">v2.1.0</p>
                <Button variant="outline" className="w-full">
                  Verificar Atualizações
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
