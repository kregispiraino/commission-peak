import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Crown, UserCog, Package, UserCircle, Link as LinkIcon, Trash2, Edit, Building2, ChevronDown, Target, Percent, Plus, ChevronRight, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  { id: 3, name: 'Suporte Técnico', valor: 2000, empresaId: 1 },
  { id: 4, name: 'Treinamento', valor: 4000, empresaId: 2 },
];

const mockClientes = [
  { id: 1, name: 'Tech Corp', cnpj: '33.333.333/0001-33', empresaId: 1 },
  { id: 2, name: 'Digital Solutions', cnpj: '44.444.444/0001-44', empresaId: 2 },
  { id: 3, name: 'Inovare Ltda', cnpj: '55.555.555/0001-55', empresaId: 1 },
  { id: 4, name: 'StartHub', cnpj: '66.666.666/0001-66', empresaId: 2 },
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
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [confirmUserData, setConfirmUserData] = useState<any>(null);
  const [confirmEmpresaData, setConfirmEmpresaData] = useState<any>(null);
  const [confirmEquipeData, setConfirmEquipeData] = useState<any>(null);
  const [confirmMetaData, setConfirmMetaData] = useState<any>(null);
  const [confirmComissaoData, setConfirmComissaoData] = useState<any>(null);
  const [confirmProdutoData, setConfirmProdutoData] = useState<any>(null);
  const [confirmClienteData, setConfirmClienteData] = useState<any>(null);
  const [confirmLinkData, setConfirmLinkData] = useState<any>(null);
  
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<string>('');
  
  const [openSections, setOpenSections] = useState({
    usuarios: false,
    empresas: false,
    equipes: false,
    metas: false,
    comissoes: false,
    produtos: false,
    clientes: false,
    links: false
  });

  const [searchTerms, setSearchTerms] = useState({
    usuarios: '',
    empresas: '',
    equipes: '',
    metas: '',
    comissoes: '',
    produtos: '',
    clientes: '',
    links: ''
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="p-8 space-y-6">
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

      {/* Gerenciamento de Usuários */}
      <Collapsible open={openSections.usuarios} onOpenChange={() => toggleSection('usuarios')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Usuários</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.usuarios ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input placeholder="Nome completo" />
                      </div>
                      <div className="space-y-2">
                        <Label>E-mail</Label>
                        <Input placeholder="email@empresa.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Empresas</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span>Selecione as empresas</span>
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-4">
                          <div className="space-y-2">
                            {mockEmpresas.map((empresa) => (
                              <div key={empresa.id} className="flex items-center space-x-2">
                                <Checkbox />
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
                            <span>Selecione as equipes</span>
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-4">
                          <div className="space-y-2">
                            {mockEquipes.map((equipe) => (
                              <div key={equipe.id} className="flex items-center space-x-2">
                                <Checkbox />
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
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o acesso" />
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
                        <Input type="password" placeholder="Senha inicial" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Percentual de Comissão (%)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label>Meta Individual (R$)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-primary text-white">
                      Criar Usuário
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome do usuário..." 
                  value={searchTerms.usuarios}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, usuarios: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-3 pr-4">
                  {mockUsers.filter(user => 
                    user.name.toLowerCase().includes(searchTerms.usuarios.toLowerCase())
                  ).map((user) => {
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
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o usuário "{user.name}"? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => {
                                    toast({ title: "Sucesso!", description: "Usuário excluído com sucesso" });
                                  }}
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Gerenciamento de Empresas */}
      <Collapsible open={openSections.empresas} onOpenChange={() => toggleSection('empresas')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Empresas</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.empresas ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome da Empresa</Label>
                  <Input 
                    id="empresa-nome"
                    placeholder="Nome da empresa" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input 
                    id="empresa-cnpj"
                    placeholder="00.000.000/0001-00" 
                  />
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-primary text-white"
                onClick={() => {
                  const nome = (document.getElementById('empresa-nome') as HTMLInputElement)?.value;
                  const cnpj = (document.getElementById('empresa-cnpj') as HTMLInputElement)?.value;
                  if (nome && cnpj) {
                    setConfirmEmpresaData({ nome, cnpj });
                  } else {
                    toast({ title: "Erro", description: "Preencha todos os campos", variant: "destructive" });
                  }
                }}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Cadastrar Empresa
              </Button>

              <Dialog open={!!confirmEmpresaData} onOpenChange={(open) => !open && setConfirmEmpresaData(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Cadastro de Empresa</DialogTitle>
                    <DialogDescription>Verifique os dados antes de cadastrar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Nome</p>
                      <p className="font-medium">{confirmEmpresaData?.nome}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">CNPJ</p>
                      <p className="font-medium">{confirmEmpresaData?.cnpj}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmEmpresaData(null)}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-gradient-primary text-white"
                      onClick={() => {
                        toast({ title: "Sucesso!", description: "Empresa cadastrada com sucesso" });
                        setConfirmEmpresaData(null);
                      }}
                    >
                      Confirmar Cadastro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome da empresa..." 
                  value={searchTerms.empresas}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, empresas: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[240px]">
                <div className="space-y-3 pr-4">
                  {mockEmpresas.filter(empresa => 
                    empresa.name.toLowerCase().includes(searchTerms.empresas.toLowerCase())
                  ).map((empresa) => (
                    <div key={empresa.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{empresa.name}</p>
                        <p className="text-sm text-muted-foreground">{empresa.cnpj}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => { setEditingItem(empresa); setEditingType('empresa'); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Empresa</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Nome da Empresa</Label>
                                <Input defaultValue={empresa.name} />
                              </div>
                              <div className="space-y-2">
                                <Label>CNPJ</Label>
                                <Input defaultValue={empresa.cnpj} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                className="w-full bg-gradient-primary text-white"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Empresa atualizada com sucesso" });
                                }}
                              >
                                Salvar Alterações
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a empresa "{empresa.name}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Empresa excluída com sucesso" });
                                }}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Gerenciamento de Equipes */}
      <Collapsible open={openSections.equipes} onOpenChange={() => toggleSection('equipes')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Equipes</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.equipes ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Select onValueChange={(value) => (document.getElementById('equipe-empresa') as any).dataset.empresa = value}>
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
                  <Input id="equipe-nome" placeholder="Nome da equipe" />
                  <input type="hidden" id="equipe-empresa" />
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-primary text-white"
                onClick={() => {
                  const nome = (document.getElementById('equipe-nome') as HTMLInputElement)?.value;
                  const empresaId = (document.getElementById('equipe-empresa') as any)?.dataset.empresa;
                  if (nome && empresaId) {
                    setConfirmEquipeData({ nome, empresaId });
                  } else {
                    toast({ title: "Erro", description: "Preencha todos os campos", variant: "destructive" });
                  }
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Cadastrar Equipe
              </Button>

              <Dialog open={!!confirmEquipeData} onOpenChange={(open) => !open && setConfirmEquipeData(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Cadastro de Equipe</DialogTitle>
                    <DialogDescription>Verifique os dados antes de cadastrar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Nome da Equipe</p>
                      <p className="font-medium">{confirmEquipeData?.nome}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-medium">{mockEmpresas.find(e => e.id.toString() === confirmEquipeData?.empresaId)?.name}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmEquipeData(null)}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-gradient-primary text-white"
                      onClick={() => {
                        toast({ title: "Sucesso!", description: "Equipe cadastrada com sucesso" });
                        setConfirmEquipeData(null);
                      }}
                    >
                      Confirmar Cadastro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome da equipe..." 
                  value={searchTerms.equipes}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, equipes: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[240px]">
                <div className="space-y-3 pr-4">
                  {mockEquipes.filter(equipe => 
                    equipe.name.toLowerCase().includes(searchTerms.equipes.toLowerCase())
                  ).map((equipe) => (
                    <div key={equipe.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{equipe.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {mockEmpresas.find(e => e.id === equipe.empresaId)?.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => { setEditingItem(equipe); setEditingType('equipe'); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Equipe</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Empresa</Label>
                                <Select defaultValue={equipe.empresaId.toString()}>
                                  <SelectTrigger>
                                    <SelectValue />
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
                                <Input defaultValue={equipe.name} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                className="w-full bg-gradient-primary text-white"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Equipe atualizada com sucesso" });
                                }}
                              >
                                Salvar Alterações
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a equipe "{equipe.name}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Equipe excluída com sucesso" });
                                }}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Gerenciamento de Metas */}
      <Collapsible open={openSections.metas} onOpenChange={() => toggleSection('metas')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Metas</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.metas ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Meta</Label>
                <Select onValueChange={(value) => (document.getElementById('meta-tipo') as any).dataset.tipo = value}>
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
                  <Select onValueChange={(value) => (document.getElementById('meta-empresa') as any).dataset.empresa = value}>
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
                  <Select onValueChange={(value) => (document.getElementById('meta-equipe') as any).dataset.equipe = value}>
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
                <Input id="meta-valor" type="number" placeholder="0,00" />
                <input type="hidden" id="meta-tipo" />
                <input type="hidden" id="meta-empresa" />
                <input type="hidden" id="meta-equipe" />
              </div>

              <Button 
                className="w-full bg-gradient-primary text-white"
                onClick={() => {
                  const valor = (document.getElementById('meta-valor') as HTMLInputElement)?.value;
                  const tipo = (document.getElementById('meta-tipo') as any)?.dataset.tipo;
                  const empresaId = (document.getElementById('meta-empresa') as any)?.dataset.empresa;
                  const equipeId = (document.getElementById('meta-equipe') as any)?.dataset.equipe;
                  if (valor && tipo && empresaId) {
                    setConfirmMetaData({ valor, tipo, empresaId, equipeId });
                  } else {
                    toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" });
                  }
                }}
              >
                <Target className="w-4 h-4 mr-2" />
                Cadastrar Meta
              </Button>

              <Dialog open={!!confirmMetaData} onOpenChange={(open) => !open && setConfirmMetaData(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Cadastro de Meta</DialogTitle>
                    <DialogDescription>Verifique os dados antes de cadastrar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{confirmMetaData?.tipo === 'empresa' ? 'Empresa' : 'Equipe'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-medium">{mockEmpresas.find(e => e.id.toString() === confirmMetaData?.empresaId)?.name}</p>
                    </div>
                    {confirmMetaData?.equipeId && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Equipe</p>
                        <p className="font-medium">{mockEquipes.find(eq => eq.id.toString() === confirmMetaData?.equipeId)?.name}</p>
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Valor da Meta</p>
                      <p className="font-medium">R$ {confirmMetaData?.valor}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmMetaData(null)}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-gradient-primary text-white"
                      onClick={() => {
                        toast({ title: "Sucesso!", description: "Meta cadastrada com sucesso" });
                        setConfirmMetaData(null);
                      }}
                    >
                      Confirmar Cadastro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por empresa ou equipe..." 
                  value={searchTerms.metas}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, metas: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[240px]">
                <div className="space-y-3 pr-4">
                  {mockMetas.filter(meta => {
                    const empresa = mockEmpresas.find(e => e.id === meta.empresaId);
                    const equipe = meta.equipeId ? mockEquipes.find(eq => eq.id === meta.equipeId) : null;
                    const searchTerm = searchTerms.metas.toLowerCase();
                    return (empresa?.name.toLowerCase().includes(searchTerm)) || 
                           (equipe?.name.toLowerCase().includes(searchTerm));
                  }).map((meta) => (
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => { setEditingItem(meta); setEditingType('meta'); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Meta</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Tipo de Meta</Label>
                                <Select defaultValue={meta.tipo}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="empresa">Empresa</SelectItem>
                                    <SelectItem value="equipe">Equipe</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Empresa</Label>
                                <Select defaultValue={meta.empresaId.toString()}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockEmpresas.map((empresa) => (
                                      <SelectItem key={empresa.id} value={empresa.id.toString()}>{empresa.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              {meta.tipo === 'equipe' && (
                                <div className="space-y-2">
                                  <Label>Equipe</Label>
                                  <Select defaultValue={meta.equipeId?.toString()}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {mockEquipes.map((equipe) => (
                                        <SelectItem key={equipe.id} value={equipe.id.toString()}>{equipe.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              <div className="space-y-2">
                                <Label>Valor da Meta (R$)</Label>
                                <Input type="number" defaultValue={meta.valor} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                className="w-full bg-gradient-primary text-white"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Meta atualizada com sucesso" });
                                }}
                              >
                                Salvar Alterações
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir esta meta? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Meta excluída com sucesso" });
                                }}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Gerenciamento de Comissões */}
      <Collapsible open={openSections.comissoes} onOpenChange={() => toggleSection('comissoes')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Percent className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Comissões</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.comissoes ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Comissão</Label>
                <Select onValueChange={(value) => (document.getElementById('comissao-tipo') as any).dataset.tipo = value}>
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
                  <Select onValueChange={(value) => (document.getElementById('comissao-empresa') as any).dataset.empresa = value}>
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
                  <Select onValueChange={(value) => (document.getElementById('comissao-equipe') as any).dataset.equipe = value}>
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
                <Input id="comissao-valor" type="number" placeholder="0" />
                <input type="hidden" id="comissao-tipo" />
                <input type="hidden" id="comissao-empresa" />
                <input type="hidden" id="comissao-equipe" />
              </div>

              <Button 
                className="w-full bg-gradient-primary text-white"
                onClick={() => {
                  const valor = (document.getElementById('comissao-valor') as HTMLInputElement)?.value;
                  const tipo = (document.getElementById('comissao-tipo') as any)?.dataset.tipo;
                  const empresaId = (document.getElementById('comissao-empresa') as any)?.dataset.empresa;
                  const equipeId = (document.getElementById('comissao-equipe') as any)?.dataset.equipe;
                  if (valor && tipo && empresaId) {
                    setConfirmComissaoData({ valor, tipo, empresaId, equipeId });
                  } else {
                    toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" });
                  }
                }}
              >
                <Percent className="w-4 h-4 mr-2" />
                Cadastrar Comissão
              </Button>

              <Dialog open={!!confirmComissaoData} onOpenChange={(open) => !open && setConfirmComissaoData(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Cadastro de Comissão</DialogTitle>
                    <DialogDescription>Verifique os dados antes de cadastrar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{confirmComissaoData?.tipo === 'empresa' ? 'Empresa' : 'Equipe'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-medium">{mockEmpresas.find(e => e.id.toString() === confirmComissaoData?.empresaId)?.name}</p>
                    </div>
                    {confirmComissaoData?.equipeId && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Equipe</p>
                        <p className="font-medium">{mockEquipes.find(eq => eq.id.toString() === confirmComissaoData?.equipeId)?.name}</p>
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Percentual</p>
                      <p className="font-medium">{confirmComissaoData?.valor}%</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmComissaoData(null)}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-gradient-primary text-white"
                      onClick={() => {
                        toast({ title: "Sucesso!", description: "Comissão cadastrada com sucesso" });
                        setConfirmComissaoData(null);
                      }}
                    >
                      Confirmar Cadastro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por empresa ou equipe..." 
                  value={searchTerms.comissoes}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, comissoes: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[240px]">
                <div className="space-y-3 pr-4">
                  {mockComissoes.filter(comissao => {
                    const empresa = mockEmpresas.find(e => e.id === comissao.empresaId);
                    const equipe = comissao.equipeId ? mockEquipes.find(eq => eq.id === comissao.equipeId) : null;
                    const searchTerm = searchTerms.comissoes.toLowerCase();
                    return (empresa?.name.toLowerCase().includes(searchTerm)) || 
                           (equipe?.name.toLowerCase().includes(searchTerm));
                  }).map((comissao) => (
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => { setEditingItem(comissao); setEditingType('comissao'); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Comissão</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Tipo de Comissão</Label>
                                <Select defaultValue={comissao.tipo}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="empresa">Empresa</SelectItem>
                                    <SelectItem value="equipe">Equipe</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Empresa</Label>
                                <Select defaultValue={comissao.empresaId.toString()}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockEmpresas.map((empresa) => (
                                      <SelectItem key={empresa.id} value={empresa.id.toString()}>{empresa.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              {comissao.tipo === 'equipe' && (
                                <div className="space-y-2">
                                  <Label>Equipe</Label>
                                  <Select defaultValue={comissao.equipeId?.toString()}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {mockEquipes.map((equipe) => (
                                        <SelectItem key={equipe.id} value={equipe.id.toString()}>{equipe.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              <div className="space-y-2">
                                <Label>Percentual de Comissão (%)</Label>
                                <Input type="number" defaultValue={comissao.valor} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                className="w-full bg-gradient-primary text-white"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Comissão atualizada com sucesso" });
                                }}
                              >
                                Salvar Alterações
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir esta comissão? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Comissão excluída com sucesso" });
                                }}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Gerenciamento de Produtos */}
      <Collapsible open={openSections.produtos} onOpenChange={() => toggleSection('produtos')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Produtos</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.produtos ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Select onValueChange={(value) => (document.getElementById('produto-empresa') as any).dataset.empresa = value}>
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
                  <Input id="produto-nome" placeholder="Nome do produto" />
                </div>
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input id="produto-valor" type="number" placeholder="0,00" />
                  <input type="hidden" id="produto-empresa" />
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-primary text-white"
                onClick={() => {
                  const nome = (document.getElementById('produto-nome') as HTMLInputElement)?.value;
                  const valor = (document.getElementById('produto-valor') as HTMLInputElement)?.value;
                  const empresaId = (document.getElementById('produto-empresa') as any)?.dataset.empresa;
                  if (nome && valor && empresaId) {
                    setConfirmProdutoData({ nome, valor, empresaId });
                  } else {
                    toast({ title: "Erro", description: "Preencha todos os campos", variant: "destructive" });
                  }
                }}
              >
                <Package className="w-4 h-4 mr-2" />
                Cadastrar Produto
              </Button>

              <Dialog open={!!confirmProdutoData} onOpenChange={(open) => !open && setConfirmProdutoData(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Cadastro de Produto</DialogTitle>
                    <DialogDescription>Verifique os dados antes de cadastrar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-medium">{mockEmpresas.find(e => e.id.toString() === confirmProdutoData?.empresaId)?.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Nome do Produto</p>
                      <p className="font-medium">{confirmProdutoData?.nome}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="font-medium">R$ {confirmProdutoData?.valor}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmProdutoData(null)}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-gradient-primary text-white"
                      onClick={() => {
                        toast({ title: "Sucesso!", description: "Produto cadastrado com sucesso" });
                        setConfirmProdutoData(null);
                      }}
                    >
                      Confirmar Cadastro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome do produto..." 
                  value={searchTerms.produtos}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, produtos: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[240px]">
                <div className="space-y-3 pr-4">
                  {mockProdutos.filter(produto => 
                    produto.name.toLowerCase().includes(searchTerms.produtos.toLowerCase())
                  ).map((produto) => (
                    <div key={produto.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{produto.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {mockEmpresas.find(e => e.id === produto.empresaId)?.name}
                        </p>
                        <p className="text-sm font-semibold text-success">R$ {produto.valor.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => { setEditingItem(produto); setEditingType('produto'); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Produto</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Empresa</Label>
                                <Select defaultValue={produto.empresaId.toString()}>
                                  <SelectTrigger>
                                    <SelectValue />
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
                                <Input defaultValue={produto.name} />
                              </div>
                              <div className="space-y-2">
                                <Label>Valor (R$)</Label>
                                <Input type="number" defaultValue={produto.valor} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                className="w-full bg-gradient-primary text-white"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Produto atualizado com sucesso" });
                                }}
                              >
                                Salvar Alterações
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o produto "{produto.name}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Produto excluído com sucesso" });
                                }}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Gerenciamento de Clientes */}
      <Collapsible open={openSections.clientes} onOpenChange={() => toggleSection('clientes')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <UserCircle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Clientes</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.clientes ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Select onValueChange={(value) => (document.getElementById('cliente-empresa') as any).dataset.empresa = value}>
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
                  <Input id="cliente-nome" placeholder="Nome do cliente" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input id="cliente-cnpj" placeholder="00.000.000/0001-00" />
                  <input type="hidden" id="cliente-empresa" />
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-primary text-white"
                onClick={() => {
                  const nome = (document.getElementById('cliente-nome') as HTMLInputElement)?.value;
                  const cnpj = (document.getElementById('cliente-cnpj') as HTMLInputElement)?.value;
                  const empresaId = (document.getElementById('cliente-empresa') as any)?.dataset.empresa;
                  if (nome && cnpj && empresaId) {
                    setConfirmClienteData({ nome, cnpj, empresaId });
                  } else {
                    toast({ title: "Erro", description: "Preencha todos os campos", variant: "destructive" });
                  }
                }}
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Cadastrar Cliente
              </Button>

              <Dialog open={!!confirmClienteData} onOpenChange={(open) => !open && setConfirmClienteData(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Cadastro de Cliente</DialogTitle>
                    <DialogDescription>Verifique os dados antes de cadastrar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="font-medium">{mockEmpresas.find(e => e.id.toString() === confirmClienteData?.empresaId)?.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Nome do Cliente</p>
                      <p className="font-medium">{confirmClienteData?.nome}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">CNPJ</p>
                      <p className="font-medium">{confirmClienteData?.cnpj}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmClienteData(null)}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-gradient-primary text-white"
                      onClick={() => {
                        toast({ title: "Sucesso!", description: "Cliente cadastrado com sucesso" });
                        setConfirmClienteData(null);
                      }}
                    >
                      Confirmar Cadastro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome do cliente..." 
                  value={searchTerms.clientes}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, clientes: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[240px]">
                <div className="space-y-3 pr-4">
                  {mockClientes.filter(cliente => 
                    cliente.name.toLowerCase().includes(searchTerms.clientes.toLowerCase())
                  ).map((cliente) => (
                    <div key={cliente.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{cliente.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {mockEmpresas.find(e => e.id === cliente.empresaId)?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{cliente.cnpj}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => { setEditingItem(cliente); setEditingType('cliente'); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Cliente</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Empresa</Label>
                                <Select defaultValue={cliente.empresaId.toString()}>
                                  <SelectTrigger>
                                    <SelectValue />
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
                                <Input defaultValue={cliente.name} />
                              </div>
                              <div className="space-y-2">
                                <Label>CNPJ</Label>
                                <Input defaultValue={cliente.cnpj} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                className="w-full bg-gradient-primary text-white"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Cliente atualizado com sucesso" });
                                }}
                              >
                                Salvar Alterações
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o cliente "{cliente.name}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Cliente excluído com sucesso" });
                                }}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Gerenciamento de Links */}
      <Collapsible open={openSections.links} onOpenChange={() => toggleSection('links')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Gerenciamento de Links</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.links ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Vendedor</Label>
                  <Select onValueChange={(value) => (document.getElementById('link-vendedor') as any).dataset.vendedor = value}>
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
                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input id="link-url" placeholder="https://" />
                  <input type="hidden" id="link-vendedor" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição (opcional)</Label>
                <Input id="link-descricao" placeholder="Descrição do link" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Empresa (opcional)</Label>
                  <Select onValueChange={(value) => (document.getElementById('link-empresa') as any).dataset.empresa = value}>
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
                  <Select onValueChange={(value) => (document.getElementById('link-equipe') as any).dataset.equipe = value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a equipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEquipes.map((equipe) => (
                        <SelectItem key={equipe.id} value={equipe.id.toString()}>{equipe.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" id="link-empresa" />
                  <input type="hidden" id="link-equipe" />
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-primary text-white"
                onClick={() => {
                  const url = (document.getElementById('link-url') as HTMLInputElement)?.value;
                  const vendedorId = (document.getElementById('link-vendedor') as any)?.dataset.vendedor;
                  const descricao = (document.getElementById('link-descricao') as HTMLInputElement)?.value;
                  const empresaId = (document.getElementById('link-empresa') as any)?.dataset.empresa;
                  const equipeId = (document.getElementById('link-equipe') as any)?.dataset.equipe;
                  if (url && vendedorId) {
                    setConfirmLinkData({ url, vendedorId, descricao, empresaId, equipeId });
                  } else {
                    toast({ title: "Erro", description: "Preencha os campos obrigatórios (Vendedor e Link)", variant: "destructive" });
                  }
                }}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Cadastrar Link
              </Button>

              <Dialog open={!!confirmLinkData} onOpenChange={(open) => !open && setConfirmLinkData(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Cadastro de Link</DialogTitle>
                    <DialogDescription>Verifique os dados antes de cadastrar</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Vendedor</p>
                      <p className="font-medium">{mockUsers.find(u => u.id.toString() === confirmLinkData?.vendedorId)?.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Link</p>
                      <p className="font-medium truncate">{confirmLinkData?.url}</p>
                    </div>
                    {confirmLinkData?.descricao && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Descrição</p>
                        <p className="font-medium">{confirmLinkData?.descricao}</p>
                      </div>
                    )}
                    {confirmLinkData?.empresaId && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Empresa</p>
                        <p className="font-medium">{mockEmpresas.find(e => e.id.toString() === confirmLinkData?.empresaId)?.name}</p>
                      </div>
                    )}
                    {confirmLinkData?.equipeId && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Equipe</p>
                        <p className="font-medium">{mockEquipes.find(eq => eq.id.toString() === confirmLinkData?.equipeId)?.name}</p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmLinkData(null)}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-gradient-primary text-white"
                      onClick={() => {
                        toast({ title: "Sucesso!", description: "Link cadastrado com sucesso" });
                        setConfirmLinkData(null);
                      }}
                    >
                      Confirmar Cadastro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome do vendedor..." 
                  value={searchTerms.links}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, links: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[240px]">
                <div className="space-y-3 pr-4">
                  {mockLinks.filter(link => {
                    const vendedor = mockUsers.find(u => u.id === link.vendedorId);
                    return vendedor?.name.toLowerCase().includes(searchTerms.links.toLowerCase());
                  }).map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{link.descricao}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-md">{link.link}</p>
                        <p className="text-sm text-muted-foreground">
                          {mockUsers.find(u => u.id === link.vendedorId)?.name}
                          {link.empresaId && ` - ${mockEmpresas.find(e => e.id === link.empresaId)?.name}`}
                          {link.equipeId && ` - ${mockEquipes.find(eq => eq.id === link.equipeId)?.name}`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => { setEditingItem(link); setEditingType('link'); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Link</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Vendedor</Label>
                                <Select defaultValue={link.vendedorId.toString()}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockUsers.map((user) => (
                                      <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Link</Label>
                                <Input defaultValue={link.link} />
                              </div>
                              <div className="space-y-2">
                                <Label>Descrição (opcional)</Label>
                                <Input defaultValue={link.descricao} />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Empresa (opcional)</Label>
                                  <Select defaultValue={link.empresaId?.toString()}>
                                    <SelectTrigger>
                                      <SelectValue />
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
                                  <Select defaultValue={link.equipeId?.toString()}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {mockEquipes.map((equipe) => (
                                        <SelectItem key={equipe.id} value={equipe.id.toString()}>{equipe.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                className="w-full bg-gradient-primary text-white"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Link atualizado com sucesso" });
                                }}
                              >
                                Salvar Alterações
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir este link? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => {
                                  toast({ title: "Sucesso!", description: "Link excluído com sucesso" });
                                }}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
