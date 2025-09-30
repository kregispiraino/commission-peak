import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Lancamento from "./pages/Lancamento";
import Resultado from "./pages/Resultado";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";
import Pipeline from "./pages/crm/Pipeline";
import Contatos from "./pages/crm/Contatos";
import Empresas from "./pages/crm/Empresas";
import Atividades from "./pages/crm/Atividades";
import Relatorios from "./pages/crm/Relatorios";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lancamento" element={<Lancamento />} />
            <Route path="/resultado" element={<Resultado />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/crm/pipeline" element={<Pipeline />} />
            <Route path="/crm/contatos" element={<Contatos />} />
            <Route path="/crm/empresas" element={<Empresas />} />
            <Route path="/crm/atividades" element={<Atividades />} />
            <Route path="/crm/relatorios" element={<Relatorios />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
