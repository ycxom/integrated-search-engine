import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchEngineSelector, SEARCH_ENGINES, SearchEngine, SearchType } from './search-engine-selector';
import { Search, ExternalLink, Image as ImageIcon, Video, Newspaper, GraduationCap } from 'lucide-react';
import { useTheme } from 'next-themes';

export const SearchInterface: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('web');
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(
    SEARCH_ENGINES.find(engine => engine.type === 'web') || SEARCH_ENGINES[0]
  );
  const [isSearching, setIsSearching] = useState(false);
  const { theme } = useTheme();

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

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
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
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    // 当切换搜索类型时，自动选择该类型的第一个搜索引擎
    const engineOfType = SEARCH_ENGINES.find(engine => engine.type === type);
    if (engineOfType) {
      setSelectedEngine(engineOfType);
    }
    
    // 清空搜索框
    setSearchQuery('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

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

  // 根据主题获取文本颜色
  const getTextColor = () => {
    return theme === 'light' ? 'text-black' : 'text-white';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-8">
        <h1 className={`text-5xl md:text-6xl font-bold ${getTextColor()} mb-4 drop-shadow-2xl`}>
          多功能搜索
        </h1>
        <p className={`text-xl ${theme === 'light' ? 'text-black/80' : 'text-white/80'} drop-shadow-lg`}>
          集成多个搜索引擎，支持网页、图片、视频、新闻和学术搜索
        </p>
      </div>

      <SearchEngineSelector 
        selectedEngine={selectedEngine}
        onEngineChange={setSelectedEngine}
        searchType={searchType}
        onSearchTypeChange={handleSearchTypeChange}
      />

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
                  type="text"
                  placeholder={searchType === 'image' && selectedEngine.supportImageUpload ? '输入图片URL以图搜图或输入关键词搜索图片...' : selectedEngine.placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
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
        </div>
      </div>

      <div className="w-full max-w-4xl">
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
        <p>背景图片来源: AI壁纸API</p>
      </div>
    </div>
  );
};