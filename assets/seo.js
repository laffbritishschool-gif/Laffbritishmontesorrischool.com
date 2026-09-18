(() => {
  const pages = {
    '/': ['Laff British Montessori School | Learning, Character & Confidence','Official website of Laff British Montessori School — a caring Montessori school community focused on learning, character, confidence and excellence.','WebSite'],
    '/index.html': ['Laff British Montessori School | Learning, Character & Confidence','Official website of Laff British Montessori School — a caring Montessori school community focused on learning, character, confidence and excellence.','WebSite'],
    '/about.html': ['About Laff British Montessori School | Our Approach & Values','Learn about Laff British Montessori School, our Montessori-inspired approach, learning journey, values, care and commitment to children and families.','AboutPage'],
    '/contact.html': ['Contact Laff British Montessori School | Enquiries & Visits','Contact Laff British Montessori School for school enquiries, visits, admissions information and connection with our school community.','ContactPage'],
    '/gallery.html': ['School Gallery | Laff British Montessori School','Explore real school-life photographs from Laff British Montessori School, including classroom learning, early years, creativity, participation and care.','CollectionPage'],
    '/news.html': ['News & Events | Laff British Montessori School','Read news and school updates from Laff British Montessori School, including learning, creativity, classroom progress, celebrations and community moments.','CollectionPage'],
    '/result.html': ['Check Student Result | Laff British Montessori School','Use your school result serial number, PIN, academic session and term to check a published student result from Laff British Montessori School.','WebPage']
  };
  const key = location.pathname.replace(/\/+$/, '') || '/';
  const p = pages[key];
  if (!p) return;
  const url = 'https://laffbritishmontessorischool.com' + (key === '/' ? '/' : key);
  document.title = p[0];
  const setMeta = (selector, attr, name, content) => {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };
  setMeta('meta[name="description"]','name','description',p[1]);
  setMeta('meta[name="robots"]','name','robots','index,follow');
  setMeta('meta[name="author"]','name','author','Laff British Montessori School');
  setMeta('meta[property="og:title"]','property','og:title',p[0]);
  setMeta('meta[property="og:description"]','property','og:description',p[1]);
  setMeta('meta[property="og:url"]','property','og:url',url);
  setMeta('meta[property="og:type"]','property','og:type','website');
  setMeta('meta[property="og:site_name"]','property','og:site_name','Laff British Montessori School');
  setMeta('meta[property="og:image"]','property','og:image','https://i.ibb.co/whtP8S5v/image.png');
  setMeta('meta[name="twitter:card"]','name','twitter:card','summary');
  setMeta('meta[name="twitter:title"]','name','twitter:title',p[0]);
  setMeta('meta[name="twitter:description"]','name','twitter:description',p[1]);
  setMeta('meta[name="twitter:image"]','name','twitter:image','https://i.ibb.co/whtP8S5v/image.png');
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
  const graph = [
    {'@context':'https://schema.org','@type':'EducationalOrganization','name':'Laff British Montessori School','alternateName':'LAFF','url':'https://laffbritishmontessorischool.com/','logo':'https://i.ibb.co/whtP8S5v/image.png','description':'Laff British Montessori School is a caring school community focused on learning, character, confidence and excellence.'},
    {'@context':'https://schema.org','@type':p[2],'name':p[0],'url':url,'description':p[1],'isPartOf':{'@type':'WebSite','name':'Laff British Montessori School','url':'https://laffbritishmontessorischool.com/'}}
  ];
  let json = document.head.querySelector('script[data-seo-engine]');
  if (!json) {
    json = document.createElement('script');
    json.type = 'application/ld+json';
    json.dataset.seoEngine = 'true';
    document.head.appendChild(json);
  }
  json.textContent = JSON.stringify(graph);
})();
