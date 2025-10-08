import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Users, Building2, ChevronRight, Target, Percent, Package, UserCircle, Link as LinkIcon, Trash2, Edit, Plus, Award, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUsuarios, useEmpresas, useEquipes } from '@/hooks/useCadastros';
import { useMetas, useComissoes, useProdutos, useClientes, useLinks, usePremiacoes } from '@/hooks/useCadastrosExtended';
import { uploadFotoPremiacao } from '@/backend/api/premiacoes';
import { SearchableSelect } from '@/components/SearchableSelect';

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
  const { premiacoes, isLoading: loadingPremiacoes, createPremiacao, updatePremiacao, deletePremiacao } = usePremiacoes();
  
  // Form states
  const [newUsuario, setNewUsuario] = useState({ 
    nome: '', 
    email: '',
    senha: '',
    acesso: 'vendedor' as 'master' | 'administrador' | 'vendedor',
    empresa_id: '', 
    equipe_id: '', 
    comissao_percentual: '',
    meta_individual: '',
    is_vendedor: true 
  });
  const [newEmpresa, setNewEmpresa] = useState({ nome: '', cnpj: '' });
  const [newEquipe, setNewEquipe] = useState({ nome: '', empresa_id: '' });
  const [newMeta, setNewMeta] = useState({ tipo: 'empresa', valor_alvo: '', empresa_id: '', equipe_id: '' });
  const [newComissao, setNewComissao] = useState({ tipo: 'empresa', percentual: '', empresa_id: '', equipe_id: '' });
  const [newProduto, setNewProduto] = useState({ empresa_id: '', nome: '', descricao: '', codigo: '', preco: '' });
  const [newCliente, setNewCliente] = useState({ empresa_id: '', nome: '', email: '', telefone: '', cpf_cnpj: '' });
  const [newLink, setNewLink] = useState({ titulo: '', url: '', vendedor_id: '' });
  const [newPremiacao, setNewPremiacao] = useState({ descricao: '', foto_url: '', empresa_id: '', equipe_id: '' });
  const [fotoPremiacao, setFotoPremiacao] = useState<File | null>(null);
  const [searchTerms, setSearchTerms] = useState({
    usuarios_empresa: '',
    usuarios_equipe: '',
    equipes_empresa: '',
    metas_empresa: '',
    metas_equipe: '',
    comissoes_empresa: '',
    comissoes_equipe: '',
    produtos_empresa: '',
    clientes_empresa: '',
    links_vendedor: '',
    premiacoes_empresa: '',
    premiacoes_equipe: ''
  });
  
  const [openSections, setOpenSections] = useState({
    usuarios: false,
    empresas: false,
    equipes: false,
    metas: false,
    comissoes: false,
    produtos: false,
    clientes: false,
    links: false,
    premiacoes: false
  });

  const [dialogOpen, setDialogOpen] = useState({
    usuarios: false,
    empresas: false,
    equipes: false,
    metas: false,
    comissoes: false,
    produtos: false,
    clientes: false,
    links: false,
    premiacoes: false
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string } | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const openDialog = (section: keyof typeof dialogOpen, item: any = null) => {
    setEditingItem(item);
    if (item) {
      // Preencher formulário com dados do item para edição
      switch(section) {
        case 'usuarios':
          setNewUsuario({
            nome: item.nome || '',
            email: item.email || '',
            senha: '',
            acesso: item.acesso || 'vendedor',
            empresa_id: item.empresa_id || '',
            equipe_id: item.equipe_id || '',
            comissao_percentual: item.comissao_percentual?.toString() || '',
            meta_individual: item.meta_individual?.toString() || '',
            is_vendedor: item.is_vendedor ?? true
          });
          break;
        case 'empresas':
          setNewEmpresa({ nome: item.nome || '', cnpj: item.cnpj || '' });
          break;
        case 'equipes':
          setNewEquipe({ 
            nome: item.nome || '', 
            empresa_id: item.empresa_id || ''
          });
          break;
        case 'metas':
          setNewMeta({
            tipo: item.tipo || 'empresa',
            valor_alvo: item.valor_alvo?.toString() || '',
            empresa_id: item.empresa_id || '',
            equipe_id: item.equipe_id || ''
          });
          break;
        case 'comissoes':
          setNewComissao({
            tipo: item.tipo || 'empresa',
            percentual: item.percentual?.toString() || '',
            empresa_id: item.empresa_id || '',
            equipe_id: item.equipe_id || ''
          });
          break;
        case 'produtos':
          setNewProduto({
            empresa_id: item.empresa_id || '',
            nome: item.nome || '',
            descricao: item.descricao || '',
            codigo: item.codigo || '',
            preco: item.preco?.toString() || ''
          });
          break;
        case 'clientes':
          setNewCliente({
            empresa_id: item.empresa_id || '',
            nome: item.nome || '',
            email: item.email || '',
            telefone: item.telefone || '',
            cpf_cnpj: item.cpf_cnpj || ''
          });
          break;
        case 'links':
          setNewLink({
            titulo: item.titulo || '',
            url: item.url || '',
            vendedor_id: item.vendedor_id || ''
          });
          break;
        case 'premiacoes':
          setNewPremiacao({
            descricao: item.descricao || '',
            foto_url: item.foto_url || '',
            empresa_id: item.empresa_id || '',
            equipe_id: item.equipe_id || ''
          });
          setFotoPremiacao(null);
          break;
      }
    }
    setDialogOpen(prev => ({ ...prev, [section]: true }));
  };

  const closeDialog = (section: keyof typeof dialogOpen) => {
    setDialogOpen(prev => ({ ...prev, [section]: false }));
    setEditingItem(null);
    // Reset forms
    setNewUsuario({ nome: '', email: '', senha: '', acesso: 'vendedor', empresa_id: '', equipe_id: '', comissao_percentual: '', meta_individual: '', is_vendedor: true });
    setNewEmpresa({ nome: '', cnpj: '' });
    setNewEquipe({ nome: '', empresa_id: '' });
    setNewMeta({ tipo: 'empresa', valor_alvo: '', empresa_id: '', equipe_id: '' });
    setNewComissao({ tipo: 'empresa', percentual: '', empresa_id: '', equipe_id: '' });
    setNewProduto({ empresa_id: '', nome: '', descricao: '', codigo: '', preco: '' });
    setNewCliente({ empresa_id: '', nome: '', email: '', telefone: '', cpf_cnpj: '' });
    setNewLink({ titulo: '', url: '', vendedor_id: '' });
    setNewPremiacao({ descricao: '', foto_url: '', empresa_id: '', equipe_id: '' });
    setFotoPremiacao(null);
  };

  const confirmDelete = (type: string, id: string) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    switch(itemToDelete.type) {
      case 'usuario':
        await deleteUsuario(itemToDelete.id);
        break;
      case 'empresa':
        await deleteEmpresa(itemToDelete.id);
        break;
      case 'equipe':
        await deleteEquipe(itemToDelete.id);
        break;
      case 'meta':
        await deleteMeta(itemToDelete.id);
        break;
      case 'comissao':
        await deleteComissao(itemToDelete.id);
        break;
      case 'produto':
        await deleteProduto(itemToDelete.id);
        break;
      case 'cliente':
        await deleteCliente(itemToDelete.id);
        break;
      case 'link':
        await deleteLink(itemToDelete.id);
        break;
      case 'premiacao':
        await deletePremiacao(itemToDelete.id);
        break;
    }
    
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  
  // Handler functions
  const handleCreateUsuario = async () => {
    if (!newUsuario.nome || !newUsuario.email || !newUsuario.senha) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios (Nome, Email e Senha)", variant: "destructive" });
      return;
    }
    if (editingItem) {
      await updateUsuario({
        id: editingItem.id,
        ...newUsuario,
        empresa_id: newUsuario.empresa_id || null,
        equipe_id: newUsuario.equipe_id || null,
        comissao_percentual: newUsuario.comissao_percentual ? parseFloat(newUsuario.comissao_percentual) : 0,
        meta_individual: newUsuario.meta_individual ? parseFloat(newUsuario.meta_individual) : 0
      } as any);
    } else {
      await createUsuario({
        ...newUsuario,
        empresa_id: newUsuario.empresa_id || null,
        equipe_id: newUsuario.equipe_id || null,
        comissao_percentual: newUsuario.comissao_percentual ? parseFloat(newUsuario.comissao_percentual) : 0,
        meta_individual: newUsuario.meta_individual ? parseFloat(newUsuario.meta_individual) : 0
      } as any);
    }
    closeDialog('usuarios');
  };
  
  const handleCreateEmpresa = async () => {
    if (!newEmpresa.nome) {
      toast({ title: "Erro", description: "Preencha o nome da empresa", variant: "destructive" });
      return;
    }
    if (editingItem) {
      await updateEmpresa({ id: editingItem.id, ...newEmpresa } as any);
    } else {
      await createEmpresa(newEmpresa as any);
    }
    closeDialog('empresas');
  };
  
  const handleCreateEquipe = async () => {
    if (!newEquipe.nome || !newEquipe.empresa_id) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    if (editingItem) {
      await updateEquipe({ id: editingItem.id, ...newEquipe } as any);
    } else {
      await createEquipe(newEquipe as any);
    }
    closeDialog('equipes');
  };
  
  const handleCreateMeta = async () => {
    if (!newMeta.valor_alvo) {
      toast({ title: "Erro", description: "Preencha o valor alvo", variant: "destructive" });
      return;
    }
    if (editingItem) {
      await updateMeta({
        id: editingItem.id,
        ...newMeta,
        valor_alvo: parseFloat(newMeta.valor_alvo),
        empresa_id: newMeta.tipo === 'empresa' ? newMeta.empresa_id : null,
        equipe_id: newMeta.tipo === 'equipe' ? newMeta.equipe_id : null
      } as any);
    } else {
      await createMeta({
        ...newMeta,
        valor_alvo: parseFloat(newMeta.valor_alvo),
        empresa_id: newMeta.tipo === 'empresa' ? newMeta.empresa_id : null,
        equipe_id: newMeta.tipo === 'equipe' ? newMeta.equipe_id : null
      } as any);
    }
    closeDialog('metas');
  };
  
  const handleCreateComissao = async () => {
    if (!newComissao.percentual) {
      toast({ title: "Erro", description: "Preencha o percentual da comissão", variant: "destructive" });
      return;
    }
    if (editingItem) {
      await updateComissao({
        id: editingItem.id,
        ...newComissao,
        percentual: parseFloat(newComissao.percentual),
        empresa_id: newComissao.tipo === 'empresa' ? newComissao.empresa_id : null,
        equipe_id: newComissao.tipo === 'equipe' ? newComissao.equipe_id : null
      } as any);
    } else {
      await createComissao({
        ...newComissao,
        percentual: parseFloat(newComissao.percentual),
        empresa_id: newComissao.tipo === 'empresa' ? newComissao.empresa_id : null,
        equipe_id: newComissao.tipo === 'equipe' ? newComissao.equipe_id : null
      } as any);
    }
    closeDialog('comissoes');
  };
  
  const handleCreateProduto = async () => {
    if (!newProduto.empresa_id || !newProduto.nome) {
      toast({ title: "Erro", description: "Preencha a empresa e o nome do produto", variant: "destructive" });
      return;
    }
    if (editingItem) {
      await updateProduto({
        id: editingItem.id,
        ...newProduto,
        preco: newProduto.preco ? parseFloat(newProduto.preco) : null
      } as any);
    } else {
      await createProduto({
        ...newProduto,
        preco: newProduto.preco ? parseFloat(newProduto.preco) : null
      } as any);
    }
    closeDialog('produtos');
  };
  
  const handleCreateCliente = async () => {
    if (!newCliente.empresa_id || !newCliente.nome) {
      toast({ title: "Erro", description: "Preencha a empresa e o nome do cliente", variant: "destructive" });
      return;
    }
    if (editingItem) {
      await updateCliente({ id: editingItem.id, ...newCliente } as any);
    } else {
      await createCliente(newCliente as any);
    }
    closeDialog('clientes');
  };
  
  const handleCreateLink = async () => {
    if (!newLink.titulo || !newLink.url || !newLink.vendedor_id) {
      toast({ title: "Erro", description: "Preencha título, URL e vendedor", variant: "destructive" });
      return;
    }
    if (editingItem) {
      await updateLink({ id: editingItem.id, ...newLink } as any);
    } else {
      await createLink(newLink as any);
    }
    closeDialog('links');
  };

  const handleCreatePremiacao = async () => {
    if (!newPremiacao.descricao || !newPremiacao.empresa_id) {
      toast({ title: "Erro", description: "Preencha a descrição e selecione a empresa", variant: "destructive" });
      return;
    }

    let fotoUrl = newPremiacao.foto_url;
    
    // Upload da foto se houver
    if (fotoPremiacao) {
      const uploadResult = await uploadFotoPremiacao(fotoPremiacao);
      if (uploadResult.success && uploadResult.url) {
        fotoUrl = uploadResult.url;
      } else {
        toast({ title: "Erro", description: "Falha ao fazer upload da foto", variant: "destructive" });
        return;
      }
    }

    const premiacaoData = {
      ...newPremiacao,
      foto_url: fotoUrl,
      equipe_id: newPremiacao.equipe_id || null
    };

    if (editingItem) {
      await updatePremiacao({ id: editingItem.id, ...premiacaoData } as any);
    } else {
      await createPremiacao(premiacaoData as any);
    }
    closeDialog('premiacoes');
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoPremiacao(e.target.files[0]);
    }
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

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.usuarios} onOpenChange={(open) => !open && closeDialog('usuarios')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('usuarios')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Nome *</Label>
                        <Input value={newUsuario.nome} onChange={(e) => setNewUsuario({ ...newUsuario, nome: e.target.value })} placeholder="Nome completo" />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input type="email" value={newUsuario.email} onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })} placeholder="email@empresa.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Senha *</Label>
                        <Input type="password" value={newUsuario.senha} onChange={(e) => setNewUsuario({ ...newUsuario, senha: e.target.value })} placeholder="Senha do usuário" />
                      </div>
                      <div>
                        <Label>Nível de Acesso *</Label>
                        <Select value={newUsuario.acesso} onValueChange={(value: any) => setNewUsuario({ ...newUsuario, acesso: value })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="master">Master</SelectItem>
                            <SelectItem value="administrador">Administrador</SelectItem>
                            <SelectItem value="vendedor">Vendedor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Empresa</Label>
                        <SearchableSelect
                          value={newUsuario.empresa_id}
                          onValueChange={(value) => setNewUsuario({ ...newUsuario, empresa_id: value })}
                          placeholder="Selecione a empresa"
                          searchPlaceholder="Buscar empresa..."
                          items={empresas?.map(e => ({ id: e.id!, label: e.nome })) || []}
                        />
                      </div>
                      <div>
                        <Label>Equipe</Label>
                        <SearchableSelect
                          value={newUsuario.equipe_id}
                          onValueChange={(value) => setNewUsuario({ ...newUsuario, equipe_id: value })}
                          placeholder="Selecione a equipe"
                          searchPlaceholder="Buscar equipe..."
                          items={equipes?.map(e => ({ id: e.id!, label: e.nome })) || []}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Comissão (%)</Label>
                        <Input type="number" step="0.01" value={newUsuario.comissao_percentual} onChange={(e) => setNewUsuario({ ...newUsuario, comissao_percentual: e.target.value })} />
                      </div>
                      <div>
                        <Label>Meta Individual (R$)</Label>
                        <Input type="number" step="0.01" value={newUsuario.meta_individual} onChange={(e) => setNewUsuario({ ...newUsuario, meta_individual: e.target.value })} />
                      </div>
                    </div>
                    <Button onClick={handleCreateUsuario} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingUsuarios ? (
                <div className="text-center py-8">Carregando...</div>
              ) : usuarios && usuarios.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Acesso</TableHead>
                        <TableHead>Comissão</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuarios.map((usuario) => (
                        <TableRow key={usuario.id}>
                          <TableCell className="font-medium">{usuario.nome}</TableCell>
                          <TableCell>{usuario.email}</TableCell>
                          <TableCell className="capitalize">{usuario.acesso}</TableCell>
                          <TableCell>{usuario.comissao_percentual}%</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('usuarios', usuario)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('usuario', usuario.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhum usuário cadastrado</div>
              )}
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
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.empresas} onOpenChange={(open) => !open && closeDialog('empresas')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('empresas')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Nova Empresa
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Empresa' : 'Nova Empresa'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nome da Empresa *</Label>
                      <Input value={newEmpresa.nome} onChange={(e) => setNewEmpresa({ ...newEmpresa, nome: e.target.value })} placeholder="Nome da empresa" />
                    </div>
                    <div>
                      <Label>CNPJ</Label>
                      <Input value={newEmpresa.cnpj} onChange={(e) => setNewEmpresa({ ...newEmpresa, cnpj: e.target.value })} placeholder="00.000.000/0001-00" />
                    </div>
                    <Button onClick={handleCreateEmpresa} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingEmpresas ? (
                <div className="text-center py-8">Carregando...</div>
              ) : empresas && empresas.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>CNPJ</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {empresas.map((empresa) => (
                        <TableRow key={empresa.id}>
                          <TableCell className="font-medium">{empresa.nome}</TableCell>
                          <TableCell>{empresa.cnpj || '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('empresas', empresa)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('empresa', empresa.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhuma empresa cadastrada</div>
              )}
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
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.equipes} onOpenChange={(open) => !open && closeDialog('equipes')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('equipes')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Nova Equipe
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Equipe' : 'Nova Equipe'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nome da Equipe *</Label>
                      <Input value={newEquipe.nome} onChange={(e) => setNewEquipe({ ...newEquipe, nome: e.target.value })} placeholder="Nome da equipe" />
                    </div>
                    <div>
                      <Label>Empresa *</Label>
                      <SearchableSelect
                        value={newEquipe.empresa_id}
                        onValueChange={(value) => setNewEquipe({ ...newEquipe, empresa_id: value })}
                        placeholder="Selecione a empresa"
                        searchPlaceholder="Buscar empresa..."
                        items={empresas?.map(e => ({ id: e.id!, label: e.nome })) || []}
                      />
                    </div>
                    <Button onClick={handleCreateEquipe} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingEquipes ? (
                <div className="text-center py-8">Carregando...</div>
              ) : equipes && equipes.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {equipes.map((equipe) => (
                        <TableRow key={equipe.id}>
                          <TableCell className="font-medium">{equipe.nome}</TableCell>
                          <TableCell>{(equipe as any).empresa?.nome || '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('equipes', equipe)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('equipe', equipe.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhuma equipe cadastrada</div>
              )}
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
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.metas} onOpenChange={(open) => !open && closeDialog('metas')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('metas')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Nova Meta
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Meta' : 'Nova Meta'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Valor Alvo (R$) *</Label>
                      <Input type="number" step="0.01" value={newMeta.valor_alvo} onChange={(e) => setNewMeta({ ...newMeta, valor_alvo: e.target.value })} placeholder="Valor da meta" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Tipo *</Label>
                        <Select value={newMeta.tipo} onValueChange={(value) => setNewMeta({ ...newMeta, tipo: value })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="empresa">Empresa</SelectItem>
                            <SelectItem value="equipe">Equipe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {newMeta.tipo === 'empresa' ? (
                        <div>
                          <Label>Empresa *</Label>
                          <SearchableSelect
                            value={newMeta.empresa_id}
                            onValueChange={(value) => setNewMeta({ ...newMeta, empresa_id: value })}
                            placeholder="Selecione"
                            searchPlaceholder="Buscar empresa..."
                            items={empresas?.map(e => ({ id: e.id!, label: e.nome })) || []}
                          />
                        </div>
                      ) : (
                        <div>
                          <Label>Equipe *</Label>
                          <SearchableSelect
                            value={newMeta.equipe_id}
                            onValueChange={(value) => setNewMeta({ ...newMeta, equipe_id: value })}
                            placeholder="Selecione"
                            searchPlaceholder="Buscar equipe..."
                            items={equipes?.map(e => ({ id: e.id!, label: e.nome })) || []}
                          />
                        </div>
                      )}
                    </div>
                    <Button onClick={handleCreateMeta} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingMetas ? (
                <div className="text-center py-8">Carregando...</div>
              ) : metas && metas.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Valor Alvo</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Empresa/Equipe</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {metas.map((meta) => (
                        <TableRow key={meta.id}>
                          <TableCell className="font-medium">R$ {meta.valor_alvo}</TableCell>
                          <TableCell className="capitalize">{meta.tipo}</TableCell>
                          <TableCell>{meta.tipo === 'empresa' ? (meta as any).empresa?.nome : (meta as any).equipe?.nome || '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('metas', meta)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('meta', meta.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhuma meta cadastrada</div>
              )}
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
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.comissoes} onOpenChange={(open) => !open && closeDialog('comissoes')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('comissoes')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Nova Comissão
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Comissão' : 'Nova Comissão'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Percentual (%) *</Label>
                      <Input type="number" step="0.01" value={newComissao.percentual} onChange={(e) => setNewComissao({ ...newComissao, percentual: e.target.value })} placeholder="Ex: 5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Tipo *</Label>
                        <Select value={newComissao.tipo} onValueChange={(value) => setNewComissao({ ...newComissao, tipo: value })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="empresa">Empresa</SelectItem>
                            <SelectItem value="equipe">Equipe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {newComissao.tipo === 'empresa' ? (
                        <div>
                          <Label>Empresa *</Label>
                          <SearchableSelect
                            value={newComissao.empresa_id}
                            onValueChange={(value) => setNewComissao({ ...newComissao, empresa_id: value })}
                            placeholder="Selecione"
                            searchPlaceholder="Buscar empresa..."
                            items={empresas?.map(e => ({ id: e.id!, label: e.nome })) || []}
                          />
                        </div>
                      ) : (
                        <div>
                          <Label>Equipe *</Label>
                          <SearchableSelect
                            value={newComissao.equipe_id}
                            onValueChange={(value) => setNewComissao({ ...newComissao, equipe_id: value })}
                            placeholder="Selecione"
                            searchPlaceholder="Buscar equipe..."
                            items={equipes?.map(e => ({ id: e.id!, label: e.nome })) || []}
                          />
                        </div>
                      )}
                    </div>
                    <Button onClick={handleCreateComissao} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingComissoes ? (
                <div className="text-center py-8">Carregando...</div>
              ) : comissoes && comissoes.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Percentual</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Empresa/Equipe</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comissoes.map((comissao) => (
                        <TableRow key={comissao.id}>
                          <TableCell className="font-medium">{comissao.percentual}%</TableCell>
                          <TableCell className="capitalize">{comissao.tipo}</TableCell>
                          <TableCell>{comissao.tipo === 'empresa' ? (comissao as any).empresa?.nome : (comissao as any).equipe?.nome || '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('comissoes', comissao)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('comissao', comissao.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhuma comissão cadastrada</div>
              )}
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
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.produtos} onOpenChange={(open) => !open && closeDialog('produtos')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('produtos')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Empresa *</Label>
                      <SearchableSelect
                        value={newProduto.empresa_id}
                        onValueChange={(value) => setNewProduto({ ...newProduto, empresa_id: value })}
                        placeholder="Selecione a empresa"
                        searchPlaceholder="Buscar empresa..."
                        items={empresas?.map(e => ({ id: e.id!, label: e.nome })) || []}
                      />
                    </div>
                    <div>
                      <Label>Nome do Produto *</Label>
                      <Input value={newProduto.nome} onChange={(e) => setNewProduto({ ...newProduto, nome: e.target.value })} placeholder="Nome do produto" />
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Input value={newProduto.descricao} onChange={(e) => setNewProduto({ ...newProduto, descricao: e.target.value })} placeholder="Descrição" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Código</Label>
                        <Input value={newProduto.codigo} onChange={(e) => setNewProduto({ ...newProduto, codigo: e.target.value })} placeholder="Código" />
                      </div>
                      <div>
                        <Label>Preço (R$)</Label>
                        <Input type="number" step="0.01" value={newProduto.preco} onChange={(e) => setNewProduto({ ...newProduto, preco: e.target.value })} />
                      </div>
                    </div>
                    <Button onClick={handleCreateProduto} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingProdutos ? (
                <div className="text-center py-8">Carregando...</div>
              ) : produtos && produtos.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {produtos.map((produto) => (
                        <TableRow key={produto.id}>
                          <TableCell>{(produto as any).empresa?.nome || '-'}</TableCell>
                          <TableCell className="font-medium">{produto.nome}</TableCell>
                          <TableCell>{produto.codigo || '-'}</TableCell>
                          <TableCell>{produto.preco ? `R$ ${produto.preco}` : '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('produtos', produto)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('produto', produto.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhum produto cadastrado</div>
              )}
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
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.clientes} onOpenChange={(open) => !open && closeDialog('clientes')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('clientes')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Novo Cliente
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Empresa *</Label>
                      <SearchableSelect
                        value={newCliente.empresa_id}
                        onValueChange={(value) => setNewCliente({ ...newCliente, empresa_id: value })}
                        placeholder="Selecione a empresa"
                        searchPlaceholder="Buscar empresa..."
                        items={empresas?.map(e => ({ id: e.id!, label: e.nome })) || []}
                      />
                    </div>
                    <div>
                      <Label>Nome do Cliente *</Label>
                      <Input value={newCliente.nome} onChange={(e) => setNewCliente({ ...newCliente, nome: e.target.value })} placeholder="Nome do cliente" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <Input type="email" value={newCliente.email} onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })} placeholder="email@exemplo.com" />
                      </div>
                      <div>
                        <Label>Telefone</Label>
                        <Input value={newCliente.telefone} onChange={(e) => setNewCliente({ ...newCliente, telefone: e.target.value })} placeholder="(00) 00000-0000" />
                      </div>
                    </div>
                    <div>
                      <Label>CPF/CNPJ</Label>
                      <Input value={newCliente.cpf_cnpj} onChange={(e) => setNewCliente({ ...newCliente, cpf_cnpj: e.target.value })} placeholder="000.000.000-00" />
                    </div>
                    <Button onClick={handleCreateCliente} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingClientes ? (
                <div className="text-center py-8">Carregando...</div>
              ) : clientes && clientes.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>CPF/CNPJ</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>{(cliente as any).empresa?.nome || '-'}</TableCell>
                          <TableCell className="font-medium">{cliente.nome}</TableCell>
                          <TableCell>{cliente.email || '-'}</TableCell>
                          <TableCell>{cliente.telefone || '-'}</TableCell>
                          <TableCell>{cliente.cpf_cnpj || '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('clientes', cliente)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('cliente', cliente.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhum cliente cadastrado</div>
              )}
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
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.links} onOpenChange={(open) => !open && closeDialog('links')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('links')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Novo Link
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Link' : 'Novo Link'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Título *</Label>
                      <Input value={newLink.titulo} onChange={(e) => setNewLink({ ...newLink, titulo: e.target.value })} placeholder="Título do link" />
                    </div>
                    <div>
                      <Label>URL *</Label>
                      <Input value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} placeholder="https://exemplo.com" />
                    </div>
                    <div>
                      <Label>Vendedor *</Label>
                      <SearchableSelect
                        value={newLink.vendedor_id}
                        onValueChange={(value) => setNewLink({ ...newLink, vendedor_id: value })}
                        placeholder="Selecione o vendedor"
                        searchPlaceholder="Buscar vendedor..."
                        items={usuarios?.filter(u => u.is_vendedor).map(u => ({ id: u.id!, label: u.nome })) || []}
                      />
                    </div>
                    <Button onClick={handleCreateLink} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingLinks ? (
                <div className="text-center py-8">Carregando...</div>
              ) : links && links.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Vendedor</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {links.map((link) => (
                        <TableRow key={link.id}>
                          <TableCell className="font-medium">{link.titulo}</TableCell>
                          <TableCell className="max-w-xs truncate">{link.url}</TableCell>
                          <TableCell>{(link as any).vendedor?.nome || '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('links', link)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('link', link.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhum link cadastrado</div>
              )}
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Premiações */}
      <Collapsible open={openSections.premiacoes} onOpenChange={() => toggleSection('premiacoes')}>
        <Card className="bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <div className="p-6 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Premiações</h2>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${openSections.premiacoes ? 'rotate-90' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-6 space-y-4">
              <Dialog open={dialogOpen.premiacoes} onOpenChange={(open) => !open && closeDialog('premiacoes')}>
                <DialogTrigger asChild>
                  <Button onClick={() => openDialog('premiacoes')} className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Nova Premiação
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Editar Premiação' : 'Nova Premiação'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Descrição *</Label>
                      <Textarea 
                        value={newPremiacao.descricao} 
                        onChange={(e) => setNewPremiacao({ ...newPremiacao, descricao: e.target.value })} 
                        placeholder="Descrição da premiação"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Foto da Premiação</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <Input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFotoChange}
                            className="flex-1"
                          />
                          <Button type="button" variant="outline" size="icon">
                            <Upload className="w-4 h-4" />
                          </Button>
                        </div>
                        {(fotoPremiacao || newPremiacao.foto_url) && (
                          <div className="mt-2">
                            <img 
                              src={fotoPremiacao ? URL.createObjectURL(fotoPremiacao) : newPremiacao.foto_url} 
                              alt="Preview" 
                              className="w-full h-40 object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Empresa *</Label>
                        <Select value={newPremiacao.empresa_id} onValueChange={(value) => setNewPremiacao({ ...newPremiacao, empresa_id: value })}>
                          <SelectTrigger><SelectValue placeholder="Selecione a empresa" /></SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <Input 
                              placeholder="Buscar empresa..." 
                              value={searchTerms.premiacoes_empresa}
                              onChange={(e) => setSearchTerms({ ...searchTerms, premiacoes_empresa: e.target.value })}
                              className="mb-2"
                            />
                            <ScrollArea className="h-32">
                              {empresas
                                ?.filter(e => e.nome.toLowerCase().includes(searchTerms.premiacoes_empresa.toLowerCase()))
                                .map(empresa => (
                                  <SelectItem key={empresa.id} value={empresa.id}>{empresa.nome}</SelectItem>
                                ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Equipe (Opcional)</Label>
                        <Select value={newPremiacao.equipe_id} onValueChange={(value) => setNewPremiacao({ ...newPremiacao, equipe_id: value })}>
                          <SelectTrigger><SelectValue placeholder="Selecione a equipe" /></SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <Input 
                              placeholder="Buscar equipe..." 
                              value={searchTerms.premiacoes_equipe}
                              onChange={(e) => setSearchTerms({ ...searchTerms, premiacoes_equipe: e.target.value })}
                              className="mb-2"
                            />
                            <ScrollArea className="h-32">
                              {equipes
                                ?.filter(e => e.nome.toLowerCase().includes(searchTerms.premiacoes_equipe.toLowerCase()))
                                .map(equipe => (
                                  <SelectItem key={equipe.id} value={equipe.id}>{equipe.nome}</SelectItem>
                                ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleCreatePremiacao} className="w-full bg-gradient-primary text-white">
                      {editingItem ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {loadingPremiacoes ? (
                <div className="text-center py-8">Carregando...</div>
              ) : premiacoes && premiacoes.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Foto</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Equipe</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {premiacoes.map((premiacao) => (
                        <TableRow key={premiacao.id}>
                          <TableCell>
                            {premiacao.foto_url ? (
                              <img src={premiacao.foto_url} alt="Premiação" className="w-16 h-16 object-cover rounded-md" />
                            ) : (
                              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                                <Award className="w-8 h-8 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium max-w-xs">{premiacao.descricao}</TableCell>
                          <TableCell>{(premiacao as any).empresa?.nome || '-'}</TableCell>
                          <TableCell>{(premiacao as any).equipe?.nome || '-'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openDialog('premiacoes', premiacao)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => confirmDelete('premiacao', premiacao.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Nenhuma premiação cadastrada</div>
              )}
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}