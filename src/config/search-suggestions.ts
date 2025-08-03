export interface SuggestionEngine {
  id: string;
  name: string;
  apiUrl: string;
  parseResponse: (response: any) => string[];
  corsProxy?: string;
}

export const SUGGESTION_ENGINES: SuggestionEngine[] = [
  {
    id: 'google',
    name: 'Google',
    apiUrl: 'https://www.google.com/complete/search?client=firefox&q=',
    parseResponse: (response: any) => {
      if (Array.isArray(response) && response.length > 1) {
        return response[1] || [];
      }
      return [];
    }
  },
  {
    id: 'baidu',
    name: '百度',
    apiUrl: 'https://suggestion.baidu.com/su?wd={query}&p=3&cb=window.bdsug.sug',
    parseResponse: (response: string) => {
      try {
        // 解析百度的JSONP响应
        const match = response.match(/window\.bdsug\.sug\((.+)\);?$/);
        if (match) {
          const data = JSON.parse(match[1]);
          return data.s || [];
        }
      } catch (e) {
        console.error('解析百度建议失败:', e);
      }
      return [];
    }
  },
  {
    id: 'bing',
    name: 'Bing',
    apiUrl: 'https://sg1.api.bing.com/qsonhs.aspx?type=cb&cb=callback&q=',
    parseResponse: (response: string) => {
      try {
        // 解析Bing的JSONP响应
        const match = response.match(/callback\((.+)\);?$/);
        if (match) {
          const data = JSON.parse(match[1]);
          const suggests = data.AS?.Results?.[0]?.Suggests || [];
          return suggests.map((item: any) => item.Txt);
        }
      } catch (e) {
        console.error('解析Bing建议失败:', e);
      }
      return [];
    }
  },
  {
    id: 'sogou',
    name: '搜狗',
    apiUrl: 'https://w.sugg.sogou.com/sugg/ajaj_json.jsp?key={query}&type=web',
    parseResponse: (response: string) => {
      try {
        // 解析搜狗的JSONP响应
        const match = response.match(/window\.sogou\.sug\((.+)\);?$/);
        if (match) {
          const data = JSON.parse(match[1]);
          return data[1] || [];
        }
      } catch (e) {
        console.error('解析搜狗建议失败:', e);
      }
      return [];
    }
  },
  {
    id: 'youdao',
    name: '有道',
    apiUrl: 'https://www.youdao.com/suggest2/suggest.s?query={query}&keyfrom=web.suggest&rn=10&o=aa',
    parseResponse: (response: string) => {
      try {
        // 解析有道的JSONP响应
        const match = response.match(/aa\.updateCall\((.+)\);?$/);
        if (match) {
          const data = JSON.parse(match[1]);
          return data.r?.map((item: any) => item.c) || [];
        }
      } catch (e) {
        console.error('解析有道建议失败:', e);
      }
      return [];
    }
  }
];

// 本地热门搜索词
export const HOT_SEARCHES: Record<string, string[]> = {
  general: [
    '今日新闻', '天气预报', '股票行情', '汇率查询', 
    '翻译工具', '在线计算器', '地图导航', '音乐播放'
  ],
  tech: [
    'ChatGPT', 'AI人工智能', 'React开发', 'Vue.js教程',
    'Python编程', 'JavaScript', '前端开发', '后端开发'
  ],
  entertainment: [
    '热门电影', '最新电视剧', '音乐排行榜', '游戏攻略',
    '明星八卦', '综艺节目', '动漫推荐', '小说阅读'
  ],
  life: [
    '美食菜谱', '健身教程', '旅游攻略', '购物优惠',
    '理财投资', '房产信息', '汽车报价', '教育培训'
  ]
};

// 获取建议的配置
export const SUGGESTION_CONFIG = {
  debounceDelay: 300, // 防抖延迟
  maxSuggestions: 8,  // 最大建议数量
  minQueryLength: 1,  // 最小查询长度
  cacheTimeout: 5 * 60 * 1000, // 缓存超时时间（5分钟）
};