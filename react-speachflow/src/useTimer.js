import { useState, useEffect } from 'react';

export const useTimer = (initialDuration, isActive) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);

  useEffect(() => {
    setTimeLeft(initialDuration);
  }, [initialDuration]);

  useEffect(() => {
    let timer = null;
    
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
    }
    
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return { timeLeft, formatTime };
};