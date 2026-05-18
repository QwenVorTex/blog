---
title: "构建定格滚动引擎"
description: "这个博客的卡帧效果"
pubDate: 2026-02-20
updatedDate: 2026-04-07
heroColor: "blue"
tags: ["JavaScript", "动效", "博客"]
---

## 滚动

正常来说，前端做动画都在追求着流畅，比如手机厂商一直追求的打断动画，以至于造出了一台手机电脑。

这个方向当然没有问题，而且大多数场景里它就是对的。

但是我实在是觉得没必要，有的地方根本不需要过渡动画。

## 时间

思路其实不复杂，就是不要每一帧都更新。

```ts
const TARGET_FPS = 12;
const FPS_INTERVAL = 1000 / TARGET_FPS;

function tick(now: number) {
  requestAnimationFrame(tick);

  const elapsed = now - then;
  if (elapsed < FPS_INTERVAL) return;

  then = now - (elapsed % FPS_INTERVAL);
}
```

浏览器效果改成12FPS后，就有了卡顿感。

这样一来，滚动的时间感就变了。

## 位移

后来我发现只降帧还是不够。

因为如果每次位移还是按连续像素去算，那它虽然帧率低了，但是看着就像是网页出现了性能问题。所以我又做了一层离散化处理：

```ts
function discretize(value: number, step: number = 4): number {
  return Math.round(value / step) * step;
}
```

## CSS 的 steps()

如果只有滚动引擎有卡帧效果，那整体体验会很割裂。

所以我后来基本把站里大部分关键交互都改成了 `steps()`，比如按钮和卡片：

```css
.hover-click {
  transition:
    transform 0.2s steps(3, end),
    box-shadow 0.2s steps(3, end);
}
```

## 总结

整个博客经过这一切，看起来就有了一些漫画感，可以还是不够，期望后期可以赶上其他一切优秀的网站。
