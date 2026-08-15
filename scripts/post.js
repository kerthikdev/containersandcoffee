/* =====================================================
   CONTAINERS & COFFEE — Post Renderer (post.js)
   Reads ?id= param, finds post in BLOG_DATA, renders it
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();

  if (typeof BLOG_DATA === 'undefined') {
    renderError('Blog data not found.');
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  if (!postId) {
    renderError('No post specified.');
    return;
  }

  const post = BLOG_DATA.posts.find(p => p.id === postId);

  if (!post) {
    renderError(`Post "${postId}" not found.`);
    return;
  }

  renderPost(post);
  document.title = `${post.title} — Containers & Coffee`;
});

/* ─── Navbar ─── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
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

/* ─── Render the full post ─── */
function renderPost(post) {
  const dateStr = formatDate(post.date);
  const catClass = getCategoryClass(post.category);

  // Hero
  const heroEl = document.getElementById('post-hero');
  if (heroEl) {
    heroEl.innerHTML = `
      <div class="post-hero-bg" style="background: ${post.coverGradient};"></div>
      <div class="post-hero-overlay"></div>
      <div class="container post-hero-inner">
        <div class="post-hero-category">
          <span class="post-category-pill ${catClass}">${post.category}</span>
        </div>
        <h1 class="post-hero-title">${post.title}</h1>
        <div class="post-hero-meta">
          <div class="post-author post-hero-author">
            <div class="author-avatar">${post.authorInitials}</div>
            <span class="author-name">${post.author}</span>
          </div>
          <span class="post-dot">·</span>
          <span class="post-date">${dateStr}</span>
          <span class="post-dot">·</span>
          <span class="post-read-time">${post.readTime} min read</span>
        </div>
      </div>
    `;
  }

  // Article body
  const articleEl = document.getElementById('post-article');
  if (articleEl) {
    // Process code blocks to add terminal-style header
    const processedContent = processCodeBlocks(post.content.trim());

    const tagsHtml = post.tags.map(t =>
      `<span class="post-tag">${t}</span>`
    ).join('');

    articleEl.innerHTML = `
      <a href="index.html" class="back-link">← Back to Blog</a>
      <div class="article-content">${processedContent}</div>
      <div class="post-tags">${tagsHtml}</div>
    `;
  }

  // Related posts
  const relatedEl = document.getElementById('related-posts');
  if (relatedEl && BLOG_DATA.posts) {
    const related = BLOG_DATA.posts
      .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
      .slice(0, 2);

    if (related.length > 0) {
      relatedEl.innerHTML = `
        <h2 class="section-title" style="margin-bottom: var(--sp-8);">More Brews</h2>
        <div class="blog-grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
          ${related.map(p => createRelatedCard(p)).join('')}
        </div>
      `;
    } else {
      relatedEl.remove();
    }
  }
}

function createRelatedCard(post) {
  const dateStr = formatDate(post.date);
  const catClass = getCategoryClass(post.category);
  return `
    <article class="post-card" onclick="window.location.href='post.html?id=${post.id}'" role="article">
      <div class="post-card-cover" style="background: ${post.coverGradient};">
        <span style="position:relative;z-index:1;">${post.coverIcon}</span>
      </div>
      <div class="post-card-body">
        <span class="post-category-pill ${catClass}">${post.category}</span>
        <h3 class="post-card-title">${post.title}</h3>
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

/* ─── Process code blocks with terminal header ─── */
function processCodeBlocks(html) {
  // Wrap <pre><code class="language-X"> with a terminal-style header
  return html.replace(
    /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      const langLabel = lang === 'plaintext' ? 'text' : lang;
      return `
        <div class="code-block-wrapper">
          <div class="pre-header">
            <div class="pre-dots">
              <div class="pre-dot pre-dot-red"></div>
              <div class="pre-dot pre-dot-yellow"></div>
              <div class="pre-dot pre-dot-green"></div>
            </div>
            <span class="pre-lang">${langLabel}</span>
          </div>
          <pre style="margin-top:0; border-top-left-radius:0; border-top-right-radius:0;"><code>${code}</code></pre>
        </div>
      `;
    }
  );
}

/* ─── Error rendering ─── */
function renderError(message) {
  const articleEl = document.getElementById('post-article');
  if (articleEl) {
    articleEl.innerHTML = `
      <div style="text-align:center; padding: var(--sp-20) 0;">
        <div style="font-size:3rem; margin-bottom:var(--sp-4);">☕</div>
        <h2 style="margin-bottom:var(--sp-4);">Oops, this brew isn't ready.</h2>
        <p style="color:var(--text-muted); margin-bottom:var(--sp-8);">${message}</p>
        <a href="index.html" class="btn-primary">Go Home</a>
      </div>
    `;
  }
}

/* ─── Utilities ─── */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getCategoryClass(category) {
  const map = {
    'Docker': 'cat-docker',
    'Kubernetes': 'cat-kubernetes',
    'DevOps': 'cat-devops',
    'Coffee Life': 'cat-coffee-life',
  };
  return map[category] || 'cat-default';
}
