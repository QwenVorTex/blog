/**
 * Neo-Brutalist Scroll Engine
 * 低帧率 (12 FPS) 滚动引擎 —— 时间与空间的双重离散化
 * 
 * - 拦截 wheel 事件，禁用默认平滑滚动
 * - 通过 rAF 循环以 12 FPS 限制重绘
 * - 使用 Math.ceil() 离散化位移量
 * - 产生定格动画（Stop-motion）效果
 */

export function initScrollEngine() {
  const TARGET_FPS = 12;
  const FPS_INTERVAL = 1000 / TARGET_FPS;
  const SCROLL_SPEED = 1.2;
  const SNAP_THRESHOLD = 0.5;

  let targetScrollY = 0;
  let currentScrollY = 0;
  let then = performance.now();
  let rafId: number | null = null;
  let isEnabled = true;

  // Get max scrollable height
  function getMaxScroll() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  // Clamp value between min and max
  function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
  }

  // Discrete step: force pixel jumps
  function discretize(value: number, step: number = 4): number {
    return Math.round(value / step) * step;
  }

  // Handle wheel event
  function onWheel(e: WheelEvent) {
    if (!isEnabled) return;
    e.preventDefault();

    const delta = e.deltaY * SCROLL_SPEED;
    targetScrollY = clamp(targetScrollY + delta, 0, getMaxScroll());
  }

  // rAF render loop with FPS limiting
  function tick(now: number) {
    rafId = requestAnimationFrame(tick);

    const elapsed = now - then;

    // Skip frame if not enough time has passed
    if (elapsed < FPS_INTERVAL) return;

    // Correct timing drift
    then = now - (elapsed % FPS_INTERVAL);

    // Calculate discrete jump
    const diff = targetScrollY - currentScrollY;

    if (Math.abs(diff) < SNAP_THRESHOLD) {
      currentScrollY = targetScrollY;
    } else {
      // Lerp with discretization for chunky movement
      const step = diff * 0.25;
      const discreteStep = discretize(
        step > 0 ? Math.ceil(step) : Math.floor(step),
        2
      );
      currentScrollY += discreteStep;
    }

    // Apply scroll position
    window.scrollTo(0, Math.round(currentScrollY));
  }

  // Sync state on resize
  function onResize() {
    targetScrollY = clamp(targetScrollY, 0, getMaxScroll());
    currentScrollY = window.scrollY;
  }

  // Handle keyboard scroll
  function onKeydown(e: KeyboardEvent) {
    if (!isEnabled) return;

    const scrollAmount = 80;
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        targetScrollY = clamp(targetScrollY + scrollAmount * 3, 0, getMaxScroll());
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        targetScrollY = clamp(targetScrollY - scrollAmount * 3, 0, getMaxScroll());
        break;
      case 'Home':
        e.preventDefault();
        targetScrollY = 0;
        break;
      case 'End':
        e.preventDefault();
        targetScrollY = getMaxScroll();
        break;
      case ' ':
        e.preventDefault();
        targetScrollY = clamp(
          targetScrollY + (e.shiftKey ? -scrollAmount * 5 : scrollAmount * 5),
          0,
          getMaxScroll()
        );
        break;
    }
  }

  // Initialize
  function start() {
    currentScrollY = window.scrollY;
    targetScrollY = currentScrollY;

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeydown);

    rafId = requestAnimationFrame(tick);
  }

  // Cleanup
  function destroy() {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKeydown);

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
  }

  // Toggle enable/disable
  function toggle(enabled: boolean) {
    isEnabled = enabled;
    if (!enabled) {
      currentScrollY = window.scrollY;
      targetScrollY = currentScrollY;
    }
  }

  return { start, destroy, toggle };
}
