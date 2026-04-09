import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

interface CountdownProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <div className={cn("text-swiss-red font-black text-4xl uppercase tracking-tighter", className)}>
        Launched
      </div>
    );
  }

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col">
      <div className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none text-swiss-black">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-swiss-gray text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">{label}</span>
    </div>
  );

  return (
    <div className={cn("flex items-start gap-4 sm:gap-8", className)}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-4xl sm:text-6xl md:text-7xl font-black text-swiss-gray/30 mt-1 sm:mt-2">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-4xl sm:text-6xl md:text-7xl font-black text-swiss-gray/30 mt-1 sm:mt-2">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-4xl sm:text-6xl md:text-7xl font-black text-swiss-gray/30 mt-1 sm:mt-2">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
