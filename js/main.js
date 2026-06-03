'use strict';

/* ══════════════════════════════════════════════════════
   Keyla Franco Hidalgo — Portfolio
   - Bilingual i18n (EN / ES)
   - GitHub API project fetcher with localStorage cache
   - Project filter system
   ══════════════════════════════════════════════════════ */

// ── Translations ──────────────────────────────────────
const translations = {
  en: {
    'nav.about':    'About',
    'nav.projects': 'Projects',
    'nav.contact':  'Contact',

    'hero.badge':       'Computer Engineer · Ecuador',
    'hero.tagline':     'Data Science · AI · GIS · Analytics',
    'hero.description': 'Building analytical tools and AI systems for real-world problems — from geospatial analysis to machine learning pipelines.',
    'hero.cv':          'Download CV',

    'about.label': 'About',
    'about.title': 'Who I am',
    'about.bio1':  "I'm a Computer Engineer from Ecuador focused on Data Science, Artificial Intelligence, GIS, and Analytics. I build systems that transform complex real-world data into actionable insights — whether that's geospatial models, RAG-based AI pipelines, or IoT sensor platforms.",
    'about.bio2':  'My work spans sensor data platforms, machine learning pipelines, web scraping systems, and spatial analysis tools. I care about evidence-based work and practical impact.',

    'chips.ai':       'Artificial Intelligence',
    'chips.ds':       'Data Science',
    'chips.gis':      'Geospatial Analysis',
    'chips.ml':       'Machine Learning',
    'chips.viz':      'Data Visualization',
    'chips.iot':      'IoT & Sensors',
    'chips.rag':      'RAG Systems',
    'chips.research': 'Research',

    'skills.languages': 'Languages',
    'skills.ml':        'AI & ML',
    'skills.data':      'Data & Analytics',
    'skills.gis':       'GIS & Spatial',
    'skills.db':        'Databases',
    'skills.infra':     'Infrastructure',

    'projects.label':    'Work',
    'projects.title':    'Projects',
    'projects.subtitle': 'Public repositories from GitHub — real data, real problems.',
    'projects.loading':  'Fetching projects…',
    'projects.error':    'Could not load projects.',

    'filter.all':       'All',
    'filter.ai':        'AI & ML',
    'filter.analytics': 'Analytics',
    'filter.gis':       'GIS & IoT',
    'filter.data':      'Data Eng.',
    'filter.fullstack': 'Full Stack',

    'contact.label':    'Contact',
    'contact.title':    'Get in touch',
    'contact.subtitle': 'Open to research collaborations, data projects, and technical roles.',

    'project.github': 'GitHub',
    'project.demo':   'Live demo',
  },

  es: {
    'nav.about':    'Acerca',
    'nav.projects': 'Proyectos',
    'nav.contact':  'Contacto',

    'hero.badge':       'Ingeniería en Computación · Ecuador',
    'hero.tagline':     'Ciencia de Datos · IA · SIG · Analítica',
    'hero.description': 'Construyo herramientas analíticas y sistemas de IA para problemas del mundo real — desde análisis geoespacial hasta pipelines de machine learning.',
    'hero.cv':          'Descargar CV',

    'about.label': 'Sobre mí',
    'about.title': 'Quién soy',
    'about.bio1':  'Soy Ingeniera en Computación de Ecuador, especializada en Ciencia de Datos, Inteligencia Artificial, SIG y Analítica. Construyo sistemas que transforman datos complejos del mundo real en insights accionables: modelos geoespaciales, pipelines de IA con RAG y plataformas de sensores IoT.',
    'about.bio2':  'Mi trabajo abarca plataformas de datos de sensores, pipelines de machine learning, sistemas de web scraping y herramientas de análisis espacial. Me guía el trabajo basado en evidencia y el impacto práctico.',

    'chips.ai':       'Inteligencia Artificial',
    'chips.ds':       'Ciencia de Datos',
    'chips.gis':      'Análisis Geoespacial',
    'chips.ml':       'Machine Learning',
    'chips.viz':      'Visualización de Datos',
    'chips.iot':      'IoT y Sensores',
    'chips.rag':      'Sistemas RAG',
    'chips.research': 'Investigación',

    'skills.languages': 'Lenguajes',
    'skills.ml':        'IA & ML',
    'skills.data':      'Datos & Analítica',
    'skills.gis':       'SIG & Espacial',
    'skills.db':        'Bases de Datos',
    'skills.infra':     'Infraestructura',

    'projects.label':    'Trabajo',
    'projects.title':    'Proyectos',
    'projects.subtitle': 'Repositorios públicos de GitHub — datos reales, problemas reales.',
    'projects.loading':  'Cargando proyectos…',
    'projects.error':    'No se pudieron cargar los proyectos.',

    'filter.all':       'Todos',
    'filter.ai':        'IA & ML',
    'filter.analytics': 'Analítica',
    'filter.gis':       'SIG & IoT',
    'filter.data':      'Data Eng.',
    'filter.fullstack': 'Full Stack',

    'contact.label':    'Contacto',
    'contact.title':    'Hablemos',
    'contact.subtitle': 'Abierta a colaboraciones en investigación, proyectos de datos y roles técnicos.',

    'project.github': 'GitHub',
    'project.demo':   'Ver demo',
  },
};

// ── Curated project metadata ──────────────────────────
const projectMeta = {
  'fake-news-rag-system': {
    category: 'ai',
    tags: ['RAG', 'NLP', 'Ollama', 'Vector DB'],
    descriptionEn: 'Retrieval-Augmented Generation system for fake news analysis using Ollama, vector databases, and semantic retrieval.',
    descriptionEs: 'Sistema RAG para análisis de noticias falsas usando Ollama, bases de datos vectoriales y recuperación semántica.',
  },
  'mental-health-data-analysis': {
    category: 'analytics',
    tags: ['Data Analysis', 'EDA', 'Python', 'Research'],
    descriptionEn: 'Exploratory data analysis on mental health datasets — covering trends, statistical correlations, and actionable insights.',
    descriptionEs: 'Análisis exploratorio de datos de salud mental: tendencias, correlaciones estadísticas e insights accionables.',
  },
  'sales-data-analytics': {
    category: 'analytics',
    tags: ['Analytics', 'KPIs', 'Python', 'Visualization'],
    descriptionEn: 'End-to-end sales analytics pipeline with exploratory analysis and visualization of commercial KPIs.',
    descriptionEs: 'Pipeline de analítica de ventas con análisis exploratorio y visualización de KPIs comerciales.',
  },
  'sensor-data-platform': {
    category: 'gis',
    tags: ['IoT', 'Real-time', 'JavaScript', 'Sensors'],
    descriptionEn: 'Real-time IoT sensor data collection, processing, and visualization platform for environmental monitoring.',
    descriptionEs: 'Plataforma de recolección, procesamiento y visualización de datos de sensores IoT en tiempo real para monitoreo ambiental.',
  },
  'data-visualization-scraper': {
    category: 'data',
    tags: ['Web Scraping', 'Python', 'ETL', 'Visualization'],
    descriptionEn: 'Automated web scraper with data cleaning and interactive visualization pipelines using Python.',
    descriptionEs: 'Scraper web automatizado con pipelines de limpieza de datos y visualización interactiva en Python.',
  },
  'Species_Detector': {
    category: 'ai',
    tags: ['Computer Vision', 'AI', 'Python', 'Hugging Face'],
    descriptionEn: 'AI-powered species detection system using computer vision and deep learning. Deployed on Hugging Face Spaces.',
    descriptionEs: 'Sistema de detección de especies con IA usando visión computacional y deep learning. Desplegado en Hugging Face Spaces.',
  },
  'Person_Detector': {
    category: 'ai',
    tags: ['Computer Vision', 'AI', 'Python', 'GIS'],
    descriptionEn: 'AI-powered person detection system combining computer vision with geospatial context. Deployed on Vercel.',
    descriptionEs: 'Sistema de detección de personas con IA que combina visión computacional con contexto geoespacial. Desplegado en Vercel.',
  },
  'ai-tree-monitoring-platform': {
    category: 'gis',
    tags: ['AI', 'GIS', 'Environmental', 'Python'],
    descriptionEn: 'AI-powered platform for environmental tree monitoring, geospatial analysis, and reporting.',
    descriptionEs: 'Plataforma con IA para monitoreo ambiental de árboles, análisis geoespacial y generación de reportes.',
  },
  'invoice-management-system': {
    category: 'fullstack',
    tags: ['JavaScript', 'Invoice', 'Full Stack'],
    descriptionEn: 'Invoice management system with real-time data handling and a modern, responsive interface.',
    descriptionEs: 'Sistema de gestión de facturas con manejo de datos en tiempo real e interfaz moderna y responsiva.',
  },
  'Integradora': {
    category: 'fullstack',
    tags: ['JavaScript', 'Full Stack', 'Systems Integration'],
    descriptionEn: 'Full-stack integrative project combining multiple systems and services in a unified platform.',
    descriptionEs: 'Proyecto integrador full-stack que combina múltiples sistemas y servicios en una plataforma unificada.',
  },
};

// ── State ─────────────────────────────────────────────
const GITHUB_USER  = 'KeylaFrancoH';
const CACHE_KEY    = 'kfh-portfolio-repos';
const EXCLUDED     = ['my_portafolio'];

let currentLang  = localStorage.getItem('kfh-lang') || 'en';
let allRepos     = [];
let activeFilter = 'all';

// ── Helpers ───────────────────────────────────────────
function t(key) {
  return (translations[currentLang] || {})[key]
      || (translations['en'])[key]
      || key;
}

function formatRepoName(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function langBadgeClass(lang) {
  const map = {
    'Python':           'lang-python',
    'Jupyter Notebook': 'lang-jupyter',
    'JavaScript':       'lang-javascript',
    'TypeScript':       'lang-typescript',
  };
  return map[lang] || 'lang-default';
}

// ── i18n ──────────────────────────────────────────────
function applyTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });

  // Sync lang toggle display
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.querySelector('.lang-current').textContent = currentLang.toUpperCase();
    toggle.querySelector('.lang-other').textContent   = currentLang === 'en' ? 'ES' : 'EN';
  }

  // Swap CV download link based on language
  const cvLink = document.getElementById('cvLink');
  if (cvLink) {
    cvLink.href = currentLang === 'en'
      ? '/cvs/eng_cv_Keyla_franco.pdf'
      : '/cvs/esp_cv_Keyla_franco.pdf';
  }

  // Re-render cards with updated descriptions
  if (allRepos.length > 0) renderProjects(allRepos);
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  localStorage.setItem('kfh-lang', currentLang);
  applyTranslations();
}

// ── GitHub fetch ──────────────────────────────────────
async function fetchProjects() {
  // sessionStorage cache: fresh on every new page load, reused only within the same session
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        allRepos = data;
        renderProjects(allRepos);
        return;
      }
    }
  } catch (_) { /* stale/corrupt cache — ignore */ }

  // Live fetch
  try {
    const res  = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=public`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    allRepos = data.filter(r => !r.fork && !EXCLUDED.includes(r.name));
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(allRepos));
    renderProjects(allRepos);
  } catch (err) {
    const loading = document.getElementById('projectsLoading');
    if (loading) {
      loading.innerHTML = `
        <p style="color:var(--text-muted);margin-bottom:12px">${t('projects.error')}</p>
        <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener"
           style="color:var(--accent);font-size:13px;font-weight:500">
          View on GitHub →
        </a>`;
    }
  }
}

// ── Render ────────────────────────────────────────────
function renderProjects(repos) {
  const grid    = document.getElementById('projectsGrid');
  const loading = document.getElementById('projectsLoading');
  if (loading) loading.remove();

  // Remove old cards
  grid.querySelectorAll('.project-card').forEach(c => c.remove());

  // Sort: curated repos first (featured), then by updated date
  const sorted = [...repos].sort((a, b) => {
    const aM = !!projectMeta[a.name];
    const bM = !!projectMeta[b.name];
    if (aM && !bM) return -1;
    if (!aM && bM) return  1;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  sorted.forEach(repo => grid.appendChild(createCard(repo)));
  applyFilter(activeFilter);
}

function createCard(repo) {
  const meta     = projectMeta[repo.name] || {};
  const category = meta.category || 'data';
  const tags     = meta.tags || [];
  const desc     = currentLang === 'en'
    ? (meta.descriptionEn || repo.description || 'No description available.')
    : (meta.descriptionEs || repo.description || 'Sin descripción disponible.');

  const card = document.createElement('article');
  card.className   = 'project-card';
  card.dataset.category = category;

  const langLabel = repo.language === 'Jupyter Notebook' ? 'Jupyter' : (repo.language || '');
  const langHTML  = langLabel
    ? `<span class="project-lang-badge ${langBadgeClass(repo.language)}">${langLabel}</span>`
    : '';

  const tagsHTML = tags.length
    ? `<div class="project-tags">${tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}</div>`
    : '';

  const demoLink = repo.homepage
    ? `<a href="${escAttr(repo.homepage)}" class="project-link" target="_blank" rel="noopener noreferrer">
         <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
         ${t('project.demo')}
       </a>`
    : '';

  const updatedYear = new Date(repo.updated_at).getFullYear();

  card.innerHTML = `
    <div class="project-header">
      <h3 class="project-name">${escHTML(formatRepoName(repo.name))}</h3>
      ${langHTML}
    </div>
    <p class="project-desc">${escHTML(desc)}</p>
    ${tagsHTML}
    <div class="project-footer">
      <div class="project-stats">
        <span class="project-stat">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          ${repo.stargazers_count}
        </span>
        <span class="project-stat">${updatedYear}</span>
      </div>
      <div class="project-links">
        ${demoLink}
        <a href="${escAttr(repo.html_url)}" class="project-link" target="_blank" rel="noopener noreferrer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          ${t('project.github')}
        </a>
      </div>
    </div>`;

  return card;
}

// Escape helpers — prevent XSS from API data
function escHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(str) {
  // Only allow http/https URLs
  const s = String(str || '');
  if (!/^https?:\/\//i.test(s)) return '#';
  return s.replace(/"/g, '%22');
}

// ── Filter ────────────────────────────────────────────
function applyFilter(filter) {
  activeFilter = filter;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
    // Keep button text in sync with current language
    btn.textContent = t(`filter.${btn.dataset.filter}`);
  });

  document.querySelectorAll('.project-card').forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !show);
  });
}

// ── Back to Top ───────────────────────────────────────
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
}

// ── Active Nav Indicator ──────────────────────────────
function initActiveNav() {
  const sections = ['about', 'projects', 'contact'];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  fetchProjects();

  document.getElementById('langToggle')
    .addEventListener('click', toggleLang);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  initBackToTop();
  initActiveNav();
});
