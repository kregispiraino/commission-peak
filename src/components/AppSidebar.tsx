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
  Menu
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

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Lançamento", url: "/lancamento", icon: PlusCircle },
  { title: "Resultado", url: "/resultado", icon: BarChart3 },
  { title: "Meu Perfil", url: "/perfil", icon: User },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
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
              <Trophy className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-foreground">Sales Rank</h2>
                <p className="text-xs text-muted-foreground">Comissões Pro</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">
            {!isCollapsed && "Menu Principal"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="px-3">
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
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