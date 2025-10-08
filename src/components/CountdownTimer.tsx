import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { calcularTempoRestanteMes } from '@/backend/api/home';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = async () => {
      console.log('🔵 Frontend - Calculando tempo restante do mês');
      
      try {
        const response = await calcularTempoRestanteMes();
        
        if (response.success && response.data) {
          setTimeLeft(response.data);
        }
      } catch (error) {
        console.error('Erro ao calcular tempo restante:', error);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center space-y-1">
      <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <span className="text-xl font-bold text-white relative z-10">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <Card className="p-6 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Fechamento do Mês
          </h3>
        </div>
        
        <div className="flex justify-center items-center gap-3">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <div className="text-xl font-bold text-primary">:</div>
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <div className="text-xl font-bold text-primary">:</div>
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <div className="text-xl font-bold text-primary">:</div>
          <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>

        <div className="mt-4 p-3 bg-primary/5 rounded-xl border border-primary/10">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              Última oportunidade para bater suas metas!
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}