import React from 'react';
import { DynamicBackground } from './components/dynamic-background';
import { TopNavigation } from './components/top-navigation';
import { SearchInterfaceOptimized } from './components/search-interface-optimized';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="search-ui-theme">
      <DynamicBackground>
        <TopNavigation />
        <SearchInterfaceOptimized />
      </DynamicBackground>
    </ThemeProvider>
  );
}

export default App;