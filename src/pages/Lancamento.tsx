import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, DollarSign, User, Calendar } from 'lucide-react';

export default function Lancamento() {
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
                <Label htmlFor="cliente">Cliente</Label>
                <Input 
                  id="cliente"
                  placeholder="Nome do cliente"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data da Venda</Label>
                <Input 
                  id="data"
                  type="date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="produto">Produto/Serviço</Label>
                <Input 
                  id="produto"
                  placeholder="Descrição do produto ou serviço"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-primary text-white shadow-glow hover:shadow-xl transition-all">
              <PlusCircle className="w-4 h-4 mr-2" />
              Registrar Venda
            </Button>
          </div>
        </Card>

        {/* Resumo rápido */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Vendas Hoje</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold text-success">R$ 15.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Quantidade</span>
                <span className="font-semibold">3 vendas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ticket Médio</span>
                <span className="font-semibold">R$ 5.000</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top Vendedores Hoje</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Ana Silva</span>
                </div>
                <span className="text-success font-semibold">R$ 8.000</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium">Carlos Santos</span>
                </div>
                <span className="text-success font-semibold">R$ 4.500</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium">Maria Costa</span>
                </div>
                <span className="text-success font-semibold">R$ 2.500</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}