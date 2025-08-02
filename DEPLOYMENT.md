# Vercel 部署指南

## 快速部署

### 方法一：GitHub 集成部署（推荐）

1. **初始化 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "feat: 添加 Vercel 部署支持"
   ```

2. **推送到 GitHub**
   ```bash
   git remote add origin https://github.com/your-username/integrated-search-engine.git
   git branch -M main
   git push -u origin main
   ```

3. **在 Vercel 中导入**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测配置并开始部署

### 方法二：Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **生产环境部署**
   ```bash
   vercel --prod
   ```

### 方法三：拖拽部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **拖拽部署**
   - 访问 [Vercel Deploy](https://vercel.com/new)
   - 将 `dist` 文件夹拖拽到页面中

## 配置说明

### 自动检测的配置

Vercel 会自动检测以下配置：

- ✅ **框架**: Vite (React)
- ✅ **构建命令**: `npm run build`
- ✅ **输出目录**: `dist`
- ✅ **安装命令**: `npm install`
- ✅ **Node.js 版本**: 18.x

### 环境变量设置

如需设置环境变量：

1. 在 Vercel Dashboard 中进入项目设置
2. 点击 "Environment Variables"
3. 添加所需的环境变量

常用环境变量示例：
```
VITE_APP_TITLE=集成搜索引擎
VITE_API_URL=https://api.example.com
```

### 自定义域名

1. 在项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

## 部署后验证

部署完成后，请验证以下功能：

- [ ] 页面正常加载
- [ ] 搜索引擎选择器工作正常
- [ ] 主题切换功能正常
- [ ] 响应式布局在移动端正常
- [ ] 所有静态资源加载正常

## 常见问题

### Q: 构建失败怎么办？

A: 检查以下几点：
1. Node.js 版本是否为 16+
2. 依赖是否正确安装
3. TypeScript 类型错误
4. 查看构建日志获取详细错误信息

### Q: 页面显示 404 错误？

A: 这通常是 SPA 路由问题，确保 `vercel.json` 中的路由配置正确。

### Q: 静态资源加载失败？

A: 检查 `vite.config.ts` 中的 `base` 配置，确保资源路径正确。

## 性能优化

项目已包含以下优化：

- ✅ 代码分割（vendor 和 ui 分离）
- ✅ 静态资源缓存（1年缓存）
- ✅ Gzip 压缩
- ✅ Tree shaking

## 监控和分析

Vercel 提供以下监控功能：

- **Analytics**: 访问统计
- **Speed Insights**: 性能分析
- **Function Logs**: 函数日志（如有）

在项目设置中可以启用这些功能。

---

🎉 恭喜！你的集成搜索引擎现在已经支持 Vercel 部署了！