// 搜索建议API配置 - 包含Google和Bing
const SUGGESTION_ENGINES = {
  baidu: {
    name: '百度',
    url: 'https://suggestion.baidu.com/su?wd={query}&p=3&cb={callback}',
    parser: (data: any) => {
      if (data && data.s && Array.isArray(data.s)) {
        return data.s;
      }
      return [];
    }
  },
  google: {
    name: '谷歌',
    url: 'https://www.google.com/complete/search?client=chrome&q={query}&callback={callback}',
    parser: (data: any) => {
      if (Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
        return data[1];
      }
      return [];
    }
  },
  bing: {
    name: '必应',
    url: 'https://sg1.api.bing.com/qsonhs.aspx?type=cb&cb={callback}&q={query}',
    parser: (data: any) => {
      if (data && data.AS && data.AS.Results && Array.isArray(data.AS.Results)) {
        const result = data.AS.Results[0];
        if (result && result.Suggests && Array.isArray(result.Suggests)) {
          return result.Suggests.map((item: any) => item.Txt);
        }
      }
      return [];
    }
  },
  so360: {
    name: '360搜索',
    url: 'https://sug.so.360.cn/suggest?callback={callback}&encodein=utf-8&encodeout=utf-8&format=json&fields=word&word={query}',
    parser: (data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        return data.result.map((item: any) => item.word);
      }
      return [];
    }
  },
  taobao: {
    name: '淘宝',
    url: 'https://suggest.taobao.com/sug?code=utf-8&q={query}&callback={callback}',
    parser: (data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        return data.result.map((item: any) => item[0]);
      }
      return [];
    }
  }
};

// 搜索建议结果接口
export interface SuggestionResult {
  text: string;
  source: string;
  engineId: string;
}

export const suggestionAPI = {
  // 获取单个搜索引擎的建议
  async getSuggestions(query: string, engine: string = 'baidu'): Promise<string[]> {
    const config = SUGGESTION_ENGINES[engine as keyof typeof SUGGESTION_ENGINES];
    if (!config) {
      throw new Error(`不支持的搜索引擎: ${engine}`);
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('请求超时'));
      }, 5000);

      try {
        const script = document.createElement('script');
        const callbackName = `suggestion_callback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // 设置全局回调函数
        (window as any)[callbackName] = (data: any) => {
          clearTimeout(timeout);
          document.head.removeChild(script);
          delete (window as any)[callbackName];
          
          try {
            const suggestions = config.parser(data);
            resolve(suggestions.slice(0, 8)); // 限制数量
          } catch (error) {
            reject(new Error('解析建议数据失败'));
          }
        };

        // 构建请求URL
        const url = config.url.replace('{query}', encodeURIComponent(query))
                              .replace('{callback}', callbackName);
        
        script.src = url;
        script.onerror = () => {
          clearTimeout(timeout);
          document.head.removeChild(script);
          delete (window as any)[callbackName];
          reject(new Error('网络请求失败'));
        };
        
        document.head.appendChild(script);
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  },

  // 获取所有搜索引擎的建议（高级功能）
  async getAllSuggestions(query: string): Promise<SuggestionResult[]> {
    if (!query.trim()) {
      return this.getHotSearches('all');
    }

    const engines = Object.keys(SUGGESTION_ENGINES);
    const promises = engines.map(async (engineId) => {
      try {
        const suggestions = await this.getSuggestions(query, engineId);
        const config = SUGGESTION_ENGINES[engineId as keyof typeof SUGGESTION_ENGINES];
        return suggestions.map(text => ({
          text,
          source: config.name,
          engineId
        }));
      } catch (error) {
        console.warn(`获取${engineId}建议失败:`, error);
        return [];
      }
    });

    try {
      const results = await Promise.allSettled(promises);
      const allSuggestions: SuggestionResult[] = [];
      
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          allSuggestions.push(...result.value);
        }
      });

      // 去重并限制数量
      const uniqueSuggestions = this.removeDuplicates(allSuggestions);
      return uniqueSuggestions.slice(0, 12); // 显示更多建议
    } catch (error) {
      throw new Error('获取建议失败');
    }
  },

  // 去重函数
  removeDuplicates(suggestions: SuggestionResult[]): SuggestionResult[] {
    const seen = new Set<string>();
    return suggestions.filter(item => {
      const key = item.text.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  },

  // 获取热门搜索词 - 移除搜狗相关内容
  getHotSearches(category: string = 'general'): SuggestionResult[] {
    const hotSearches = {
      general: [
        { text: '今日新闻', source: '百度', engineId: 'baidu' },
        { text: '天气预报', source: '谷歌', engineId: 'google' },
        { text: '股票行情', source: '必应', engineId: 'bing' },
        { text: '汇率查询', source: '360搜索', engineId: 'so360' },
        { text: '翻译工具', source: '淘宝', engineId: 'taobao' },
        { text: '在线计算器', source: '百度', engineId: 'baidu' },
        { text: '地图导航', source: '谷歌', engineId: 'google' },
        { text: '音乐播放', source: '必应', engineId: 'bing' }
      ],
      all: [
        { text: '人工智能', source: '百度', engineId: 'baidu' },
        { text: 'ChatGPT', source: '谷歌', engineId: 'google' },
        { text: '编程学习', source: '必应', engineId: 'bing' },
        { text: '数码产品', source: '360搜索', engineId: 'so360' },
        { text: '手机推荐', source: '淘宝', engineId: 'taobao' },
        { text: '编程教程', source: '百度', engineId: 'baidu' },
        { text: '美食制作', source: '谷歌', engineId: 'google' },
        { text: '购物优惠', source: '必应', engineId: 'bing' },
        { text: '科技新闻', source: '360搜索', engineId: 'so360' },
        { text: '学习资料', source: '淘宝', engineId: 'taobao' },
        { text: '生活技巧', source: '百度', engineId: 'baidu' },
        { text: '品牌特卖', source: '谷歌', engineId: 'google' }
      ]
    };

    return hotSearches[category as keyof typeof hotSearches] || hotSearches.general;
  }
};