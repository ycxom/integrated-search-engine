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
  const [currentImage, setCurrentImage] = useState('');
  const [nextImage, setNextImage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  const isLoadingRef = useRef(false);
  const deviceTypeRef = useRef('');
  const lastLoadTimeRef = useRef(0);
  const orientationRef = useRef('');
  const currentImageRef = useRef('');
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 追踪当前图片URL用于清理
  useEffect(() => { 
    currentImageRef.current = currentImage; 
  }, [currentImage]);

  const handleLoadError = () => {
    const fallbackImage = window.innerWidth <= 768 ? '/mobile-fallback.png' : '/desktop-fallback.png';
    if (!currentImageRef.current) {
      setCurrentImage(fallbackImage);
      setNextImage('');
    } else {
      // 如果已有图片，直接切换到备用图片
      setCurrentImage(fallbackImage);
      setNextImage('');
    }
    setIsLoading(false);
    setIsTransitioning(false);
    isLoadingRef.current = false;
  };

  const loadBackgroundImage = async (forceReload = false) => {
    // 防止重复加载或正在过渡时加载
    if (isLoadingRef.current || isTransitioning) return;

    const apiUrl = getWallpaperApiByDevice();
    const currentDeviceType = apiUrl.split('/').pop() || '';
    const currentOrientation = window.matchMedia('(orientation: landscape)').matches ? 'landscape' : 'portrait';
    const currentTime = Date.now();

    if (!forceReload &&
        currentDeviceType === deviceTypeRef.current &&
        currentOrientation === orientationRef.current &&
        currentTime - lastLoadTimeRef.current < 5 * 60 * 1000) {
      return;
    }

    deviceTypeRef.current = currentDeviceType;
    orientationRef.current = currentOrientation;
    lastLoadTimeRef.current = currentTime;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const urlWithCache = `${apiUrl}?cache=${currentTime}`;
      const response = await fetch(urlWithCache);
      if (!response.ok) throw new Error('背景图片加载失败');

      const blob = await response.blob();
      const newImageUrl = URL.createObjectURL(blob);

      // 预加载新图片，确保完全加载后再开始动画
      const img = new Image();
      img.src = newImageUrl;
      
      img.onload = () => {
        if (!currentImageRef.current) {
          // 首次加载，直接设置
          setCurrentImage(newImageUrl);
          setIsLoading(false);
          isLoadingRef.current = false;
        } else {
          // 步骤1: 先将新图片设置到底层（nextImage）
          setNextImage(newImageUrl);
          
          // 步骤2: 等待底层图片渲染完成后开始过渡
          setTimeout(() => {
            setIsTransitioning(true);
            
            // 步骤3: 过渡动画完成后，将新图片提升为当前图片
            transitionTimeoutRef.current = setTimeout(() => {
              const oldImage = currentImageRef.current;
              setCurrentImage(newImageUrl);
              setNextImage('');
              setIsTransitioning(false);
              
              // 清理旧图片资源
              if (oldImage && oldImage.startsWith('blob:')) {
                URL.revokeObjectURL(oldImage);
              }
              
              setIsLoading(false);
              isLoadingRef.current = false;
            }, 1000); // 与CSS动画时长保持一致
          }, 100); // 给底层图片一点时间渲染
        }
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(newImageUrl);
        console.error('新背景图片预加载失败，使用备用图片');
        handleLoadError();
      };
    } catch (error) {
      console.error('加载背景图片失败:', error);
      handleLoadError();
    }
  };

  useEffect(() => {
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        const currentOrientation = window.matchMedia('(orientation: landscape)').matches ? 'landscape' : 'portrait';
        if (currentOrientation !== orientationRef.current) {
          loadBackgroundImage(false);
        }
      }, 500);
    };

    loadBackgroundImage(true);
    const interval = setInterval(() => loadBackgroundImage(true), 30 * 60 * 1000);
    
    const orientationMediaQuery = window.matchMedia('(orientation: portrait)');
    window.addEventListener('resize', handleResize);
    if (orientationMediaQuery.addEventListener) {
      orientationMediaQuery.addEventListener('change', handleResize);
    } else {
      orientationMediaQuery.addListener(handleResize);
    }

    return () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      
      if (orientationMediaQuery.removeEventListener) {
        orientationMediaQuery.removeEventListener('change', handleResize);
      } else {
        orientationMediaQuery.removeListener(handleResize);
      }
      
      // 清理图片资源
      if (currentImageRef.current && currentImageRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(currentImageRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 底层：新图片（准备显示的图片） */}
      {nextImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${nextImage})`,
            filter: theme === 'light' ? 'brightness(0.9) blur(0.5px)' : 'brightness(0.7) blur(0.5px)',
          }}
        />
      )}
      
      {/* 顶层：当前图片（正在显示的图片） */}
      {currentImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentImage})`,
            filter: theme === 'light' ? 'brightness(0.9) blur(0.5px)' : 'brightness(0.7) blur(0.5px)',
            opacity: isTransitioning ? 0 : 1,
          }}
        />
      )}
      
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
        onClick={() => loadBackgroundImage(true)}
        disabled={isTransitioning}
        className={`fixed bottom-6 right-6 z-20 p-3 backdrop-blur-md rounded-full transition-all duration-200 border ${
          theme === 'light' 
            ? 'bg-black/20 hover:bg-black/30 border-black/20 text-black' 
            : 'bg-white/20 hover:bg-white/30 border-white/20 text-white'
        } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="更换背景"
      >
        <svg 
          className="w-5 h-5" 
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