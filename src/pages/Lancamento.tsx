import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { PlusCircle, DollarSign, User, Calendar as CalendarIcon, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data
const mockClientes = [
  'Tech Corp', 'Digital Solutions', 'InnovaWeb', 'Smart Systems', 'Cloud Services',
  'Data Analytics', 'Web Masters', 'Mobile First', 'Cyber Security', 'AI Labs'
];

const mockProdutos = [
  'Software License', 'Consultoria', 'Desenvolvimento Web', 'Suporte Técnico',
  'Treinamento', 'Hospedagem', 'Design Gráfico', 'Marketing Digital', 'SEO', 'Analytics'
];

export default function Lancamento() {
  const [date, setDate] = useState<Date>(new Date());
  const [openCliente, setOpenCliente] = useState(false);
  const [openProduto, setOpenProduto] = useState(false);
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");

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
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Nova Venda</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vendedor">Vendedor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ana">Ana Silva</SelectItem>
                    <SelectItem value="carlos">Carlos Santos</SelectItem>
                    <SelectItem value="maria">Maria Costa</SelectItem>
                    <SelectItem value="joao">João Oliveira</SelectItem>
                    <SelectItem value="luiza">Luiza Ferreira</SelectItem>
                    <SelectItem value="pedro">Pedro Almeida</SelectItem>
                  </SelectContent>
                </Select>
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
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pedido">Número do Pedido</Label>
                <Input 
                  id="pedido"
                  placeholder="Ex: PED-2024-001"
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

            <Button className="w-full bg-gradient-primary text-white shadow-glow hover:shadow-xl transition-all">
              <PlusCircle className="w-4 h-4 mr-2" />
              Registrar Venda
            </Button>
          </div>
        </Card>

        {/* Aprovações pendentes */}
        <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Liberações de Lançamentos</h2>
            <p className="text-muted-foreground text-sm">
              Aprovar ou negar lançamentos pendentes dos vendedores
            </p>
            
            <div className="space-y-3">
              {/* Mock pending approvals */}
              {[
                { id: 1, seller: 'Ana Silva', value: 'R$ 8.500', client: 'Tech Corp', date: '2024-01-15', product: 'Software License' },
                { id: 2, seller: 'João Oliveira', value: 'R$ 3.200', client: 'Digital Solutions', date: '2024-01-15', product: 'Consultoria' },
                { id: 3, seller: 'Luiza Ferreira', value: 'R$ 12.800', client: 'InnovaWeb', date: '2024-01-14', product: 'Desenvolvimento Web' },
              ].map((approval) => (
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
                        <p className="font-semibold text-foreground truncate">{approval.seller}</p>
                        <p className="text-sm text-muted-foreground truncate">{approval.client}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" className="bg-gradient-success text-white shadow-glow">
                        Aprovar
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                        Negar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Valor</span>
                      <span className="font-semibold text-success text-base">{approval.value}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Produto</span>
                      <span className="font-medium text-foreground text-sm truncate">{approval.product}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Data</span>
                      <span className="font-medium text-foreground text-sm">{approval.date}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty state */}
              {false && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma liberação pendente no momento</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}