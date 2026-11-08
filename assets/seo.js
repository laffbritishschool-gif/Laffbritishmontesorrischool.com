(() => {
  'use strict';
  const SITE = 'https://laffbritishmontessorischool.com';
  const SCHOOL = 'Laff British Montessori School';
  const LOGO = SITE + '/assets/school-logo.svg';
  const pages = {
    '/': { title: 'Laff British Montessori School | Montessori Learning in Nigeria', description: 'Discover Laff British Montessori School, a caring learning community supporting children through early years and primary education, practical learning and positive character.', type: 'WebPage', section: 'Home' },
    '/about': { title: 'About Laff British Montessori School | Our Approach & Values', description: 'Meet Laff British Montessori School. Explore our Montessori-inspired learning approach, early years and primary programmes, school values, child wellbeing and partnership with families.', type: 'AboutPage', section: 'About' },
    '/gallery': { title: 'School Gallery | Laff British Montessori School', description: 'Explore photographs of learning at Laff British Montessori School, from early-years discovery and classroom activities to creativity, participation and school community life.', type: 'CollectionPage', section: 'Gallery' },
    '/news': { title: 'School News & Events | Laff British Montessori School', description: 'Read school news and community updates from Laff British Montessori School, including classroom learning, creativity, celebrations and important school moments.', type: 'CollectionPage', section: 'News & Events' },
    '/contact': { title: 'Contact Laff British Montessori School | School Enquiries', description: 'Contact Laff British Montessori School for general enquiries, admissions information, school visits and questions about our learning community.', type: 'ContactPage', section: 'Contact' },
    '/result': { title: 'Check Student Result | Laff British Montessori School', description: 'Access the Laff British Montessori School result portal with the result serial number and PIN supplied by the school. Select the correct academic session and term.', type: 'WebPage', section: 'Student Results' }
  };
  const cleanPath = (location.pathname || '/').replace(/\\/g, '/').replace(/\/+$/, '') || '/';
  const path = cleanPath === '/index.html' ? '/' : cleanPath.replace(/\.html$/i, '') || '/';
  const page = pages[path];
  if (!page) return;
  const canonical = SITE + (path === '/' ? '/' : path + '/');
  const setMeta = (selector, attribute, key, value) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.setAttribute('content', value);
  };
  document.title = page.title;
  setMeta('meta[name="description"]', 'name', 'description', page.description);
  setMeta('meta[name="robots"]', 'name', 'robots', 'index,follow,max-image-preview:large');
  setMeta('meta[name="author"]', 'name', 'author', SCHOOL);
  setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SCHOOL);
  setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
  setMeta('meta[property="og:image"]', 'property', 'og:image', LOGO);
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_NG');
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', LOGO);
  let canonicalLink = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = canonical;
  const graph = [
    { '@context': 'https://schema.org', '@type': 'EducationalOrganization', '@id': SITE + '/#school', name: SCHOOL, alternateName: 'LAFF', url: SITE + '/', logo: LOGO, description: 'A caring school community supporting early years and primary education, practical learning, confidence and positive character.' },
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE + '/#website', name: SCHOOL, url: SITE + '/', inLanguage: 'en-NG', publisher: { '@id': SITE + '/#school' } },
    { '@context': 'https://schema.org', '@type': page.type, '@id': canonical + '#webpage', name: page.title, description: page.description, url: canonical, inLanguage: 'en-NG', isPartOf: { '@id': SITE + '/#website' }, about: { '@id': SITE + '/#school' }, breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }, ...(path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.section, item: canonical }])] } }
  ];
  let structuredData = document.head.querySelector('script[data-seo-engine]');
  if (!structuredData) {
    structuredData = document.createElement('script');
    structuredData.type = 'application/ld+json';
    structuredData.dataset.seoEngine = 'true';
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify(graph);
})();