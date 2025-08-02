# 集成搜索引擎 - Vercel 部署版本

一个现代化的集成搜索引擎界面，支持多个搜索引擎快速切换，现已支持 Vercel 一键部署。

## 功能特性

- 🔍 支持多个主流搜索引擎（Google、百度、必应等）
- 🎨 现代化 UI 设计，基于 shadcn/ui 组件库
- 🌙 支持深色/浅色主题切换
- 📱 完全响应式设计，支持移动端
- ⚡ 基于 Vite 构建，快速加载
- 🚀 支持 Vercel 一键部署

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS
- **部署平台**: Vercel

## 本地开发

### 环境要求

- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## Vercel 部署

### 方法一：通过 Vercel CLI

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 在项目根目录运行：
```bash
vercel
```

3. 按照提示完成部署配置

### 方法二：通过 Git 集成

1. 将项目推送到 GitHub/GitLab/Bitbucket
2. 在 [Vercel Dashboard](https://vercel.com/dashboard) 中导入项目
3. Vercel 会自动检测配置并部署

### 方法三：拖拽部署

1. 运行 `npm run build` 构建项目
2. 将 `dist` 文件夹拖拽到 [Vercel Deploy](https://vercel.com/new)

## 配置说明

### Vercel 配置 (vercel.json)

项目已包含优化的 Vercel 配置：

- ✅ SPA 路由支持
- ✅ 静态资源缓存优化
- ✅ 构建命令配置
- ✅ 输出目录设置

### Vite 配置优化

- ✅ 代码分割优化
- ✅ 资源路径配置
- ✅ 构建输出优化
- ✅ 开发服务器配置

## 环境变量

如需配置环境变量，可在 Vercel Dashboard 中设置，或创建 `.env.local` 文件：

```env
# 示例环境变量
VITE_APP_TITLE=集成搜索引擎
VITE_API_URL=https://api.example.com
```

## 部署状态

- ✅ Vercel 配置文件已创建
- ✅ Vite 构建配置已优化
- ✅ 项目结构已适配 Vercel
- ✅ 静态资源缓存已配置
- ✅ SPA 路由重写已设置

## 故障排除

### 构建失败

1. 检查 Node.js 版本是否为 16+
2. 清除缓存：`rm -rf node_modules package-lock.json && npm install`
3. 检查 TypeScript 类型错误

### 路由问题

项目已配置 SPA 路由重写，所有路由都会回退到 `index.html`。

### 静态资源加载问题

确保 `vite.config.ts` 中的 `base` 配置正确。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！