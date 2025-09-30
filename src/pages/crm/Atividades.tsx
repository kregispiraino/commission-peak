import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Calendar, Clock, Phone, Mail, Video, Coffee, CheckCircle } from "lucide-react";
import { useState } from "react";

// Mock data for activities
const mockActivities = [
  {
    id: 1,
    title: "Reunião de Follow-up",
    type: "reuniao",
    description: "Discussão sobre proposta apresentada na semana passada",
    date: "2024-01-18",
    time: "14:00",
    duration: 60,
    contact: "João Silva",
    company: "TechCorp",
    status: "agendado",
    priority: "alta",
    location: "Escritório Central"
  },
  {
    id: 2,
    title: "Ligação de Prospecção",
    type: "ligacao",
    description: "Primeira abordagem para apresentar nossos serviços",
    date: "2024-01-18",
    time: "10:30",
    duration: 30,
    contact: "Maria Santos",
    company: "InnovaSoft",
    status: "concluido",
    priority: "media",
    location: "Remote"
  },
  {
    id: 3,
    title: "Demo do Produto",
    type: "demo",
    description: "Demonstração completa da plataforma CRM",
    date: "2024-01-19",
    time: "16:00",
    duration: 90,
    contact: "Carlos Costa",
    company: "DigitalMax",
    status: "agendado",
    priority: "alta",
    location: "Video Call"
  },
  {
    id: 4,
    title: "Email de Nutrição",
    type: "email",
    description: "Envio de case de sucesso relevante para o prospect",
    date: "2024-01-17",
    time: "09:00",
    duration: 15,
    contact: "Ana Oliveira",
    company: "CloudTech",
    status: "concluido",
    priority: "baixa",
    location: "Digital"
  },
  {
    id: 5,
    title: "Café Networking",
    type: "networking",
    description: "Encontro informal para fortalecer relacionamento",
    date: "2024-01-20",
    time: "15:30",
    duration: 120,
    contact: "Pedro Lima",
    company: "StartupTech",
    status: "agendado",
    priority: "media",
    location: "Café Central"
  }
];

const activityTypes = {
  reuniao: { icon: Calendar, label: "Reunião", color: "bg-blue-100 text-blue-800" },
  ligacao: { icon: Phone, label: "Ligação", color: "bg-green-100 text-green-800" },
  email: { icon: Mail, label: "Email", color: "bg-purple-100 text-purple-800" },
  demo: { icon: Video, label: "Demo", color: "bg-orange-100 text-orange-800" },
  networking: { icon: Coffee, label: "Networking", color: "bg-yellow-100 text-yellow-800" }
};

const statusColors = {
  agendado: "bg-blue-100 text-blue-800",
  concluido: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800"
};

const priorityColors = {
  alta: "bg-red-100 text-red-800",
  media: "bg-yellow-100 text-yellow-800",
  baixa: "bg-gray-100 text-gray-800"
};

export default function Atividades() {
  const [activities] = useState(mockActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [typeFilter, setTypeFilter] = useState("todos");

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || activity.status === statusFilter;
    const matchesType = typeFilter === "todos" || activity.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTime = (time: string) => {
    return time;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-backdrop p-4 lg:p-8">
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Atividades</h1>
            <p className="text-muted-foreground">Gerencie suas atividades e compromissos</p>
          </div>
          <Button className="bg-gradient-primary text-white shadow-glow w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Nova Atividade
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-2">
              <h3 className="text-sm lg:text-base font-medium text-foreground">Total</h3>
              <p className="text-xl lg:text-2xl font-bold text-primary">{activities.length}</p>
            </div>
          </Card>
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-2">
              <h3 className="text-sm lg:text-base font-medium text-foreground">Agendadas</h3>
              <p className="text-xl lg:text-2xl font-bold text-warning">
                {activities.filter(a => a.status === "agendado").length}
              </p>
            </div>
          </Card>
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-2">
              <h3 className="text-sm lg:text-base font-medium text-foreground">Concluídas</h3>
              <p className="text-xl lg:text-2xl font-bold text-success">
                {activities.filter(a => a.status === "concluido").length}
              </p>
            </div>
          </Card>
          <Card className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl">
            <div className="space-y-2">
              <h3 className="text-sm lg:text-base font-medium text-foreground">Alta Prioridade</h3>
              <p className="text-xl lg:text-2xl font-bold text-destructive">
                {activities.filter(a => a.priority === "alta").length}
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
                placeholder="Buscar atividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("todos")}
              >
                Todas
              </Button>
              <Button
                variant={statusFilter === "agendado" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("agendado")}
              >
                Agendadas
              </Button>
              <Button
                variant={statusFilter === "concluido" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("concluido")}
              >
                Concluídas
              </Button>
              <Button
                variant={typeFilter === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("todos")}
              >
                Todos Tipos
              </Button>
              <Button
                variant={typeFilter === "reuniao" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("reuniao")}
              >
                Reuniões
              </Button>
            </div>
          </div>
        </Card>

        {/* Activities List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const ActivityIcon = activityTypes[activity.type as keyof typeof activityTypes].icon;
            
            return (
              <Card key={activity.id} className="p-4 lg:p-6 bg-gradient-glass border-glass-border backdrop-blur-xl hover:shadow-lg transition-all duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Activity Icon & Type */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      <ActivityIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <Badge className={`text-xs ${activityTypes[activity.type as keyof typeof activityTypes].color}`}>
                      {activityTypes[activity.type as keyof typeof activityTypes].label}
                    </Badge>
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                      <h3 className="font-semibold text-foreground text-base lg:text-lg">{activity.title}</h3>
                      <div className="flex gap-2">
                        <Badge className={`text-xs ${statusColors[activity.status as keyof typeof statusColors]}`}>
                          {activity.status}
                        </Badge>
                        <Badge className={`text-xs ${priorityColors[activity.priority as keyof typeof priorityColors]}`}>
                          {activity.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{formatDate(activity.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{formatTime(activity.time)} ({activity.duration}min)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gradient-primary text-white text-xs">
                            {getInitials(activity.contact)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-foreground">{activity.contact} - {activity.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {activity.status === "agendado" && (
                      <Button variant="outline" size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Concluir
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhuma atividade encontrada" : "Nenhuma atividade cadastrada"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}