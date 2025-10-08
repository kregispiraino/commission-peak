import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // TODO: Implementar verificação de autenticação real
    // Por enquanto, simula usuário autenticado
    console.log('🔵 Frontend - Verificando autenticação do usuário');
    
    // Simula delay de verificação
    setTimeout(() => {
      setIsAuthenticated(true); // Simula usuário autenticado
      setLoading(false);
    }, 500);
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
