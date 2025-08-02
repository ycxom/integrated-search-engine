import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Info, Github, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TopNavigation: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const handleSettingsClick = () => {
    console.log('打开设置');
  };

  const handleInfoClick = () => {
    alert('智能搜索 v1.0\n集成多个搜索引擎的统一搜索界面\n支持Google、必应、百度等主流搜索引擎');
  };

  const handleGithubClick = () => {
    window.open('https://github.com/ycxom/integrated-search-engine', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-semibold text-lg">智能搜索</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
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
              onClick={handleInfoClick}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSettingsClick}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGithubClick}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};