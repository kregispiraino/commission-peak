import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Mail, Phone, Building2, Calendar } from "lucide-react";
import { useState } from "react";

// Mock data for contacts
const mockContacts = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@techcorp.com",
    phone: "(11) 99999-9999",
    company: "TechCorp",
    position: "CEO",
    avatar: "/placeholder.svg",
    lastContact: "2024-01-15",
    source: "LinkedIn",
    status: "ativo"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@innovasoft.com",
    phone: "(11) 88888-8888",
    company: "InnovaSoft",
    position: "CTO",
    avatar: "/placeholder.svg",
    lastContact: "2024-01-14",
    source: "Indicação",
    status: "ativo"
  },
  {
    id: 3,
    name: "Carlos Costa",
    email: "carlos.costa@digitalmax.com",
    phone: "(11) 77777-7777",
    company: "DigitalMax",
    position: "Diretor",
    avatar: "/placeholder.svg",
    lastContact: "2024-01-16",
    source: "Website",
    status: "prospect"
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana.oliveira@cloudtech.com",
    phone: "(11) 66666-6666",
    company: "CloudTech",
    position: "Gerente TI",
    avatar: "/placeholder.svg",
    lastContact: "2024-01-17",
    source: "Evento",
    status: "ativo"
  },
  {
    id: 5,
    name: "Pedro Lima",
    email: "pedro.lima@startup.com",
    phone: "(11) 55555-5555",
    company: "StartupTech",
    position: "Fundador",
    avatar: "/placeholder.svg",
    lastContact: "2024-01-12",
    source: "Cold Call",
    status: "inativo"
  }
];

const statusColors = {
  ativo: "bg-green-100 text-green-800",
  prospect: "bg-blue-100 text-blue-800",
  inativo: "bg-gray-100 text-gray-800"
};

export default function Contatos() {
  const [contacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-backdrop p-4 lg:p-8">
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Contatos</h1>
            <p className="text-muted-foreground">Gerencie seus contatos e relacionamentos</p>
          </div>
          <Button className="bg-gradient-primary text-white shadow-glow w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Novo Contato
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar contatos..."
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
                Todos ({contacts.length})
              </Button>
              <Button
                variant={statusFilter === "ativo" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("ativo")}
              >
                Ativos ({contacts.filter(c => c.status === "ativo").length})
              </Button>
              <Button
                variant={statusFilter === "prospect" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("prospect")}
              >
                Prospects ({contacts.filter(c => c.status === "prospect").length})
              </Button>
            </div>
          </div>
        </Card>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm lg:text-base">{contact.name}</h3>
                      <p className="text-xs lg:text-sm text-muted-foreground">{contact.position}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${statusColors[contact.status as keyof typeof statusColors]}`}>
                    {contact.status}
                  </Badge>
                </div>

                {/* Company */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{contact.company}</span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{contact.phone}</span>
                  </div>
                </div>

                {/* Last Contact */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-glass-border">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Último contato: {new Date(contact.lastContact).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <span>Origem: {contact.source}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    Ligar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhum contato encontrado" : "Nenhum contato cadastrado"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}