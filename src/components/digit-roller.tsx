import React, { useState, useEffect } from 'react';

interface DigitRollerProps {
  digit: string;
  theme?: string;
}

export const DigitRoller: React.FC<DigitRollerProps> = ({ digit, theme }) => {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [isRolling, setIsRolling] = useState(false);
  const [showBottomFlip, setShowBottomFlip] = useState(false);
  
  useEffect(() => {
    if (digit !== prevDigit) {
      setIsRolling(true);
      setShowBottomFlip(false);
      
      const topFlipTimer = setTimeout(() => {
        setShowBottomFlip(true);
      }, 300);
      
      const completeTimer = setTimeout(() => {
        setPrevDigit(digit);
        setIsRolling(false);
        setShowBottomFlip(false);
      }, 600);
      
      return () => {
        clearTimeout(topFlipTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [digit, prevDigit]);
  
  const getThemeClasses = () => {
    const isLight = theme === 'light';
    return {
      textColor: isLight ? 'text-gray-800' : 'text-gray-100',
      bgColor: isLight ? 'bg-gradient-to-b from-gray-100 to-gray-200' : 'bg-gradient-to-b from-gray-700 to-gray-800',
      borderColor: isLight ? 'border-gray-300' : 'border-gray-600',
      shadowColor: isLight ? 'shadow-gray-400/30' : 'shadow-black/30',
      dividerColor: isLight ? 'bg-gray-300' : 'bg-gray-600'
    };
  };
  
  const { textColor, bgColor, borderColor, shadowColor, dividerColor } = getThemeClasses();
  
  const digitStyle = { fontSize: '2rem' };
  const boxShadowStyle = theme === 'light' 
    ? '0 2px 4px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.05)' 
    : '0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.05)';
  
  return (
    <div className={`relative w-12 h-16 md:w-14 md:h-20 mx-0.5 ${bgColor} rounded-md border ${borderColor} overflow-hidden shadow-md ${shadowColor}`}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* 上半部分 - 静态背景 */}
          <div className={`absolute top-0 left-0 w-full h-1/2 flex items-end justify-center overflow-hidden ${bgColor} border-b ${borderColor}`}>
            <span className={`${textColor} translate-y-1/2 select-none`} style={digitStyle}>
              {digit}
            </span>
          </div>
          
          {/* 下半部分 - 静态背景 */}
          <div className={`absolute bottom-0 left-0 w-full h-1/2 flex items-start justify-center overflow-hidden ${bgColor}`}>
            <span className={`${textColor} -translate-y-1/2 select-none`} style={digitStyle}>
              {isRolling ? prevDigit : digit}
            </span>
          </div>
          
          {/* 翻转的上半部分 - 动画层 */}
          {isRolling && (
            <div 
              className={`absolute top-0 left-0 w-full h-1/2 flex items-end justify-center overflow-hidden ${bgColor} border-b ${borderColor} z-20`}
              style={{
                transformOrigin: 'bottom',
                animation: 'flipDown 0.3s ease-in-out forwards',
                boxShadow: boxShadowStyle
              }}
            >
              <span className={`${textColor} translate-y-1/2 select-none`} style={digitStyle}>
                {prevDigit}
              </span>
            </div>
          )}
          
          {/* 翻转的下半部分 - 动画层 */}
          {showBottomFlip && (
            <div 
              className={`absolute bottom-0 left-0 w-full h-1/2 flex items-start justify-center overflow-hidden ${bgColor} z-10`}
              style={{
                transformOrigin: 'top',
                animation: 'flipUp 0.3s ease-in-out forwards',
                boxShadow: theme === 'light' 
                  ? '0 -2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.05)' 
                  : '0 -2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.05)'
              }}
            >
              <span className={`${textColor} -translate-y-1/2 select-none`} style={digitStyle}>
                {digit}
              </span>
            </div>
          )}
          
          {/* 中间分割线 */}
          <div className={`absolute top-1/2 left-0 w-full h-px ${dividerColor} z-30 transform -translate-y-px`} />
        </div>
      </div>
    </div>
  );
};