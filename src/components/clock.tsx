import React from 'react';
import { useTime } from '@/hooks/useTime';
import { DigitRoller } from './digit-roller';

interface ClockProps {
  theme?: string;
}

export const Clock: React.FC<ClockProps> = ({ theme }) => {
  const { hours, minutes, seconds, date } = useTime();
  
  const colonStyle = { fontSize: '2.5rem' };
  const colonClass = `mx-1 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} animate-pulse`;
  
  return (
    <div className="mb-6">
      <div className="flex justify-center items-center mb-4 px-4">
        <DigitRoller digit={hours[0]} theme={theme} />
        <DigitRoller digit={hours[1]} theme={theme} />
        <div className={colonClass} style={colonStyle}>:</div>
        <DigitRoller digit={minutes[0]} theme={theme} />
        <DigitRoller digit={minutes[1]} theme={theme} />
        <div className={colonClass} style={colonStyle}>:</div>
        <DigitRoller digit={seconds[0]} theme={theme} />
        <DigitRoller digit={seconds[1]} theme={theme} />
      </div>
      <p 
        className={`text-center ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`} 
        style={{ fontSize: '1.125rem' }}
      >
        {date}
      </p>
    </div>
  );
};