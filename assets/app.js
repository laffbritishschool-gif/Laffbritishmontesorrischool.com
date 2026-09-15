(() => {
  const photoStyles = document.createElement('link');
  photoStyles.rel = 'stylesheet';
  photoStyles.href = 'assets/photo-display.css?v=2';
  document.head.appendChild(photoStyles);
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const loader = document.getElementById('site-loader');
  const loaderText = document.getElementById('loader-text');
  if (loader) {
    const steps = ['Creating the page…','Drawing the layout…','Loading school experience…','Adding the finishing touches…'];
    let i = 0;
    const timer = setInterval(() => { if (loaderText) loaderText.textContent = steps[++i % steps.length]; }, 520);
    window.addEventListener('load', async () => { await wait(700); clearInterval(timer); if(loaderText) loaderText.textContent='Page ready ✓'; await wait(450); loader.classList.add('done'); });
  }
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if(menu && nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;
    a.addEventListener('click', e => { e.preventDefault(); document.body.classList.add('page-leaving'); setTimeout(()=>location.href=href,220); });
  });

  const runImageGeneration = async (img) => {
    if (img.dataset.generationStarted) return;
    img.dataset.generationStarted = 'true';
    const holder = img.parentElement;
    const generating = holder?.querySelector('.home-generating');
    const status = holder?.querySelector('.photo-status');
    const fail = () => {
      if (status) status.textContent = 'Image unavailable';
      if (generating) generating.classList.add('done');
    };
    img.addEventListener('error', fail, {once:true});
    const reveal = async () => {
      await wait(Number(img.closest('[data-generation-delay]')?.dataset.generationDelay || 1350));
      if (!img.naturalWidth) return;
      img.classList.add('image-ready');
      await wait(420);
      if (generating) generating.classList.add('done');
      if (status) { status.textContent = 'Image ready ✓'; setTimeout(()=>status.style.opacity='0',500); }
    };
    if (img.complete) reveal(); else img.addEventListener('load', reveal, {once:true});
  };

  document.querySelectorAll('.home-real-image').forEach(runImageGeneration);
  document.querySelectorAll('.photo-loader img').forEach(img => {
    const holder = img.parentElement;
    const status = holder?.querySelector('.photo-status') || holder?.querySelector('span');
    const finish = () => { holder?.classList.add('loaded'); if(status) status.textContent='Image ready ✓'; setTimeout(()=>{if(status)status.style.opacity='0'},450); };
    if(img.complete) finish(); else img.addEventListener('load',finish,{once:true});
    img.addEventListener('error',()=>{if(status)status.textContent='Image unavailable';});
  });
  const year = document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();
})();