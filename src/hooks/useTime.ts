import { useState, useEffect, useRef } from 'react';

export interface TimeData {
  hours: string;
  minutes: string;
  seconds: string;
  date: string;
}

export const useTime = (): TimeData => {
  const [time, setTime] = useState(new Date());
  const timeRef = useRef(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      timeRef.current = new Date();
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { hours, minutes, seconds };
  };
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 星期${weekday}`;
  };
  
  const { hours, minutes, seconds } = formatTime(time);
  
  return {
    hours,
    minutes,
    seconds,
    date: formatDate(time)
  };
};