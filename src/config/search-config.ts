export type SearchType = 'web' | 'image' | 'video' | 'news' | 'academic';

export interface SearchEngine {
  id: string;
  name: string;
  url: string;
  imageSearchUrl?: string;
  placeholder: string;
  type: SearchType;
  supportImageUpload: boolean;
  icon: string;
}

export const SEARCH_ENGINES: SearchEngine[] = [
  // Web搜索
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    imageSearchUrl: 'https://www.google.com/searchbyimage?image_url=',
    placeholder: '使用Google搜索...',
    type: 'web',
    supportImageUpload: true,
    icon: '🔍'
  },
  {
    id: 'bing',
    name: 'Bing',
    url: 'https://www.bing.com/search?q=',
    imageSearchUrl: 'https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:',
    placeholder: '使用Bing搜索...',
    type: 'web',
    supportImageUpload: true,
    icon: '🔍'
  },
  {
    id: 'baidu',
    name: '百度',
    url: 'https://www.baidu.com/s?wd=',
    imageSearchUrl: 'https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shitu&extUiData%5bisLogoShow%5d=1&image=',
    placeholder: '使用百度搜索...',
    type: 'web',
    supportImageUpload: true,
    icon: '🔍'
  },
  
  // 图片搜索
  {
    id: 'google-images',
    name: 'Google 图片',
    url: 'https://www.google.com/search?tbm=isch&q=',
    imageSearchUrl: 'https://www.google.com/searchbyimage?image_url=',
    placeholder: '搜索图片...',
    type: 'image',
    supportImageUpload: true,
    icon: '🖼️'
  },
  {
    id: 'bing-images',
    name: 'Bing 图片',
    url: 'https://www.bing.com/images/search?q=',
    imageSearchUrl: 'https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:',
    placeholder: '搜索图片...',
    type: 'image',
    supportImageUpload: true,
    icon: '🖼️'
  },
  
  // 视频搜索
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/results?search_query=',
    placeholder: '在YouTube搜索视频...',
    type: 'video',
    supportImageUpload: false,
    icon: '📺'
  },
  {
    id: 'bilibili',
    name: 'Bilibili',
    url: 'https://search.bilibili.com/all?keyword=',
    placeholder: '在B站搜索视频...',
    type: 'video',
    supportImageUpload: false,
    icon: '📺'
  },
  
  // 新闻搜索
  {
    id: 'google-news',
    name: 'Google 新闻',
    url: 'https://news.google.com/search?q=',
    placeholder: '搜索新闻...',
    type: 'news',
    supportImageUpload: false,
    icon: '📰'
  },
  {
    id: 'baidu-news',
    name: '百度新闻',
    url: 'https://www.baidu.com/s?tn=news&word=',
    placeholder: '搜索新闻...',
    type: 'news',
    supportImageUpload: false,
    icon: '📰'
  },
  
  // 学术搜索
  {
    id: 'google-scholar',
    name: 'Google 学术',
    url: 'https://scholar.google.com/scholar?q=',
    placeholder: '搜索学术论文...',
    type: 'academic',
    supportImageUpload: false,
    icon: '🎓'
  },
  {
    id: 'cnki',
    name: '知网',
    url: 'https://kns.cnki.net/kns8/DefaultResult/Index?dbcode=SCDB&kw=',
    placeholder: '在知网搜索论文...',
    type: 'academic',
    supportImageUpload: false,
    icon: '🎓'
  }
];

export const QUICK_SEARCH_TERMS: Record<SearchType, string[]> = {
  web: ['今日新闻', '天气预报', '股票行情', '汇率查询', '翻译工具', '在线计算器', '地图导航', '音乐播放'],
  image: ['https://img1.acgvia.workers.dev/photos/file_589761.jpg', 'https://i.imgur.com/example.jpg', 'https://images.unsplash.com/photo-example', 'https://picsum.photos/200/300'],
  video: ['热门电影', '音乐MV', '游戏实况', '教学视频', '纪录片', '动漫番剧', '综艺节目', '运动赛事'],
  news: ['国际新闻', '科技动态', '财经资讯', '体育赛事', '娱乐八卦', '健康医疗', '教育资讯', '环保新闻'],
  academic: ['论文检索', '学术期刊', '研究方法', '学术会议', '引用格式', '学位论文', '专利检索', '开放获取']
};

export const getEnginesByType = (type: SearchType): SearchEngine[] => {
  return SEARCH_ENGINES.filter(engine => engine.type === type);
};

export const getDefaultEngine = (type: SearchType): SearchEngine => {
  const engines = getEnginesByType(type);
  return engines[0] || SEARCH_ENGINES[0];
};