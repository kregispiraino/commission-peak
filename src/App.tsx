import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Lancamento from "./pages/Lancamento";
import Comissoes from "./pages/Comissoes";
import Geral from "./pages/Geral";
import Cadastros from "./pages/Cadastros";
import Desenvolvedor from "./pages/Desenvolvedor";
import Manuais from "./pages/Manuais";
import Suporte from "./pages/Suporte";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Layout>
                  <Index />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lancamento"
            element={
              <ProtectedRoute>
                <Layout>
                  <Lancamento />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/comissoes"
            element={
              <ProtectedRoute>
                <Layout>
                  <Comissoes />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/geral"
            element={
              <ProtectedRoute>
                <Layout>
                  <Geral />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastros"
            element={
              <ProtectedRoute>
                <Layout>
                  <Cadastros />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/desenvolvedor"
            element={
              <ProtectedRoute>
                <Layout>
                  <Desenvolvedor />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/manuais"
            element={
              <ProtectedRoute>
                <Layout>
                  <Manuais />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/suporte"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suporte />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
