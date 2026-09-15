(() => {
  const hero = document.querySelector('.home-hero');
  if (!hero || hero.dataset.sliderMounted) return;
  hero.dataset.sliderMounted = 'true';
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'assets/home-slider.css?v=1';
  document.head.appendChild(css);

  const slides = [
    { image:'assets/gallery/school-01.jpg', alt:'Young learner exploring a large textured yellow number during hands-on early mathematics learning', eyebrow:'Welcome to', title:'Laff British', accent:'Montessori School', heading:'Building Bright Futures Through Quality Education, Care and Character.', text:'We provide a safe, nurturing and stimulating environment where every child is valued, inspired and empowered to reach their full potential.' },
    { image:'assets/gallery/school-05.jpg', alt:'Young learner concentrating on workbook activities in the classroom', eyebrow:'Learning in Action', title:'Curious Minds', accent:'Confident Learners', heading:'Helping Every Child Discover, Explore and Grow.', text:'Our classrooms encourage curiosity, concentration and practical learning, helping children build confidence while developing strong academic foundations.' },
    { image:'assets/gallery/school-07.jpg', alt:'Young learner confidently raising a hand during a classroom lesson', eyebrow:'Growing Together', title:'Every Voice', accent:'Every Child Matters', heading:'A School Where Children Are Encouraged to Be Heard.', text:'We nurture confident participation, kindness and independence so every learner can express ideas, ask questions and take an active part in school life.' },
    { image:'assets/gallery/school-09.jpg', alt:'Two young learners working together with books during classroom study', eyebrow:'School Life', title:'Learn. Grow.', accent:'Achieve Together.', heading:'Building Character Through Learning and Community.', text:'From collaborative classroom work to everyday moments of discovery, we help children develop the skills, values and confidence they need for the future.' }
  ];

  hero.innerHTML = `<div class="home-slider" aria-label="Laff British Montessori School highlights"><div class="home-slides"></div><div class="home-slider-doodles" aria-hidden="true"><span class="doodle-plane">➤</span><span class="doodle-star">☆</span><span class="doodle-scribble">〰</span></div><div class="home-slider-controls"><button class="slider-arrow slider-prev" type="button" aria-label="Previous slide">↑</button><div class="slider-dots" aria-label="Choose slide"></div><button class="slider-arrow slider-next" type="button" aria-label="Next slide">↓</button></div></div>`;
  const slidesEl = hero.querySelector('.home-slides'), dotsEl = hero.querySelector('.slider-dots');
  const generating = () => `<div class="slider-generating"><div class="slider-ring"></div><strong>Generating image…</strong><small>Preparing school photography</small><div class="slider-progress"><span></span></div><div class="slider-steps"><span>Preparing image… ✓</span><span>Drawing elements… ✓</span><span>Adding school details… ✓</span><span>Rendering…</span><span>Finalising…</span></div></div>`;

  slides.forEach((s,i)=>{
    const article=document.createElement('article'); article.className=`home-slide${i===0?' is-active':''}`; article.dataset.index=i;
    article.innerHTML=`<div class="slider-photo"><div class="slider-image-loading">${generating()}</div><img src="${s.image}" alt="${s.alt}"></div><div class="slider-overlay"></div><div class="slider-copy"><span class="eyebrow">${s.eyebrow}</span><h1>${s.title}<br><em>${s.accent}</em></h1><h2>${s.heading}</h2><p>${s.text}</p><div class="hero-actions"><a class="btn primary" href="about.html">Learn More →</a><a class="btn ghost" href="result.html">🎓 Check Result</a></div></div>`;
    slidesEl.appendChild(article);
    const dot=document.createElement('button'); dot.type='button'; dot.className=`slider-dot${i===0?' active':''}`; dot.setAttribute('aria-label',`Show slide ${i+1}`); dot.dataset.index=i; dotsEl.appendChild(dot);
  });

  let current=0,busy=false,timer;
  const allSlides=[...hero.querySelectorAll('.home-slide')], dots=[...hero.querySelectorAll('.slider-dot')];
  const show=(next,direction='next')=>{
    if(busy||next===current||next<0||next>=allSlides.length)return; busy=true;
    const old=allSlides[current], incoming=allSlides[next];
    old.classList.remove('is-active'); old.classList.add(direction==='next'?'slide-out-up':'slide-out-down');
    incoming.classList.remove('slide-out-up','slide-out-down'); incoming.classList.add(direction==='next'?'slide-in-up':'slide-in-down');
    incoming.querySelector('.slider-image-loading')?.classList.remove('is-done'); dots.forEach((d,i)=>d.classList.toggle('active',i===next)); current=next;
    setTimeout(()=>{allSlides.forEach((s,i)=>{if(i!==current)s.classList.remove('slide-out-up','slide-out-down')});incoming.classList.remove('slide-in-up','slide-in-down');incoming.classList.add('is-active');busy=false},760);
  };
  const restart=()=>{clearInterval(timer);timer=setInterval(()=>show((current+1)%allSlides.length,'next'),6500)};
  hero.querySelector('.slider-next').addEventListener('click',()=>{show((current+1)%allSlides.length,'next');restart()});
  hero.querySelector('.slider-prev').addEventListener('click',()=>{show((current-1+allSlides.length)%allSlides.length,'prev');restart()});
  dots.forEach(d=>d.addEventListener('click',()=>{const n=Number(d.dataset.index);show(n,n>current?'next':'prev');restart()}));
  hero.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:'))return;e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.href=href,220)}));

  allSlides.forEach(slide=>{const img=slide.querySelector('img'),loading=slide.querySelector('.slider-image-loading');const reveal=()=>setTimeout(()=>{if(img.naturalWidth){img.classList.add('image-ready');setTimeout(()=>loading?.classList.add('is-done'),420)}},1050);if(img.complete)reveal();else img.addEventListener('load',reveal,{once:true});img.addEventListener('error',()=>loading?.classList.add('is-done'),{once:true})});
  let touchStartY=0; hero.addEventListener('touchstart',e=>{touchStartY=e.changedTouches[0].clientY},{passive:true}); hero.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientY-touchStartY;if(Math.abs(delta)<45)return;if(delta<0)show((current+1)%allSlides.length,'next');else show((current-1+allSlides.length)%allSlides.length,'prev');restart()},{passive:true});
  restart();
})();
