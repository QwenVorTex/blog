---
title: "构建定格滚动引擎"
description: "我为什么故意把滚动做卡，以及这套 12FPS 滚动是怎么实现的。"
pubDate: 2026-02-20
updatedDate: 2026-04-07
heroColor: "blue"
tags: ["JavaScript", "动效", "博客"]
---

## 我为什么想把滚动做得不顺

正常来说，前端做动画都在追求一件事：顺。

滚动顺、过渡顺、悬停顺，最好一切都顺到用户感觉不到阻力。这个方向当然没有问题，而且大多数场景里它就是对的。

但我做这个博客的时候，反而对“太顺”这件事有点厌倦。很多网站的动效确实很平滑，可也正因为太平滑了，最后什么都没有留下。看过就过去了。

我想做一点不一样的东西，所以最后把主意打到了滚动上：既然这个站想要一点实体感，那干脆连滚动都不要那么丝滑，直接做成一种有点抽帧、有点拖拽、有点机械感的效果。

## 第一件事：先把时间降下来

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

浏览器本来会尽量往 60FPS 去跑，我这里相当于是主动说一句：不用那么勤快，先降到 12FPS 再说。

这样一来，滚动的时间感就先变了。它不再是连着滑，而是开始一格一格地往前跳。

## 第二件事：光降帧还不够

后来我发现只降帧还是不够。

因为如果每次位移还是按连续像素去算，那它虽然帧率低了，但味道还是不够硬。所以我又做了一层离散化处理：

```ts
function discretize(value: number, step: number = 4): number {
  return Math.round(value / step) * step;
}
```

说白了就是，别让它每次都走得那么细。既然要卡，就让它连位移都卡得彻底一点。

这样做完之后，整个滚动会更像一块东西被拽着往前走，而不是页面自己在“漂”。

## 为什么还要配合 CSS 的 steps()

如果只有滚动引擎是卡的，别的交互全是丝滑过渡，那整体还是会割裂。

所以我后来基本把站里大部分关键交互都改成了 `steps()`，比如按钮和卡片：

```css
.hover-click {
  transition:
    transform 0.2s steps(3, end),
    box-shadow 0.2s steps(3, end);
}
```

这样页面在视觉语言上才是一套东西。不是只有滚动在抽帧，而是整个交互系统都在说同一种话。

## 什么时候该收手

这类东西有个很现实的问题：做过头了会难用。

所以我从一开始就没打算把它强塞给所有场景。像 `prefers-reduced-motion` 这种情况，或者触屏设备，我都直接回退：

```ts
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion && !isTouchDevice) {
  engine.start();
}
```

因为说到底，这还是个博客，不是一个拿来炫技的实验装置。风格可以有，脾气可以有，但不能为了风格把基本体验一起干掉。

## 这套东西对我来说意味着什么

我后来越来越觉得，动效不是“会不会写”的问题，而是“你想让界面呈现什么性格”的问题。

对这个博客来说，我想要的不是顺滑，而是明确；不是轻盈，而是带点重量；不是像空气一样飘过去，而是像真的按着某个节奏在动。

12FPS 的滚动引擎，就是这个想法里很直白的一部分。
