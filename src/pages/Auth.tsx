import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('🔵 Frontend - Tentando fazer login:', { email });
    
    try {
      // Importa a função de login do backend
      const { realizarLogin } = await import('@/backend/api/index');
      
      // Chama a API de autenticação
      const response = await realizarLogin({
        email,
        senha: password
      });

      if (response.success && response.usuario) {
        // Salva dados do usuário no localStorage
        localStorage.setItem('usuario_logado', JSON.stringify(response.usuario));
        
        toast({
          title: 'Login realizado com sucesso!',
          description: `Bem-vindo, ${response.usuario.nome}`
        });
        
        navigate('/home');
      } else {
        toast({
          title: 'Erro no login',
          description: response.message || 'Credenciais inválidas',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast({
        title: 'Erro no login',
        description: 'Ocorreu um erro ao tentar fazer login',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <Card className="w-full max-w-md p-8 bg-gradient-glass border-glass-border backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo</h1>
          <p className="text-muted-foreground">Faça login para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary text-white"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
