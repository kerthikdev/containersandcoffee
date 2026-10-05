/* =====================================================
   CONTAINERS & COFFEE — Interactive Roadmaps Engine (roadmap.js)
   Inspired by roadmap.sh: Flowchart tree, interactive progress, topic modals
   ===================================================== */

let currentRoadmapId = 'ccna';
let activeFilter = 'all'; // all, core, recommended
let userProgress = {}; // { [topicId]: true }

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  loadProgress();

  if (typeof ROADMAP_DATA === 'undefined') {
    console.error('ROADMAP_DATA not found. Please ensure data/roadmaps.js is loaded.');
    return;
  }

  // Parse URL query parameter ?id=cloud or ?id=devops or ?id=ccna
  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id');
  if (requestedId && ROADMAP_DATA[requestedId]) {
    currentRoadmapId = requestedId;
  }

  initRoadmapTabs();
  initSearch();
  initFilterPills();
  initProgressActions();
  initTopicModal();
  renderRoadmap(currentRoadmapId);
});

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

/* ─── Progress Management (localStorage) ─── */
function loadProgress() {
  try {
    const saved = localStorage.getItem('cc_roadmap_progress');
    if (saved) {
      userProgress = JSON.parse(saved);
    }
  } catch (e) {
    userProgress = {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem('cc_roadmap_progress', JSON.stringify(userProgress));
  } catch (e) {}
}

function toggleTopicProgress(topicKey) {
  if (userProgress[topicKey]) {
    delete userProgress[topicKey];
  } else {
    userProgress[topicKey] = true;
  }
  saveProgress();
  updateProgressBar();
  updateTopicElements(topicKey);
}

function updateTopicElements(topicKey) {
  const isDone = !!userProgress[topicKey];
  const pills = document.querySelectorAll(`[data-topic-key="${topicKey}"]`);
  pills.forEach(el => {
    el.classList.toggle('completed', isDone);
    const checkIcon = el.querySelector('.topic-status-check');
    if (checkIcon) {
      checkIcon.innerHTML = isDone ? '✓' : '';
    }
  });
}

/* ─── Switcher Tabs ─── */
function initRoadmapTabs() {
  const tabs = document.querySelectorAll('.rm-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-id');
      if (!id || id === currentRoadmapId) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRoadmapId = id;

      // Update URL query string without reloading
      const url = new URL(window.location);
      url.searchParams.set('id', id);
      window.history.pushState({}, '', url);

      renderRoadmap(currentRoadmapId);
    });
  });
}

/* ─── Search and Filters ─── */
function initSearch() {
  const input = document.getElementById('roadmap-search');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    filterRoadmapDisplay(query, activeFilter);
  });
}

function initFilterPills() {
  const pills = document.querySelectorAll('.rm-filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-filter') || 'all';

      const searchInput = document.getElementById('roadmap-search');
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      filterRoadmapDisplay(query, activeFilter);
    });
  });
}

function filterRoadmapDisplay(query, filterType) {
  const cards = document.querySelectorAll('.rm-phase-node');
  cards.forEach(card => {
    let matchCount = 0;
    const topicNodes = card.querySelectorAll('.rm-topic-chip');

    topicNodes.forEach(node => {
      const name = (node.getAttribute('data-name') || '').toLowerCase();
      const type = node.getAttribute('data-type') || '';

      const matchesQuery = !query || name.includes(query);
      const matchesType = filterType === 'all' || type === filterType;

      if (matchesQuery && matchesType) {
        node.style.display = 'inline-flex';
        matchCount++;
      } else {
        node.style.display = 'none';
      }
    });

    if (query) {
      card.style.display = matchCount > 0 ? 'block' : 'none';
    } else {
      card.style.display = 'block';
    }
  });
}

/* ─── Render Roadmap ─── */
function renderRoadmap(roadmapId) {
  const data = ROADMAP_DATA[roadmapId];
  if (!data) return;

  // Update tabs active state
  document.querySelectorAll('.rm-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-id') === roadmapId);
  });

  // Render Header Details
  const titleEl = document.getElementById('rm-header-title');
  const badgeEl = document.getElementById('rm-header-badge');
  const descEl = document.getElementById('rm-header-desc');
  const rolesEl = document.getElementById('rm-meta-roles');
  const certEl = document.getElementById('rm-meta-cert');
  const timeEl = document.getElementById('rm-meta-time');
  const prereqEl = document.getElementById('rm-meta-prereq');

  if (titleEl) titleEl.innerHTML = `${data.icon} ${data.title}`;
  if (badgeEl) badgeEl.textContent = data.badge;
  if (descEl) descEl.textContent = data.subtitle;
  if (rolesEl) rolesEl.textContent = data.targetRole;
  if (certEl) certEl.textContent = data.certification;
  if (timeEl) timeEl.textContent = data.duration;
  if (prereqEl) prereqEl.textContent = data.prerequisites;

  // Render Flowchart Tree
  const flowContainer = document.getElementById('roadmap-flow-tree');
  if (!flowContainer) return;

  flowContainer.innerHTML = data.phases.map((phase, idx) => {
    const isLast = idx === data.phases.length - 1;

    return `
      <div class="rm-phase-node" id="${phase.id}">
        <!-- Spine Marker -->
        <div class="rm-spine-wrap">
          <div class="rm-spine-badge">${phase.number}</div>
          ${!isLast ? '<div class="rm-spine-line" aria-hidden="true"></div>' : ''}
        </div>

        <!-- Node Card -->
        <div class="rm-node-card">
          <div class="rm-card-header">
            <div>
              <span class="rm-phase-tag">Milestone ${phase.number}</span>
              <h3 class="rm-card-title">${phase.title}</h3>
            </div>
          </div>
          <p class="rm-card-desc">${phase.desc}</p>

          <!-- Topics / Skills Grid (roadmap.sh style) -->
          <div class="rm-topics-grid">
            ${phase.topics.map(topic => {
              const topicKey = `${roadmapId}_${topic.name.toLowerCase().replace(/\s+/g, '_')}`;
              const isDone = !!userProgress[topicKey];

              return `
                <button
                  type="button"
                  class="rm-topic-chip ${topic.type === 'core' ? 'is-core' : 'is-recommended'} ${isDone ? 'completed' : ''}"
                  data-topic-key="${topicKey}"
                  data-name="${topic.name}"
                  data-type="${topic.type}"
                  data-desc="${encodeURIComponent(topic.desc)}"
                  data-command="${encodeURIComponent(topic.command || '')}"
                  data-phase="${phase.number}. ${phase.title}"
                  onclick="openTopicModal(this)"
                  title="${topic.name} (${topic.type === 'core' ? 'Core Knowledge' : 'Recommended Tool'})"
                >
                  <span class="topic-status-check">${isDone ? '✓' : ''}</span>
                  <span class="topic-chip-name">${topic.name}</span>
                  ${topic.type === 'core' ? '<span class="core-dot" title="Core Required">★</span>' : ''}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Lab Checkpoint -->
          <div class="rm-lab-box">
            <div class="rm-lab-title">
              <span class="lab-icon">⚡</span>
              <strong>Hands-on Production Checkpoint:</strong>
            </div>
            <p class="rm-lab-desc">${phase.lab}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  updateProgressBar();
}

/* ─── Progress Bar ─── */
function updateProgressBar() {
  const data = ROADMAP_DATA[currentRoadmapId];
  if (!data) return;

  let totalTopics = 0;
  let completedTopics = 0;

  data.phases.forEach(p => {
    p.topics.forEach(t => {
      totalTopics++;
      const topicKey = `${currentRoadmapId}_${t.name.toLowerCase().replace(/\s+/g, '_')}`;
      if (userProgress[topicKey]) {
        completedTopics++;
      }
    });
  });

  const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const barFill = document.getElementById('rm-progress-bar-fill');
  const textEl = document.getElementById('rm-progress-text');
  const countEl = document.getElementById('rm-progress-count');

  if (barFill) barFill.style.width = `${percent}%`;
  if (textEl) textEl.textContent = `${percent}% Completed`;
  if (countEl) countEl.textContent = `${completedTopics} / ${totalTopics} Topics`;
}

function initProgressActions() {
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your progress for this roadmap?')) {
        const data = ROADMAP_DATA[currentRoadmapId];
        if (data) {
          data.phases.forEach(p => {
            p.topics.forEach(t => {
              const topicKey = `${currentRoadmapId}_${t.name.toLowerCase().replace(/\s+/g, '_')}`;
              delete userProgress[topicKey];
            });
          });
          saveProgress();
          renderRoadmap(currentRoadmapId);
        }
      }
    });
  }

  const completeAllBtn = document.getElementById('complete-all-btn');
  if (completeAllBtn) {
    completeAllBtn.addEventListener('click', () => {
      const data = ROADMAP_DATA[currentRoadmapId];
      if (data) {
        data.phases.forEach(p => {
          p.topics.forEach(t => {
            const topicKey = `${currentRoadmapId}_${t.name.toLowerCase().replace(/\s+/g, '_')}`;
            userProgress[topicKey] = true;
          });
        });
        saveProgress();
        renderRoadmap(currentRoadmapId);
      }
    });
  }
}

/* ─── Topic Modal ─── */
let activeTopicKey = null;

function initTopicModal() {
  const modal = document.getElementById('topic-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const toggleBtn = document.getElementById('modal-toggle-status-btn');
  const copyBtn = document.getElementById('modal-copy-cmd-btn');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal());
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (!activeTopicKey) return;
      toggleTopicProgress(activeTopicKey);
      const isDone = !!userProgress[activeTopicKey];
      toggleBtn.innerHTML = isDone ? '✓ Mark as Incomplete' : '✓ Mark as Completed';
      toggleBtn.classList.toggle('btn-success', isDone);
      toggleBtn.classList.toggle('btn-primary', !isDone);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('modal-command-code');
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.textContent).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = original; }, 1500);
        });
      }
    });
  }
}

window.openTopicModal = function(btn) {
  const modal = document.getElementById('topic-modal');
  if (!modal) return;

  activeTopicKey = btn.getAttribute('data-topic-key');
  const name = btn.getAttribute('data-name');
  const type = btn.getAttribute('data-type');
  const desc = decodeURIComponent(btn.getAttribute('data-desc') || '');
  const command = decodeURIComponent(btn.getAttribute('data-command') || '');
  const phase = btn.getAttribute('data-phase');

  const titleEl = document.getElementById('modal-topic-title');
  const phaseEl = document.getElementById('modal-topic-phase');
  const typeBadgeEl = document.getElementById('modal-type-badge');
  const descEl = document.getElementById('modal-topic-desc');
  const cmdWrap = document.getElementById('modal-command-wrap');
  const cmdCode = document.getElementById('modal-command-code');
  const toggleBtn = document.getElementById('modal-toggle-status-btn');

  if (titleEl) titleEl.textContent = name;
  if (phaseEl) phaseEl.textContent = phase;
  if (typeBadgeEl) {
    typeBadgeEl.textContent = type === 'core' ? '★ Core Required Knowledge' : '⚡ Recommended Tool / Protocol';
    typeBadgeEl.className = `modal-badge ${type === 'core' ? 'badge-core' : 'badge-recommended'}`;
  }
  if (descEl) descEl.textContent = desc;

  if (cmdWrap && cmdCode) {
    if (command) {
      cmdWrap.style.display = 'block';
      cmdCode.textContent = command;
    } else {
      cmdWrap.style.display = 'none';
    }
  }

  if (toggleBtn) {
    const isDone = !!userProgress[activeTopicKey];
    toggleBtn.innerHTML = isDone ? '✓ Mark as Incomplete' : '✓ Mark as Completed';
    toggleBtn.classList.toggle('btn-success', isDone);
    toggleBtn.classList.toggle('btn-primary', !isDone);
  }

  modal.classList.add('open');
};

function closeModal() {
  const modal = document.getElementById('topic-modal');
  if (modal) modal.classList.remove('open');
  activeTopicKey = null;
}
