import React from 'react';
import { Search, TrendingUp, Zap } from 'lucide-react';
import { EngineLogoGroup } from '@/components/engine-logo';
import { MergedSuggestion } from '@/utils/result-deduplication';

interface SearchSuggestionsProps {
  suggestions: string[];
  mergedSuggestions?: MergedSuggestion[];
  isLoading: boolean;
  isQuickSearch?: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onLogoClick?: (engineId: string, keyword: string) => void;
  onClose: () => void;
  isVisible: boolean;
  query: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  mergedSuggestions = [],
  isLoading,
  isQuickSearch = false,
  onSuggestionClick,
  onLogoClick,
  onClose,
  isVisible,
  query,
  onMouseEnter,
  onMouseLeave
}) => {
  if (!isVisible) return null;

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    onClose();
  };

  const handleLogoClick = (engineId: string, keyword: string) => {
    if (onLogoClick) {
      onLogoClick(engineId, keyword);
    }
    // 关闭建议框
    onClose();
  };

  const getSuggestionIcon = (suggestion: MergedSuggestion | string) => {
    // 如果是MergedSuggestion对象
    if (typeof suggestion === 'object') {
      if (suggestion.isQuickSearch) {
        return <Zap className="w-4 h-4 text-purple-500" />;
      }
      if (suggestion.isDuplicated) {
        return <Search className="w-4 h-4 text-blue-500" />;
      }
    }
    
    // 如果没有查询词，显示为热门搜索
    if (!query) {
      return <TrendingUp className="w-4 h-4 text-orange-500" />;
    }
    
    // 其他情况显示为搜索建议
    return <Search className="w-4 h-4 text-blue-500" />;
  };

  const highlightQuery = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="font-semibold text-blue-600 dark:text-blue-400">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  // 优先显示合并后的建议，如果没有则显示原始建议
  const displaySuggestions = mergedSuggestions.length > 0 ? mergedSuggestions : 
    suggestions.map(s => ({ text: s, sources: [], isDuplicated: false }));

  return (
    <div 
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-80 overflow-y-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isLoading ? (
        <div className="p-4 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">正在获取建议...</span>
          </div>
        </div>
      ) : displaySuggestions.length > 0 ? (
        <div className="py-2">
          {/* 快捷搜索提示 */}
          {query && !isQuickSearch && (
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-purple-500" />
                <span>输入 <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">s {query}</code> 快速搜索所有引擎</span>
              </div>
            </div>
          )}
          
          {/* 标题栏 */}
          {!query && (
            <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              热门搜索
            </div>
          )}
          
          {isQuickSearch && (
            <div className="px-4 py-2 text-xs font-medium text-purple-600 dark:text-purple-400 border-b border-gray-100 dark:border-gray-700 bg-purple-50 dark:bg-purple-900/20">
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3" />
                <span>快捷搜索模式</span>
              </div>
            </div>
          )}

          {/* 建议列表 */}
          {displaySuggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.text}-${index}`}
              className="relative group"
            >
              <button
                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3"
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                {/* 图标 */}
                <div className="flex-shrink-0">
                  {getSuggestionIcon(suggestion)}
                </div>
                
                {/* 建议文本 */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    {highlightQuery(suggestion.text, query)}
                  </span>
                </div>
                
                {/* 去重标识 */}
                {suggestion.isDuplicated && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" title="多个来源"></div>
                  </div>
                )}
                
                {/* 搜索引擎Logo组 */}
                {suggestion.sources && suggestion.sources.length > 0 && (
                  <div className="flex-shrink-0">
                    <EngineLogoGroup
                      engineIds={suggestion.sources}
                      maxVisible={3}
                      size="sm"
                      keyword={suggestion.text}
                      onLogoClick={handleLogoClick}
                    />
                  </div>
                )}
                
                {/* 搜索图标 */}
                <Search className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          暂无搜索建议
        </div>
      )}
      
      {/* 底部提示 */}
      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>按 ↑↓ 选择，Enter 搜索</span>
          <div className="flex items-center space-x-2">
            <span>点击logo直接搜索</span>
            <span>ESC 关闭</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 搜索建议项组件
interface SuggestionItemProps {
  suggestion: string;
  query: string;
  onClick: () => void;
  isHighlighted?: boolean;
}

export const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  query,
  onClick,
  isHighlighted = false
}) => {
  const highlightQuery = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="font-semibold text-blue-600 dark:text-blue-400">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <button
      className={`w-full px-4 py-3 text-left transition-colors duration-150 flex items-center space-x-3 group ${
        isHighlighted 
          ? 'bg-blue-50 dark:bg-blue-900/20' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      <Search className="w-4 h-4 text-gray-400" />
      <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
        {highlightQuery(suggestion, query)}
      </span>
    </button>
  );
};

// 热门搜索组件
interface HotSearchesProps {
  searches: string[];
  onSearchClick: (search: string) => void;
  title?: string;
}

export const HotSearches: React.FC<HotSearchesProps> = ({
  searches,
  onSearchClick,
  title = "热门搜索"
}) => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={`${search}-${index}`}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
            onClick={() => onSearchClick(search)}
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};