import React from 'react';
import { getEngineLogo } from '@/config/engine-logos';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EngineLogoProps {
  engineId: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (engineId: string) => void;
  className?: string;
  keyword?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

export const EngineLogo: React.FC<EngineLogoProps> = ({
  engineId,
  size = 'md',
  onClick,
  className = ''
}) => {
  const logo = getEngineLogo(engineId);
  
  if (!logo) {
    return (
      <div 
        className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-xs text-gray-500">?</span>
      </div>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // logo点击功能始终可用，不受自动切换开关影响
    if (onClick) {
      onClick(engineId);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              ${sizeClasses[size]} 
              rounded-full 
              flex 
              items-center 
              justify-center 
              transition-all 
              duration-200 
              cursor-pointer 
              hover:scale-110 
              hover:shadow-md
              border-2
              border-white
              ${className}
            `}
            style={{ backgroundColor: logo.backgroundColor }}
            onClick={handleClick}
          >
            <img
              src={logo.logoUrl}
              alt={logo.name}
              className="w-full h-full rounded-full object-contain pointer-events-none"
              draggable={false}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">点击搜索 {logo.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface EngineLogoGroupProps {
  engineIds: string[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  onLogoClick?: (engineId: string, keyword: string) => void;
  keyword?: string;
  className?: string;
}

export const EngineLogoGroup: React.FC<EngineLogoGroupProps> = ({
  engineIds,
  maxVisible = 3,
  size = 'md',
  onLogoClick,
  keyword = '',
  className = ''
}) => {
  const visibleEngines = engineIds.slice(0, maxVisible);
  const hiddenCount = Math.max(0, engineIds.length - maxVisible);

  const handleLogoClick = (engineId: string) => {
    // logo点击功能始终可用，不受自动切换开关影响
    if (onLogoClick && keyword) {
      onLogoClick(engineId, keyword);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {visibleEngines.map((engineId, index) => (
        <div
          key={engineId}
          className="relative"
          style={{ 
            marginLeft: index > 0 ? '-4px' : '0',
            zIndex: visibleEngines.length - index
          }}
        >
          <EngineLogo
            engineId={engineId}
            size={size}
            onClick={handleLogoClick}
            keyword={keyword}
            className="hover:z-50 relative"
          />
        </div>
      ))}
      
      {hiddenCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`
                  ${sizeClasses[size]} 
                  rounded-full 
                  bg-gray-100 
                  border-2 
                  border-white 
                  flex 
                  items-center 
                  justify-center 
                  text-xs 
                  text-gray-600 
                  font-medium
                  -ml-1
                `}
              >
                +{hiddenCount}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <p className="font-medium mb-1">更多搜索引擎:</p>
                {engineIds.slice(maxVisible).map(engineId => {
                  const logo = getEngineLogo(engineId);
                  return logo ? (
                    <p key={engineId} className="text-xs">{logo.name}</p>
                  ) : null;
                })}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

// 搜索引擎跳转工具函数
export const jumpToSearchEngine = (engineId: string, keyword: string, checkAutoSwitch: boolean = true) => {
  // 如果需要检查自动切换开关状态
  if (checkAutoSwitch) {
    // 注意：这里不能直接使用hook，因为这是一个工具函数
    // 调用方应该在调用前检查自动切换状态
    console.log('jumpToSearchEngine: 请在调用前检查自动切换开关状态');
  }
  
  const searchUrls: Record<string, string> = {
    baidu: `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`,
    google: `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
    sogou: `https://www.sogou.com/web?query=${encodeURIComponent(keyword)}`,
    bing: `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`,
    so360: `https://www.so.com/s?q=${encodeURIComponent(keyword)}`,
    duckduckgo: `https://duckduckgo.com/?q=${encodeURIComponent(keyword)}`,
    yandex: `https://yandex.com/search/?text=${encodeURIComponent(keyword)}`,
    yahoo: `https://search.yahoo.com/search?p=${encodeURIComponent(keyword)}`
  };

  const url = searchUrls[engineId];
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
