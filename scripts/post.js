/* =====================================================
   CONTAINERS & COFFEE — Post Renderer (post.js)
   Renders Article, Reading Progress, Copy Code, Author Box
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initReadingProgressBar();

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

/* ─── Reading Progress Bar ─── */
function initReadingProgressBar() {
  const bar = document.getElementById('reading-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* ─── Navbar scroll ─── */
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

  // Hero Section
  const heroEl = document.getElementById('post-hero');
  if (heroEl) {
    heroEl.innerHTML = `
      <div class="post-hero-bg" style="background: ${post.coverGradient};"></div>
      <div class="post-hero-overlay"></div>
      <div class="container post-hero-inner">
        <div>
          <span class="post-category-pill ${catClass}">${post.category}</span>
        </div>
        <h1 class="post-hero-title">${post.title}</h1>
        <div class="post-hero-meta">
          <div class="post-author">
            <div class="author-avatar">${post.authorInitials}</div>
            <span class="author-name">${post.author}</span>
          </div>
          <span class="post-dot">·</span>
          <span class="post-date">📅 ${dateStr}</span>
          <span class="post-dot">·</span>
          <span class="post-read-time">⏳ ${post.readTime} min read</span>
        </div>
      </div>
    `;
  }

  // Article Body
  const articleEl = document.getElementById('post-article');
  if (articleEl) {
    const processedContent = processCodeBlocks(post.content.trim());
    const tagsHtml = post.tags.map(t => `<span class="post-tag">#${t}</span>`).join('');

    const authorBio = (BLOG_DATA.site && BLOG_DATA.site.authorBio) 
      ? BLOG_DATA.site.authorBio 
      : "DevOps engineer, cloud architect, and coffee enthusiast. Writing about containers, Kubernetes, and reliable infrastructure.";

    articleEl.innerHTML = `
      <a href="index.html" class="back-link">← Back to all brews</a>
      <div class="article-content">${processedContent}</div>
      <div class="post-tags">${tagsHtml}</div>
      
      <!-- Author Box -->
      <div class="post-author-box">
        <div class="post-author-avatar-large">${post.authorInitials}</div>
        <div class="post-author-details">
          <h3>Written by ${post.author}</h3>
          <p>${authorBio}</p>
        </div>
      </div>
    `;

    // Attach copy button handlers
    attachCopyListeners();
  }

  // Related posts
  const relatedEl = document.getElementById('related-posts');
  if (relatedEl && BLOG_DATA.posts) {
    const related = BLOG_DATA.posts
      .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
      .slice(0, 2);

    if (related.length > 0) {
      relatedEl.innerHTML = `
        <div style="margin-bottom: var(--sp-6);">
          <p class="section-label">Keep Exploring</p>
          <h2 class="section-title">Related Brews</h2>
        </div>
        <div class="blog-grid">
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
    <article class="post-card" onclick="window.location.href='post.html?id=${post.id}'" role="article" tabindex="0">
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

/* ─── Code Block Processing & Copy functionality ─── */
function processCodeBlocks(html) {
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
            <div class="pre-actions">
              <span class="pre-lang">${langLabel}</span>
              <button class="copy-code-btn" type="button" aria-label="Copy code to clipboard">Copy</button>
            </div>
          </div>
          <pre><code>${code}</code></pre>
        </div>
      `;
    }
  );
}

function attachCopyListeners() {
  document.querySelectorAll('.code-block-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.copy-code-btn');
    const code = wrapper.querySelector('pre code');
    if (!btn || !code) return;

    btn.addEventListener('click', async () => {
      try {
        // Decode HTML entities
        const textToCopy = code.innerText || code.textContent;
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.style.color = '#34d399';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  });
}

/* ─── Error rendering ─── */
function renderError(message) {
  const articleEl = document.getElementById('post-article');
  if (articleEl) {
    articleEl.innerHTML = `
      <div style="text-align:center; padding: var(--sp-20) 0;">
        <div style="font-size:3.5rem; margin-bottom:var(--sp-4);">☕</div>
        <h2 style="font-family:var(--font-heading); font-size:2rem; margin-bottom:var(--sp-4);">Oops, this brew isn't ready.</h2>
        <p style="color:var(--text-secondary); margin-bottom:var(--sp-8);">${message}</p>
        <a href="index.html" class="btn-primary">Return to Cafe</a>
      </div>
    `;
  }
}

/* ─── Utilities ─── */
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
