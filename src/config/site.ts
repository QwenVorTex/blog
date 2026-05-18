export const siteConfig = {
  name: 'TorQuen Blog',
  shortName: 'TorQuen',
  title: 'TorQuen Blog',
  description: '一个躺平的个人博客。',
  url: 'https://blog.torquen.cfd',
  locale: 'zh-CN',
  ogImage: '/og-default.svg',
  author: {
    name: 'TorQuen',
    role: '菜鸟 / 境外势力',
    bio: '记录个人想法。',
    email: '',
  },
  social: {
    github: 'https://github.com/QwenVorTex/',
    x: '',
    bilibili: 'https://space.bilibili.com/351913963',
  },
  navigation: {
    primary: [
      { label: '首页', href: '/' },
      { label: '文章', href: '/archive' },
      { label: '关于', href: '/about' },
    ],
    secondary: [
      { label: '追番', href: '/anime' },
      { label: '游戏', href: '/games' },
    ],
  },
  home: {
    eyebrow: '个人博客 / Design and Code Notes',
    title: '混吃等死的地方',
    subtitle:
      '进来后你就会被作者的躺平思想洗脑，受到境外势力资助',
    ctaLabel: '从文章开始',
    ctaHref: '/archive',
    secondaryLabel: '了解作者',
    secondaryHref: '/about',
  },
} as const;

export type SiteConfig = typeof siteConfig;
