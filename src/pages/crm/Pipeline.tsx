import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, DollarSign, Calendar, User } from "lucide-react";
import { useState } from "react";

// Mock data for leads
const mockLeads = [
  {
    id: 1,
    title: "Implementação ERP",
    company: "TechCorp",
    value: 45000,
    stage: "qualificacao",
    probability: 75,
    contact: "João Silva",
    avatar: "/placeholder.svg",
    lastActivity: "2024-01-15",
    notes: "Cliente interessado em solução completa"
  },
  {
    id: 2,
    title: "Sistema CRM",
    company: "InnovaSoft",
    value: 32000,
    stage: "proposta",
    probability: 60,
    contact: "Maria Santos",
    avatar: "/placeholder.svg",
    lastActivity: "2024-01-14",
    notes: "Aguardando aprovação do orçamento"
  },
  {
    id: 3,
    title: "Consultoria Digital",
    company: "DigitalMax",
    value: 28000,
    stage: "negociacao",
    probability: 85,
    contact: "Carlos Costa",
    avatar: "/placeholder.svg",
    lastActivity: "2024-01-16",
    notes: "Negociando condições de pagamento"
  },
  {
    id: 4,
    title: "Migração Cloud",
    company: "CloudTech",
    value: 55000,
    stage: "fechamento",
    probability: 90,
    contact: "Ana Oliveira",
    avatar: "/placeholder.svg",
    lastActivity: "2024-01-17",
    notes: "Contrato em revisão final"
  }
];

const stages = [
  { id: "qualificacao", name: "Qualificação", color: "bg-blue-100 text-blue-800" },
  { id: "proposta", name: "Proposta", color: "bg-yellow-100 text-yellow-800" },
  { id: "negociacao", name: "Negociação", color: "bg-orange-100 text-orange-800" },
  { id: "fechamento", name: "Fechamento", color: "bg-green-100 text-green-800" }
];

export default function Pipeline() {
  const [leads] = useState(mockLeads);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const getTotalValueByStage = (stageId: string) => {
    return getLeadsByStage(stageId).reduce((total, lead) => total + lead.value, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-backdrop p-4 lg:p-8">
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Pipeline de Vendas</h1>
            <p className="text-muted-foreground">Acompanhe suas oportunidades do lead até o fechamento</p>
          </div>
          <Button className="bg-gradient-primary text-white shadow-glow w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Nova Oportunidade
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            const stageValue = getTotalValueByStage(stage.id);
            
            return (
              <Card key={stage.id} className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm lg:text-base font-medium text-foreground">{stage.name}</h3>
                    <Badge className={`text-xs ${stage.color}`}>
                      {stageLeads.length}
                    </Badge>
                  </div>
                  <p className="text-lg lg:text-xl font-bold text-primary">
                    {formatCurrency(stageValue)}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Pipeline Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            
            return (
              <div key={stage.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    {stage.name}
                    <Badge className={`text-xs ${stage.color}`}>
                      {stageLeads.length}
                    </Badge>
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {stageLeads.map((lead) => (
                    <Card key={lead.id} className="p-4 bg-gradient-glass border-glass-border backdrop-blur-xl hover:shadow-lg transition-all duration-200 cursor-pointer">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm lg:text-base">{lead.title}</h4>
                            <p className="text-sm text-muted-foreground">{lead.company}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-primary">{formatCurrency(lead.value)}</span>
                          <span className="text-muted-foreground">• {lead.probability}%</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{lead.contact}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(lead.lastActivity).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        
                        {lead.notes && (
                          <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                            {lead.notes}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                  
                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">Nenhuma oportunidade</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}