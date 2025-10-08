import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Building2, ChevronRight, Target, Percent, Package, UserCircle, Link as LinkIcon, Trash2, Edit, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUsuarios, useEmpresas, useEquipes } from '@/hooks/useCadastros';
import { useMetas, useComissoes, useProdutos, useClientes, useLinks } from '@/hooks/useCadastrosExtended';

export default function Cadastros() {
  const { toast } = useToast();
  
  // Hooks do banco de dados
  const { usuarios, isLoading: loadingUsuarios, createUsuario, updateUsuario, deleteUsuario } = useUsuarios();
  const { empresas, isLoading: loadingEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } = useEmpresas();
  const { equipes, isLoading: loadingEquipes, createEquipe, updateEquipe, deleteEquipe } = useEquipes();
  const { metas, isLoading: loadingMetas, createMeta, updateMeta, deleteMeta } = useMetas();
  const { comissoes, isLoading: loadingComissoes, createComissao, updateComissao, deleteComissao } = useComissoes();
  const { produtos, isLoading: loadingProdutos, createProduto, updateProduto, deleteProduto } = useProdutos();
  const { clientes, isLoading: loadingClientes, createCliente, updateCliente, deleteCliente } = useClientes();
  const { links, isLoading: loadingLinks, createLink, updateLink, deleteLink } = useLinks();
  
  // Form states
  const [newUsuario, setNewUsuario] = useState({ 
    nome: '', 
    email: '', 
    acesso: 'vendedor' as 'master' | 'administrador' | 'vendedor',
    empresa_id: '', 
    equipe_id: '', 
    comissao_percentual: '',
    meta_individual: '',
    is_vendedor: true 
  });
  const [newEmpresa, setNewEmpresa] = useState({ nome: '', cnpj: '' });
  const [newEquipe, setNewEquipe] = useState({ nome: '', descricao: '', empresa_id: '', lider_id: '' });
  const [newMeta, setNewMeta] = useState({ titulo: '', descricao: '', tipo: 'empresa', valor_alvo: '', data_inicio: '', data_fim: '', empresa_id: '', equipe_id: '' });
  const [newComissao, setNewComissao] = useState({ nome: '', tipo: 'empresa', percentual: '', valor_fixo: '', empresa_id: '', equipe_id: '' });
  const [newProduto, setNewProduto] = useState({ nome: '', descricao: '', codigo: '', preco: '', categoria: '' });
  const [newCliente, setNewCliente] = useState({ nome: '', email: '', telefone: '', cpf_cnpj: '', endereco: '' });
  const [newLink, setNewLink] = useState({ titulo: '', url: '', descricao: '', categoria: '', vendedor_id: '', empresa_id: '', equipe_id: '' });
  
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
  
  // Handler functions
  const handleCreateUsuario = async () => {
    if (!newUsuario.nome || !newUsuario.email) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios (Nome e Email)", variant: "destructive" });
      return;
    }
    createUsuario({
      ...newUsuario,
      comissao_percentual: newUsuario.comissao_percentual ? parseFloat(newUsuario.comissao_percentual) : 0,
      meta_individual: newUsuario.meta_individual ? parseFloat(newUsuario.meta_individual) : 0
    } as any);
    setNewUsuario({ 
      nome: '', 
      email: '', 
      acesso: 'vendedor' as 'master' | 'administrador' | 'vendedor',
      empresa_id: '', 
      equipe_id: '', 
      comissao_percentual: '',
      meta_individual: '',
      is_vendedor: true 
    });
  };
  
  const handleCreateEmpresa = async () => {
    if (!newEmpresa.nome) {
      toast({ title: "Erro", description: "Preencha o nome da empresa", variant: "destructive" });
      return;
    }
    createEmpresa(newEmpresa as any);
    setNewEmpresa({ nome: '', cnpj: '' });
  };
  
  const handleCreateEquipe = async () => {
    if (!newEquipe.nome || !newEquipe.empresa_id) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    createEquipe(newEquipe as any);
    setNewEquipe({ nome: '', descricao: '', empresa_id: '', lider_id: '' });
  };
  
  const handleCreateMeta = async () => {
    if (!newMeta.titulo || !newMeta.valor_alvo) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    createMeta({
      ...newMeta,
      valor_alvo: parseFloat(newMeta.valor_alvo),
      empresa_id: newMeta.tipo === 'empresa' ? newMeta.empresa_id : null,
      equipe_id: newMeta.tipo === 'equipe' ? newMeta.equipe_id : null
    } as any);
    setNewMeta({ titulo: '', descricao: '', tipo: 'empresa', valor_alvo: '', data_inicio: '', data_fim: '', empresa_id: '', equipe_id: '' });
  };
  
  const handleCreateComissao = async () => {
    if (!newComissao.nome) {
      toast({ title: "Erro", description: "Preencha o nome da comissão", variant: "destructive" });
      return;
    }
    createComissao({
      ...newComissao,
      percentual: newComissao.percentual ? parseFloat(newComissao.percentual) : null,
      valor_fixo: newComissao.valor_fixo ? parseFloat(newComissao.valor_fixo) : null,
      empresa_id: newComissao.tipo === 'empresa' ? newComissao.empresa_id : null,
      equipe_id: newComissao.tipo === 'equipe' ? newComissao.equipe_id : null
    } as any);
    setNewComissao({ nome: '', tipo: 'empresa', percentual: '', valor_fixo: '', empresa_id: '', equipe_id: '' });
  };
  
  const handleCreateProduto = async () => {
    if (!newProduto.nome) {
      toast({ title: "Erro", description: "Preencha o nome do produto", variant: "destructive" });
      return;
    }
    createProduto({
      ...newProduto,
      preco: newProduto.preco ? parseFloat(newProduto.preco) : null
    } as any);
    setNewProduto({ nome: '', descricao: '', codigo: '', preco: '', categoria: '' });
  };
  
  const handleCreateCliente = async () => {
    if (!newCliente.nome) {
      toast({ title: "Erro", description: "Preencha o nome do cliente", variant: "destructive" });
      return;
    }
    createCliente(newCliente as any);
    setNewCliente({ nome: '', email: '', telefone: '', cpf_cnpj: '', endereco: '' });
  };
  
  const handleCreateLink = async () => {
    if (!newLink.titulo || !newLink.url) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    createLink(newLink as any);
    setNewLink({ titulo: '', url: '', descricao: '', categoria: '', vendedor_id: '', empresa_id: '', equipe_id: '' });
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

      {/* Usuários */}
      <Collapsible open={openSections.usuarios} onOpenChange={() => toggleSection('usuarios')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <UserCircle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Usuários</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.usuarios ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome *</Label>
                  <Input 
                    value={newUsuario.nome}
                    onChange={(e) => setNewUsuario({ ...newUsuario, nome: e.target.value })}
                    placeholder="Nome completo" 
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input 
                    type="email"
                    value={newUsuario.email}
                    onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
                    placeholder="email@empresa.com" 
                  />
                </div>
              </div>
              <div>
                <Label>Nível de Acesso *</Label>
                <Select value={newUsuario.acesso} onValueChange={(value: 'master' | 'administrador' | 'vendedor') => setNewUsuario({ ...newUsuario, acesso: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de acesso" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="master">Master</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Empresa</Label>
                  <Select value={newUsuario.empresa_id} onValueChange={(value) => setNewUsuario({ ...newUsuario, empresa_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {empresas?.map(empresa => (
                        <SelectItem key={empresa.id} value={empresa.id}>{empresa.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Equipe</Label>
                  <Select value={newUsuario.equipe_id} onValueChange={(value) => setNewUsuario({ ...newUsuario, equipe_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a equipe" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {equipes?.map(equipe => (
                        <SelectItem key={equipe.id} value={equipe.id}>{equipe.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Percentual de Comissão (%)</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={newUsuario.comissao_percentual}
                    onChange={(e) => setNewUsuario({ ...newUsuario, comissao_percentual: e.target.value })}
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <Label>Meta Individual (R$)</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={newUsuario.meta_individual}
                    onChange={(e) => setNewUsuario({ ...newUsuario, meta_individual: e.target.value })}
                    placeholder="0.00" 
                  />
                </div>
              </div>
              <Button onClick={handleCreateUsuario} className="w-full bg-gradient-primary text-white" disabled={loadingUsuarios}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Usuário
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar usuário..." 
                  value={searchTerms.usuarios}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, usuarios: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-4">
                  {usuarios?.filter(usuario => 
                    usuario.nome.toLowerCase().includes(searchTerms.usuarios.toLowerCase())
                  ).map((usuario) => (
                    <div key={usuario.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{usuario.nome}</p>
                        <p className="text-sm text-muted-foreground">{usuario.email}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          {usuario.acesso && <span>Acesso: {usuario.acesso}</span>}
                          {usuario.comissao_percentual > 0 && <span>Comissão: {usuario.comissao_percentual}%</span>}
                          {usuario.meta_individual > 0 && <span>Meta: R$ {usuario.meta_individual}</span>}
                        </div>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteUsuario(usuario.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Empresas */}
      <Collapsible open={openSections.empresas} onOpenChange={() => toggleSection('empresas')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Empresas</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.empresas ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Empresa</Label>
                  <Input 
                    value={newEmpresa.nome}
                    onChange={(e) => setNewEmpresa({ ...newEmpresa, nome: e.target.value })}
                    placeholder="Nome da empresa" 
                  />
                </div>
                <div>
                  <Label>CNPJ</Label>
                  <Input 
                    value={newEmpresa.cnpj}
                    onChange={(e) => setNewEmpresa({ ...newEmpresa, cnpj: e.target.value })}
                    placeholder="00.000.000/0001-00" 
                  />
                </div>
              </div>
              <Button onClick={handleCreateEmpresa} className="w-full bg-gradient-primary text-white" disabled={loadingEmpresas}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Empresa
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar empresa..." 
                  value={searchTerms.empresas}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, empresas: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-4">
                  {empresas?.filter(empresa => 
                    empresa.nome.toLowerCase().includes(searchTerms.empresas.toLowerCase())
                  ).map((empresa) => (
                    <div key={empresa.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{empresa.nome}</p>
                        <p className="text-sm text-muted-foreground">{empresa.cnpj}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteEmpresa(empresa.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Equipes */}
      <Collapsible open={openSections.equipes} onOpenChange={() => toggleSection('equipes')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Equipes</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.equipes ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Equipe</Label>
                  <Input 
                    value={newEquipe.nome}
                    onChange={(e) => setNewEquipe({ ...newEquipe, nome: e.target.value })}
                    placeholder="Nome da equipe" 
                  />
                </div>
                <div>
                  <Label>Empresa</Label>
                  <Select value={newEquipe.empresa_id} onValueChange={(value) => setNewEquipe({ ...newEquipe, empresa_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {empresas?.map(empresa => (
                        <SelectItem key={empresa.id} value={empresa.id}>{empresa.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Descrição</Label>
                <Input 
                  value={newEquipe.descricao}
                  onChange={(e) => setNewEquipe({ ...newEquipe, descricao: e.target.value })}
                  placeholder="Descrição da equipe" 
                />
              </div>
              <Button onClick={handleCreateEquipe} className="w-full bg-gradient-primary text-white" disabled={loadingEquipes}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Equipe
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar equipe..." 
                  value={searchTerms.equipes}
                  onChange={(e) => setSearchTerms(prev => ({ ...prev, equipes: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-4">
                  {equipes?.filter(equipe => 
                    equipe.nome.toLowerCase().includes(searchTerms.equipes.toLowerCase())
                  ).map((equipe) => (
                    <div key={equipe.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{equipe.nome}</p>
                        <p className="text-sm text-muted-foreground">{equipe.descricao}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteEquipe(equipe.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Metas */}
      <Collapsible open={openSections.metas} onOpenChange={() => toggleSection('metas')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Metas</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.metas ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Título</Label>
                  <Input 
                    value={newMeta.titulo}
                    onChange={(e) => setNewMeta({ ...newMeta, titulo: e.target.value })}
                    placeholder="Título da meta" 
                  />
                </div>
                <div>
                  <Label>Valor Alvo (R$)</Label>
                  <Input 
                    type="number"
                    value={newMeta.valor_alvo}
                    onChange={(e) => setNewMeta({ ...newMeta, valor_alvo: e.target.value })}
                    placeholder="0.00" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Tipo</Label>
                  <Select value={newMeta.tipo} onValueChange={(value) => setNewMeta({ ...newMeta, tipo: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empresa">Empresa</SelectItem>
                      <SelectItem value="equipe">Equipe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newMeta.tipo === 'empresa' && (
                  <div>
                    <Label>Empresa</Label>
                    <Select value={newMeta.empresa_id} onValueChange={(value) => setNewMeta({ ...newMeta, empresa_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {empresas?.map(empresa => (
                          <SelectItem key={empresa.id} value={empresa.id}>{empresa.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {newMeta.tipo === 'equipe' && (
                  <div>
                    <Label>Equipe</Label>
                    <Select value={newMeta.equipe_id} onValueChange={(value) => setNewMeta({ ...newMeta, equipe_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipes?.map(equipe => (
                          <SelectItem key={equipe.id} value={equipe.id}>{equipe.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <Button onClick={handleCreateMeta} className="w-full bg-gradient-primary text-white" disabled={loadingMetas}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Meta
              </Button>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-4">
                  {metas?.map((meta) => (
                    <div key={meta.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{meta.titulo}</p>
                        <p className="text-sm text-muted-foreground">Valor: R$ {meta.valor_alvo}</p>
                        <p className="text-xs text-muted-foreground">Tipo: {meta.tipo}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteMeta(meta.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Comissões */}
      <Collapsible open={openSections.comissoes} onOpenChange={() => toggleSection('comissoes')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Percent className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Comissões</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.comissoes ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input 
                    value={newComissao.nome}
                    onChange={(e) => setNewComissao({ ...newComissao, nome: e.target.value })}
                    placeholder="Nome da comissão" 
                  />
                </div>
                <div>
                  <Label>Percentual (%)</Label>
                  <Input 
                    type="number"
                    value={newComissao.percentual}
                    onChange={(e) => setNewComissao({ ...newComissao, percentual: e.target.value })}
                    placeholder="0.00" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Tipo</Label>
                  <Select value={newComissao.tipo} onValueChange={(value) => setNewComissao({ ...newComissao, tipo: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empresa">Empresa</SelectItem>
                      <SelectItem value="equipe">Equipe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newComissao.tipo === 'empresa' && (
                  <div>
                    <Label>Empresa</Label>
                    <Select value={newComissao.empresa_id} onValueChange={(value) => setNewComissao({ ...newComissao, empresa_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {empresas?.map(empresa => (
                          <SelectItem key={empresa.id} value={empresa.id}>{empresa.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {newComissao.tipo === 'equipe' && (
                  <div>
                    <Label>Equipe</Label>
                    <Select value={newComissao.equipe_id} onValueChange={(value) => setNewComissao({ ...newComissao, equipe_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipes?.map(equipe => (
                          <SelectItem key={equipe.id} value={equipe.id}>{equipe.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <Button onClick={handleCreateComissao} className="w-full bg-gradient-primary text-white" disabled={loadingComissoes}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Comissão
              </Button>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-4">
                  {comissoes?.map((comissao) => (
                    <div key={comissao.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{comissao.nome}</p>
                        <p className="text-sm text-muted-foreground">Percentual: {comissao.percentual}%</p>
                        <p className="text-xs text-muted-foreground">Tipo: {comissao.tipo}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteComissao(comissao.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Produtos */}
      <Collapsible open={openSections.produtos} onOpenChange={() => toggleSection('produtos')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Produtos</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.produtos ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input 
                    value={newProduto.nome}
                    onChange={(e) => setNewProduto({ ...newProduto, nome: e.target.value })}
                    placeholder="Nome do produto" 
                  />
                </div>
                <div>
                  <Label>Preço (R$)</Label>
                  <Input 
                    type="number"
                    value={newProduto.preco}
                    onChange={(e) => setNewProduto({ ...newProduto, preco: e.target.value })}
                    placeholder="0.00" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Código</Label>
                  <Input 
                    value={newProduto.codigo}
                    onChange={(e) => setNewProduto({ ...newProduto, codigo: e.target.value })}
                    placeholder="Código" 
                  />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <Input 
                    value={newProduto.categoria}
                    onChange={(e) => setNewProduto({ ...newProduto, categoria: e.target.value })}
                    placeholder="Categoria" 
                  />
                </div>
              </div>
              <Button onClick={handleCreateProduto} className="w-full bg-gradient-primary text-white" disabled={loadingProdutos}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto
              </Button>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-4">
                  {produtos?.map((produto) => (
                    <div key={produto.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{produto.nome}</p>
                        <p className="text-sm text-muted-foreground">Preço: R$ {produto.preco}</p>
                        <p className="text-xs text-muted-foreground">Código: {produto.codigo}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteProduto(produto.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Clientes */}
      <Collapsible open={openSections.clientes} onOpenChange={() => toggleSection('clientes')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <UserCircle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Clientes</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.clientes ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input 
                    value={newCliente.nome}
                    onChange={(e) => setNewCliente({ ...newCliente, nome: e.target.value })}
                    placeholder="Nome do cliente" 
                  />
                </div>
                <div>
                  <Label>CPF/CNPJ</Label>
                  <Input 
                    value={newCliente.cpf_cnpj}
                    onChange={(e) => setNewCliente({ ...newCliente, cpf_cnpj: e.target.value })}
                    placeholder="000.000.000-00" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input 
                    value={newCliente.email}
                    onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
                    placeholder="email@cliente.com" 
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input 
                    value={newCliente.telefone}
                    onChange={(e) => setNewCliente({ ...newCliente, telefone: e.target.value })}
                    placeholder="(00) 00000-0000" 
                  />
                </div>
              </div>
              <Button onClick={handleCreateCliente} className="w-full bg-gradient-primary text-white" disabled={loadingClientes}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Cliente
              </Button>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-4">
                  {clientes?.map((cliente) => (
                    <div key={cliente.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{cliente.nome}</p>
                        <p className="text-sm text-muted-foreground">{cliente.email}</p>
                        <p className="text-xs text-muted-foreground">CPF/CNPJ: {cliente.cpf_cnpj}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteCliente(cliente.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Links */}
      <Collapsible open={openSections.links} onOpenChange={() => toggleSection('links')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Links</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.links ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Título</Label>
                  <Input 
                    value={newLink.titulo}
                    onChange={(e) => setNewLink({ ...newLink, titulo: e.target.value })}
                    placeholder="Título do link" 
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input 
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="https://..." 
                  />
                </div>
              </div>
              <div>
                <Label>Vendedor</Label>
                <Select value={newLink.vendedor_id} onValueChange={(value) => setNewLink({ ...newLink, vendedor_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {usuarios?.filter(u => u.is_vendedor).map(usuario => (
                      <SelectItem key={usuario.id} value={usuario.id}>{usuario.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateLink} className="w-full bg-gradient-primary text-white" disabled={loadingLinks}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Link
              </Button>

              <ScrollArea className="h-[300px]">
                <div className="space-y-3 pr-4">
                  {links?.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{link.titulo}</p>
                        <p className="text-sm text-muted-foreground">{link.url}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => deleteLink(link.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
