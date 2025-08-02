#!/usr/bin/env node

/**
 * Vercel 部署验证脚本
 * 检查项目是否准备好部署到 Vercel
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 开始检查 Vercel 部署配置...\n');

const checks = [
  {
    name: '检查 vercel.json 配置文件',
    check: () => fs.existsSync('vercel.json'),
    fix: '请确保 vercel.json 文件存在'
  },
  {
    name: '检查 package.json 构建脚本',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.scripts && pkg.scripts.build && pkg.scripts['vercel-build'];
    },
    fix: '请确保 package.json 包含 build 和 vercel-build 脚本'
  },
  {
    name: '检查 dist 目录是否可以生成',
    check: () => {
      // 检查是否有 dist 目录或者可以构建
      return fs.existsSync('dist') || fs.existsSync('vite.config.ts');
    },
    fix: '请运行 npm run build 确保可以正常构建'
  },
  {
    name: '检查 .gitignore 文件',
    check: () => fs.existsSync('.gitignore'),
    fix: '请创建 .gitignore 文件'
  },
  {
    name: '检查 node_modules 是否存在',
    check: () => fs.existsSync('node_modules'),
    fix: '请运行 npm install 安装依赖'
  }
];

let allPassed = true;

checks.forEach((check, index) => {
  const passed = check.check();
  const status = passed ? '✅' : '❌';
  console.log(`${index + 1}. ${status} ${check.name}`);
  
  if (!passed) {
    console.log(`   💡 解决方案: ${check.fix}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 所有检查通过！项目已准备好部署到 Vercel');
  console.log('\n📋 部署步骤:');
  console.log('1. 将代码推送到 Git 仓库');
  console.log('2. 在 Vercel Dashboard 中导入项目');
  console.log('3. 或使用 Vercel CLI: npx vercel');
} else {
  console.log('⚠️  请修复上述问题后再进行部署');
}

console.log('\n📚 更多信息请查看 README.md 文件');