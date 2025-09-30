import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  PlusCircle, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Trophy,
  Menu,
  Users,
  Building2,
  Target,
  FileText,
  Calendar,
  Phone,
  Mail,
  Briefcase
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import ascoraLogo from "@/assets/ascora-logo.png";

const mainMenuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Meu Perfil", url: "/perfil", icon: User },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

const crmMenuItems = [
  { title: "Pipeline", url: "/crm/pipeline", icon: Target },
  { title: "Contatos", url: "/crm/contatos", icon: Users },
  { title: "Empresas", url: "/crm/empresas", icon: Building2 },
  { title: "Atividades", url: "/crm/atividades", icon: Calendar },
  { title: "Relatórios", url: "/crm/relatorios", icon: FileText },
];

const resultadoMenuItems = [
  { title: "Lançamento", url: "/lancamento", icon: PlusCircle },
  { title: "Comissões", url: "/resultado", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors";

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} bg-gradient-glass border-r border-glass-border backdrop-blur-xl`}>
      <SidebarContent className="bg-transparent">
        {/* Header with logo */}
        <div className="p-6 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <img src={ascoraLogo} alt="Ascora" className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-foreground">Ascora</h2>
                <p className="text-xs text-muted-foreground">CRM & Resultados</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">
            {!isCollapsed && "Menu Principal"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="px-3">
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${getNavClasses({ isActive })}`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className={`font-medium ${isCollapsed ? 'sr-only' : ''}`}>
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* CRM */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">
            {!isCollapsed && "CRM"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="px-3">
            <SidebarMenu className="space-y-1">
              {crmMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${getNavClasses({ isActive })}`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className={`font-medium ${isCollapsed ? 'sr-only' : ''}`}>
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Resultado */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">
            {!isCollapsed && "Resultado"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="px-3">
            <SidebarMenu className="space-y-1">
              {resultadoMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${getNavClasses({ isActive })}`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className={`font-medium ${isCollapsed ? 'sr-only' : ''}`}>
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout button at bottom */}
        <div className="mt-auto p-3 border-t border-glass-border">
          <SidebarMenuButton className="w-full rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="w-5 h-5" />
            <span className={`font-medium ${isCollapsed ? 'sr-only' : ''}`}>
              Sair
            </span>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}