import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Code, Key, Database, ShoppingCart, Webhook } from 'lucide-react';

const Desenvolvedor = () => {
  return (
    <div className="min-h-screen bg-gradient-backdrop p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Code className="w-6 h-6 text-white" />
            </div>
            Desenvolvedor
          </h1>
          <p className="text-muted-foreground">
            Configure integrações com sistemas ERP e plataformas de venda
          </p>
        </div>

        {/* API Configuration */}
        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="bg-gradient-glass border border-glass-border backdrop-blur-xl">
            <TabsTrigger value="api-keys" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Chaves API
            </TabsTrigger>
            <TabsTrigger value="erp" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Integração ERP
            </TabsTrigger>
            <TabsTrigger value="ecommerce" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              E-commerce
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Webhook className="w-4 h-4" />
              Webhooks
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Chaves de API</h3>
                    <p className="text-sm text-muted-foreground">
                      Gerencie suas chaves de acesso à API do Ascora
                    </p>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    Ativo
                  </Badge>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label>Chave Pública</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="text" 
                        value="pk_live_51H..." 
                        readOnly 
                        className="bg-muted/50"
                      />
                      <Button variant="outline">Copiar</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Chave Secreta</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="password" 
                        value="sk_live_51H..." 
                        readOnly 
                        className="bg-muted/50"
                      />
                      <Button variant="outline">Copiar</Button>
                    </div>
                  </div>

                  <Button className="w-full mt-4">
                    Gerar Nova Chave
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* ERP Integration Tab */}
          <TabsContent value="erp" className="space-y-6">
            <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Integração com ERP</h3>
                <p className="text-sm text-muted-foreground">
                  Configure a sincronização com seu sistema ERP
                </p>

                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label>URL do ERP</Label>
                    <Input 
                      type="url" 
                      placeholder="https://seu-erp.com/api"
                      className="bg-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Token de Autenticação</Label>
                    <Input 
                      type="password" 
                      placeholder="Token do ERP"
                      className="bg-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Intervalo de Sincronização (minutos)</Label>
                    <Input 
                      type="number" 
                      placeholder="15"
                      className="bg-card"
                    />
                  </div>

                  <Button className="w-full mt-4">
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* E-commerce Integration Tab */}
          <TabsContent value="ecommerce" className="space-y-6">
            <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Plataformas de Venda</h3>
                <p className="text-sm text-muted-foreground">
                  Integre com plataformas de e-commerce
                </p>

                <div className="grid gap-4 mt-6">
                  {['Shopify', 'WooCommerce', 'Magento', 'VTEX'].map((platform) => (
                    <Card key={platform} className="p-4 bg-card border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{platform}</h4>
                          <p className="text-sm text-muted-foreground">Não configurado</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Webhooks</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure notificações automáticas de eventos
                    </p>
                  </div>
                  <Button>Adicionar Webhook</Button>
                </div>

                <div className="space-y-4 mt-6">
                  <Card className="p-4 bg-card border-border">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">Nova Venda</h4>
                        <Badge className="bg-success/10 text-success border-success/20">
                          Ativo
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        https://seu-sistema.com/webhook/vendas
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4 bg-card border-border">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">Comissão Calculada</h4>
                        <Badge className="bg-muted/50 text-muted-foreground">
                          Inativo
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        https://seu-sistema.com/webhook/comissoes
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Desenvolvedor;
