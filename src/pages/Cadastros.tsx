import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Camera, Users, Crown, UserCog, Package, UserCircle, Link as LinkIcon, Trash2, Edit, Building2, ChevronDown, ChevronRight, Target, Percent, BadgeDollarSign } from 'lucide-react';

// Mock data
const mockEmpresas = [
  { id: 1, name: 'Empresa Alpha', cnpj: '00.000.000/0001-00' },
  { id: 2, name: 'Empresa Beta', cnpj: '11.111.111/0001-11' },
  { id: 3, name: 'Empresa Gamma', cnpj: '22.222.222/0001-22' },
];

const mockEquipes = [
  { id: 1, name: 'Equipe Vendas SP', empresaId: 1 },
  { id: 2, name: 'Equipe Vendas RJ', empresaId: 1 },
  { id: 3, name: 'Equipe Digital', empresaId: 2 },
];

const mockUsers = [
  { id: 1, name: 'Ana Silva', email: 'ana@empresa.com', role: 'vendedor', empresaIds: [1], equipeIds: [1], comissao: 5, meta: 50000 },
  { id: 2, name: 'Carlos Santos', email: 'carlos@empresa.com', role: 'vendedor', empresaIds: [1, 2], equipeIds: [1, 3], comissao: 7, meta: 80000 },
  { id: 3, name: 'Maria Costa', email: 'maria@empresa.com', role: 'administrador', empresaIds: [1], equipeIds: [1, 2], comissao: 10, meta: 100000 },
];

const mockMetas = [
  { id: 1, tipo: 'empresa', empresaId: 1, valor: 500000 },
  { id: 2, tipo: 'equipe', empresaId: 1, equipeId: 1, valor: 200000 },
];

const mockComissoes = [
  { id: 1, tipo: 'empresa', empresaId: 1, valor: 5 },
  { id: 2, tipo: 'equipe', empresaId: 1, equipeId: 1, valor: 7 },
];

const mockProdutos = [
  { id: 1, name: 'Software License', valor: 5000, empresaId: 1 },
  { id: 2, name: 'Consultoria', valor: 3000, empresaId: 2 },
];

const mockClientes = [
  { id: 1, name: 'Tech Corp', cnpj: '33.333.333/0001-33', empresaId: 1 },
  { id: 2, name: 'Digital Solutions', cnpj: '44.444.444/0001-44', empresaId: 2 },
];

const mockLinks = [
  { id: 1, descricao: 'Loja Principal', link: 'https://loja.empresa.com/ana', empresaId: 1, equipeId: 1, vendedorId: 1 },
  { id: 2, descricao: 'Marketplace', link: 'https://marketplace.com/carlos', empresaId: 2, equipeId: 3, vendedorId: 2 },
];

const roleIcons = {
  master: Crown,
  administrador: UserCog,
  vendedor: Users
};

export default function Cadastros() {
  const [expandedField, setExpandedField] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any>(null);

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
          Gerencie suas informações e configurações do sistema
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
              <p className="text-muted-foreground flex items-center gap-2">
                <UserCog className="w-4 h-4" />
                Vendedor
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Collapsible open={expandedField === 'nome'} onOpenChange={(open) => setExpandedField(open ? 'nome' : null)}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:bg-accent transition-colors">
                <span className="font-medium">Nome</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedField === 'nome' ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <Input value="Carlos Santos" disabled className="bg-muted" />
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={expandedField === 'email'} onOpenChange={(open) => setExpandedField(open ? 'email' : null)}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:bg-accent transition-colors">
                <span className="font-medium">E-mail</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedField === 'email' ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <Input value="carlos@empresa.com" disabled className="bg-muted" />
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={expandedField === 'empresa'} onOpenChange={(open) => setExpandedField(open ? 'empresa' : null)}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:bg-accent transition-colors">
                <span className="font-medium">Empresa</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedField === 'empresa' ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <Input value="Empresa Alpha, Empresa Beta" disabled className="bg-muted" />
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={expandedField === 'equipe'} onOpenChange={(open) => setExpandedField(open ? 'equipe' : null)}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:bg-accent transition-colors">
                <span className="font-medium">Equipe</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedField === 'equipe' ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <Input value="Equipe Vendas SP, Equipe Digital" disabled className="bg-muted" />
              </CollapsibleContent>
            </Collapsible>
          </div>
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
                  
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setEditingUser(user)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Editar Usuário</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Nome</Label>
                              <Input defaultValue={user.name} />
                            </div>
                            <div className="space-y-2">
                              <Label>E-mail</Label>
                              <Input defaultValue={user.email} />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Empresas</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                  <span>{user.empresaIds.length} empresa(s) selecionada(s)</span>
                                  <ChevronDown className="w-4 h-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-4">
                                <div className="space-y-2">
                                  {mockEmpresas.map((empresa) => (
                                    <div key={empresa.id} className="flex items-center space-x-2">
                                      <Checkbox defaultChecked={user.empresaIds.includes(empresa.id)} />
                                      <label className="text-sm">{empresa.name}</label>
                                    </div>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label>Equipes</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                  <span>{user.equipeIds.length} equipe(s) selecionada(s)</span>
                                  <ChevronDown className="w-4 h-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-4">
                                <div className="space-y-2">
                                  {mockEquipes.map((equipe) => (
                                    <div key={equipe.id} className="flex items-center space-x-2">
                                      <Checkbox defaultChecked={user.equipeIds.includes(equipe.id)} />
                                      <label className="text-sm">{equipe.name}</label>
                                    </div>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Acesso</Label>
                              <Select defaultValue={user.role}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="master">Master</SelectItem>
                                  <SelectItem value="administrador">Administrador</SelectItem>
                                  <SelectItem value="vendedor">Vendedor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Senha</Label>
                              <Input type="password" placeholder="Nova senha (opcional)" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Percentual de Comissão (%)</Label>
                              <Input type="number" defaultValue={user.comissao} />
                            </div>
                            <div className="space-y-2">
                              <Label>Meta Individual (R$)</Label>
                              <Input type="number" defaultValue={user.meta} />
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-primary text-white">
                            Salvar Alterações
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Gerenciamento de Empresas */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Empresas</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Nome da Empresa</Label>
              <Input placeholder="Nome da empresa" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input placeholder="00.000.000/0001-00" />
            </div>
          </div>
          <Button className="bg-gradient-primary text-white">
            <Building2 className="w-4 h-4 mr-2" />
            Cadastrar Empresa
          </Button>

          <div className="space-y-3">
            {mockEmpresas.map((empresa) => (
              <div key={empresa.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">{empresa.name}</p>
                  <p className="text-sm text-muted-foreground">{empresa.cnpj}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Gerenciamento de Equipes */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Equipes</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmpresas.map((empresa) => (
                    <SelectItem key={empresa.id} value={empresa.id.toString()}>{empresa.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nome da Equipe</Label>
              <Input placeholder="Nome da equipe" />
            </div>
          </div>
          <Button className="bg-gradient-primary text-white">
            <Users className="w-4 h-4 mr-2" />
            Cadastrar Equipe
          </Button>

          <div className="space-y-3">
            {mockEquipes.map((equipe) => (
              <div key={equipe.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">{equipe.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockEmpresas.find(e => e.id === equipe.empresaId)?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Gerenciamento de Metas */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Metas</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Meta</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="empresa">Empresa</SelectItem>
                  <SelectItem value="equipe">Equipe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEmpresas.map((empresa) => (
                      <SelectItem key={empresa.id} value={empresa.id.toString()}>{empresa.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Equipe (opcional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a equipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEquipes.map((equipe) => (
                      <SelectItem key={equipe.id} value={equipe.id.toString()}>{equipe.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Valor da Meta (R$)</Label>
              <Input type="number" placeholder="0,00" />
            </div>

            <Button className="bg-gradient-primary text-white">
              <Target className="w-4 h-4 mr-2" />
              Cadastrar Meta
            </Button>
          </div>

          <div className="space-y-3">
            {mockMetas.map((meta) => (
              <div key={meta.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">
                    {meta.tipo === 'empresa' ? 'Meta de Empresa' : 'Meta de Equipe'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {mockEmpresas.find(e => e.id === meta.empresaId)?.name}
                    {meta.tipo === 'equipe' && ` - ${mockEquipes.find(eq => eq.id === meta.equipeId)?.name}`}
                  </p>
                  <p className="text-sm font-semibold text-success">R$ {meta.valor.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Gerenciamento de Comissões */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Percent className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Comissões</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Comissão</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="empresa">Empresa</SelectItem>
                  <SelectItem value="equipe">Equipe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEmpresas.map((empresa) => (
                      <SelectItem key={empresa.id} value={empresa.id.toString()}>{empresa.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Equipe (opcional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a equipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEquipes.map((equipe) => (
                      <SelectItem key={equipe.id} value={equipe.id.toString()}>{equipe.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Percentual de Comissão (%)</Label>
              <Input type="number" placeholder="0" />
            </div>

            <Button className="bg-gradient-primary text-white">
              <Percent className="w-4 h-4 mr-2" />
              Cadastrar Comissão
            </Button>
          </div>

          <div className="space-y-3">
            {mockComissoes.map((comissao) => (
              <div key={comissao.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">
                    {comissao.tipo === 'empresa' ? 'Comissão de Empresa' : 'Comissão de Equipe'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {mockEmpresas.find(e => e.id === comissao.empresaId)?.name}
                    {comissao.tipo === 'equipe' && ` - ${mockEquipes.find(eq => eq.id === comissao.equipeId)?.name}`}
                  </p>
                  <p className="text-sm font-semibold text-success">{comissao.valor}%</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Gerenciamento de Produtos */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Produtos</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmpresas.map((empresa) => (
                    <SelectItem key={empresa.id} value={empresa.id.toString()}>{empresa.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nome do Produto</Label>
              <Input placeholder="Nome do produto" />
            </div>
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input type="number" placeholder="0,00" />
            </div>
          </div>
          <Button className="bg-gradient-primary text-white">
            <Package className="w-4 h-4 mr-2" />
            Cadastrar Produto
          </Button>

          <div className="space-y-3">
            {mockProdutos.map((produto) => (
              <div key={produto.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">{produto.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockEmpresas.find(e => e.id === produto.empresaId)?.name}
                  </p>
                  <p className="text-sm font-semibold text-success">R$ {produto.valor.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Gerenciamento de Clientes */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <UserCircle className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Clientes</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmpresas.map((empresa) => (
                    <SelectItem key={empresa.id} value={empresa.id.toString()}>{empresa.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nome do Cliente</Label>
              <Input placeholder="Nome do cliente" />
            </div>
            <div className="space-y-2">
              <Label>CNPJ</Label>
              <Input placeholder="00.000.000/0001-00" />
            </div>
          </div>
          <Button className="bg-gradient-primary text-white">
            <UserCircle className="w-4 h-4 mr-2" />
            Cadastrar Cliente
          </Button>

          <div className="space-y-3">
            {mockClientes.map((cliente) => (
              <div key={cliente.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">{cliente.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockEmpresas.find(e => e.id === cliente.empresaId)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{cliente.cnpj}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Gerenciamento de Links */}
      <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <LinkIcon className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Links</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Descrição do Link</Label>
                <Input placeholder="Descrição" />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input placeholder="https://" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEmpresas.map((empresa) => (
                      <SelectItem key={empresa.id} value={empresa.id.toString()}>{empresa.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Equipe</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a equipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEquipes.map((equipe) => (
                      <SelectItem key={equipe.id} value={equipe.id.toString()}>{equipe.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Vendedor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="bg-gradient-primary text-white">
              <LinkIcon className="w-4 h-4 mr-2" />
              Cadastrar Link
            </Button>
          </div>

          <div className="space-y-3">
            {mockLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">{link.descricao}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-md">{link.link}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockEmpresas.find(e => e.id === link.empresaId)?.name} - {mockEquipes.find(eq => eq.id === link.equipeId)?.name} - {mockUsers.find(u => u.id === link.vendedorId)?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
