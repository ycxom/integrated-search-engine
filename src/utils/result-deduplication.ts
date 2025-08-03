// 搜索建议去重合并工具
export interface SuggestionItem {
  text: string;
  sources: string[];
  isQuickSearch?: boolean;
}

export interface MergedSuggestion {
  text: string;
  sources: string[];
  isDuplicated: boolean;
  isQuickSearch?: boolean;
  engineId?: string;
}

// 文本相似度计算（简单的编辑距离算法）
function calculateSimilarity(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  
  if (len1 === 0) return len2;
  if (len2 === 0) return len1;
  
  const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));
  
  for (let i = 0; i <= len1; i++) {
    matrix[i][0] = i;
  }
  
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  
  const maxLen = Math.max(len1, len2);
  return (maxLen - matrix[len1][len2]) / maxLen;
}

// 判断两个建议是否相似
function areSuggestionsSimilar(text1: string, text2: string, threshold: number = 0.8): boolean {
  // 完全相同
  if (text1 === text2) return true;
  
  // 去除空格后比较
  const normalized1 = text1.replace(/\s+/g, '').toLowerCase();
  const normalized2 = text2.replace(/\s+/g, '').toLowerCase();
  if (normalized1 === normalized2) return true;
  
  // 相似度计算
  const similarity = calculateSimilarity(normalized1, normalized2);
  return similarity >= threshold;
}

// 合并相似的搜索建议
export function mergeSimilarSuggestions(suggestions: SuggestionItem[]): MergedSuggestion[] {
  const merged: MergedSuggestion[] = [];
  const processed = new Set<number>();
  
  for (let i = 0; i < suggestions.length; i++) {
    if (processed.has(i)) continue;
    
    const currentSuggestion = suggestions[i];
    const mergedSuggestion: MergedSuggestion = {
      text: currentSuggestion.text,
      sources: [...currentSuggestion.sources],
      isDuplicated: false,
      isQuickSearch: currentSuggestion.isQuickSearch,
      engineId: currentSuggestion.sources.length > 0 ? currentSuggestion.sources[0] : undefined
    };
    
    // 查找相似的建议
    for (let j = i + 1; j < suggestions.length; j++) {
      if (processed.has(j)) continue;
      
      const otherSuggestion = suggestions[j];
      if (areSuggestionsSimilar(currentSuggestion.text, otherSuggestion.text)) {
        // 合并来源
        otherSuggestion.sources.forEach(source => {
          if (!mergedSuggestion.sources.includes(source)) {
            mergedSuggestion.sources.push(source);
          }
        });
        mergedSuggestion.isDuplicated = true;
        processed.add(j);
      }
    }
    
    // 如果有多个来源，标记为重复
    if (mergedSuggestion.sources.length > 1) {
      mergedSuggestion.isDuplicated = true;
      mergedSuggestion.engineId = 'all'; // 多个来源时设置为 'all'
    }
    
    merged.push(mergedSuggestion);
    processed.add(i);
  }
  
  return merged;
}

// 解析快捷搜索格式
export function parseQuickSearch(query: string): { isQuickSearch: boolean; keyword: string } {
  const trimmedQuery = query.trim();
  
  // 检查是否以 "s " 开头
  if (trimmedQuery.toLowerCase().startsWith('s ') && trimmedQuery.length > 2) {
    return {
      isQuickSearch: true,
      keyword: trimmedQuery.substring(2).trim()
    };
  }
  
  return {
    isQuickSearch: false,
    keyword: trimmedQuery
  };
}

// 生成快捷搜索建议
export function generateQuickSearchSuggestions(keyword: string, engines: string[]): SuggestionItem[] {
  if (!keyword.trim()) return [];
  
  return [{
    text: keyword,
    sources: engines,
    isQuickSearch: true
  }];
}

// 过滤和排序建议
export function filterAndSortSuggestions(
  suggestions: MergedSuggestion[],
  maxResults: number = 8
): MergedSuggestion[] {
  return suggestions
    .filter(suggestion => suggestion.text.trim().length > 0)
    .sort((a, b) => {
      // 快捷搜索优先
      if (a.isQuickSearch && !b.isQuickSearch) return -1;
      if (!a.isQuickSearch && b.isQuickSearch) return 1;
      
      // 多来源的建议优先
      if (a.isDuplicated && !b.isDuplicated) return -1;
      if (!a.isDuplicated && b.isDuplicated) return 1;
      
      // 按来源数量排序
      return b.sources.length - a.sources.length;
    })
    .slice(0, maxResults);
}