import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAutoSwitchControl } from "@/hooks/useAutoSwitchControl";
import { useTheme } from "next-themes";

export function AutoSwitchControl() {
  const { isAutoSwitchEnabled, toggleAutoSwitch } = useAutoSwitchControl();
  const { theme } = useTheme();

  const handleToggle = (checked: boolean) => {
    toggleAutoSwitch();
    // 添加用户反馈
    console.log('自动切换开关状态:', checked ? '开启' : '关闭');
  };

  return (
    <div className="flex items-center space-x-2">
      <Label 
        htmlFor="auto-switch" 
        className={`text-sm font-medium whitespace-nowrap cursor-pointer ${
          theme === 'light' ? 'text-black/70' : 'text-white/80'
        }`}
        title={isAutoSwitchEnabled ? '点击关闭自动切换功能' : '点击开启自动切换功能'}
      >
        自动切换
      </Label>
      <Switch
        id="auto-switch"
        checked={isAutoSwitchEnabled}
        onCheckedChange={handleToggle}
        title={isAutoSwitchEnabled ? '自动切换已开启，点击logo可直接搜索' : '自动切换已关闭，点击logo无效'}
      />
      {/* 状态指示器 */}
      <div className={`w-2 h-2 rounded-full ${
        isAutoSwitchEnabled 
          ? 'bg-green-500' 
          : 'bg-gray-400'
      }`} title={isAutoSwitchEnabled ? '自动切换开启' : '自动切换关闭'} />
    </div>
  );
}
