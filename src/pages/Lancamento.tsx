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
                <Label htmlFor="pedido">Número do Pedido (Opcional)</Label>
                <Input 
                  id="pedido"
                  placeholder="Ex: PED-2024-001"
                />
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

        {/* Aprovações pendentes */}
        <Card className="lg:col-span-2 p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
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
                  className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{approval.seller}</p>
                        <p className="text-sm text-muted-foreground">{approval.client}</p>
                      </div>
                    </div>
                    <div className="ml-10 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Valor:</span>
                        <span className="ml-2 font-semibold text-success">{approval.value}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Produto:</span>
                        <span className="ml-2 font-medium">{approval.product}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data:</span>
                        <span className="ml-2 font-medium">{approval.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" className="bg-gradient-success text-white shadow-glow">
                      Aprovar
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                      Negar
                    </Button>
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