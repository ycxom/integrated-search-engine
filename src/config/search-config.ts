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
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    placeholder: '隐私搜索引擎...',
    type: 'web',
    supportImageUpload: false,
    icon: '🦆'
  },
  {
    id: 'yandex',
    name: 'Yandex',
    url: 'https://yandex.com/search/?text=',
    imageSearchUrl: 'https://yandex.com/images/search?rpt=imageview&url=',
    placeholder: '使用Yandex搜索...',
    type: 'web',
    supportImageUpload: true,
    icon: '🔍'
  },
  {
    id: 'sogou',
    name: '搜狗',
    url: 'https://www.sogou.com/web?query=',
    placeholder: '使用搜狗搜索...',
    type: 'web',
    supportImageUpload: false,
    icon: '🔍'
  },
  {
    id: '360search',
    name: '360搜索',
    url: 'https://www.so.com/s?q=',
    placeholder: '使用360搜索...',
    type: 'web',
    supportImageUpload: false,
    icon: '🔍'
  },
  {
    id: 'yahoo',
    name: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
    placeholder: '使用Yahoo搜索...',
    type: 'web',
    supportImageUpload: false,
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
  {
    id: 'baidu-images',
    name: '百度图片',
    url: 'https://image.baidu.com/search/index?tn=baiduimage&word=',
    imageSearchUrl: 'https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shitu&extUiData%5bisLogoShow%5d=1&image=',
    placeholder: '搜索图片...',
    type: 'image',
    supportImageUpload: true,
    icon: '🖼️'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    url: 'https://unsplash.com/s/photos/',
    placeholder: '搜索高质量图片...',
    type: 'image',
    supportImageUpload: false,
    icon: '📸'
  },
  {
    id: 'pixabay',
    name: 'Pixabay',
    url: 'https://pixabay.com/images/search/',
    placeholder: '搜索免费图片...',
    type: 'image',
    supportImageUpload: false,
    icon: '🎨'
  },
  {
    id: 'pexels',
    name: 'Pexels',
    url: 'https://www.pexels.com/search/',
    placeholder: '搜索免费图片...',
    type: 'image',
    supportImageUpload: false,
    icon: '📷'
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
  {
    id: 'tiktok',
    name: 'TikTok',
    url: 'https://www.tiktok.com/search?q=',
    placeholder: '在TikTok搜索视频...',
    type: 'video',
    supportImageUpload: false,
    icon: '🎵'
  },
  {
    id: 'douyin',
    name: '抖音',
    url: 'https://www.douyin.com/search/',
    placeholder: '在抖音搜索视频...',
    type: 'video',
    supportImageUpload: false,
    icon: '🎵'
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    url: 'https://vimeo.com/search?q=',
    placeholder: '在Vimeo搜索视频...',
    type: 'video',
    supportImageUpload: false,
    icon: '🎬'
  },
  {
    id: 'youku',
    name: '优酷',
    url: 'https://so.youku.com/search_video/q_',
    placeholder: '在优酷搜索视频...',
    type: 'video',
    supportImageUpload: false,
    icon: '📺'
  },
  {
    id: 'iqiyi',
    name: '爱奇艺',
    url: 'https://so.iqiyi.com/so/q_',
    placeholder: '在爱奇艺搜索视频...',
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
  {
    id: 'toutiao',
    name: '今日头条',
    url: 'https://www.toutiao.com/search/?keyword=',
    placeholder: '在今日头条搜索新闻...',
    type: 'news',
    supportImageUpload: false,
    icon: '📰'
  },
  {
    id: 'sina-news',
    name: '新浪新闻',
    url: 'https://search.sina.com.cn/?q=',
    placeholder: '在新浪搜索新闻...',
    type: 'news',
    supportImageUpload: false,
    icon: '📰'
  },
  {
    id: 'sohu-news',
    name: '搜狐新闻',
    url: 'https://search.sohu.com/?keyword=',
    placeholder: '在搜狐搜索新闻...',
    type: 'news',
    supportImageUpload: false,
    icon: '📰'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    url: 'https://www.reddit.com/search/?q=',
    placeholder: '在Reddit搜索讨论...',
    type: 'news',
    supportImageUpload: false,
    icon: '💬'
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
  },
  {
    id: 'arxiv',
    name: 'arXiv',
    url: 'https://arxiv.org/search/?query=',
    placeholder: '在arXiv搜索预印本...',
    type: 'academic',
    supportImageUpload: false,
    icon: '📚'
  },
  {
    id: 'pubmed',
    name: 'PubMed',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=',
    placeholder: '搜索医学文献...',
    type: 'academic',
    supportImageUpload: false,
    icon: '🏥'
  },
  {
    id: 'ieee',
    name: 'IEEE Xplore',
    url: 'https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=',
    placeholder: '搜索IEEE论文...',
    type: 'academic',
    supportImageUpload: false,
    icon: '⚡'
  },
  {
    id: 'researchgate',
    name: 'ResearchGate',
    url: 'https://www.researchgate.net/search?q=',
    placeholder: '在ResearchGate搜索...',
    type: 'academic',
    supportImageUpload: false,
    icon: '🔬'
  },
  {
    id: 'wanfang',
    name: '万方数据',
    url: 'https://s.wanfangdata.com.cn/paper?q=',
    placeholder: '在万方搜索论文...',
    type: 'academic',
    supportImageUpload: false,
    icon: '📖'
  },
  {
    id: 'vip',
    name: '维普',
    url: 'http://qikan.cqvip.com/Qikan/Search/Index?key=',
    placeholder: '在维普搜索论文...',
    type: 'academic',
    supportImageUpload: false,
    icon: '📑'
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