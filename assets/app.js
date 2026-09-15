(() => {
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const loader=document.getElementById('site-loader'), loaderText=document.getElementById('loader-text');
  if(loader){
    const steps=['Creating the page…','Drawing the layout…','Loading school experience…','Adding the finishing touches…','Page ready ✓']; let i=0;
    const timer=setInterval(()=>{if(loaderText)loaderText.textContent=steps[Math.min(++i,steps.length-1)];},420);
    const finish=()=>{clearInterval(timer);if(loaderText)loaderText.textContent='Page ready ✓';loader.classList.add('done');document.body.classList.add('page-ready');};
    window.addEventListener('load',()=>setTimeout(finish,350),{once:true}); setTimeout(finish,5000);
  }
  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');
  if(menu&&nav){menu.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))nav.classList.remove('open');});}
  document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('tel:'))return;a.addEventListener('click',e=>{e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.href=href,180);});});
  const revealImage=img=>{if(img.dataset.generationStarted)return;img.dataset.generationStarted='true';const holder=img.parentElement,g=holder?.querySelector('.home-generating'),status=holder?.querySelector('.photo-status');let done=false;const reveal=()=>{if(done||!img.naturalWidth)return;done=true;setTimeout(()=>{img.classList.add('image-ready');setTimeout(()=>g?.classList.add('done'),380);if(status){status.textContent='Image ready ✓';status.style.opacity='0';}},650);};img.addEventListener('load',reveal,{once:true});img.addEventListener('error',()=>{g?.classList.add('done');if(status)status.textContent='Image unavailable';},{once:true});if(img.complete)reveal();};
  document.querySelectorAll('.home-real-image').forEach(revealImage);
  document.querySelectorAll('.photo-loader img').forEach(img=>{const holder=img.parentElement,status=holder?.querySelector('.photo-status')||holder?.querySelector('span'),finish=()=>{holder?.classList.add('loaded');if(status){status.textContent='Image ready ✓';setTimeout(()=>status.style.opacity='0',450);}};if(img.complete&&img.naturalWidth)finish();else img.addEventListener('load',finish,{once:true});img.addEventListener('error',()=>{if(status)status.textContent='Image unavailable';},{once:true});});
  if(document.querySelector('.home-hero')&&!document.querySelector('script[data-home-slider]')){const s=document.createElement('script');s.src='assets/home-slider.js?v=2';s.dataset.homeSlider='true';document.body.appendChild(s);}
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
  window.addEventListener('error',()=>loader?.classList.add('done'));
})();
