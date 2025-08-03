import { useState, useEffect } from 'react';

const AUTO_SWITCH_STORAGE_KEY = 'search-auto-switch-enabled';

export function useAutoSwitchControl() {
  // 初始化时先从localStorage读取，如果没有则默认为true
  const [isAutoSwitchEnabled, setIsAutoSwitchEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true; // SSR兼容
    
    try {
      const stored = localStorage.getItem(AUTO_SWITCH_STORAGE_KEY);
      return stored !== null ? JSON.parse(stored) : true;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return true;
    }
  });

  // 当状态改变时，保存到 localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR兼容
    
    try {
      localStorage.setItem(AUTO_SWITCH_STORAGE_KEY, JSON.stringify(isAutoSwitchEnabled));
      console.log('Auto switch control saved:', isAutoSwitchEnabled); // 调试日志
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [isAutoSwitchEnabled]);

  const toggleAutoSwitch = () => {
    setIsAutoSwitchEnabled(prev => {
      const newValue = !prev;
      console.log('Auto switch toggled:', prev, '->', newValue); // 调试日志
      return newValue;
    });
  };

  return {
    isAutoSwitchEnabled,
    toggleAutoSwitch,
    setIsAutoSwitchEnabled
  };
}
