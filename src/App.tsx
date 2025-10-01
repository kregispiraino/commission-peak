import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Lancamento from "./pages/Lancamento";
import Comissoes from "./pages/Comissoes";
import Geral from "./pages/Geral";
import Cadastros from "./pages/Cadastros";
import Desenvolvedor from "./pages/Desenvolvedor";
import Manuais from "./pages/Manuais";
import Suporte from "./pages/Suporte";
import NotFound from "./pages/NotFound";

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
            <Route path="/comissoes" element={<Comissoes />} />
            <Route path="/geral" element={<Geral />} />
            <Route path="/cadastros" element={<Cadastros />} />
            <Route path="/desenvolvedor" element={<Desenvolvedor />} />
            <Route path="/manuais" element={<Manuais />} />
            <Route path="/suporte" element={<Suporte />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
