(() => {
  const mainImage = document.querySelector('.front-photo-main img');
  const insetImage = document.querySelector('.front-photo-small img');
  const caption = document.querySelector('.front-photo-label');
  if (!mainImage || !insetImage || !caption || mainImage.dataset.rotating === 'true') return;
  mainImage.dataset.rotating = 'true';

  const base = '/assets/gallery/';
  const slides = [
    {main:'school-01.jpg', inset:'school-09.jpg', alt:'Young learner exploring a textured number during a hands-on learning activity', tag:'Curiosity begins here', title:'Learning by doing.<br>Growing with confidence.', note:'Practical experiences for curious young minds.'},
    {main:'school-03.jpg', inset:'school-08.jpg', alt:'Learner raising a hand and taking part in a classroom lesson', tag:'Every voice matters', title:'Confidence grows.<br>Ideas take shape.', note:'Children are encouraged to ask, share and discover.'},
    {main:'school-04.jpg', inset:'school-10.jpg', alt:'Child exploring colourful early-years learning materials', tag:'Discovery every day', title:'Little hands.<br>Big discoveries.', note:'Purposeful activity helps curiosity grow.'},
    {main:'school-05.jpg', inset:'school-11.jpg', alt:'Pupil concentrating on workbook learning at a classroom table', tag:'Focus builds skills', title:'One step at a time.<br>Progress that lasts.', note:'Practice helps strong learning habits take root.'},
    {main:'school-06.jpg', inset:'school-03.jpg', alt:'Smiling learner holding a large textured numeral during a classroom activity', tag:'Joyful learning', title:'Making learning<br>memorable.', note:'Hands-on discovery brings ideas to life.'},
    {main:'school-07.jpg', inset:'school-04.jpg', alt:'Child raising a hand confidently during a classroom lesson', tag:'Find your voice', title:'Every idea has<br>a place here.', note:'Participation helps confidence grow.'},
    {main:'school-08.jpg', inset:'school-05.jpg', alt:'Learner carefully working through a workbook', tag:'Practice makes progress', title:'Building focus.<br>Growing independence.', note:'Careful work develops confidence and persistence.'},
    {main:'school-09.jpg', inset:'school-06.jpg', alt:'Two learners working side by side with books and writing materials', tag:'Learning together', title:'Growing side by side.<br>Achieving together.', note:'Shared experiences help children learn from one another.'},
    {main:'school-10.jpg', inset:'school-07.jpg', alt:'Young learner reading and concentrating on an open workbook', tag:'Independent learning', title:'Curious minds.<br>Confident steps.', note:'Reading and regular practice open new possibilities.'},
    {main:'school-11.jpg', inset:'school-01.jpg', alt:'Child confidently raising a hand during a classroom lesson', tag:'Ready to participate', title:'Speak up.<br>Reach higher.', note:'Every learner deserves a chance to be heard.'}
  ];

  const style = document.createElement('style');
  style.textContent = '.front-photo-main img,.front-photo-small img{transition:opacity .32s ease,transform .65s ease}.front-photo-main img.front-image-fading,.front-photo-small img.front-image-fading{opacity:0!important}';
  document.head.appendChild(style);

  const preload = src => new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
  const setCaption = slide => {
    const tag = caption.querySelector('span');
    const title = caption.querySelector('strong');
    const note = caption.querySelector('small');
    if (tag) tag.textContent = slide.tag;
    if (title) title.innerHTML = slide.title;
    if (note) note.textContent = slide.note;
  };

  let current = 0;
  const existingSrc = mainImage.getAttribute('src') || '';
  const found = slides.findIndex(slide => existingSrc.endsWith(slide.main));
  if (found >= 0) current = found;

  let changing = false;
  async function showSlide(index) {
    if (changing) return;
    changing = true;
    const slide = slides[index];
    await Promise.all([preload(base + slide.main), preload(base + slide.inset)]);
    mainImage.classList.add('front-image-fading');
    insetImage.classList.add('front-image-fading');
    window.setTimeout(() => {
      mainImage.src = base + slide.main;
      mainImage.alt = slide.alt;
      insetImage.src = base + slide.inset;
      insetImage.alt = 'More moments of learning at Laff British Montessori School';
      setCaption(slide);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        mainImage.classList.remove('front-image-fading');
        insetImage.classList.remove('front-image-fading');
        changing = false;
      }));
    }, 340);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduceMotion.matches) {
    window.setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);
  }
})();