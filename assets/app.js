(() => {
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const loader=document.getElementById('site-loader'), loaderText=document.getElementById('loader-text');
  if(loader){
    const steps=['Creating the page…','Drawing the layout…','Loading school experience…','Adding the finishing touches…','Page ready ✓']; let i=0;
    const timer=setInterval(()=>{if(loaderText)loaderText.textContent=steps[Math.min(++i,steps.length-1)];},420);
    const finish=()=>{clearInterval(timer);if(loaderText)loaderText.textContent='Page ready ✓';loader.classList.add('done');document.body.classList.add('page-ready');};
    window.addEventListener('load',()=>setTimeout(finish,350),{once:true}); setTimeout(finish,5000);
  }

  /* One shared mobile sidebar for every public page. */
  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');
  if(menu&&nav){
    const css=document.createElement('style');
    css.textContent=`
      @media(max-width:860px){
        .site-header{position:sticky!important;top:0!important;z-index:80!important}
        .menu-toggle{display:grid!important;place-items:center;width:46px;height:46px;padding:0;border:0;background:transparent;color:#10213a;font-size:27px;line-height:1;cursor:pointer;position:relative;z-index:92}
        .site-nav{display:none!important}
        .public-nav-overlay{position:fixed;inset:0;z-index:90;background:rgba(7,24,46,.5);opacity:0;visibility:hidden;transition:opacity .25s ease,visibility .25s ease}
        .public-nav-overlay.open{opacity:1;visibility:visible}
        .public-nav-drawer{position:absolute;top:0;right:0;width:min(330px,88vw);height:100%;background:#fff;box-shadow:-18px 0 55px rgba(7,24,46,.22);transform:translateX(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);padding:88px 22px 28px;overflow-y:auto}
        .public-nav-overlay.open .public-nav-drawer{transform:translateX(0)}
        .public-nav-drawer .drawer-brand{display:flex;align-items:center;gap:12px;padding:0 6px 22px;margin-bottom:12px;border-bottom:1px solid #e6ebf2;color:#10213a;font-weight:900;line-height:1.05}
        .public-nav-drawer .drawer-brand img{width:48px;height:48px;border-radius:50%;object-fit:cover}
        .public-nav-drawer a{display:flex;align-items:center;gap:12px;padding:14px 15px;margin:5px 0;border-radius:12px;color:#10213a;font-weight:800;transition:.2s ease}
        .public-nav-drawer a:hover,.public-nav-drawer a.active{background:#edf5ff;color:#0b5ed7;transform:translateX(3px)}
        .public-nav-drawer a.drawer-result{background:#f4c20d;color:#10213a;margin-top:14px}
        .public-nav-close{position:absolute;top:20px;right:18px;border:0;background:#f4f7fb;color:#10213a;width:40px;height:40px;border-radius:50%;font-size:24px;cursor:pointer}
        body.nav-open{overflow:hidden}
      }
      @media(min-width:861px){.public-nav-overlay{display:none!important}}
    `;
    document.head.appendChild(css);
    const overlay=document.createElement('div');
    overlay.className='public-nav-overlay';
    overlay.innerHTML='<aside class="public-nav-drawer" aria-label="Mobile navigation"><button class="public-nav-close" type="button" aria-label="Close navigation">×</button><div class="drawer-brand"><img src="https://i.ibb.co/whtP8S5v/image.png" alt="Laff British Montessori School logo"><span>LAFF BRITISH<br>MONTESSORI SCHOOL</span></div><div class="drawer-links"></div></aside>';
    document.body.appendChild(overlay);
    const links=overlay.querySelector('.drawer-links');
    nav.querySelectorAll('a').forEach(original=>{const a=original.cloneNode(true);if(original.classList.contains('active'))a.classList.add('active');if((original.getAttribute('href')||'').includes('result'))a.classList.add('drawer-result');links.appendChild(a);});
    const close=()=>{overlay.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');document.body.classList.remove('nav-open');};
    const open=()=>{overlay.classList.add('open');menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Close navigation');document.body.classList.add('nav-open');};
    menu.setAttribute('aria-expanded','false');
    menu.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();overlay.classList.contains('open')?close():open();});
    overlay.querySelector('.public-nav-close').addEventListener('click',close);
    overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
    overlay.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }

  document.querySelectorAll('a[href]').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('tel:')||a.target==='_blank')return;
    a.addEventListener('click',e=>{if(e.defaultPrevented)return;e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.href=href,160);});
  });

  const revealImage=img=>{
    if(img.dataset.generationStarted)return;
    img.dataset.generationStarted='true';
    const holder=img.parentElement,g=holder?.querySelector('.home-generating'),status=holder?.querySelector('.photo-status');let done=false;
    const reveal=()=>{if(done||!img.naturalWidth)return;done=true;setTimeout(()=>{img.classList.add('image-ready');setTimeout(()=>g?.classList.add('done'),380);if(status){status.textContent='Image ready ✓';setTimeout(()=>status.style.opacity='0',450);}},650);};
    img.addEventListener('load',reveal,{once:true});img.addEventListener('error',()=>{g?.classList.add('done');if(status)status.textContent='Image unavailable';},{once:true});if(img.complete)reveal();
  };
  document.querySelectorAll('.home-real-image').forEach(revealImage);
  document.querySelectorAll('.photo-loader img').forEach(img=>{const holder=img.parentElement,status=holder?.querySelector('.photo-status')||holder?.querySelector('span'),finish=()=>{holder?.classList.add('loaded');if(status){status.textContent='Image ready ✓';setTimeout(()=>status.style.opacity='0',450);}};if(img.complete&&img.naturalWidth)finish();else img.addEventListener('load',finish,{once:true});img.addEventListener('error',()=>{if(status)status.textContent='Image unavailable';},{once:true});});
  if(document.querySelector('.home-hero')&&!document.querySelector('script[data-home-slider]')){const s=document.createElement('script');s.src='assets/home-slider.js?v=2';s.dataset.homeSlider='true';document.body.appendChild(s);}
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
  window.addEventListener('error',()=>loader?.classList.add('done'));
})();
