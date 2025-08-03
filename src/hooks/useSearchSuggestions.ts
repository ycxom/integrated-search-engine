import { useState, useCallback, useRef, useEffect } from 'react';
import { suggestionAPI, SuggestionResult } from '@/services/suggestion-api';
import { 
  parseQuickSearch, 
  generateQuickSearchSuggestions, 
  mergeSimilarSuggestions, 
  filterAndSortSuggestions,
  SuggestionItem,
  MergedSuggestion 
} from '@/utils/result-deduplication';

export interface UseSearchSuggestionsReturn {
  suggestions: SuggestionResult[];
  mergedSuggestions: MergedSuggestion[];
  isLoading: boolean;
  error: string | null;
  isQuickSearch: boolean;
  fetchSuggestions: (query: string, engine?: string) => void;
  fetchAllSuggestions: (query: string) => void;
  fetchEnhancedSuggestions: (query: string) => void;
}

export const useSearchSuggestions = (): UseSearchSuggestionsReturn => {
  const [suggestions, setSuggestions] = useState<SuggestionResult[]>([]);
  const [mergedSuggestions, setMergedSuggestions] = useState<MergedSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuickSearch, setIsQuickSearch] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const cacheRef = useRef<Map<string, { data: SuggestionResult[]; timestamp: number }>>(new Map());

  // 清理函数
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 获取单个搜索引擎的建议
  const fetchSuggestions = useCallback((query: string, engine: string = 'baidu') => {
    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 如果查询为空，显示热门搜索
    if (!query.trim()) {
      const hotSearches = suggestionAPI.getHotSearches();
      setSuggestions(hotSearches);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 检查缓存
    const cacheKey = `${engine}_${query}`;
    const cached = cacheRef.current.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5分钟缓存
      setSuggestions(cached.data);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 防抖处理
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await suggestionAPI.getSuggestions(query, engine);
        const suggestionResults: SuggestionResult[] = results.map(text => ({
          text,
          source: engine === 'baidu' ? '百度' : 
                 engine === 'google' ? '谷歌' :
                 engine === 'sogou' ? '搜狗' :
                 engine === 'bing' ? '必应' :
                 engine === 'so360' ? '360搜索' : '未知',
          engineId: engine
        }));

        setSuggestions(suggestionResults);
        
        // 缓存结果
        cacheRef.current.set(cacheKey, {
          data: suggestionResults,
          timestamp: Date.now()
        });
      } catch (err) {
        console.error('获取搜索建议失败:', err);
        setError('获取建议失败');
        // 降级到热门搜索
        const hotSearches = suggestionAPI.getHotSearches();
        setSuggestions(hotSearches);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  // 获取所有搜索引擎的建议（高级功能）
  const fetchAllSuggestions = useCallback((query: string) => {
    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 如果查询为空，显示热门搜索
    if (!query.trim()) {
      const hotSearches = suggestionAPI.getHotSearches('all');
      setSuggestions(hotSearches);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 检查缓存
    const cacheKey = `all_${query}`;
    const cached = cacheRef.current.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5分钟缓存
      setSuggestions(cached.data);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 防抖处理
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await suggestionAPI.getAllSuggestions(query);
        setSuggestions(results);
        
        // 缓存结果
        cacheRef.current.set(cacheKey, {
          data: results,
          timestamp: Date.now()
        });
      } catch (err) {
        console.error('获取所有搜索建议失败:', err);
        setError('获取建议失败');
        // 降级到热门搜索
        const hotSearches = suggestionAPI.getHotSearches('all');
        setSuggestions(hotSearches);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  // 增强的搜索建议获取功能（支持快捷搜索和去重合并）
  const fetchEnhancedSuggestions = useCallback((query: string) => {
    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 解析快捷搜索格式
    const { isQuickSearch: isQuick, keyword } = parseQuickSearch(query);
    setIsQuickSearch(isQuick);

    // 如果查询为空，显示热门搜索
    if (!keyword.trim()) {
      const hotSearches = suggestionAPI.getHotSearches('all');
      setSuggestions(hotSearches);
      setMergedSuggestions([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 检查缓存
    const cacheKey = `enhanced_${query}`;
    const cached = cacheRef.current.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      setSuggestions(cached.data);
      // 处理合并建议
      const suggestionItems: SuggestionItem[] = cached.data.map(item => ({
        text: item.text,
        sources: [item.engineId],
        isQuickSearch: isQuick
      }));
      const merged = mergeSimilarSuggestions(suggestionItems);
      const filtered = filterAndSortSuggestions(merged);
      setMergedSuggestions(filtered);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 防抖处理
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        let results: SuggestionResult[] = [];
        
        if (isQuick) {
          // 快捷搜索：生成所有引擎的搜索建议
          const engines = ['baidu', 'google', 'sogou', 'bing', 'so360'];
          const quickSuggestions = generateQuickSearchSuggestions(keyword, engines);
          
          results = quickSuggestions.map(item => ({
            text: item.text,
            source: '快捷搜索',
            engineId: 'quick',
            isQuickSearch: true
          }));
          
          // 同时获取实际的搜索建议
          try {
            const actualResults = await suggestionAPI.getAllSuggestions(keyword);
            results = [...results, ...actualResults];
          } catch (err) {
            console.warn('获取实际搜索建议失败，仅显示快捷搜索:', err);
          }
        } else {
          // 普通搜索：获取所有引擎的建议
          results = await suggestionAPI.getAllSuggestions(keyword);
        }

        setSuggestions(results);
        
        // 处理去重合并
        const suggestionItems: SuggestionItem[] = results.map(item => ({
          text: item.text,
          sources: [item.engineId],
          isQuickSearch: (item as any).isQuickSearch || isQuick
        }));
        
        const merged = mergeSimilarSuggestions(suggestionItems);
        const filtered = filterAndSortSuggestions(merged);
        setMergedSuggestions(filtered);
        
        // 缓存结果
        cacheRef.current.set(cacheKey, {
          data: results,
          timestamp: Date.now()
        });
      } catch (err) {
        console.error('获取增强搜索建议失败:', err);
        setError('获取建议失败');
        // 降级到热门搜索
        const hotSearches = suggestionAPI.getHotSearches('all');
        setSuggestions(hotSearches);
        setMergedSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  return {
    suggestions,
    mergedSuggestions,
    isLoading,
    error,
    isQuickSearch,
    fetchSuggestions,
    fetchAllSuggestions,
    fetchEnhancedSuggestions
  };
};