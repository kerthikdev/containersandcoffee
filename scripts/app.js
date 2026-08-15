/* =====================================================
   CONTAINERS & COFFEE — Blog Engine (app.js)
   Reads BLOG_DATA global, renders homepage components
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initParticles();
  initScrollAnimations();

  if (typeof BLOG_DATA === 'undefined') {
    console.error('BLOG_DATA not found. Make sure data/posts.js is loaded.');
    return;
  }

  const posts = BLOG_DATA.posts;
  renderHeroFeatured(posts);
  renderCategoryFilters(posts);
  renderBlogGrid(posts);
  initNewsletterForm();
});

/* ─── Navbar scroll effect ─── */
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

/* ─── Floating Particles ─── */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --duration: ${Math.random() * 8 + 5}s;
      --delay: ${Math.random() * 6}s;
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
    <a href="post.html?id=${featured.id}" class="featured-strip" aria-label="Read featured post: ${featured.title}">
      <div class="featured-cover">
        <div class="featured-cover-bg" style="background: ${featured.coverGradient};">
          <span>${featured.coverIcon}</span>
        </div>
      </div>
      <div class="featured-meta">
        <span class="featured-label">Featured Post</span>
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
          <span class="post-read-time">${featured.readTime} min read</span>
        </div>
        <div style="margin-top: 0.5rem;">
          <span class="btn-primary" style="display:inline-flex;">Read the Brew &nbsp;→</span>
        </div>
      </div>
    </a>
  `;
}

/* ─── Category Filters ─── */
let activeCategory = 'All';

function renderCategoryFilters(posts) {
  const container = document.getElementById('category-filters');
  if (!container) return;

  const categories = ['All', ...new Set(posts.map(p => p.category))];

  container.innerHTML = categories.map(cat => `
    <button
      class="filter-btn ${cat === activeCategory ? 'active' : ''}"
      data-category="${cat}"
      id="filter-${cat.toLowerCase().replace(/\s+/g, '-')}"
      aria-pressed="${cat === activeCategory}"
    >
      ${cat}
    </button>
  `).join('');

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

/* ─── Blog Grid ─── */
function renderBlogGrid(posts) {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  // Filter out featured post from non-"All" views; show all in grid
  const filtered = activeCategory === 'All'
    ? posts.filter(p => !p.featured)
    : posts.filter(p => p.category === activeCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">☕</div>
        <p>No brews in this category yet. Check back soon!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(post => createPostCard(post)).join('');

  // Animate cards in
  grid.querySelectorAll('.post-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.25s ease, border-color 0.25s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 60);
  });
}

function createPostCard(post) {
  const dateStr = formatDate(post.date);
  const catClass = getCategoryClass(post.category);

  return `
    <article class="post-card fade-in-up" onclick="window.location.href='post.html?id=${post.id}'" role="article" aria-label="${post.title}">
      <div class="post-card-cover" style="background: ${post.coverGradient};">
        <span style="position:relative;z-index:1;">${post.coverIcon}</span>
      </div>
      <div class="post-card-body">
        <span class="post-category-pill ${catClass}">${post.category}</span>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-card-excerpt">${post.excerpt}</p>
        <div class="post-card-footer">
          <div class="post-author">
            <div class="author-avatar">${post.authorInitials}</div>
            <span style="font-size:0.82rem; color:var(--text-muted);">${dateStr} · ${post.readTime}m</span>
          </div>
          <div class="read-more-arrow">→</div>
        </div>
      </div>
    </article>
  `;
}

/* ─── Utility: Category CSS class ─── */
function getCategoryClass(category) {
  const map = {
    'Docker': 'cat-docker',
    'Kubernetes': 'cat-kubernetes',
    'DevOps': 'cat-devops',
    'Coffee Life': 'cat-coffee-life',
  };
  return map[category] || 'cat-default';
}

/* ─── Utility: Format Date ─── */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ─── Newsletter form ─── */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const btn = form.querySelector('.btn-primary');
    if (!input.value.includes('@')) {
      input.style.borderColor = '#e05252';
      setTimeout(() => input.style.borderColor = '', 1500);
      return;
    }
    btn.textContent = '☕ You\'re in!';
    btn.style.background = '#4ecfb5';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  });
}

/* ─── Scroll Animations ─── */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe cards added later by using a MutationObserver
  const gridObserver = new MutationObserver(() => {
    document.querySelectorAll('.fade-in-up:not(.visible)').forEach(el => observer.observe(el));
  });

  const grid = document.getElementById('blog-grid');
  if (grid) gridObserver.observe(grid, { childList: true });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}
