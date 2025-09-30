import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, MapPin, Users, DollarSign, Building2, Globe, Phone } from "lucide-react";
import { useState } from "react";

// Mock data for companies
const mockCompanies = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Tecnologia",
    size: "Grande",
    revenue: 5000000,
    location: "São Paulo, SP",
    website: "www.techcorp.com",
    phone: "(11) 3333-3333",
    employees: 250,
    logo: "/placeholder.svg",
    status: "cliente",
    lastActivity: "2024-01-15",
    description: "Empresa líder em soluções de tecnologia empresarial"
  },
  {
    id: 2,
    name: "InnovaSoft",
    industry: "Software",
    size: "Média",
    revenue: 2500000,
    location: "Rio de Janeiro, RJ",
    website: "www.innovasoft.com",
    phone: "(21) 4444-4444",
    employees: 120,
    logo: "/placeholder.svg",
    status: "prospect",
    lastActivity: "2024-01-14",
    description: "Desenvolvimento de software personalizado para PMEs"
  },
  {
    id: 3,
    name: "DigitalMax",
    industry: "Marketing Digital",
    size: "Pequena",
    revenue: 800000,
    location: "Belo Horizonte, MG",
    website: "www.digitalmax.com",
    phone: "(31) 5555-5555",
    employees: 45,
    logo: "/placeholder.svg",
    status: "lead",
    lastActivity: "2024-01-16",
    description: "Agência especializada em marketing digital e e-commerce"
  },
  {
    id: 4,
    name: "CloudTech",
    industry: "Cloud Computing",
    size: "Grande",
    revenue: 8000000,
    location: "Brasília, DF",
    website: "www.cloudtech.com",
    phone: "(61) 6666-6666",
    employees: 300,
    logo: "/placeholder.svg",
    status: "cliente",
    lastActivity: "2024-01-17",
    description: "Provedora de soluções em nuvem para empresas"
  }
];

const statusColors = {
  cliente: "bg-green-100 text-green-800",
  prospect: "bg-blue-100 text-blue-800",
  lead: "bg-yellow-100 text-yellow-800"
};

const sizeColors = {
  "Pequena": "bg-gray-100 text-gray-800",
  "Média": "bg-blue-100 text-blue-800",
  "Grande": "bg-purple-100 text-purple-800"
};

export default function Empresas() {
  const [companies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-backdrop p-4 lg:p-8">
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Empresas</h1>
            <p className="text-muted-foreground">Gerencie seu portfólio de empresas</p>
          </div>
          <Button className="bg-gradient-primary text-white shadow-glow w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Nova Empresa
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-2">
              <h3 className="text-sm lg:text-base font-medium text-foreground">Total de Empresas</h3>
              <p className="text-xl lg:text-2xl font-bold text-primary">{companies.length}</p>
            </div>
          </Card>
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-2">
              <h3 className="text-sm lg:text-base font-medium text-foreground">Clientes</h3>
              <p className="text-xl lg:text-2xl font-bold text-success">
                {companies.filter(c => c.status === "cliente").length}
              </p>
            </div>
          </Card>
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-2">
              <h3 className="text-sm lg:text-base font-medium text-foreground">Prospects</h3>
              <p className="text-xl lg:text-2xl font-bold text-warning">
                {companies.filter(c => c.status === "prospect").length}
              </p>
            </div>
          </Card>
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-2">
              <h3 className="text-sm lg:text-base font-medium text-foreground">Receita Total</h3>
              <p className="text-xl lg:text-2xl font-bold text-primary">
                {formatCurrency(companies.reduce((total, c) => total + c.revenue, 0))}
              </p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar empresas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("todos")}
              >
                Todas ({companies.length})
              </Button>
              <Button
                variant={statusFilter === "cliente" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("cliente")}
              >
                Clientes ({companies.filter(c => c.status === "cliente").length})
              </Button>
              <Button
                variant={statusFilter === "prospect" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("prospect")}
              >
                Prospects ({companies.filter(c => c.status === "prospect").length})
              </Button>
            </div>
          </div>
        </Card>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {getInitials(company.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground text-base lg:text-lg">{company.name}</h3>
                      <p className="text-sm text-muted-foreground">{company.industry}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={`text-xs ${statusColors[company.status as keyof typeof statusColors]}`}>
                      {company.status}
                    </Badge>
                    <Badge className={`text-xs ${sizeColors[company.size as keyof typeof sizeColors]}`}>
                      {company.size}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">{company.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-glass-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-primary font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{formatCurrency(company.revenue)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Receita Anual</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-primary font-semibold">
                      <Users className="w-4 h-4" />
                      <span>{company.employees}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Funcionários</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-primary cursor-pointer hover:underline">{company.website}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{company.phone}</span>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="text-xs text-muted-foreground pt-2 border-t border-glass-border">
                  Última atividade: {new Date(company.lastActivity).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhuma empresa encontrada" : "Nenhuma empresa cadastrada"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}