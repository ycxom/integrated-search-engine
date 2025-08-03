import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchEngineSelectorOptimized } from './search-engine-selector-optimized';
import { Clock } from './clock';
import { Search, ExternalLink, Image as ImageIcon, Video, Newspaper, GraduationCap } from 'lucide-react';
import { useTheme } from 'next-themes';
import { 
  SearchEngine, 
  SearchType, 
  getDefaultEngine, 
  QUICK_SEARCH_TERMS 
} from '@/config/search-config';
import { 
  isImageUrl, 
  buildSearchUrl, 
  openSearchWindow 
} from '@/utils/search-utils';

export const SearchInterfaceOptimized: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('web');
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(getDefaultEngine('web'));
  const [isSearching, setIsSearching] = useState(false);
  const { theme } = useTheme();

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      if (searchType === 'image' && selectedEngine.supportImageUpload) {
        if (isImageUrl(searchQuery.trim())) {
          // 以图搜图
          const searchUrl = buildSearchUrl(selectedEngine.imageSearchUrl!, searchQuery.trim());
          openSearchWindow(searchUrl);
        } else {
          // 普通图片搜索
          const searchUrl = buildSearchUrl(selectedEngine.url, searchQuery.trim());
          openSearchWindow(searchUrl);
        }
      } else {
        // 普通文本搜索
        const searchUrl = buildSearchUrl(selectedEngine.url, searchQuery.trim());
        openSearchWindow(searchUrl);
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setTimeout(() => setIsSearching(false), 1000);
    }
  }, [searchQuery, searchType, selectedEngine]);

  const handleSearchTypeChange = useCallback((type: SearchType) => {
    setSearchType(type);
    setSelectedEngine(getDefaultEngine(type));
    setSearchQuery('');
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleQuickSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const getSearchIcon = () => {
    const iconClass = `absolute left-4 top-1/2 transform -translate-y-1/2 ${
      theme === 'light' ? 'text-black/60' : 'text-white/60'
    } w-5 h-5`;
    
    const iconMap = {
      web: Search,
      image: ImageIcon,
      video: Video,
      news: Newspaper,
      academic: GraduationCap
    };
    
    const IconComponent = iconMap[searchType];
    return <IconComponent className={iconClass} />;
  };

  const getInputClasses = () => {
    return `pl-12 pr-4 py-4 text-lg rounded-xl transition-all duration-200 ${
      theme === 'light'
        ? 'bg-black/5 border-black/10 text-black placeholder-black/60 focus:bg-black/10 focus:border-black/20'
        : 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/40'
    }`;
  };

  const getSearchButtonClasses = () => {
    return `px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 ${
      theme === 'light'
        ? 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white'
        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
    }`;
  };

  const getQuickSearchButtonClasses = () => {
    return `px-4 py-2 rounded-full transition-all duration-200 ${
      theme === 'light'
        ? 'bg-black/10 text-black/80 hover:bg-black/20 hover:text-black border border-black/10 hover:border-black/20'
        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10 hover:border-white/20'
    }`;
  };

  const quickSearchTerms = QUICK_SEARCH_TERMS[searchType];

  return (
    <div className="flex flex-col items-center min-h-screen px-4 md:justify-center justify-start pt-20 md:pt-0">
      {/* 时钟和标题 */}
      <div className="text-center mb-8">
        <Clock theme={theme} />
        <p 
          className={`${theme === 'light' ? 'text-black/80' : 'text-white/80'}`} 
          style={{ fontSize: '1.125rem' }}
        >
          集成多个搜索引擎
        </p>
      </div>

      {/* 搜索框 */}
      <div className="w-full max-w-2xl mb-8">
        <div className="relative">
          <div className={`backdrop-blur-md rounded-2xl p-6 shadow-2xl ${
            theme === 'light' 
              ? 'bg-black/10 border border-black/10' 
              : 'bg-white/20 border border-white/20'
          }`}>
            {/* 图片搜索提示 */}
            {searchType === 'image' && selectedEngine.supportImageUpload && (
              <div className="mb-4">
                <div className={`mb-2 text-sm ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`}>
                  <p>输入图片URL可进行以图搜图，输入关键词可搜索相关图片</p>
                </div>
              </div>
            )}
            
            {/* 搜索输入框和按钮 */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                {getSearchIcon()}
                <Input
                  type="text"
                  placeholder={
                    searchType === 'image' && selectedEngine.supportImageUpload 
                      ? '输入图片URL以图搜图或输入关键词搜索图片...' 
                      : selectedEngine.placeholder
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={getInputClasses()}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className={getSearchButtonClasses()}
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5 mr-2" />
                    搜索
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索引擎选择器 */}
      <SearchEngineSelectorOptimized 
        selectedEngine={selectedEngine}
        onEngineChange={setSelectedEngine}
        searchType={searchType}
        onSearchTypeChange={handleSearchTypeChange}
        theme={theme}
      />

      {/* 热门搜索 */}
      <div className="w-full max-w-4xl mt-8">
        <h3 className={`text-center mb-4 text-lg ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`}>
          热门搜索
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {quickSearchTerms.map((term, index) => (
            <button
              key={index}
              onClick={() => handleQuickSearch(term)}
              className={getQuickSearchButtonClasses()}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* 底部信息 */}
      <div className={`absolute bottom-6 left-6 text-sm ${theme === 'light' ? 'text-black/60' : 'text-white/60'}`}>
        <p>背景图片来源: 壁纸API</p>
      </div>
    </div>
  );
};