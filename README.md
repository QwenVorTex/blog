# TorQuen Blog

这是我的个人博客仓库。

风格上我一直偏向新粗野主义：粗边框、硬阴影、卡帧动效、带一点故意的不规整。但现在这套站点已经不只是“做个风格展示页”了，它更像一个我会长期往里写东西、不断往下改的博客。

目前这套博客用 [Astro](https://astro.build) 构建，静态输出，文章写在 Markdown 里，样式基本都是原生 CSS。

## 现在这版有什么

- 首页已经改成内容优先，不再只是放一张大视觉图
- 文章页补了更完整的 SEO 信息、RSS 和结构化数据
- 追番和游戏页面现在是本地维护的静态清单，不再在构建时去抓外部 API
- 全站动效统一成卡帧语言，交互不会一半丝滑一半生硬
- 桌面端有一套自定义光标，风格跟站点一致
- 文章支持标签、草稿、更新时间、相关文章

## 开发

```bash
npm install
npm run dev
```

构建和预览：

```bash
npm run build
npm run preview
```

## 内容放在哪里

文章都在 `src/content/posts/`。

写新文章时直接新建一个 `.md` 或 `.mdx` 文件就行，文件名就是最终路由的 slug。

Frontmatter 目前支持这些字段：

```md
---
title: "文章标题"
description: "一句话摘要"
pubDate: 2026-04-07
updatedDate: 2026-04-07 # 可选
heroColor: "yellow" # yellow | red | blue | black
tags: ["博客", "前端"]
featured: false
keywords: ["Astro", "Blog"]
ogImage: "/og-default.svg"
canonical: "https://example.com/your-post" # 可选
draft: false
---
```

## 现在的目录大概是这样

```text
src/
├── components/
│   ├── BrutalistCursor.astro
│   ├── Button.astro
│   ├── Footer.astro
│   ├── Header.astro
│   ├── PostCard.astro
│   ├── ScrollEngine.astro
│   ├── SortControls.astro
│   └── Tag.astro
├── config/
│   └── site.ts
├── content/
│   └── posts/
├── data/
│   └── media.ts
├── layouts/
│   ├── BaseLayout.astro
│   └── PostLayout.astro
├── lib/
│   ├── media.ts
│   └── posts.ts
├── pages/
│   ├── index.astro
│   ├── archive.astro
│   ├── about.astro
│   ├── anime.astro
│   ├── games.astro
│   ├── 404.astro
│   ├── rss.xml.ts
│   └── posts/[slug].astro
├── scripts/
│   ├── scroll-engine.ts
│   └── scroll-reveal.ts
└── styles/
    ├── animations.css
    ├── brutalist.css
    ├── global.css
    ├── typography.css
    └── variables.css
```

## 站点信息改哪里

博客标题、描述、导航、社交链接这些都集中在：

`src/config/site.ts`

如果只是想换 GitHub、Bilibili、首页标题或者默认文案，改这个文件就够了。

## 追番和游戏列表改哪里

现在不再走构建期抓取了，统一改成本地维护：

- `src/data/media.ts` 放原始清单
- `src/lib/media.ts` 负责整理成页面要用的数据

这样做的好处很直接：构建稳定，不再因为第三方接口慢或者炸掉而拖死整个站点。

## 关于动效

这套博客不是追求“顺滑”，而是追求“有实体感”。

所以站里很多地方都用了 `steps()`，包括：

- 页面入场
- 卡片和按钮的悬停
- 首页 Hero 的色块
- 自定义光标的迟滞跟随

不过我也尽量控制了强度，正文阅读区会比首页和卡片区安静很多，不会为了风格把可读性一起赔进去。

## 备注

这个仓库还会继续改，而且改动不一定都追求“更现代”，很多时候只是为了让它更像我自己会写、会用、也愿意长期维护的东西。

## License

MIT
