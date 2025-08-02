import React from 'react';
import { DynamicBackground } from './components/dynamic-background';
import { TopNavigation } from './components/top-navigation';
import { SearchInterface } from './components/search-interface';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="search-ui-theme">
      <DynamicBackground>
        <TopNavigation />
        <SearchInterface />
      </DynamicBackground>
    </ThemeProvider>
  );
}

export default App;