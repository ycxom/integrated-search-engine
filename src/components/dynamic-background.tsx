import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface DynamicBackgroundProps {
  children: React.ReactNode;
}

// 根据设备类型选择合适的API
const getWallpaperApiByDevice = (): string => {
  // 获取设备像素比
  const pixelRatio = window.devicePixelRatio || 1;
  
  // 获取屏幕的物理尺寸
  const screenWidth = window.screen.width * pixelRatio;
  const screenHeight = window.screen.height * pixelRatio;
  
  // 计算屏幕宽高比
  const aspectRatio = screenWidth / screenHeight;
  
  // 根据屏幕宽高比选择合适的API
  if (aspectRatio < 0.8) {
    // 竖屏设备（手机竖屏）
    return 'https://ai.ycxom.top:3002/api/v1/wallpaper/by-ratio/portrait';
  } else if (aspectRatio > 0.8 && aspectRatio < 1.2) {
    // 接近正方形的设备（平板等）
    return 'https://ai.ycxom.top:3002/api/v1/wallpaper/by-ratio/square';
  } else {
    // 横屏设备（桌面、笔记本、手机横屏）
    return 'https://ai.ycxom.top:3002/api/v1/wallpaper/by-ratio/standard';
  }
};

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const isLoadingRef = useRef(false);
  const previousImageRef = useRef<string | null>(null);
  const deviceTypeRef = useRef<string>('');
  const lastLoadTimeRef = useRef<number>(0);
  const orientationRef = useRef<string>('');

  const loadBackgroundImage = async (forceReload = false) => {
    // 防止重复加载
    if (isLoadingRef.current) return;
    
    // 获取当前设备类型
    const apiUrl = getWallpaperApiByDevice();
    const currentDeviceType = apiUrl.split('/').pop() || '';
    
    // 获取当前设备方向
    const currentOrientation = window.matchMedia('(orientation: landscape)').matches ? 'landscape' : 'portrait';
    
    // 如果不是强制刷新，并且设备类型和方向都没有变化，且距离上次加载时间不足5分钟，则不重新加载
    const currentTime = Date.now();
    if (!forceReload && 
        currentDeviceType === deviceTypeRef.current && 
        currentOrientation === orientationRef.current &&
        currentTime - lastLoadTimeRef.current < 5 * 60 * 1000) {
      return;
    }
    
    // 更新设备类型、方向和加载时间
    deviceTypeRef.current = currentDeviceType;
    orientationRef.current = currentOrientation;
    lastLoadTimeRef.current = currentTime;
    
    isLoadingRef.current = true;
    setIsLoading(true);
    
    try {
      // 添加随机参数避免缓存
      const urlWithCache = `${apiUrl}?cache=${currentTime}`;
      const response = await fetch(urlWithCache);
      
      if (response.ok) {
        const blob = await response.blob();
        
        // 释放之前的图片URL
        if (previousImageRef.current && previousImageRef.current.startsWith('blob:')) {
          URL.revokeObjectURL(previousImageRef.current);
        }
        
        const imageUrl = URL.createObjectURL(blob);
        previousImageRef.current = imageUrl;
        setBackgroundImage(imageUrl);
      } else {
        console.error('背景图片加载失败，使用备用图片');
        // 根据设备类型选择备用图片
        const fallbackImage = window.innerWidth <= 768 ? '/mobile-fallback.png' : '/desktop-fallback.png';
        setBackgroundImage(fallbackImage);
      }
    } catch (error) {
      console.error('加载背景图片失败:', error);
      // 根据设备类型选择备用图片
      const fallbackImage = window.innerWidth <= 768 ? '/mobile-fallback.png' : '/desktop-fallback.png';
      setBackgroundImage(fallbackImage);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    // 使用防抖函数处理窗口大小变化
    let resizeTimeout: number | null = null;
    
    const handleResize = () => {
      // 清除之前的定时器
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      // 设置新的定时器，延迟500ms执行，避免频繁触发
      resizeTimeout = window.setTimeout(() => {
        // 获取当前设备方向
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const currentOrientation = isLandscape ? 'landscape' : 'portrait';
        
        // 如果设备方向发生变化，才重新加载背景
        if (currentOrientation !== orientationRef.current) {
          loadBackgroundImage(false); // 不强制刷新，但会检查方向变化
        }
      }, 500);
    };
    
    // 初始加载
    loadBackgroundImage(true); // 强制刷新
    
    // 设置定时器，每30分钟更换一次背景
    const interval = setInterval(() => loadBackgroundImage(true), 30 * 60 * 1000);
    
    // 添加窗口大小变化监听，使用防抖处理
    window.addEventListener('resize', handleResize);
    
    // 添加设备方向变化监听
    const orientationMediaQuery = window.matchMedia('(orientation: portrait)');
    if (orientationMediaQuery.addEventListener) {
      orientationMediaQuery.addEventListener('change', handleResize);
    } else {
      // 兼容旧版浏览器
      orientationMediaQuery.addListener(handleResize);
    }
    
    return () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      
      // 移除方向变化监听
      if (orientationMediaQuery.removeEventListener) {
        orientationMediaQuery.removeEventListener('change', handleResize);
      } else {
        // 兼容旧版浏览器
        orientationMediaQuery.removeListener(handleResize);
      }
      
      // 清理所有创建的URL对象
      if (previousImageRef.current && previousImageRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(previousImageRef.current);
      }
    };
  }, []);

  const changeBackground = () => {
    loadBackgroundImage(true); // 强制刷新
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          filter: theme === 'light' ? 'brightness(0.9) blur(0.5px)' : 'brightness(0.7) blur(0.5px)'
        }}
      />
      
      <div className={`absolute inset-0 ${theme === 'light' ? 'bg-white/30' : 'bg-black/30'}`} />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      <button
        onClick={changeBackground}
        className={`fixed bottom-6 right-6 z-20 p-3 backdrop-blur-md rounded-full transition-all duration-200 border ${
          theme === 'light' 
            ? 'bg-black/20 hover:bg-black/30 border-black/20 text-black' 
            : 'bg-white/20 hover:bg-white/30 border-white/20 text-white'
        }`}
        title="更换背景"
      >
        <svg 
          className="w-5 h-5 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
      </button>
    </div>
  );
};