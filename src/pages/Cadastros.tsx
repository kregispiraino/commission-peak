import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Camera, Users, Crown, UserCog, Upload, Gift } from 'lucide-react';

// Mock data para usuários
const mockUsers = [
  { id: 1, name: 'Ana Silva', email: 'ana@empresa.com', role: 'vendedor' },
  { id: 2, name: 'Carlos Santos', email: 'carlos@empresa.com', role: 'vendedor' },
  { id: 3, name: 'Maria Costa', email: 'maria@empresa.com', role: 'administrador' },
  { id: 4, name: 'João Oliveira', email: 'joao@empresa.com', role: 'vendedor' },
  { id: 5, name: 'Admin Master', email: 'admin@empresa.com', role: 'master' },
];

const roleIcons = {
  master: Crown,
  administrador: UserCog,
  vendedor: Users
};

export default function Cadastros() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          Cadastros
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas informações e usuários do sistema
        </p>
      </div>

      {/* Informações Pessoais */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
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

      {/* Configuração de Prêmio */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Configuração de Prêmio</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="premio-nome">Nome do Prêmio</Label>
                <Input id="premio-nome" placeholder="Ex: iPhone 17 Pro Max" defaultValue="iPhone 17 Pro Max" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="premio-descricao">Descrição</Label>
                <Input id="premio-descricao" placeholder="Breve descrição do prêmio" defaultValue="Prêmio para o vendedor TOP 1 do mês" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Imagem do Prêmio</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Clique para fazer upload ou arraste a imagem
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG ou WEBP (máx. 2MB)
                </p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>
          </div>
          
          <Button className="bg-gradient-primary text-white shadow-glow">
            <Upload className="w-4 h-4 mr-2" />
            Salvar Prêmio
          </Button>
        </div>
      </Card>

      {/* Gerenciamento de Usuários */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
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
    </div>
  );
}
