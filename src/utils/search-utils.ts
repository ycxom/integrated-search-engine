/**
 * 判断字符串是否为有效的URL
 */
export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    // 检查是否可能是不带协议的URL
    return /^(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i.test(string);
  }
};

/**
 * 判断字符串是否为图片URL
 */
export const isImageUrl = (string: string): boolean => {
  if (!isValidUrl(string)) return false;
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
  const imageDomains = ['imgur.com', 'picsum.photos', 'unsplash.com'];
  
  return imageExtensions.some(ext => string.toLowerCase().endsWith(ext)) || 
         imageDomains.some(domain => string.includes(domain));
};

/**
 * 构建搜索URL
 */
export const buildSearchUrl = (baseUrl: string, query: string): string => {
  return baseUrl + encodeURIComponent(query.trim());
};

/**
 * 安全地打开新窗口
 */
export const openSearchWindow = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};