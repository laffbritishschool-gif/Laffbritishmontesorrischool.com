(() => {
  const legacyRouteMap={
    '/index.html':'/',
    '/about.html':'/about/',
    '/contact.html':'/contact/',
    '/gallery.html':'/gallery/',
    '/news.html':'/news/',
    '/result.html':'/result/',
    '/result-view.html':'/result-view/',
    '/result-unavailable.html':'/result-unavailable/'
  };
  if(legacyRouteMap[location.pathname]){
    location.replace(legacyRouteMap[location.pathname]+location.search+location.hash);
    return;
  }
  const loader=document.getElementById('site-loader'), loaderText=document.getElementById('loader-text');
  if(loader){
    const steps=['Creating the page…','Drawing the layout…','Loading school experience…','Adding the finishing touches…','Page ready ✓']; let i=0;
    const timer=setInterval(()=>{if(loaderText)loaderText.textContent=steps[Math.min(++i,steps.length-1)];},420);
    const finish=()=>{clearInterval(timer);if(loaderText)loaderText.textContent='Page ready ✓';loader.classList.add('done');document.body.classList.add('page-ready');};
    window.addEventListener('load',()=>setTimeout(finish,350),{once:true}); setTimeout(finish,5000);
  }

  const portalUrl='https://student.laffbritishmontessorischool.com/student-login.html';
  const schoolLogo='/assets/school-logo.svg';
  const navItems=[
    {label:'Home',href:'/'},
    {label:'About',href:'/about/'},
    {label:'Gallery',href:'/gallery/'},
    {label:'News',href:'/news/'},
    {label:'Check Result',href:'/result/'},
    {label:'Contact',href:'/contact/'}
  ];
  const normalizePath=value=>{
    const path=String(value||'/').replace(/\.html$/i,'').replace(/\/+$/,'');
    return path||'/';
  };
  const currentPath=normalizePath(location.pathname);
  const isActive=href=>{
    const target=normalizePath(href);
    return target===currentPath||(target==='/result'&&['/result','/result-view','/result-unavailable'].includes(currentPath));
  };

  function mountSharedHeader(){
    const oldHeader=document.querySelector('.site-header');
    const insertionTarget=oldHeader||document.querySelector('main')||document.body.firstElementChild;
    if(!insertionTarget)return;
    let topline=document.querySelector('.school-topline');
    if(!topline){
      topline=document.createElement('div');
      topline.className='school-topline';
      insertionTarget.parentNode.insertBefore(topline,insertionTarget);
    }
    topline.innerHTML='<span>LEARN <i>•</i> GROW <i>•</i> ACHIEVE</span><span>A caring school community for curious minds</span>';
    const links=navItems.map(function(item){
      const active=isActive(item.href);
      return '<a href="'+item.href+'"'+(active?' class="active" aria-current="page"':'')+'>'+item.label+'</a>';
    }).join('');
    const headerMarkup=
      '<header class="site-header shared-site-header">'+
        '<div class="site-header-inner">'+
          '<a class="brand" href="/" aria-label="Laff British Montessori School home">'+
            '<span class="brand-mark"><img src="'+schoolLogo+'" alt=""></span>'+
            '<span class="brand-copy"><strong>LAFF BRITISH</strong><small>MONTESSORI SCHOOL</small></span>'+
          '</a>'+
          '<nav class="site-nav" aria-label="Main navigation">'+links+'</nav>'+
          '<div class="header-actions">'+
            '<a class="header-portal-link" href="'+portalUrl+'" target="_blank" rel="noopener noreferrer">Student Portal <span aria-hidden="true">↗</span></a>'+
            '<button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="public-nav-overlay"><span></span><span></span><span></span></button>'+
          '</div>'+
        '</div>'+
      '</header>';
    if(oldHeader)oldHeader.outerHTML=headerMarkup;
    else insertionTarget.insertAdjacentHTML('beforebegin',headerMarkup);
  }
  mountSharedHeader();

  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');
  if(menu&&nav&&!document.querySelector('.public-nav-overlay')){
    const css=document.createElement('style');
    css.id='public-shared-nav-style';
    css.textContent=[
      '@media(max-width:980px){',
        '.site-header{position:sticky!important;top:0!important;z-index:200!important}',
        '.site-header .menu-toggle{display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:44px;height:44px;padding:0;border:1px solid #dce7f3;border-radius:14px;background:#f4f8ff;color:#10213a;cursor:pointer}',
        '.site-header .menu-toggle span{display:block;width:18px;height:2px;border-radius:3px;background:#0757b8;transition:transform .2s,opacity .2s}',
        '.site-header .menu-toggle[aria-expanded="true"] span:first-child{transform:translateY(7px) rotate(45deg)}',
        '.site-header .menu-toggle[aria-expanded="true"] span:nth-child(2){opacity:0}',
        '.site-header .menu-toggle[aria-expanded="true"] span:last-child{transform:translateY(-7px) rotate(-45deg)}',
        '.site-header .site-nav{display:none!important}',
        '.public-nav-overlay{position:fixed;inset:0;z-index:9990;background:rgba(5,23,48,.5);opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s ease;backdrop-filter:blur(3px)}',
        '.public-nav-overlay.open{opacity:1;visibility:visible}',
        '.public-nav-drawer{position:absolute;top:0;right:0;width:min(370px,90vw);height:100%;background:#fff;box-shadow:-18px 0 55px rgba(7,24,46,.2);transform:translateX(105%);transition:transform .28s cubic-bezier(.2,.8,.2,1);padding:88px 22px 28px;overflow-y:auto}',
        '.public-nav-overlay.open .public-nav-drawer{transform:translateX(0)}',
        '.public-nav-drawer .drawer-brand{display:flex;align-items:center;gap:12px;padding:0 6px 22px;margin-bottom:16px;border-bottom:1px solid #e6edf6;color:#10213a;font-weight:900;line-height:1.1}',
        '.public-nav-drawer .drawer-brand img{width:48px;height:48px;border-radius:15px;object-fit:contain;padding:3px;background:#fff;border:1px solid #e2ebf5}',
        '.public-nav-drawer .drawer-brand span{display:grid;gap:3px}',
        '.public-nav-drawer .drawer-brand small{font-size:10px;font-weight:750;letter-spacing:.07em;color:#6e829a}',
        '.public-nav-drawer a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 15px;margin:5px 0;border-radius:13px;color:#254566;text-decoration:none;font-weight:800;transition:background .18s,color .18s}',
        '.public-nav-drawer a:hover,.public-nav-drawer a.active{background:#edf5ff;color:#0757b8}',
        '.public-nav-drawer a.drawer-result{background:#fff4bd;color:#18385f;margin-top:14px}',
        '.public-nav-drawer .drawer-portal{display:flex;justify-content:center;margin-top:18px;padding:15px 18px;border-radius:999px;background:#0757b8;color:#fff;font-weight:900}',
        '.public-nav-close{position:absolute;top:20px;right:18px;border:0;background:#f1f6fc;color:#16375e;width:42px;height:42px;border-radius:50%;font-size:25px;cursor:pointer}',
        'body.nav-open{overflow:hidden}',
      '}',
      '@media(min-width:981px){.public-nav-overlay{display:none!important}}',
      '@media(prefers-reduced-motion:reduce){.public-nav-overlay,.public-nav-drawer,.site-header .menu-toggle span{transition:none!important}}'
    ].join('');
    document.head.appendChild(css);
    const overlay=document.createElement('div');
    overlay.className='public-nav-overlay';
    overlay.id='public-nav-overlay';
    overlay.innerHTML='<aside class="public-nav-drawer" aria-label="Mobile navigation"><button class="public-nav-close" type="button" aria-label="Close navigation">×</button><div class="drawer-brand"><img src="'+schoolLogo+'" alt=""><span>LAFF BRITISH<small>MONTESSORI SCHOOL</small></span></div><div class="drawer-links"></div><a class="drawer-portal" href="'+portalUrl+'" target="_blank" rel="noopener noreferrer">Open Student Portal ↗</a></aside>';
    document.body.appendChild(overlay);
    const links=overlay.querySelector('.drawer-links');
    nav.querySelectorAll('a').forEach(function(original){
      const a=original.cloneNode(true);
      if(original.classList.contains('active'))a.classList.add('active');
      if((original.getAttribute('href')||'').includes('result'))a.classList.add('drawer-result');
      links.appendChild(a);
    });
    const close=function(){
      overlay.classList.remove('open');
      menu.setAttribute('aria-expanded','false');
      menu.setAttribute('aria-label','Open navigation');
      document.body.classList.remove('nav-open');
    };
    const open=function(){
      overlay.classList.add('open');
      menu.setAttribute('aria-expanded','true');
      menu.setAttribute('aria-label','Close navigation');
      document.body.classList.add('nav-open');
    };
    menu.setAttribute('aria-expanded','false');
    menu.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      overlay.classList.contains('open')?close():open();
    });
    overlay.querySelector('.public-nav-close').addEventListener('click',close);
    overlay.addEventListener('click',function(e){if(e.target===overlay)close();});
    overlay.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }

  if(document.querySelector('main')&&!document.querySelector('.public-access-strip')){const strip=document.createElement('section');strip.className='public-access-strip';strip.innerHTML=`<div><h2>Student access, made simple.</h2><p>Sign in to the private student portal or check published results online.</p></div><div class="actions"><a href="${portalUrl}" target="_blank" rel="noopener">🎓 Open Student Portal</a><a class="alt" href="/result/">▣ Check Result</a></div>`;document.querySelector('main').appendChild(strip);}

  if(document.querySelector('.home-upgrade')&&!document.querySelector('.student-portal-modal')){
    const modal=document.createElement('div');
    modal.className='student-portal-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-labelledby','student-portal-title');
    modal.innerHTML=`<div class="student-portal-card">
      <button class="student-portal-close" type="button" aria-label="Close student portal popup">×</button>
      <div class="student-portal-preview" aria-hidden="true">
        <div class="student-portal-topline"><span>Laff British Montessori School</span><span>Student Access</span></div>
        <div class="student-portal-preview-main">
          <div class="student-portal-logo"><img src="${schoolLogo}" alt=""></div>
          <div><small>WELCOME TO THE</small><strong>Student Portal</strong><span>Your online space for school access, results and student services.</span></div>
        </div>
        <div class="student-portal-ui"><span><i>01</i>Dashboard</span><span><i>02</i>Results</span><span><i>03</i>Services</span></div>
        <span class="student-portal-visit-label">VISIT THE STUDENT PORTAL ↗</span>
      </div>
      <div class="student-portal-copy">
        <span class="student-portal-kicker">Student Portal</span>
        <h2 id="student-portal-title">Visit the <em>Student Portal.</em></h2>
        <p>Students and families can sign in to the dedicated portal for their online school experience.</p>
        <div class="student-portal-actions">
          <a class="student-portal-visit" href="${portalUrl}" target="_blank" rel="noopener">🎓 Visit Student Portal ↗</a>
          <button class="student-portal-continue" type="button">Continue to website</button>
        </div>
      </div>
    </div>`;
    document.body.appendChild(modal);
    const closePortal=()=>{modal.classList.remove('open');document.body.classList.remove('portal-modal-open');};
    const openPortal=()=>{modal.classList.add('open');document.body.classList.add('portal-modal-open');setTimeout(()=>modal.querySelector('.student-portal-close')?.focus(),120);};
    modal.querySelector('.student-portal-close').addEventListener('click',closePortal);
    modal.querySelector('.student-portal-continue').addEventListener('click',closePortal);
    modal.addEventListener('click',e=>{if(e.target===modal)closePortal();});
    modal.querySelector('.student-portal-visit').addEventListener('click',()=>setTimeout(closePortal,0));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closePortal();});
    const launch=()=>{if(window.__studentPortalPromptShown)return;window.__studentPortalPromptShown=true;setTimeout(openPortal,750);};
    if(document.readyState==='complete')launch();else window.addEventListener('load',launch,{once:true});
  }

  document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('tel:')||a.target==='_blank')return;a.addEventListener('click',e=>{if(e.defaultPrevented)return;e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.href=href,160);});});
  const revealImage=img=>{if(img.dataset.generationStarted)return;img.dataset.generationStarted='true';const holder=img.parentElement,g=holder?.querySelector('.home-generating'),status=holder?.querySelector('.photo-status');let done=false;const reveal=()=>{if(done||!img.naturalWidth)return;done=true;setTimeout(()=>{img.classList.add('image-ready');setTimeout(()=>g?.classList.add('done'),380);if(status){status.textContent='Image ready ✓';setTimeout(()=>status.style.opacity='0',450);}},650);};img.addEventListener('load',reveal,{once:true});img.addEventListener('error',()=>{g?.classList.add('done');if(status)status.textContent='Image unavailable';},{once:true});if(img.complete)reveal();};
  document.querySelectorAll('.home-real-image').forEach(revealImage);document.querySelectorAll('.photo-loader img').forEach(img=>{const holder=img.parentElement,status=holder?.querySelector('.photo-status')||holder?.querySelector('span'),finish=()=>{holder?.classList.add('loaded');if(status){status.textContent='Image ready ✓';setTimeout(()=>status.style.opacity='0',450);}};if(img.complete&&img.naturalWidth)finish();else img.addEventListener('load',finish,{once:true});img.addEventListener('error',()=>{if(status)status.textContent='Image unavailable';},{once:true});});
  if(document.querySelector('.home-hero')&&!document.querySelector('script[data-home-slider]')){const s=document.createElement('script');s.src='assets/home-slider.js?v=2';s.dataset.homeSlider='true';document.body.appendChild(s);}
  const heroSlideshowImages=[
    {src:'assets/gallery/school-01.jpg',alt:'Learner exploring a textured number during a hands-on activity',tag:'Curiosity begins here',title:'Learning by doing.',subtitle:'Practical experiences for curious young minds.'},
    {src:'assets/gallery/school-03.jpg',alt:'Learner raising a hand and participating in class',tag:'Confidence in class',title:'Every voice can grow.',subtitle:'Encouraging questions, ideas and discovery.'},
    {src:'assets/gallery/school-05.jpg',alt:'Pupil carefully working in a school workbook',tag:'Focused learning',title:'Small steps. Strong foundations.',subtitle:'Building concentration and positive learning habits.'},
    {src:'assets/gallery/school-06.jpg',alt:'Smiling learner holding a textured numeral',tag:'Joyful discovery',title:'Learning can be joyful.',subtitle:'Making new ideas memorable through experience.'},
    {src:'assets/gallery/school-07.jpg',alt:'Child participating in a classroom lesson',tag:'Ready to participate',title:'Curiosity opens doors.',subtitle:'Helping children share ideas with confidence.'},
    {src:'assets/gallery/school-08.jpg',alt:'Learner concentrating on a workbook activity',tag:'Growing independence',title:'Proud of every step.',subtitle:'Developing care, practice and self-belief.'},
    {src:'assets/gallery/school-09.jpg',alt:'Two learners studying alongside one another',tag:'Growing together',title:'Learning side by side.',subtitle:'A school community where children grow together.'},
    {src:'assets/gallery/school-10.jpg',alt:'Young learner reading and practising independently',tag:'Learning with purpose',title:'Confidence grows each day.',subtitle:'Building focus and independence one task at a time.'},
    {src:'assets/gallery/school-11.jpg',alt:'Child confidently raising a hand during a lesson',tag:'A voice in the classroom',title:'Brave to ask. Ready to learn.',subtitle:'Supporting participation, communication and growth.'}
  ];
  const heroMainImage=document.querySelector('.front-photo-main img');
  const heroSmallImage=document.querySelector('.front-photo-small img');
  const heroMainCard=document.querySelector('.front-photo-main');
  if(heroMainImage&&heroSmallImage&&heroMainCard&&!heroMainImage.dataset.slideshowReady){
    heroMainImage.dataset.slideshowReady='true';
    let activeSlide=0;
    let slideshowTimer=null;
    const photoLabel=heroMainCard.querySelector('.front-photo-label');
    const photoTag=photoLabel?.querySelector('span');
    const photoTitle=photoLabel?.querySelector('strong');
    const photoSubtitle=photoLabel?.querySelector('small');
    const controls=document.createElement('div');
    controls.className='front-photo-controls';
    controls.setAttribute('aria-label','Featured school photographs');
    controls.innerHTML='<button class="front-slide-arrow" type="button" data-slide-prev aria-label="Previous school photo">‹</button><div class="front-slide-dots" role="group" aria-label="Choose a school photo"></div><button class="front-slide-arrow" type="button" data-slide-next aria-label="Next school photo">›</button>';
    heroMainCard.appendChild(controls);
    const dotsWrap=controls.querySelector('.front-slide-dots');
    heroSlideshowImages.forEach(function(slide,index){
      const dot=document.createElement('button');
      dot.type='button';dot.className='front-slide-dot';dot.setAttribute('aria-label','Show school photo '+(index+1));
      dot.addEventListener('click',function(){showSlide(index,true);});
      dotsWrap.appendChild(dot);
      const preload=new Image();preload.src=slide.src;
    });
    function swapPhoto(img,slide,fade){
      if(fade)img.classList.add('is-changing');
      const finish=function(){img.classList.remove('is-changing');};
      img.addEventListener('load',finish,{once:true});
      img.addEventListener('error',finish,{once:true});
      img.src=slide.src;img.alt=slide.alt;
      if(img.complete&&img.naturalWidth)finish();
    }
    function showSlide(index,fade){
      activeSlide=(index+heroSlideshowImages.length)%heroSlideshowImages.length;
      const mainSlide=heroSlideshowImages[activeSlide];
      const smallSlide=heroSlideshowImages[(activeSlide+6)%heroSlideshowImages.length];
      if(heroMainImage.getAttribute('src')!==mainSlide.src)swapPhoto(heroMainImage,mainSlide,fade);else heroMainImage.alt=mainSlide.alt;
      if(heroSmallImage.getAttribute('src')!==smallSlide.src)swapPhoto(heroSmallImage,smallSlide,fade);else heroSmallImage.alt=smallSlide.alt;
      if(photoTag)photoTag.textContent=mainSlide.tag;
      if(photoTitle)photoTitle.textContent=mainSlide.title;
      if(photoSubtitle)photoSubtitle.textContent=mainSlide.subtitle;
      dotsWrap.querySelectorAll('.front-slide-dot').forEach(function(dot,dotIndex){
        const selected=dotIndex===activeSlide;
        dot.classList.toggle('active',selected);
        if(selected)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');
      });
      controls.setAttribute('aria-label','Featured school photo '+(activeSlide+1)+' of '+heroSlideshowImages.length);
    }
    function stopSlideshow(){if(slideshowTimer){clearInterval(slideshowTimer);slideshowTimer=null;}}
    function startSlideshow(){
      stopSlideshow();
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      slideshowTimer=setInterval(function(){if(!document.hidden)showSlide(activeSlide+1,true);},5000);
    }
    controls.querySelector('[data-slide-prev]').addEventListener('click',function(){showSlide(activeSlide-1,true);startSlideshow();});
    controls.querySelector('[data-slide-next]').addEventListener('click',function(){showSlide(activeSlide+1,true);startSlideshow();});
    heroMainCard.addEventListener('mouseenter',stopSlideshow);
    heroMainCard.addEventListener('mouseleave',startSlideshow);
    heroMainCard.addEventListener('focusin',stopSlideshow);
    heroMainCard.addEventListener('focusout',startSlideshow);
    document.addEventListener('visibilitychange',function(){if(document.hidden)stopSlideshow();else startSlideshow();});
    showSlide(0,false);startSlideshow();
  }

  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();window.addEventListener('error',()=>loader?.classList.add('done'));
})();
