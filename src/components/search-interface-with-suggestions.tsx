import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchEngineSelector, SEARCH_ENGINES, SearchEngine, SearchType } from './search-engine-selector';
import { Search, ExternalLink, Image as ImageIcon, Video, Newspaper, GraduationCap, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import { useAutoSwitchControl } from '@/hooks/useAutoSwitchControl';
import { SuggestionResult } from '@/services/suggestion-api';

// 数字滚动组件
interface DigitRollerProps {
  digit: string;
  theme?: string;
}

const DigitRoller: React.FC<DigitRollerProps> = ({ digit, theme }) => {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [isRolling, setIsRolling] = useState(false);
  const [showBottomFlip, setShowBottomFlip] = useState(false);
  
  useEffect(() => {
    if (digit !== prevDigit) {
      // 立即开始动画状态
      setIsRolling(true);
      setShowBottomFlip(false);
      
      // 上半部分翻转完成后，开始下半部分翻转
      const topFlipTimer = setTimeout(() => {
        setShowBottomFlip(true);
      }, 300); // 上半部分动画持续时间
      
      // 整个动画完成后，更新状态
      const completeTimer = setTimeout(() => {
        setPrevDigit(digit);
        setIsRolling(false);
        setShowBottomFlip(false);
      }, 600); // 总动画时间
      
      return () => {
        clearTimeout(topFlipTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [digit, prevDigit]);
  
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const bgColor = theme === 'light' ? 'bg-gradient-to-b from-gray-100 to-gray-200' : 'bg-gradient-to-b from-gray-700 to-gray-800';
  const borderColor = theme === 'light' ? 'border-gray-300' : 'border-gray-600';
  const shadowColor = theme === 'light' ? 'shadow-gray-400/30' : 'shadow-black/30';
  
  return (
    <div className={`relative w-12 h-16 md:w-14 md:h-20 mx-0.5 ${bgColor} rounded-md border ${borderColor} overflow-hidden shadow-md ${shadowColor}`}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* 上半部分 - 静态背景 */}
          <div className={`absolute top-0 left-0 w-full h-1/2 flex items-end justify-center overflow-hidden ${bgColor} border-b ${borderColor}`}>
            <span className={`${textColor} translate-y-1/2 select-none`} style={{ fontSize: '2rem' }}>
              {digit}
            </span>
          </div>
          
          {/* 下半部分 - 静态背景 */}
          <div className={`absolute bottom-0 left-0 w-full h-1/2 flex items-start justify-center overflow-hidden ${bgColor}`}>
            <span className={`${textColor} -translate-y-1/2 select-none`} style={{ fontSize: '2rem' }}>
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
                boxShadow: theme === 'light' 
                  ? '0 2px 4px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.05)' 
                  : '0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.05)'
              }}
            >
              <span className={`${textColor} translate-y-1/2 select-none`} style={{ fontSize: '2rem' }}>
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
              <span className={`${textColor} -translate-y-1/2 select-none`} style={{ fontSize: '2rem' }}>
                {digit}
              </span>
            </div>
          )}
          
          {/* 中间分割线 */}
          <div className={`absolute top-1/2 left-0 w-full h-px ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'} z-30 transform -translate-y-px`}></div>
        </div>
      </div>
    </div>
  );
};

// 时钟组件
interface ClockProps {
  theme?: string;
}

const Clock: React.FC<ClockProps> = ({ theme }) => {
  const [time, setTime] = useState(new Date());
  const timeRef = useRef(new Date());
  
  // 格式化时间，显示为 HH:MM:SS
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { hours, minutes, seconds };
  };
  
  // 格式化日期，显示为 YYYY年MM月DD日 星期几
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 星期${weekday}`;
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      timeRef.current = new Date();
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const { hours, minutes, seconds } = formatTime(time);
  
  return (
    <div className="mb-6">
      <div className="flex justify-center items-center mb-4 px-4">
        <DigitRoller digit={hours[0]} theme={theme} />
        <DigitRoller digit={hours[1]} theme={theme} />
        <div className={`mx-1 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} animate-pulse`} style={{ fontSize: '2.5rem' }}>:</div>
        <DigitRoller digit={minutes[0]} theme={theme} />
        <DigitRoller digit={minutes[1]} theme={theme} />
        <div className={`mx-1 ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} animate-pulse`} style={{ fontSize: '2.5rem' }}>:</div>
        <DigitRoller digit={seconds[0]} theme={theme} />
        <DigitRoller digit={seconds[1]} theme={theme} />
      </div>
      <p className={`text-center ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`} style={{ fontSize: '1.125rem' }}>
        {formatDate(time)}
      </p>
    </div>
  );
};

export const SearchInterfaceWithSuggestions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('web');
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(
    SEARCH_ENGINES.find(engine => engine.type === 'web') || SEARCH_ENGINES[0]
  );
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isMouseOverSuggestions, setIsMouseOverSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { theme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { suggestions, mergedSuggestions, isLoading, error, isQuickSearch, fetchSuggestions, fetchEnhancedSuggestions } = useSearchSuggestions();
  
  // 自动切换控制
  const { isAutoSwitchEnabled } = useAutoSwitchControl();

  // 判断字符串是否为URL
  const isValidUrl = (string: string): boolean => {
    try {
      // 尝试创建URL对象，如果成功则为有效URL
      new URL(string);
      return true;
    } catch (_) {
      // 如果不是标准URL格式，检查是否可能是不带协议的URL
      return /^(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i.test(string);
    }
  };

  // 判断字符串是否为图片URL
  const isImageUrl = (string: string): boolean => {
    // 检查是否为URL
    if (!isValidUrl(string)) return false;
    
    // 检查URL是否以常见图片扩展名结尾
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
    return imageExtensions.some(ext => string.toLowerCase().endsWith(ext)) || 
           string.includes('imgur.com') || 
           string.includes('picsum.photos') || 
           string.includes('unsplash.com');
  };

  // 处理搜索
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    if (searchType === 'image' && selectedEngine.supportImageUpload) {
      // 检查输入是否为图片URL
      if (isImageUrl(searchQuery.trim())) {
        // 以图搜图 - 使用图片URL
        const imageUrl = searchQuery.trim();
        const searchUrl = selectedEngine.imageSearchUrl + encodeURIComponent(imageUrl);
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
      } else {
        // 作为普通文本搜索图片
        const searchUrl = selectedEngine.url + encodeURIComponent(searchQuery.trim());
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      // 普通文本搜索
      const searchUrl = selectedEngine.url + encodeURIComponent(searchQuery.trim());
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
    
    setTimeout(() => setIsSearching(false), 1000);
  }, [searchQuery, searchType, selectedEngine]);

  // 处理建议点击（高级功能：自动切换搜索引擎）
  const handleSuggestionClick = useCallback((suggestion: SuggestionResult | any) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    // 高级功能：自动切换到对应的搜索引擎（需要检查开关状态）
    if (isAutoSwitchEnabled && suggestion.engineId && suggestion.engineId !== 'all') {
      const engine = SEARCH_ENGINES.find(e => e.id === suggestion.engineId);
      if (engine) {
        setSelectedEngine(engine);
        console.log('自动切换开启，切换到搜索引擎:', engine.name);
      }
    } else if (!isAutoSwitchEnabled && suggestion.engineId && suggestion.engineId !== 'all') {
      console.log('自动切换已关闭，不切换搜索引擎');
    }
    
    // 聚焦输入框，让用户可以继续编辑或直接搜索
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [isAutoSwitchEnabled]);

  // 处理搜索引擎logo点击
  const handleEngineLogoClick = useCallback((engineId: string, keyword: string) => {
    // logo点击功能始终可用，不受自动切换开关影响
    const engine = SEARCH_ENGINES.find(e => e.id === engineId);
    if (engine && keyword.trim()) {
      const searchUrl = engine.url + encodeURIComponent(keyword.trim());
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
      console.log('点击logo跳转到:', engine.name);
    }
  }, []);

  // 处理输入变化
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedSuggestionIndex(-1);
    
    // 只有网页搜索才显示建议
    if (searchType === 'web') {
      // 网页搜索使用增强功能获取所有搜索引擎的建议，支持去重合并和logo显示
      fetchEnhancedSuggestions(value);
      setShowSuggestions(true);
    } else {
      // 其他类型不显示建议
      setShowSuggestions(false);
    }
  }, [fetchEnhancedSuggestions, searchType]);

  // 处理输入框焦点
  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
    // 只有网页搜索才显示建议
    if (searchType === 'web') {
      fetchEnhancedSuggestions(searchQuery);
      setShowSuggestions(true);
    } else {
      // 其他类型不显示建议
      setShowSuggestions(false);
    }
  }, [searchQuery, fetchEnhancedSuggestions, searchType]);

  // 处理输入框失焦
  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
    // 延迟关闭建议框，给鼠标移动到建议框的时间
    setTimeout(() => {
      if (!isMouseOverSuggestions) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    }, 150);
  }, [isMouseOverSuggestions]);

  // 处理鼠标进入建议框
  const handleMouseEnterSuggestions = useCallback(() => {
    setIsMouseOverSuggestions(true);
  }, []);

  // 处理鼠标离开建议框
  const handleMouseLeaveSuggestions = useCallback(() => {
    setIsMouseOverSuggestions(false);
    // 如果输入框也没有焦点，则关闭建议框
    if (!isInputFocused) {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  }, [isInputFocused]);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // 只在网页搜索模式下处理建议相关的键盘事件
    if (searchType === 'web' && showSuggestions && mergedSuggestions.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev < mergedSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : mergedSuggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedSuggestionIndex >= 0) {
            handleSuggestionClick(mergedSuggestions[selectedSuggestionIndex]);
          } else {
            handleSearch();
          }
          break;
        case 'Escape':
          setShowSuggestions(false);
          setSelectedSuggestionIndex(-1);
          inputRef.current?.blur();
          break;
      }
    } else if (e.key === 'Enter') {
      // 非网页搜索模式或没有建议时，直接搜索
      handleSearch();
    }
  }, [showSuggestions, mergedSuggestions, searchType, selectedSuggestionIndex, handleSearch, handleSuggestionClick]);

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    // 当切换搜索类型时，自动选择该类型的第一个搜索引擎
    const engineOfType = SEARCH_ENGINES.find(engine => engine.type === type);
    if (engineOfType) {
      setSelectedEngine(engineOfType);
    }
    
    // 清空搜索框和建议
    setSearchQuery('');
    setShowSuggestions(false);
    // 确保不显示推荐提示框
    setSelectedSuggestionIndex(-1);
    setIsMouseOverSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showSuggestions) {
      handleSearch();
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 点击外部关闭建议
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        setIsMouseOverSuggestions(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 根据搜索类型提供不同的热门搜索词
  const getQuickSearchTerms = () => {
    switch (searchType) {
      case 'web':
        return ['今日新闻', '天气预报', '股票行情', '汇率查询', '翻译工具', '在线计算器', '地图导航', '音乐播放'];
      case 'image':
        return ['https://img1.acgvia.workers.dev/photos/file_589761.jpg', 'https://i.imgur.com/example.jpg', 'https://images.unsplash.com/photo-example', 'https://picsum.photos/200/300'];
      case 'video':
        return ['热门电影', '音乐MV', '游戏实况', '教学视频', '纪录片', '动漫番剧', '综艺节目', '运动赛事'];
      case 'news':
        return ['国际新闻', '科技动态', '财经资讯', '体育赛事', '娱乐八卦', '健康医疗', '教育资讯', '环保新闻'];
      case 'academic':
        return ['论文检索', '学术期刊', '研究方法', '学术会议', '引用格式', '学位论文', '专利检索', '开放获取'];
      default:
        return ['今日新闻', '天气预报', '股票行情', '汇率查询', '翻译工具', '在线计算器', '地图导航', '音乐播放'];
    }
  };

  const quickSearchTerms = getQuickSearchTerms();

  // 根据搜索类型获取对应的图标
  const getSearchIcon = () => {
    const iconClass = `absolute left-4 top-1/2 transform -translate-y-1/2 ${
      theme === 'light' ? 'text-black/60' : 'text-white/60'
    } w-5 h-5`;
    
    switch (searchType) {
      case 'web':
        return <Search className={iconClass} />;
      case 'image':
        return <ImageIcon className={iconClass} />;
      case 'video':
        return <Video className={iconClass} />;
      case 'news':
        return <Newspaper className={iconClass} />;
      case 'academic':
        return <GraduationCap className={iconClass} />;
      default:
        return <Search className={iconClass} />;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 md:justify-center justify-start pt-20 md:pt-0" ref={containerRef}>
        <div className="text-center mb-8">
          <Clock theme={theme} />
          <p className={`${theme === 'light' ? 'text-black/80' : 'text-white/80'}`} style={{ fontSize: '1.125rem' }}>
            集成多个搜索引擎
          </p>
        </div>

        <div className="w-full max-w-2xl mb-8">
          <div className="relative">
            <div className={`backdrop-blur-md rounded-2xl p-6 shadow-2xl ${
              theme === 'light' 
                ? 'bg-black/10 border border-black/10' 
                : 'bg-white/20 border border-white/20'
            }`}>
              {searchType === 'image' && selectedEngine.supportImageUpload && (
                <div className="mb-4">
                  <div className={`mb-2 text-sm ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`}>
                    <p>输入图片URL可进行以图搜图，输入关键词可搜索相关图片</p>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  {getSearchIcon()}
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder={
                      searchType === 'web' 
                        ? '搜索全网内容...' 
                        : searchType === 'image' && selectedEngine.supportImageUpload 
                          ? '输入图片URL以图搜图或输入关键词搜索图片...' 
                          : selectedEngine.placeholder
                    }
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyPress={handleKeyPress}
                    onKeyDown={handleKeyDown}
                    className={`pl-12 pr-4 py-4 text-lg rounded-xl transition-all duration-200 ${
                      theme === 'light'
                        ? 'bg-black/5 border-black/10 text-black placeholder-black/60 focus:bg-black/10 focus:border-black/20'
                        : 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/40'
                    }`}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || isSearching}
                  className={`px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                  }`}
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5 mr-2" />
                      搜索
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* 搜索建议 - 只在网页搜索模式下显示 */}
            {searchType === 'web' && showSuggestions && (mergedSuggestions.length > 0 || isLoading) && (
              <div 
                ref={suggestionsRef}
                className={`absolute top-full left-0 right-0 mt-2 backdrop-blur-md rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto ${
                  theme === 'light' 
                    ? 'bg-black/10 border border-black/10' 
                    : 'bg-white/20 border border-white/20'
                }`}
                onMouseEnter={handleMouseEnterSuggestions}
                onMouseLeave={handleMouseLeaveSuggestions}
              >
                <div className="p-4">
                  {isLoading && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className={`h-5 w-5 animate-spin ${theme === 'light' ? 'text-black/60' : 'text-white/60'}`} />
                      <span className={`ml-2 ${theme === 'light' ? 'text-black/60' : 'text-white/60'}`}>获取建议中...</span>
                    </div>
                  )}
                  
                  {!isLoading && mergedSuggestions.length > 0 && (
                    <div className="space-y-1">
                      {/* 显示来源标题 */}
                      {!searchQuery.trim() && (
                        <div className={`px-3 py-2 text-sm border-b ${
                          theme === 'light' 
                            ? 'text-black/60 border-black/10' 
                            : 'text-white/60 border-white/10'
                        }`}>
                          🔥 热门搜索推荐
                        </div>
                      )}
                      {searchQuery.trim() && (
                        <div className={`px-3 py-2 text-sm border-b ${
                          theme === 'light' 
                            ? 'text-black/60 border-black/10' 
                            : 'text-white/60 border-white/10'
                        }`}>
                          {isQuickSearch ? '⚡ 快捷搜索' : '🌟 全网搜索建议'}
                        </div>
                      )}
                      
                      {/* 渲染建议项 */}
                      {mergedSuggestions.map((suggestion, index) => (
                        <div
                          key={`${suggestion.text}-${index}`}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            index === selectedSuggestionIndex
                              ? theme === 'light'
                                ? 'bg-black/20 text-black'
                                : 'bg-white/20 text-white'
                              : theme === 'light'
                                ? 'hover:bg-black/10 text-black/80 hover:text-black'
                                : 'hover:bg-white/10 text-white/80 hover:text-white'
                          }`}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center flex-1">
                            <span className="flex-1 truncate">{suggestion.text}</span>
                            {/* 去重标识 */}
                            {searchType === 'web' && (suggestion as any).isDuplicated && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0"></div>
                            )}
                          </div>
                          
                          {/* 搜索引擎Logo区域 */}
                          <div className="ml-3 flex items-center space-x-1">
                            {searchType === 'web' && (suggestion as any).sources ? (
                              // 显示搜索引擎logo
                              (suggestion as any).sources.slice(0, 3).map((engineId: string, logoIndex: number) => (
                                <div
                                  key={`${engineId}-${logoIndex}`}
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 cursor-pointer hover:scale-110 ${
                                    theme === 'light' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                  }`}
                                  style={{ marginLeft: logoIndex > 0 ? '-4px' : '0' }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEngineLogoClick(engineId, suggestion.text);
                                  }}
                                  title={`点击在${engineId === 'baidu' ? '百度' : engineId === 'google' ? 'Google' : engineId === 'sogou' ? '搜狗' : engineId === 'bing' ? '必应' : engineId}中搜索`}
                                >
                                  {engineId === 'baidu' ? '百' : 
                                   engineId === 'google' ? 'G' : 
                                   engineId === 'sogou' ? '搜' : 
                                   engineId === 'bing' ? 'B' : 
                                   engineId === 'so360' ? '360' : 
                                   engineId.charAt(0).toUpperCase()}
                                </div>
                              ))
                            ) : (
                              // 非网页搜索显示文字来源
                              <span 
                                className={`text-xs px-2 py-1 rounded-full cursor-pointer transition-all duration-200 ${
                                  theme === 'light'
                                    ? 'bg-black/20 text-black/80 hover:bg-black/30'
                                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (suggestion.engineId && suggestion.engineId !== 'all') {
                                    const engine = SEARCH_ENGINES.find(e => e.id === suggestion.engineId);
                                    if (engine) {
                                      setSelectedEngine(engine);
                                      setSearchQuery(suggestion.text);
                                      setShowSuggestions(false);
                                    }
                                  }
                                }}
                              >
                                {(suggestion as any).source || '未知'}
                              </span>
                            )}
                            
                            {/* 显示更多logo的数量 */}
                            {searchType === 'web' && (suggestion as any).sources && (suggestion as any).sources.length > 3 && (
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium -ml-1 ${
                                theme === 'light' ? 'bg-gray-100 text-gray-600 border-2 border-white' : 'bg-gray-700 text-gray-300 border-2 border-gray-800'
                              }`}>
                                +{(suggestion as any).sources.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {error && (
                    <div className={`px-3 py-2 text-sm ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>
                      {error}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <SearchEngineSelector 
          selectedEngine={selectedEngine}
          onEngineChange={setSelectedEngine}
          searchType={searchType}
          onSearchTypeChange={handleSearchTypeChange}
        />

        <div className="w-full max-w-4xl mt-8">
          <h3 className={`text-center mb-4 text-lg ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`}>热门搜索</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {quickSearchTerms.map((term, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(term)}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  theme === 'light'
                    ? 'bg-black/10 text-black/80 hover:bg-black/20 hover:text-black border border-black/10 hover:border-black/20'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className={`absolute bottom-6 left-6 text-sm ${theme === 'light' ? 'text-black/60' : 'text-white/60'}`}>
          <p>背景图片来源: 壁纸API</p>
        </div>
      </div>
    );
};
