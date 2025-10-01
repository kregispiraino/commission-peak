import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-backdrop">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header with toggle */}
          <header className="h-16 flex items-center justify-between px-6 bg-gradient-glass border-b border-glass-border backdrop-blur-xl">
            <SidebarTrigger className="text-primary hover:text-primary-glow" />
            
            <div className="flex items-center space-x-4">
              {/* Header space - could add user menu or notifications here */}
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}