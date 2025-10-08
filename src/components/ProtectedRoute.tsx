import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      console.log('🔵 Frontend - Verificando autenticação do usuário');
      
      try {
        const { verificarSessao } = await import('@/backend/api/index');
        const resultado = await verificarSessao();
        
        setIsAuthenticated(resultado.autenticado);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    verificarAutenticacao();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
