import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <span className="text-2xl font-bold text-white relative z-10">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <Card className="p-8 bg-gradient-glass border-glass-border backdrop-blur-xl shadow-xl">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Fechamento do Mês
          </h3>
        </div>
        
        <div className="flex justify-center items-center gap-6">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <div className="text-2xl font-bold text-primary">:</div>
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <div className="text-2xl font-bold text-primary">:</div>
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <div className="text-2xl font-bold text-primary">:</div>
          <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
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