import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';

export interface SearchEngine {
  id: string;
  name: string;
  url: string;
  icon: string;
  placeholder: string;
  type: 'web' | 'image' | 'video' | 'news' | 'academic';
  supportImageUpload?: boolean;
  imageSearchUrl?: string;
}

export const SEARCH_ENGINES: SearchEngine[] = [
  // 网页搜索引擎
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: '🔍',
    placeholder: '使用 Google 搜索...',
    type: 'web'
  },
  {
    id: 'bing-cn',
    name: '必应中国',
    url: 'https://cn.bing.com/search?q=',
    icon: '🅱️',
    placeholder: '使用必应中国搜索...',
    type: 'web'
  },
  {
    id: 'bing-global',
    name: '必应国际',
    url: 'https://www.bing.com/search?q=',
    icon: '🌐',
    placeholder: '使用必应国际搜索...',
    type: 'web'
  },
  {
    id: 'baidu',
    name: '百度',
    url: 'https://www.baidu.com/s?wd=',
    icon: '🐻',
    placeholder: '使用百度搜索...',
    type: 'web'
  },
  {
    id: 'sogou',
    name: '搜狗',
    url: 'https://www.sogou.com/web?query=',
    icon: '🐶',
    placeholder: '使用搜狗搜索...',
    type: 'web'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    icon: '🦆',
    placeholder: '使用 DuckDuckGo 搜索...',
    type: 'web'
  },
  {
    id: '360',
    name: '360搜索',
    url: 'https://www.so.com/s?q=',
    icon: '🔄',
    placeholder: '使用360搜索...',
    type: 'web'
  },
  
  // 图片搜索引擎
  {
    id: 'google-images',
    name: 'Google图片',
    url: 'https://www.google.com/search?tbm=isch&q=',
    icon: '🖼️',
    placeholder: '搜索 Google 图片...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'https://lens.google.com/uploadbyurl?url='
  },
  {
    id: 'bing-images',
    name: '必应图片',
    url: 'https://www.bing.com/images/search?q=',
    icon: '🌄',
    placeholder: '搜索必应图片...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'https://cn.bing.com/images/search?q=imgurl:'
  },
  {
    id: 'baidu-images',
    name: '百度图片',
    url: 'https://image.baidu.com/search/index?tn=baiduimage&word=',
    icon: '📷',
    placeholder: '搜索百度图片...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'https://graph.baidu.com/upload?image='
  },
  {
    id: 'saucenao',
    name: 'SauceNAO',
    url: 'https://saucenao.com/search.php?db=999&url=',
    icon: '🍜',
    placeholder: '搜索动漫图片来源...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'https://saucenao.com/search.php?url='
  },
  {
    id: 'ascii2d',
    name: 'ascii2d',
    url: 'https://ascii2d.net/search/url/',
    icon: '🎨',
    placeholder: '搜索动漫图片...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'https://ascii2d.net/search/url/'
  },
  {
    id: 'iqdb',
    name: 'iqdb',
    url: 'http://iqdb.org/?url=',
    icon: '🔍',
    placeholder: '搜索动漫图片...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'http://iqdb.org/?url='
  },
  {
    id: 'iqdb-3d',
    name: 'iqdb 3D',
    url: 'http://3d.iqdb.org/?url=',
    icon: '🧩',
    placeholder: '搜索3D动漫图片...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'http://3d.iqdb.org/?url='
  },
  {
    id: 'tineye',
    name: 'TinEye',
    url: 'https://tineye.com/search?q=',
    icon: '👁️',
    placeholder: '搜索 TinEye 图片...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'https://tineye.com/search?url='
  },
  {
    id: 'yandex-images',
    name: 'Yandex图片',
    url: 'https://yandex.com/images/search?text=',
    icon: '🔎',
    placeholder: '搜索 Yandex 图片...',
    type: 'image',
    supportImageUpload: true,
    imageSearchUrl: 'https://yandex.com/images/search?rpt=imageview&url='
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    url: 'https://unsplash.com/s/photos/',
    icon: '📸',
    placeholder: '搜索 Unsplash 高质量图片...',
    type: 'image'
  },
  {
    id: 'pixabay',
    name: 'Pixabay',
    url: 'https://pixabay.com/images/search/',
    icon: '🎨',
    placeholder: '搜索 Pixabay 免费图片...',
    type: 'image'
  },
  
  // 视频搜索引擎
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/results?search_query=',
    icon: '▶️',
    placeholder: '搜索 YouTube 视频...',
    type: 'video'
  },
  {
    id: 'bilibili',
    name: 'B站',
    url: 'https://search.bilibili.com/all?keyword=',
    icon: '📺',
    placeholder: '搜索B站视频...',
    type: 'video'
  },
  
  // 新闻搜索引擎
  {
    id: 'google-news',
    name: 'Google新闻',
    url: 'https://news.google.com/search?q=',
    icon: '📰',
    placeholder: '搜索 Google 新闻...',
    type: 'news'
  },
  {
    id: 'baidu-news',
    name: '百度新闻',
    url: 'https://www.baidu.com/s?rtt=1&bsst=1&cl=2&tn=news&word=',
    icon: '📄',
    placeholder: '搜索百度新闻...',
    type: 'news'
  },
  {
    id: 'bing-news',
    name: '必应新闻',
    url: 'https://www.bing.com/news/search?q=',
    icon: '🗞️',
    placeholder: '搜索必应新闻...',
    type: 'news'
  },
  {
    id: 'toutiao',
    name: '今日头条',
    url: 'https://www.toutiao.com/search/?keyword=',
    icon: '📱',
    placeholder: '搜索今日头条...',
    type: 'news'
  },
  
  // 学术搜索引擎
  {
    id: 'google-scholar',
    name: '谷歌学术',
    url: 'https://scholar.google.com/scholar?q=',
    icon: '🎓',
    placeholder: '搜索谷歌学术...',
    type: 'academic'
  },
  {
    id: 'baidu-xueshu',
    name: '百度学术',
    url: 'https://xueshu.baidu.com/s?wd=',
    icon: '📚',
    placeholder: '搜索百度学术...',
    type: 'academic'
  },
  {
    id: 'cnki',
    name: '中国知网',
    url: 'https://kns.cnki.net/kns8/defaultresult/index?kw=',
    icon: '🔍',
    placeholder: '搜索中国知网...',
    type: 'academic'
  }
];

export type SearchType = 'web' | 'image' | 'video' | 'news' | 'academic';

interface SearchEngineSelectorProps {
  selectedEngine: SearchEngine;
  onEngineChange: (engine: SearchEngine) => void;
  searchType: SearchType;
  onSearchTypeChange: (type: SearchType) => void;
}

export const SearchEngineSelector: React.FC<SearchEngineSelectorProps> = ({
  selectedEngine,
  onEngineChange,
  searchType,
  onSearchTypeChange
}) => {
  // 根据当前搜索类型过滤搜索引擎
  const filteredEngines = SEARCH_ENGINES.filter(engine => engine.type === searchType);
  const { theme } = useTheme();
  
  return (
    <div className="w-full max-w-2xl mb-4">
      <Tabs 
        defaultValue="web" 
        value={searchType}
        onValueChange={(value) => onSearchTypeChange(value as SearchType)}
        className="mb-4"
      >
        <TabsList className={`grid grid-cols-5 mb-4 backdrop-blur-md ${
          theme === 'light' ? 'bg-black/10' : 'bg-white/10'
        }`}>
          <TabsTrigger value="web" className={`font-medium ${
            theme === 'light' 
              ? 'data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-black/80 data-[state=inactive]:hover:bg-black/20' 
              : 'data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=inactive]:text-white/80 data-[state=inactive]:hover:bg-white/20'
          }`}>
            <span className="mr-1">🌐</span> 网页
          </TabsTrigger>
          <TabsTrigger value="image" className={`font-medium ${
            theme === 'light' 
              ? 'data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=inactive]:text-black/80 data-[state=inactive]:hover:bg-black/20' 
              : 'data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:text-white/80 data-[state=inactive]:hover:bg-white/20'
          }`}>
            <span className="mr-1">🖼️</span> 图片
          </TabsTrigger>
          <TabsTrigger value="video" className={`font-medium ${
            theme === 'light' 
              ? 'data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-black/80 data-[state=inactive]:hover:bg-black/20' 
              : 'data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=inactive]:text-white/80 data-[state=inactive]:hover:bg-white/20'
          }`}>
            <span className="mr-1">📹</span> 视频
          </TabsTrigger>
          <TabsTrigger value="news" className={`font-medium ${
            theme === 'light' 
              ? 'data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=inactive]:text-black/80 data-[state=inactive]:hover:bg-black/20' 
              : 'data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=inactive]:text-white/80 data-[state=inactive]:hover:bg-white/20'
          }`}>
            <span className="mr-1">📰</span> 新闻
          </TabsTrigger>
          <TabsTrigger value="academic" className={`font-medium ${
            theme === 'light' 
              ? 'data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=inactive]:text-black/80 data-[state=inactive]:hover:bg-black/20' 
              : 'data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=inactive]:text-white/80 data-[state=inactive]:hover:bg-white/20'
          }`}>
            <span className="mr-1">🎓</span> 学术
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {filteredEngines.map((engine) => (
          <Button
            key={engine.id}
            variant={selectedEngine.id === engine.id ? "default" : "outline"}
            size="sm"
            onClick={() => onEngineChange(engine)}
            className={`
              backdrop-blur-md transition-all duration-200
              ${theme === 'light'
                ? selectedEngine.id === engine.id 
                  ? 'bg-black/30 text-black border-black/40 shadow-lg' 
                  : 'bg-black/10 text-black/90 hover:bg-black/20 hover:border-black/30 border-black/20'
                : selectedEngine.id === engine.id 
                  ? 'bg-white/30 text-white border-white/40 shadow-lg' 
                  : 'bg-white/10 text-white/90 hover:bg-white/20 hover:border-white/30 border-white/20'
              }
            `}
          >
            <span className="mr-2">{engine.icon}</span>
            {engine.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
