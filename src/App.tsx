import { DynamicBackground } from './components/dynamic-background';
import { TopNavigation } from './components/top-navigation';
import { SearchInterfaceWithSuggestions } from './components/search-interface-with-suggestions';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="search-ui-theme">
      <DynamicBackground>
        <TopNavigation />
        <SearchInterfaceWithSuggestions />
      </DynamicBackground>
    </ThemeProvider>
  );
}

export default App;