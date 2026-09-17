(() => {
  const loader=document.getElementById('site-loader'), loaderText=document.getElementById('loader-text');
  if(loader){
    const steps=['Creating the page…','Drawing the layout…','Loading school experience…','Adding the finishing touches…','Page ready ✓']; let i=0;
    const timer=setInterval(()=>{if(loaderText)loaderText.textContent=steps[Math.min(++i,steps.length-1)];},420);
    const finish=()=>{clearInterval(timer);if(loaderText)loaderText.textContent='Page ready ✓';loader.classList.add('done');document.body.classList.add('page-ready');};
    window.addEventListener('load',()=>setTimeout(finish,350),{once:true}); setTimeout(finish,5000);
  }

  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');
  if(menu&&nav){
    const css=document.createElement('style');css.textContent=`
      @media(max-width:860px){.site-header{position:sticky!important;top:0!important;z-index:80!important}.menu-toggle{display:grid!important;place-items:center;width:46px;height:46px;padding:0;border:0;background:transparent;color:#10213a;font-size:27px;line-height:1;cursor:pointer;position:relative;z-index:92}.site-nav{display:none!important}.public-nav-overlay{position:fixed;inset:0;z-index:90;background:rgba(7,24,46,.5);opacity:0;visibility:hidden;transition:opacity .25s ease,visibility .25s ease}.public-nav-overlay.open{opacity:1;visibility:visible}.public-nav-drawer{position:absolute;top:0;right:0;width:min(330px,88vw);height:100%;background:#fff;box-shadow:-18px 0 55px rgba(7,24,46,.22);transform:translateX(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);padding:88px 22px 28px;overflow-y:auto}.public-nav-overlay.open .public-nav-drawer{transform:translateX(0)}.public-nav-drawer .drawer-brand{display:flex;align-items:center;gap:12px;padding:0 6px 22px;margin-bottom:12px;border-bottom:1px solid #e6ebf2;color:#10213a;font-weight:900;line-height:1.05}.public-nav-drawer .drawer-brand img{width:48px;height:48px;border-radius:50%;object-fit:cover}.public-nav-drawer a{display:flex;align-items:center;gap:12px;padding:14px 15px;margin:5px 0;border-radius:12px;color:#10213a;font-weight:800;transition:.2s ease}.public-nav-drawer a:hover,.public-nav-drawer a.active{background:#edf5ff;color:#0b5ed7;transform:translateX(3px)}.public-nav-drawer a.drawer-result{background:#f4c20d;color:#10213a;margin-top:14px}.public-nav-close{position:absolute;top:20px;right:18px;border:0;background:#f4f7fb;color:#10213a;width:40px;height:40px;border-radius:50%;font-size:24px;cursor:pointer}body.nav-open{overflow:hidden}.public-access-actions{display:none}}@media(min-width:861px){.public-nav-overlay{display:none!important}}
      .public-access-actions{display:flex;align-items:center;gap:8px;margin-left:auto}.public-access-actions a{display:inline-flex!important;align-items:center;justify-content:center;gap:7px;padding:9px 13px;border-radius:999px!important;font-size:12px!important;font-weight:900!important;text-decoration:none!important;white-space:nowrap}.public-access-actions .portal{background:#0b5ed7;color:#fff!important}.public-access-actions .result{background:#f4c20d;color:#10213a!important}
      .public-access-strip{background:#f4c20d;color:#10213a;padding:24px clamp(18px,5vw,70px);display:flex;align-items:center;justify-content:space-between;gap:24px}.public-access-strip h2{margin:0 0 4px;font-size:24px;color:#10213a}.public-access-strip p{margin:0;color:#30415a;font-size:13px;max-width:620px}.public-access-strip .actions{display:flex;gap:10px;flex-wrap:wrap}.public-access-strip a{display:inline-flex;align-items:center;justify-content:center;padding:12px 18px;border-radius:999px;background:#0b5ed7;color:#fff;font-weight:900;text-decoration:none}.public-access-strip a.alt{background:#fff;color:#0b5ed7}@media(max-width:860px){.public-access-strip{flex-direction:column;align-items:flex-start}.public-access-strip .actions{width:100%}.public-access-strip a{flex:1}}
      .student-portal-modal{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:22px;background:rgba(3,17,35,.74);backdrop-filter:blur(8px);opacity:0;visibility:hidden;transition:opacity .25s ease,visibility .25s ease}
      .student-portal-modal.open{opacity:1;visibility:visible}
      .student-portal-card{width:min(920px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto;display:grid;grid-template-columns:1.08fr .92fr;background:#fff;border-radius:32px;box-shadow:0 35px 100px rgba(0,0,0,.32);position:relative;overflow:hidden}
      .student-portal-preview{padding:24px;background:linear-gradient(135deg,#06366f 0%,#0757b8 58%,#0c3368 100%);position:relative;min-height:410px;display:flex;flex-direction:column;justify-content:space-between;color:#fff}
      .student-portal-preview:before{content:'';position:absolute;width:280px;height:280px;border-radius:50%;border:1px solid rgba(255,255,255,.12);right:-110px;top:-90px;box-shadow:0 0 0 28px rgba(255,255,255,.03),0 0 0 58px rgba(255,210,28,.025)}
      .student-portal-topline{display:flex;justify-content:space-between;gap:12px;font-size:.63rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#d8e8fa;position:relative;z-index:1}
      .student-portal-preview-main{display:flex;align-items:center;gap:16px;position:relative;z-index:1}
      .student-portal-logo{width:84px;height:84px;border-radius:24px;background:#fff;display:grid;place-items:center;padding:10px;box-shadow:0 18px 35px rgba(1,20,45,.25);flex:0 0 84px}
      .student-portal-logo img{width:100%;height:100%;object-fit:contain}
      .student-portal-preview-main small{display:block;color:#d7e8fb;font-size:.62rem;font-weight:800;letter-spacing:.08em}
      .student-portal-preview-main strong{display:block;font-size:clamp(1.8rem,4vw,3.2rem);line-height:.96;margin:6px 0;color:#fff;letter-spacing:-.05em}
      .student-portal-preview-main span{display:block;color:#cde0f5;font-size:.7rem;line-height:1.5}
      .student-portal-ui{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;position:relative;z-index:1}
      .student-portal-ui span{padding:13px;border-radius:13px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.12);font-size:.58rem;font-weight:900}
      .student-portal-ui i{display:block;font-style:normal;color:#ffd21c;margin-bottom:4px;font-size:.55rem}
      .student-portal-visit-label{align-self:flex-start;position:relative;z-index:1;padding:9px 12px;border-radius:999px;background:#ffd21c;color:#05356d;font-size:.65rem;font-weight:950;letter-spacing:.06em;text-transform:uppercase}
      .student-portal-copy{padding:44px 40px;display:flex;flex-direction:column;justify-content:center}
      .student-portal-kicker{display:inline-flex;align-self:flex-start;padding:7px 11px;border-radius:999px;background:#fff5bd;color:#6b5100;font-size:.63rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
      .student-portal-copy h2{margin:14px 0 10px;font-size:clamp(2.1rem,4vw,4rem);line-height:.98;letter-spacing:-.055em;color:#063f83}
      .student-portal-copy h2 em{font-style:normal;color:#0757b8}
      .student-portal-copy p{margin:0;color:#627792;line-height:1.7;font-size:.9rem;max-width:430px}
      .student-portal-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:24px}
      .student-portal-visit{display:inline-flex;align-items:center;justify-content:center;padding:14px 20px;border-radius:999px;background:#ffd21c;color:#063f83;font-size:.76rem;font-weight:950;text-decoration:none;box-shadow:0 13px 28px rgba(255,210,28,.26)}
      .student-portal-continue{border:1px solid #dce6f0;background:#f7fbff;color:#0b4f97;padding:13px 17px;border-radius:999px;font:inherit;font-size:.74rem;font-weight:900;cursor:pointer}
      .student-portal-close{position:absolute;top:15px;right:15px;z-index:3;width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.94);color:#16375e;font-size:25px;line-height:1;cursor:pointer;box-shadow:0 10px 24px rgba(2,24,49,.16)}
      .student-portal-card a,.student-portal-card button{transition:transform .2s ease,box-shadow .2s ease}
      .student-portal-card a:hover,.student-portal-card button:hover{transform:translateY(-2px)}
      body.portal-modal-open{overflow:hidden}
      @media(max-width:760px){.student-portal-card{grid-template-columns:1fr;width:min(560px,calc(100vw - 24px));border-radius:24px}.student-portal-preview{min-height:330px;padding:20px}.student-portal-copy{padding:30px 24px 28px}.student-portal-copy h2{font-size:2.45rem}.student-portal-logo{width:68px;height:68px;flex-basis:68px;border-radius:19px}.student-portal-ui span{padding:10px}.student-portal-actions{display:grid;grid-template-columns:1fr}.student-portal-visit,.student-portal-continue{width:100%}}
      @media(prefers-reduced-motion:reduce){.student-portal-modal,.student-portal-card a,.student-portal-card button{transition:none}}
    `;document.head.appendChild(css);
    const overlay=document.createElement('div');overlay.className='public-nav-overlay';overlay.innerHTML='<aside class="public-nav-drawer" aria-label="Mobile navigation"><button class="public-nav-close" type="button" aria-label="Close navigation">×</button><div class="drawer-brand"><img src="https://i.ibb.co/whtP8S5v/image.png" alt="Laff British Montessori School logo"><span>LAFF BRITISH<br>MONTESSORI SCHOOL</span></div><div class="drawer-links"></div></aside>';document.body.appendChild(overlay);
    const links=overlay.querySelector('.drawer-links');nav.querySelectorAll('a').forEach(original=>{const a=original.cloneNode(true);if(original.classList.contains('active'))a.classList.add('active');if((original.getAttribute('href')||'').includes('result'))a.classList.add('drawer-result');links.appendChild(a);});
    const close=()=>{overlay.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');document.body.classList.remove('nav-open');};
    const open=()=>{overlay.classList.add('open');menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Close navigation');document.body.classList.add('nav-open');};
    menu.setAttribute('aria-expanded','false');menu.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();overlay.classList.contains('open')?close():open();});overlay.querySelector('.public-nav-close').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close();});overlay.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }

  const portalUrl='https://laff-british-school-student-portal-l8ty.onrender.com/';
  const header=document.querySelector('.site-header');
  if(header&&!header.querySelector('.public-access-actions')){const actions=document.createElement('div');actions.className='public-access-actions';actions.innerHTML=`<a class="portal" href="${portalUrl}" target="_blank" rel="noopener">🎓 Student Portal</a><a class="result" href="result.html">▣ Check Result</a>`;header.appendChild(actions);}
  if(document.querySelector('main')&&!document.querySelector('.public-access-strip')){const strip=document.createElement('section');strip.className='public-access-strip';strip.innerHTML=`<div><h2>Student access, made simple.</h2><p>Sign in to the private student portal or check published results online.</p></div><div class="actions"><a href="${portalUrl}" target="_blank" rel="noopener">🎓 Open Student Portal</a><a class="alt" href="result.html">▣ Check Result</a></div>`;document.querySelector('main').appendChild(strip);}

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
          <div class="student-portal-logo"><img src="https://i.ibb.co/whtP8S5v/image.png" alt=""></div>
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
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();window.addEventListener('error',()=>loader?.classList.add('done'));
})();
