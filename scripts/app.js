/* =====================================================
   CONTAINERS & COFFEE — Dynamic Engine (app.js)
   Renders Homepage, Live Search, Category Filters, Newsletter
   ===================================================== */

let activeCategory = 'All';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initParticles();
  initScrollAnimations();

  if (typeof BLOG_DATA === 'undefined') {
    console.error('BLOG_DATA not found. Please ensure data/posts.js is loaded.');
    return;
  }

  const posts = BLOG_DATA.posts;
  renderHeroFeatured(posts);
  renderCategoryFilters(posts);
  renderBlogGrid(posts);
  initSearchInput(posts);
  initNewsletterForm();
});

/* ─── Navbar scroll ─── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── Theme Toggle ─── */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('cc-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('cc-theme', next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ─── Floating Particles in Hero ─── */
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --duration: ${Math.random() * 7 + 5}s;
      --delay: ${Math.random() * 5}s;
    `;
    container.appendChild(p);
  }
}

/* ─── Render Featured Post in Hero ─── */
function renderHeroFeatured(posts) {
  const featured = posts.find(p => p.featured) || posts[0];
  const container = document.getElementById('featured-post');
  if (!featured || !container) return;

  const dateStr = formatDate(featured.date);

  container.innerHTML = `
    <div class="featured-strip" onclick="window.location.href='post.html?id=${featured.id}'" role="link" tabindex="0" aria-label="Read featured post: ${featured.title}">
      <div class="featured-cover">
        <div class="featured-cover-bg" style="background: ${featured.coverGradient};">
          <span>${featured.coverIcon}</span>
        </div>
      </div>
      <div class="featured-meta">
        <span class="featured-label">✨ Featured Brew · ${featured.category}</span>
        <h2 class="featured-title">${featured.title}</h2>
        <p class="featured-excerpt">${featured.excerpt}</p>
        <div class="featured-info">
          <div class="post-author">
            <div class="author-avatar">${featured.authorInitials}</div>
            <span class="author-name">${featured.author}</span>
          </div>
          <span class="post-dot">·</span>
          <span class="post-date">${dateStr}</span>
          <span class="post-dot">·</span>
          <span class="post-read-time">⏳ ${featured.readTime} min read</span>
        </div>
        <div style="margin-top: var(--sp-4);">
          <span class="btn-primary" style="display:inline-flex; font-size:0.88rem; padding: 0.55rem 1.25rem;">
            Read Full Post &nbsp;→
          </span>
        </div>
      </div>
    </div>
  `;
}

/* ─── Category Filters ─── */
function renderCategoryFilters(posts) {
  const container = document.getElementById('category-filters');
  if (!container) return;

  const categories = ['All', ...new Set(posts.map(p => p.category))];

  container.innerHTML = categories.map(cat => {
    const count = cat === 'All' ? posts.length : posts.filter(p => p.category === cat).length;
    return `
      <button
        class="filter-btn ${cat === activeCategory ? 'active' : ''}"
        data-category="${cat}"
        id="filter-${cat.toLowerCase().replace(/\s+/g, '-')}"
        aria-pressed="${cat === activeCategory}"
      >
        ${cat} (${count})
      </button>
    `;
  }).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      container.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      renderBlogGrid(posts);
    });
  });
}

/* ─── Live Search Input ─── */
function initSearchInput(posts) {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderBlogGrid(posts);
  });
}

/* ─── Blog Grid Rendering ─── */
function renderBlogGrid(posts) {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  let filtered = posts;

  // Category filter
  if (activeCategory !== 'All') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // Search filter
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchQuery) ||
      p.excerpt.toLowerCase().includes(searchQuery) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery)) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">☕</div>
        <h3 style="font-family:var(--font-heading); font-size:1.4rem; margin-bottom:var(--sp-2);">No matching brews found</h3>
        <p>Try searching for Docker, Kubernetes, CI/CD, or clear the active filter.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(post => createPostCard(post)).join('');

  // Staggered reveal
  grid.querySelectorAll('.post-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease, box-shadow 0.25s ease, border-color 0.25s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 50);
  });
}

function createPostCard(post) {
  const dateStr = formatDate(post.date);
  const catClass = getCategoryClass(post.category);

  return `
    <article class="post-card" onclick="window.location.href='post.html?id=${post.id}'" role="article" tabindex="0" aria-label="${post.title}">
      <div class="post-card-cover" style="background: ${post.coverGradient};">
        <span style="position:relative; z-index:1;">${post.coverIcon}</span>
      </div>
      <div class="post-card-body">
        <span class="post-category-pill ${catClass}">${post.category}</span>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-excerpt">${post.excerpt}</p>
        <div class="post-card-footer">
          <div class="post-author">
            <div class="author-avatar">${post.authorInitials}</div>
            <span style="font-size:0.85rem; color:var(--text-secondary);">${dateStr} · ${post.readTime}m</span>
          </div>
          <div class="read-more-arrow" aria-hidden="true">→</div>
        </div>
      </div>
    </article>
  `;
}

/* ─── Newsletter Form ─── */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const msg = document.getElementById('newsletter-msg');
  if (!form || !input || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) return;

    msg.textContent = `☕ Thank you! You're dialed in. Check ${email} for fresh brews.`;
    msg.style.display = 'block';
    input.value = '';

    setTimeout(() => {
      msg.style.display = 'none';
    }, 6000);
  });
}

/* ─── Quick Filter Helper for Footer ─── */
window.setCategoryAndScroll = function(category) {
  activeCategory = category;
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    const isTarget = btn.dataset.category === category;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
  });

  if (typeof BLOG_DATA !== 'undefined') {
    renderBlogGrid(BLOG_DATA.posts);
  }

  const blogSection = document.getElementById('blog');
  if (blogSection) {
    blogSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ─── Scroll Observer ─── */
function initScrollAnimations() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.fade-in-up').forEach(el => obs.observe(el));
}

/* ─── Helpers ─── */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getCategoryClass(category) {
  const map = {
    'Docker': 'cat-docker',
    'Kubernetes': 'cat-k8s',
    'DevOps': 'cat-devops',
    'Networking': 'cat-networking',
    'Coffee Life': 'cat-coffee'
  };
  return map[category] || 'cat-docker';
}
