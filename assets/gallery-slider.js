(() => {
  const slider = document.querySelector('.gallery-slider');
  if (!slider) return;

  const slides = [...slider.querySelectorAll('.gallery-slide')];
  const dots = [...slider.querySelectorAll('.gallery-dot')];
  const prev = slider.querySelector('[data-gallery-prev]');
  const next = slider.querySelector('[data-gallery-next]');
  if (!slides.length) return;

  let index = 0;
  let timer = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  };

  const restart = () => {
    window.clearInterval(timer);
    if (!reduceMotion) timer = window.setInterval(() => show(index + 1), 5000);
  };

  prev?.addEventListener('click', () => { show(index - 1); restart(); });
  next?.addEventListener('click', () => { show(index + 1); restart(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); restart(); }));

  slider.addEventListener('mouseenter', () => window.clearInterval(timer));
  slider.addEventListener('mouseleave', restart);
  slider.addEventListener('focusin', () => window.clearInterval(timer));
  slider.addEventListener('focusout', () => {
    if (!slider.contains(document.activeElement)) restart();
  });

  let touchStartX = 0;
  slider.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 45) return;
    show(index + (delta < 0 ? 1 : -1));
    restart();
  }, { passive: true });

  show(0);
  restart();
})();
