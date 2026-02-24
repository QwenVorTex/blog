---
title: "构建定格滚动引擎"
description: "深入解析如何通过 JavaScript 滚动劫持和帧率限制器实现 12FPS 的定格动画滚动效果。"
pubDate: 2026-02-20
heroColor: "blue"
tags: ["JavaScript", "动效", "前端工程"]
---

## 为什么要"降帧"？

在现代前端工程中，达到 60FPS 的平滑动画一直被视为性能优化的最高准则。浏览器渲染引擎在 16.7ms 内完成一帧的计算，实现丝般顺滑的过渡效果。

但是——**高度的普及带来审美疲劳**。

定格动画（Stop-motion）的生硬感能够带来：

- 强烈的**机械感**
- **复古感**和粘土动画的抽帧感
- 将数字界面的虚拟感转化为物理滞后性的**实体感**

## 实现原理

### 时间维度：FPS 限制器

```typescript
const TARGET_FPS = 12;
const FPS_INTERVAL = 1000 / TARGET_FPS; // ≈ 83.3ms

function tick(now: number) {
  requestAnimationFrame(tick);

  const elapsed = now - then;
  if (elapsed < FPS_INTERVAL) return; // 阻断

  then = now - (elapsed % FPS_INTERVAL); // 修正漂移

  // 执行重绘...
}
```

关键在于**阻断与放行**：只有逝去的时间超过 83.3ms 时，才执行位移操作。

### 空间维度：离散化

```typescript
function discretize(value: number, step: number = 4): number {
  return Math.round(value / step) * step;
}
```

即使在时间上实现了卡帧，如果位移像素是平滑递增的，效果依然不够硬朗。通过 `Math.round` 强制每次跳跃都是块状移动。

## CSS 配合

CSS 的 `steps()` 函数与 JavaScript 引擎协同工作：

```css
.hover-click {
  transition:
    transform 0.2s steps(3, end),
    box-shadow 0.2s steps(3, end);
}

.hover-click:hover {
  transform: translate(-6px, -6px);
}
```

`steps(3, end)` 将动画分为 3 个阶段，每个阶段结束时元素状态瞬间改变。

## 无障碍考量

对于使用 `prefers-reduced-motion` 偏好设置的用户，滚动引擎会自动禁用：

```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion && !isTouchDevice) {
  engine.start();
}
```

触摸设备也会回退到原生滚动，因为滚动劫持会严重影响触屏用户体验。

> 控制时间流逝感——这是前卫艺术在数字空间的终极表达。
