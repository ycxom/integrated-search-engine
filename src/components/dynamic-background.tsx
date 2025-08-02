import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface DynamicBackgroundProps {
  children: React.ReactNode;
}

// 根据设备类型选择合适的API
const getWallpaperApiByDevice = (): string => {
  // 检测是否为移动设备
  const isMobile = window.innerWidth <= 768;
  // 检测是否为平板设备
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  
  if (isMobile) {
    return 'https://ai.ycxom.top:3002/api/v1/wallpaper/by-ratio/portrait';
  } else if (isTablet) {
    return 'https://ai.ycxom.top:3002/api/v1/wallpaper/by-ratio/square';
  } else {
    return 'https://ai.ycxom.top:3002/api/v1/wallpaper/by-ratio/standard';
  }
};

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const isLoadingRef = useRef(false);
  const previousImageRef = useRef<string | null>(null);

  const loadBackgroundImage = async () => {
    // 防止重复加载
    if (isLoadingRef.current) return;
    
    isLoadingRef.current = true;
    setIsLoading(true);
    
    try {
      // 根据设备类型选择合适的API
      const apiUrl = getWallpaperApiByDevice();
      
      // 添加随机参数避免缓存
      const urlWithCache = `${apiUrl}?cache=${Date.now()}`;
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

  const changeBackground = () => {
    loadBackgroundImage();
  };

  useEffect(() => {
    // 监听窗口大小变化，但只在宽度或高度发生显著变化时更新背景
    // 这样可以避免输入法弹出导致的小幅度高度变化触发背景重新加载
    const handleResize = () => {
      // 存储当前窗口尺寸
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      // 如果是首次加载或窗口宽度发生变化（设备方向改变）
      // 或者窗口高度变化超过30%（真正的窗口大小变化，而不是输入法弹出）
      if (!handleResize.lastWidth || 
          Math.abs(currentWidth - handleResize.lastWidth) > 100 ||
          Math.abs(currentHeight - handleResize.lastHeight) / handleResize.lastHeight > 0.3) {
        
        // 更新记录的尺寸
        handleResize.lastWidth = currentWidth;
        handleResize.lastHeight = currentHeight;
        
        // 加载新背景
        loadBackgroundImage();
      }
    };
    
    // 初始化存储的尺寸
    handleResize.lastWidth = window.innerWidth;
    handleResize.lastHeight = window.innerHeight;
    
    // 初始加载
    loadBackgroundImage();
    
    // 设置定时器，每30分钟更换一次背景
    const interval = setInterval(loadBackgroundImage, 30 * 60 * 1000);
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      
      // 清理所有创建的URL对象
      if (previousImageRef.current && previousImageRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(previousImageRef.current);
      }
    };
  }, []);

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