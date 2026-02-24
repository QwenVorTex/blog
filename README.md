# 部署到腾讯云 EdgeOne Pages

## 前提条件

1. 拥有腾讯云账号
2. 已开通 EdgeOne Pages 服务
3. 代码已推送到 Git 仓库（GitHub / GitLab / Gitee）

## 部署步骤

### 1. 连接 Git 仓库

1. 登录 [腾讯云 EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)
2. 点击「新建项目」
3. 选择 Git 平台并授权连接
4. 选择本项目的仓库

### 2. 配置构建设置

在构建配置页面，填写以下参数：

| 配置项           | 值              |
| ---------------- | --------------- |
| **框架预设**     | Astro           |
| **构建命令**     | `npm run build` |
| **构建输出目录** | `dist`          |
| **Node.js 版本** | 18 或更高       |

### 3. 环境变量（可选）

如需配置自定义域名，在环境变量中设置：

```
SITE_URL=https://your-domain.com
```

### 4. 部署

点击「部署」，EdgeOne Pages 会自动：

- 安装依赖 (`npm install`)
- 执行构建 (`npm run build`)
- 将 `dist/` 目录部署到边缘节点

### 5. 自定义域名

部署成功后，在「自定义域名」中添加你的域名，并按提示配置 DNS 解析（CNAME 记录）。

## 更新站点 URL

部署完成后，将 `astro.config.mjs` 中的 `site` 字段更新为实际域名：

```js
export default defineConfig({
  site: "https://your-actual-domain.com",
  // ...
});
```

同时更新 `public/robots.txt` 中的 Sitemap URL。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 添加新文章

在 `src/content/posts/` 目录下创建新的 `.md` 或 `.mdx` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
pubDate: 2026-02-24
heroColor: "yellow" # yellow | red | blue | black
tags: ["标签1", "标签2"]
draft: false
---

正文内容...
```

## 项目结构

```
Blog/
├── public/                # 静态资源
├── src/
│   ├── components/        # UI 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   ├── HeroSection.astro
│   │   ├── Button.astro
│   │   ├── Tag.astro
│   │   └── ScrollEngine.astro
│   ├── content/
│   │   └── posts/         # 博客文章 (Markdown/MDX)
│   ├── layouts/           # 页面布局
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/             # 路由页面
│   │   ├── index.astro
│   │   ├── archive.astro
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts
│   │   └── posts/[slug].astro
│   ├── scripts/           # 客户端脚本
│   │   ├── scroll-engine.ts
│   │   └── scroll-reveal.ts
│   ├── styles/            # 设计系统
│   │   ├── global.css
│   │   ├── variables.css
│   │   ├── typography.css
│   │   ├── brutalist.css
│   │   └── animations.css
│   └── content.config.ts  # 内容集合定义
├── astro.config.mjs
├── package.json
└── tsconfig.json
```
