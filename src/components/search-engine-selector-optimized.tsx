import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Image as ImageIcon, Video, Newspaper, GraduationCap } from 'lucide-react';
import { SearchEngine, SearchType, getEnginesByType } from '@/config/search-config';

interface SearchEngineSelectorProps {
  selectedEngine: SearchEngine;
  onEngineChange: (engine: SearchEngine) => void;
  searchType: SearchType;
  onSearchTypeChange: (type: SearchType) => void;
  theme?: string;
}

const SEARCH_TYPE_CONFIG = {
  web: { icon: Search, label: '网页', color: 'from-blue-500 to-blue-600' },
  image: { icon: ImageIcon, label: '图片', color: 'from-green-500 to-green-600' },
  video: { icon: Video, label: '视频', color: 'from-red-500 to-red-600' },
  news: { icon: Newspaper, label: '新闻', color: 'from-purple-500 to-purple-600' },
  academic: { icon: GraduationCap, label: '学术', color: 'from-orange-500 to-orange-600' }
} as const;

export const SearchEngineSelectorOptimized: React.FC<SearchEngineSelectorProps> = ({
  selectedEngine,
  onEngineChange,
  searchType,
  onSearchTypeChange,
  theme
}) => {
  const engines = getEnginesByType(searchType);
  
  const getButtonClasses = (isActive: boolean) => {
    const baseClasses = 'px-4 py-2 rounded-lg transition-all duration-200 border';
    
    if (theme === 'light') {
      return isActive
        ? `${baseClasses} bg-black/20 text-black border-black/30 shadow-md`
        : `${baseClasses} bg-black/5 text-black/70 border-black/10 hover:bg-black/10 hover:text-black`;
    } else {
      return isActive
        ? `${baseClasses} bg-white/30 text-white border-white/40 shadow-md`
        : `${baseClasses} bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white`;
    }
  };

  return (
    <div className="w-full max-w-4xl">
      {/* 搜索类型选择 */}
      <div className="mb-6">
        <h3 className={`text-center mb-4 text-lg ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`}>
          搜索类型
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(SEARCH_TYPE_CONFIG).map(([type, config]) => {
            const IconComponent = config.icon;
            const isActive = searchType === type;
            
            return (
              <Button
                key={type}
                onClick={() => onSearchTypeChange(type as SearchType)}
                className={`${getButtonClasses(isActive)} flex items-center gap-2`}
                variant="ghost"
              >
                <IconComponent className="w-4 h-4" />
                {config.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* 搜索引擎选择 */}
      <div>
        <h3 className={`text-center mb-4 text-lg ${theme === 'light' ? 'text-black/80' : 'text-white/80'}`}>
          选择搜索引擎
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {engines.map((engine) => {
            const isActive = selectedEngine.id === engine.id;
            
            return (
              <Button
                key={engine.id}
                onClick={() => onEngineChange(engine)}
                className={`${getButtonClasses(isActive)} flex items-center gap-2`}
                variant="ghost"
              >
                <span className="text-lg">{engine.icon}</span>
                {engine.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};