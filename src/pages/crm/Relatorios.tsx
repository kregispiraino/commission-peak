import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Calendar, BarChart3, Download } from "lucide-react";
import { useState } from "react";

// Mock data for reports
const mockReports = {
  conversion: {
    leads: 45,
    qualified: 32,
    proposals: 18,
    closed: 8,
    rate: 17.8
  },
  revenue: {
    thisMonth: 125000,
    lastMonth: 98000,
    growth: 27.6,
    forecast: 145000
  },
  activities: {
    total: 156,
    completed: 142,
    upcoming: 14,
    overdue: 3
  },
  topPerformers: [
    { name: "Ana Silva", deals: 8, revenue: 45000 },
    { name: "Carlos Santos", deals: 6, revenue: 38000 },
    { name: "Maria Costa", deals: 5, revenue: 32000 }
  ]
};

const chartData = [
  { month: "Jan", leads: 32, deals: 6, revenue: 85000 },
  { month: "Fev", leads: 28, deals: 4, revenue: 72000 },
  { month: "Mar", leads: 41, deals: 7, revenue: 95000 },
  { month: "Abr", leads: 38, deals: 5, revenue: 88000 },
  { month: "Mai", leads: 45, deals: 8, revenue: 125000 }
];

export default function Relatorios() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [selectedReport, setSelectedReport] = useState("overview");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const StatCard = ({ 
    title, 
    value, 
    change, 
    changeType, 
    icon: Icon 
  }: { 
    title: string; 
    value: string; 
    change?: string; 
    changeType?: 'up' | 'down'; 
    icon: any;
  }) => (
    <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-xl lg:text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              {changeType === 'up' ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={`text-sm font-medium ${changeType === 'up' ? 'text-success' : 'text-destructive'}`}>
                {change}
              </span>
              <span className="text-sm text-muted-foreground">vs mês anterior</span>
            </div>
          )}
        </div>
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-backdrop p-4 lg:p-8">
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground">Análise de performance e métricas do CRM</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisWeek">Esta Semana</SelectItem>
                <SelectItem value="thisMonth">Este Mês</SelectItem>
                <SelectItem value="lastMonth">Mês Anterior</SelectItem>
                <SelectItem value="thisQuarter">Este Trimestre</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            title="Receita do Mês"
            value={formatCurrency(mockReports.revenue.thisMonth)}
            change="+27.6%"
            changeType="up"
            icon={DollarSign}
          />
          <StatCard
            title="Leads Gerados"
            value={mockReports.conversion.leads.toString()}
            change="+12.3%"
            changeType="up"
            icon={Users}
          />
          <StatCard
            title="Taxa de Conversão"
            value={`${mockReports.conversion.rate}%`}
            change="+3.2%"
            changeType="up"
            icon={Target}
          />
          <StatCard
            title="Atividades"
            value={mockReports.activities.total.toString()}
            change="-5.1%"
            changeType="down"
            icon={Calendar}
          />
        </div>

        {/* Report Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Conversion Funnel */}
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5" />
                Funil de Conversão
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Leads</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="font-semibold">{mockReports.conversion.leads}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Qualificados</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-4/5 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="font-semibold">{mockReports.conversion.qualified}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Propostas</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/5 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className="font-semibold">{mockReports.conversion.proposals}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Fechados</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-2/5 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="font-semibold">{mockReports.conversion.closed}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-glass-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Taxa de Conversão Geral</span>
                  <Badge className="bg-primary/10 text-primary">
                    {mockReports.conversion.rate}%
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Revenue Analysis */}
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Análise de Receita
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Este Mês</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(mockReports.revenue.thisMonth)}
                  </p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Mês Anterior</p>
                  <p className="text-lg font-bold text-muted-foreground">
                    {formatCurrency(mockReports.revenue.lastMonth)}
                  </p>
                </div>
              </div>
              
              <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                <p className="text-sm text-muted-foreground mb-1">Crescimento</p>
                <p className="text-2xl font-bold text-success">
                  +{mockReports.revenue.growth}%
                </p>
              </div>
              
              <div className="pt-3 border-t border-glass-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Previsão Próximo Mês</span>
                  <span className="font-semibold text-primary">
                    {formatCurrency(mockReports.revenue.forecast)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Chart & Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Performance Chart */}
          <Card className="lg:col-span-2 p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Performance Mensal</h3>
              
              <div className="space-y-4">
                {chartData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium">{data.month}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>{data.leads} leads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>{data.deals} deals</span>
                      </div>
                      <span className="font-semibold text-primary">
                        {formatCurrency(data.revenue)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Top Performers */}
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Top Performers</h3>
              
              <div className="space-y-3">
                {mockReports.topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{performer.name}</p>
                        <p className="text-xs text-muted-foreground">{performer.deals} deals</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {formatCurrency(performer.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}