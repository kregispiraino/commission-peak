import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Bell, Shield, Globe, Palette, Database, Users, Crown, UserCog } from 'lucide-react';

// Mock data para usuários
const mockUsers = [
  { id: 1, name: 'Ana Silva', email: 'ana@empresa.com', role: 'vendedor' },
  { id: 2, name: 'Carlos Santos', email: 'carlos@empresa.com', role: 'vendedor' },
  { id: 3, name: 'Maria Costa', email: 'maria@empresa.com', role: 'administrador' },
  { id: 4, name: 'João Oliveira', email: 'joao@empresa.com', role: 'vendedor' },
  { id: 5, name: 'Admin Master', email: 'admin@empresa.com', role: 'master' },
];

const roleLabels = {
  master: 'Master',
  administrador: 'Administrador', 
  vendedor: 'Vendedor'
};

const roleIcons = {
  master: Crown,
  administrador: UserCog,
  vendedor: Users
};

export default function Configuracoes() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Personalize sua experiência no sistema de comissões
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gerenciamento de Usuários */}
        <Card className="lg:col-span-2 p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Usuários</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Gerencie as permissões dos usuários do sistema</p>
                <Button className="bg-gradient-primary text-white shadow-glow">
                  <Users className="w-4 h-4 mr-2" />
                  Adicionar Usuário
                </Button>
              </div>
              
              <div className="space-y-3">
                {mockUsers.map((user) => {
                  const RoleIcon = roleIcons[user.role as keyof typeof roleIcons];
                  return (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <RoleIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Select defaultValue={user.role}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="master">
                              <div className="flex items-center space-x-2">
                                <Crown className="w-4 h-4" />
                                <span>Master</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="administrador">
                              <div className="flex items-center space-x-2">
                                <UserCog className="w-4 h-4" />
                                <span>Administrador</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="vendedor">
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4" />
                                <span>Vendedor</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Crown className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium text-primary">Master</p>
                    <p className="text-xs text-muted-foreground">Acesso total ao sistema</p>
                  </div>
                  <div className="text-center p-4 bg-success/5 rounded-lg">
                    <UserCog className="w-6 h-6 mx-auto mb-2 text-success" />
                    <p className="font-medium text-success">Administrador</p>
                    <p className="text-xs text-muted-foreground">Gerencia vendedores</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">Vendedor</p>
                    <p className="text-xs text-muted-foreground">Acesso básico</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
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