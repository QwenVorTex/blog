/**
 * Scroll Reveal Observer
 * 使用 IntersectionObserver 在元素进入视口时触发入场动画
 * 动画使用 steps() 计时函数实现"卡帧"效果
 */

export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}
