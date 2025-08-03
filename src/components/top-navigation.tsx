import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Github, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TopNavigation: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const handleHomeClick = () => {
    window.open('https://ycxom.top', '_blank', 'noopener,noreferrer');
  };


  const handleGithubClick = () => {
    window.open('https://github.com/ycxom/integrated-search-engine', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 backdrop-blur-md ${
      theme === 'light' 
        ? 'bg-black/5 border-b border-black/10' 
        : 'bg-white/10 border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/my-logo.png" 
                alt="集成搜索引擎" 
                className="w-8 h-8 mr-3 object-contain"
              />
              <span className={`font-semibold text-lg ${theme === 'light' ? 'text-black' : 'text-white'}`}>集成搜索引擎</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-all duration-200 ${
                    theme === 'light'
                      ? 'text-black/70 hover:text-black hover:bg-black/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {theme === 'dark' && <Moon className="w-4 h-4" />}
                  {theme === 'light' && <Sun className="w-4 h-4" />}
                  {theme === 'system' && <Monitor className="w-4 h-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>明亮模式</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>暗黑模式</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>跟随系统</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className={`transition-all duration-200 ${
                theme === 'light'
                  ? 'text-black/70 hover:text-black hover:bg-black/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGithubClick}
              className={`transition-all duration-200 ${
                theme === 'light'
                  ? 'text-black/70 hover:text-black hover:bg-black/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};