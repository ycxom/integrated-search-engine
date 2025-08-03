// 搜索引擎Logo配置
export interface EngineLogo {
  id: string;
  name: string;
  logoUrl: string;
  backgroundColor: string;
  textColor: string;
}

export const ENGINE_LOGOS: Record<string, EngineLogo> = {
  baidu: {
    id: 'baidu',
    name: '百度',
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTg5IDIwIDQgMTYuNDExIDQgMTJTNy41ODkgNCA1IDRTMjAgNy41ODkgMjAgMTJTMTYuNDExIDIwIDEyIDIwWiIgZmlsbD0iIzJkNjNmZiIvPgo8cGF0aCBkPSJNMTIgNkM5LjIzOSA2IDcgOC4yMzkgNyAxMVM5LjIzOSAxNiAxMiAxNlMxNyAxMy43NjEgMTcgMTFTMTQuNzYxIDYgMTIgNloiIGZpbGw9IiMyZDYzZmYiLz4KPC9zdmc+',
    backgroundColor: '#2d63ff',
    textColor: '#ffffff'
  },
  google: {
    id: 'google',
    name: 'Google',
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM2IDEwSDEyVjE0LjI2SDE3LjkyQzE3LjY2IDE1LjYzIDE2Ljg2IDE2Ljc4IDE1LjY2IDE3LjU3VjIwLjM0SDE5LjI3QzIxLjM5IDE4LjQyIDIyLjU2IDE1LjYgMjIuNTYgMTIuMjVaIiBmaWxsPSIjNDI4NUY0Ii8+CjxwYXRoIGQ9Ik0xMiAyM0M5LjExIDIzIDYuNjYgMjEuOTIgNS4wNiAyMC4zNEw4LjY3IDE3LjU3QzkuNzggMTguMzMgMTEuNTUgMTguNzUgMTIgMTguNzVDMTQuNzYgMTguNzUgMTcuMDUgMTcuMDYgMTcuOTIgMTQuNzVIMjEuNTNDMjAuNjIgMTguNTEgMTYuNjIgMjMgMTIgMjNaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik01LjA2IDIwLjM0QzMuNjEgMTguNjMgMi43NSAxNi40MiAyLjc1IDEyQzIuNzUgNy41OCAzLjYxIDUuMzcgNS4wNiAzLjY2TDguNjcgNi40M0M3LjY5IDcuMTkgNy4yNSA4LjMxIDcuMjUgMTBDNy4yNSAxMS42OSA3LjY5IDEyLjgxIDguNjcgMTMuNTdMNS4wNiAyMC4zNFoiIGZpbGw9IiNGQkJDMDQiLz4KPHBhdGggZD0iTTEyIDQuNzVDMTMuNzcgNC43NSAxNS4zNSA1LjM2IDE2LjYyIDYuNTVMMTkuOTEgMy4yNkMxNy45NiAxLjQ0IDE1LjMxIDAgMTIgMEM3LjM4IDAgMy4zOCA0LjQ5IDIuNDcgOC4yNUw2LjA4IDExLjAyQzYuOTUgOC4yNyA5LjI0IDQuNzUgMTIgNC43NVoiIGZpbGw9IiNFQTQzMzUiLz4KPC9zdmc+',
    backgroundColor: '#4285f4',
    textColor: '#ffffff'
  },
  sogou: {
    id: 'sogou',
    name: '搜狗',
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTg5IDIwIDQgMTYuNDExIDQgMTJTNy41ODkgNCA1IDRTMjAgNy41ODkgMjAgMTJTMTYuNDExIDIwIDEyIDIwWiIgZmlsbD0iI2ZmNjYwMCIvPgo8cGF0aCBkPSJNMTIgNkM5LjIzOSA2IDcgOC4yMzkgNyAxMVM5LjIzOSAxNiAxMiAxNlMxNyAxMy43NjEgMTcgMTFTMTQuNzYxIDYgMTIgNloiIGZpbGw9IiNmZjY2MDAiLz4KPC9zdmc+',
    backgroundColor: '#ff6600',
    textColor: '#ffffff'
  },
  bing: {
    id: 'bing',
    name: '必应',
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTg5IDIwIDQgMTYuNDExIDQgMTJTNy41ODkgNCA1IDRTMjAgNy41ODkgMjAgMTJTMTYuNDExIDIwIDEyIDIwWiIgZmlsbD0iIzAwODhmZiIvPgo8cGF0aCBkPSJNMTIgNkM5LjIzOSA2IDcgOC4yMzkgNyAxMVM5LjIzOSAxNiAxMiAxNlMxNyAxMy43NjEgMTcgMTFTMTQuNzYxIDYgMTIgNloiIGZpbGw9IiMwMDg4ZmYiLz4KPC9zdmc+',
    backgroundColor: '#0088ff',
    textColor: '#ffffff'
  },
  so360: {
    id: 'so360',
    name: '360搜索',
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTg5IDIwIDQgMTYuNDExIDQgMTJTNy41ODkgNCA1IDRTMjAgNy41ODkgMjAgMTJTMTYuNDExIDIwIDEyIDIwWiIgZmlsbD0iIzAwYmE1MyIvPgo8cGF0aCBkPSJNMTIgNkM5LjIzOSA2IDcgOC4yMzkgNyAxMVM5LjIzOSAxNiAxMiAxNlMxNyAxMy43NjEgMTcgMTFTMTQuNzYxIDYgMTIgNloiIGZpbGw9IiMwMGJhNTMiLz4KPC9zdmc+',
    backgroundColor: '#00ba53',
    textColor: '#ffffff'
  },
  duckduckgo: {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTg5IDIwIDQgMTYuNDExIDQgMTJTNy41ODkgNCA1IDRTMjAgNy41ODkgMjAgMTJTMTYuNDExIDIwIDEyIDIwWiIgZmlsbD0iI2RlNTgzMyIvPgo8cGF0aCBkPSJNMTIgNkM5LjIzOSA2IDcgOC4yMzkgNyAxMVM5LjIzOSAxNiAxMiAxNlMxNyAxMy43NjEgMTcgMTFTMTQuNzYxIDYgMTIgNloiIGZpbGw9IiNkZTU4MzMiLz4KPC9zdmc+',
    backgroundColor: '#de5833',
    textColor: '#ffffff'
  },
  yandex: {
    id: 'yandex',
    name: 'Yandex',
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTg5IDIwIDQgMTYuNDExIDQgMTJTNy41ODkgNCA1IDRTMjAgNy41ODkgMjAgMTJTMTYuNDExIDIwIDEyIDIwWiIgZmlsbD0iI2ZmY2MwMCIvPgo8cGF0aCBkPSJNMTIgNkM5LjIzOSA2IDcgOC4yMzkgNyAxMVM5LjIzOSAxNiAxMiAxNlMxNyAxMy43NjEgMTcgMTFTMTQuNzYxIDYgMTIgNloiIGZpbGw9IiNmZmNjMDAiLz4KPC9zdmc+',
    backgroundColor: '#ffcc00',
    textColor: '#000000'
  },
  yahoo: {
    id: 'yahoo',
    name: 'Yahoo',
    logoUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTg5IDIwIDQgMTYuNDExIDQgMTJTNy41ODkgNCA1IDRTMjAgNy41ODkgMjAgMTJTMTYuNDExIDIwIDEyIDIwWiIgZmlsbD0iIzQxMDA5ZSIvPgo8cGF0aCBkPSJNMTIgNkM5LjIzOSA2IDcgOC4yMzkgNyAxMVM5LjIzOSAxNiAxMiAxNlMxNyAxMy43NjEgMTcgMTFTMTQuNzYxIDYgMTIgNloiIGZpbGw9IiM0MTAwOWUiLz4KPC9zdmc+',
    backgroundColor: '#41009e',
    textColor: '#ffffff'
  }
};

// 获取搜索引擎Logo
export const getEngineLogo = (engineId: string): EngineLogo | null => {
  return ENGINE_LOGOS[engineId] || null;
};

// 获取所有支持的搜索引擎Logo
export const getAllEngineLogos = (): EngineLogo[] => {
  return Object.values(ENGINE_LOGOS);
};

// 检查搜索引擎是否有Logo
export const hasEngineLogo = (engineId: string): boolean => {
  return engineId in ENGINE_LOGOS;
};