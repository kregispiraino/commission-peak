import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, DollarSign, User, Calendar as CalendarIcon, Check, CheckCheck, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  listarLancamentosPendentes, 
  cadastrarLancamento, 
  aprovarLancamento, 
  negarLancamento,
  aprovarTodosLancamentos,
  negarTodosLancamentos,
  type Lancamento
} from '@/backend/api/lancamentos';
import { useIdAscora } from '@/hooks/useCadastros';

// Mock data
const mockVendedores = [
  'Ana Silva', 'Carlos Santos', 'Maria Costa', 'João Oliveira', 'Luiza Ferreira', 'Pedro Almeida'
];

const mockClientes = [
  'Tech Corp', 'Digital Solutions', 'InnovaWeb', 'Smart Systems', 'Cloud Services',
  'Data Analytics', 'Web Masters', 'Mobile First', 'Cyber Security', 'AI Labs'
];

const mockProdutos = [
  'Software License', 'Consultoria', 'Desenvolvimento Web', 'Suporte Técnico',
  'Treinamento', 'Hospedagem', 'Design Gráfico', 'Marketing Digital', 'SEO', 'Analytics'
];

export default function Lancamento() {
  const { toast } = useToast();
  const { data: idAscora } = useIdAscora();
  const [date, setDate] = useState<Date>(new Date());
  const [openVendedor, setOpenVendedor] = useState(false);
  const [openCliente, setOpenCliente] = useState(false);
  const [openProduto, setOpenProduto] = useState(false);
  const [vendedor, setVendedor] = useState("");
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [pedido, setPedido] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [lancamentosPendentes, setLancamentosPendentes] = useState<Lancamento[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar lançamentos pendentes
  useEffect(() => {
    if (idAscora) {
      carregarLancamentos();
    }
  }, [idAscora]);

  const carregarLancamentos = async () => {
    if (!idAscora) return;
    
    try {
      setIsLoading(true);
      const lancamentos = await listarLancamentosPendentes(idAscora);
      setLancamentosPendentes(lancamentos);
    } catch (error) {
      toast({
        title: "Erro ao carregar lançamentos",
        description: "Não foi possível carregar os lançamentos pendentes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrarVenda = () => {
    if (!vendedor || !valor || !pedido || !cliente || !produto) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos antes de registrar a venda.",
        variant: "destructive",
      });
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirmarVenda = async () => {
    if (!idAscora) {
      toast({
        title: "Erro",
        description: "ID Ascora não encontrado. Por favor, faça login novamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const resultado = await cadastrarLancamento({
        vendedor,
        cliente,
        produto,
        valor: parseFloat(valor),
        pedido,
        data: format(date, "yyyy-MM-dd"),
        id_ascora: idAscora,
      });

      if (resultado.success) {
        toast({
          title: "Venda registrada!",
          description: "A venda foi enviada para aprovação com sucesso.",
        });
        setShowConfirmDialog(false);
        // Reset form
        setVendedor("");
        setCliente("");
        setProduto("");
        setValor("");
        setPedido("");
        setDate(new Date());
        // Recarregar lançamentos
        carregarLancamentos();
      } else {
        throw new Error(resultado.error || 'Erro ao registrar venda');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao registrar venda",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAprovarIndividual = async (id: string) => {
    try {
      setIsLoading(true);
      const resultado = await aprovarLancamento(id);
      
      if (resultado.success) {
        toast({
          title: "Lançamento aprovado!",
          description: "O lançamento foi aprovado com sucesso.",
        });
        carregarLancamentos();
      } else {
        throw new Error(resultado.error || 'Erro ao aprovar lançamento');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao aprovar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNegarIndividual = async (id: string) => {
    try {
      setIsLoading(true);
      const resultado = await negarLancamento(id);
      
      if (resultado.success) {
        toast({
          title: "Lançamento negado!",
          description: "O lançamento foi negado.",
          variant: "destructive",
        });
        carregarLancamentos();
      } else {
        throw new Error(resultado.error || 'Erro ao negar lançamento');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao negar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAprovarTodos = async () => {
    if (!idAscora) return;
    
    try {
      setIsLoading(true);
      const resultado = await aprovarTodosLancamentos(idAscora);
      
      if (resultado.success) {
        toast({
          title: "Todos aprovados!",
          description: "Todas as liberações pendentes foram aprovadas.",
        });
        carregarLancamentos();
      } else {
        throw new Error(resultado.error || 'Erro ao aprovar todos');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao aprovar todos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNegarTodos = async () => {
    if (!idAscora) return;
    
    try {
      setIsLoading(true);
      const resultado = await negarTodosLancamentos(idAscora);
      
      if (resultado.success) {
        toast({
          title: "Todos negados!",
          description: "Todas as liberações pendentes foram negadas.",
          variant: "destructive",
        });
        carregarLancamentos();
      } else {
        throw new Error(resultado.error || 'Erro ao negar todos');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao negar todos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <PlusCircle className="w-4 h-4 text-white" />
          </div>
          Lançamento de Vendas
        </h1>
        <p className="text-muted-foreground">
          Registre uma nova venda e acompanhe o progresso da equipe
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário de lançamento */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl h-fit">
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground">Nova Venda</h2>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="vendedor">Vendedor</Label>
                <Popover open={openVendedor} onOpenChange={setOpenVendedor}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input
                        value={vendedor}
                        onChange={(e) => {
                          setVendedor(e.target.value);
                          setOpenVendedor(true);
                        }}
                        placeholder="Digite ou selecione o vendedor"
                        className="pr-10"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar vendedor..." value={vendedor} onValueChange={setVendedor} />
                      <CommandList>
                        <CommandEmpty>Nenhum vendedor encontrado.</CommandEmpty>
                        <CommandGroup heading="Vendedores Cadastrados">
                          {mockVendedores
                            .filter((v) => v.toLowerCase().includes(vendedor.toLowerCase()))
                            .map((vendedorItem) => (
                              <CommandItem
                                key={vendedorItem}
                                value={vendedorItem}
                                onSelect={(currentValue) => {
                                  setVendedor(currentValue);
                                  setOpenVendedor(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    vendedor.toLowerCase() === vendedorItem.toLowerCase() ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {vendedorItem}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor da Venda</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="valor"
                    placeholder="0,00"
                    className="pl-10"
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pedido">Número do Pedido</Label>
                <Input 
                  id="pedido"
                  placeholder="Ex: PED-2024-001"
                  value={pedido}
                  onChange={(e) => setPedido(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data da Venda</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : <span>Selecione a data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Popover open={openCliente} onOpenChange={setOpenCliente}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input
                        value={cliente}
                        onChange={(e) => {
                          setCliente(e.target.value);
                          setOpenCliente(true);
                        }}
                        placeholder="Digite ou selecione o cliente"
                        className="pr-10"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar cliente..." value={cliente} onValueChange={setCliente} />
                      <CommandList>
                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                        <CommandGroup heading="Clientes Cadastrados">
                          {mockClientes
                            .filter((c) => c.toLowerCase().includes(cliente.toLowerCase()))
                            .map((clienteItem) => (
                              <CommandItem
                                key={clienteItem}
                                value={clienteItem}
                                onSelect={(currentValue) => {
                                  setCliente(currentValue);
                                  setOpenCliente(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    cliente.toLowerCase() === clienteItem.toLowerCase() ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {clienteItem}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="produto">Produto/Serviço</Label>
                <Popover open={openProduto} onOpenChange={setOpenProduto}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input
                        value={produto}
                        onChange={(e) => {
                          setProduto(e.target.value);
                          setOpenProduto(true);
                        }}
                        placeholder="Digite ou selecione o produto"
                        className="pr-10"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar produto..." value={produto} onValueChange={setProduto} />
                      <CommandList>
                        <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                        <CommandGroup heading="Produtos Cadastrados">
                          {mockProdutos
                            .filter((p) => p.toLowerCase().includes(produto.toLowerCase()))
                            .map((produtoItem) => (
                              <CommandItem
                                key={produtoItem}
                                value={produtoItem}
                                onSelect={(currentValue) => {
                                  setProduto(currentValue);
                                  setOpenProduto(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    produto.toLowerCase() === produtoItem.toLowerCase() ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {produtoItem}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-primary text-white shadow-glow hover:shadow-xl transition-all"
              onClick={handleRegistrarVenda}
              disabled={isLoading}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              {isLoading ? 'Processando...' : 'Registrar Venda'}
            </Button>
          </div>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Lançamento</DialogTitle>
              <DialogDescription>
                Revise os dados da venda antes de enviar para aprovação
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Vendedor</p>
                  <p className="font-medium">{vendedor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="font-medium text-success">R$ {valor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{cliente}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Produto/Serviço</p>
                  <p className="font-medium">{produto}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Pedido</p>
                  <p className="font-medium">{pedido}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{format(date, "dd/MM/yyyy")}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Cancelar
              </Button>
              <Button 
                className="bg-gradient-primary text-white"
                onClick={handleConfirmarVenda}
              >
                Confirmar e Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Aprovações pendentes */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl h-fit">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Liberações de Lançamentos</h2>
            
            <div className="flex justify-center">
              <div className="inline-flex gap-2 p-2 bg-card/50 rounded-lg border border-border/50">
              <Button 
                size="sm" 
                className="bg-gradient-success text-white shadow-sm hover:shadow-md transition-all"
                onClick={handleAprovarTodos}
                disabled={isLoading || lancamentosPendentes.length === 0}
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                Aprovar Todos
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-destructive border-destructive/20 hover:bg-destructive/10 transition-all"
                onClick={handleNegarTodos}
                disabled={isLoading || lancamentosPendentes.length === 0}
              >
                <X className="w-4 h-4 mr-1" />
                Negar Todos
              </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[420px] pr-4">
              <div className="space-y-3">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Carregando lançamentos...
                </div>
              ) : lancamentosPendentes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum lançamento pendente
                </div>
              ) : (
                lancamentosPendentes.map((approval) => (
                  <div 
                    key={approval.id}
                    className="p-5 bg-card rounded-lg border border-border hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-white" />
                      </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{approval.vendedor}</p>
                          <p className="text-sm text-muted-foreground truncate">{approval.cliente}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button 
                          size="sm" 
                          className="bg-gradient-success text-white shadow-glow"
                          onClick={() => handleAprovarIndividual(approval.id)}
                          disabled={isLoading}
                        >
                          Aprovar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive border-destructive/20 hover:bg-destructive/10"
                          onClick={() => handleNegarIndividual(approval.id)}
                          disabled={isLoading}
                        >
                          Negar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Valor</span>
                        <span className="font-semibold text-success text-base">R$ {approval.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Produto</span>
                        <span className="font-medium text-foreground text-sm truncate">{approval.produto}</span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Data</span>
                        <span className="font-medium text-foreground text-sm">{format(new Date(approval.data), 'dd/MM/yyyy')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>
    </div>
  );
}