/* =====================================================
   CONTAINERS & COFFEE — Interactive Roadmaps Engine (roadmap.js)
   Inspired by roadmap.sh: Flowchart tree, interactive progress, topic modals,
   checklist mode, and live filtering.
   ===================================================== */

let currentRoadmapId = 'ccna';
let activeFilter = 'all'; // all, core, recommended, done
let currentViewMode = 'tree'; // 'tree' | 'checklist'
let userProgress = {}; // { [topicKey]: true }

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
  initViewToggle();
  initSearch();
  initFilterPills();
  initProgressActions();
  initTopicModal();
  initShareAction();
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
  
  // Update Flowchart Tree Chips
  const pills = document.querySelectorAll(`[data-topic-key="${topicKey}"]`);
  pills.forEach(el => {
    el.classList.toggle('completed', isDone);
    const checkIcon = el.querySelector('.topic-status-check');
    if (checkIcon) {
      checkIcon.innerHTML = isDone ? '✓' : '';
    }
  });

  // Update Checklist Rows
  const checkRows = document.querySelectorAll(`.rm-checklist-row[data-topic-key="${topicKey}"]`);
  checkRows.forEach(row => {
    row.classList.toggle('completed', isDone);
    const cb = row.querySelector('.rm-check-input');
    if (cb) cb.checked = isDone;
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

/* ─── View Toggle (Flowchart vs Checklist) ─── */
function initViewToggle() {
  const treeBtn = document.getElementById('view-tree-btn');
  const checkBtn = document.getElementById('view-checklist-btn');
  const treeContainer = document.getElementById('roadmap-flow-tree');
  const checkContainer = document.getElementById('roadmap-checklist-tree');

  if (treeBtn && checkBtn) {
    treeBtn.addEventListener('click', () => {
      currentViewMode = 'tree';
      treeBtn.classList.add('active');
      checkBtn.classList.remove('active');
      if (treeContainer) treeContainer.style.display = 'flex';
      if (checkContainer) checkContainer.style.display = 'none';
    });

    checkBtn.addEventListener('click', () => {
      currentViewMode = 'checklist';
      checkBtn.classList.add('active');
      treeBtn.classList.remove('active');
      if (treeContainer) treeContainer.style.display = 'none';
      if (checkContainer) {
        checkContainer.style.display = 'flex';
        renderChecklistView();
      }
    });
  }
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
  // Filter Tree View
  const phaseCards = document.querySelectorAll('.rm-phase-node');
  phaseCards.forEach(card => {
    let matchCount = 0;
    const topicNodes = card.querySelectorAll('.rm-topic-chip');

    topicNodes.forEach(node => {
      const name = (node.getAttribute('data-name') || '').toLowerCase();
      const type = node.getAttribute('data-type') || '';
      const topicKey = node.getAttribute('data-topic-key') || '';
      const isDone = !!userProgress[topicKey];

      const matchesQuery = !query || name.includes(query);
      let matchesType = true;
      if (filterType === 'core') matchesType = (type === 'core');
      else if (filterType === 'recommended') matchesType = (type === 'recommended');
      else if (filterType === 'done') matchesType = isDone;

      if (matchesQuery && matchesType) {
        node.style.display = 'inline-flex';
        matchCount++;
      } else {
        node.style.display = 'none';
      }
    });

    if (query || filterType !== 'all') {
      card.style.display = matchCount > 0 ? 'grid' : 'none';
    } else {
      card.style.display = 'grid';
    }
  });

  // Filter Checklist View
  const checkCards = document.querySelectorAll('.rm-check-phase-card');
  checkCards.forEach(card => {
    let matchCount = 0;
    const rows = card.querySelectorAll('.rm-checklist-row');

    rows.forEach(row => {
      const name = (row.getAttribute('data-name') || '').toLowerCase();
      const type = row.getAttribute('data-type') || '';
      const topicKey = row.getAttribute('data-topic-key') || '';
      const isDone = !!userProgress[topicKey];

      const matchesQuery = !query || name.includes(query);
      let matchesType = true;
      if (filterType === 'core') matchesType = (type === 'core');
      else if (filterType === 'recommended') matchesType = (type === 'recommended');
      else if (filterType === 'done') matchesType = isDone;

      if (matchesQuery && matchesType) {
        row.style.display = 'flex';
        matchCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (query || filterType !== 'all') {
      card.style.display = matchCount > 0 ? 'block' : 'none';
    } else {
      card.style.display = 'block';
    }
  });
}

/* ─── Render Roadmap Flow Tree ─── */
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
              const topicKey = `${roadmapId}_${topic.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
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
                  data-doc="${encodeURIComponent(topic.docUrl || '')}"
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

  if (currentViewMode === 'checklist') {
    renderChecklistView();
  }

  updateProgressBar();
}

/* ─── Render Checklist View (roadmap.sh checklist mode) ─── */
function renderChecklistView() {
  const checkContainer = document.getElementById('roadmap-checklist-tree');
  if (!checkContainer) return;

  const data = ROADMAP_DATA[currentRoadmapId];
  if (!data) return;

  checkContainer.innerHTML = data.phases.map(phase => {
    return `
      <div class="rm-check-phase-card">
        <div class="rm-check-phase-header">
          <h3 class="rm-check-phase-title">${phase.number}. ${phase.title}</h3>
          <span class="rm-phase-tag">${phase.topics.length} Topics</span>
        </div>
        <div class="rm-check-items-list">
          ${phase.topics.map(topic => {
            const topicKey = `${currentRoadmapId}_${topic.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
            const isDone = !!userProgress[topicKey];

            return `
              <div
                class="rm-checklist-row ${isDone ? 'completed' : ''}"
                data-topic-key="${topicKey}"
                data-name="${topic.name}"
                data-type="${topic.type}"
                onclick="handleChecklistRowClick(event, '${topicKey}', this)"
              >
                <label class="rm-check-label">
                  <input
                    type="checkbox"
                    class="rm-check-input"
                    ${isDone ? 'checked' : ''}
                    onchange="handleCheckboxChange(event, '${topicKey}')"
                  />
                  <span>${topic.name}</span>
                  ${topic.type === 'core' ? '<span class="core-dot" title="Core Required">★ Core</span>' : ''}
                </label>
                <button
                  type="button"
                  class="btn-ghost-sm"
                  onclick="event.stopPropagation(); triggerModalFromChecklist('${currentRoadmapId}', '${topic.name}')"
                  style="font-size:0.75rem; padding: 0.25rem 0.6rem;"
                >
                  View Details ↗
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

window.handleChecklistRowClick = function(e, topicKey, rowEl) {
  if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'button') {
    return;
  }
  toggleTopicProgress(topicKey);
};

window.handleCheckboxChange = function(e, topicKey) {
  e.stopPropagation();
  toggleTopicProgress(topicKey);
};

window.triggerModalFromChecklist = function(roadmapId, topicName) {
  const data = ROADMAP_DATA[roadmapId];
  if (!data) return;

  for (const phase of data.phases) {
    const topic = phase.topics.find(t => t.name === topicName);
    if (topic) {
      const topicKey = `${roadmapId}_${topic.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
      const fakeBtn = {
        getAttribute: (attr) => {
          if (attr === 'data-topic-key') return topicKey;
          if (attr === 'data-name') return topic.name;
          if (attr === 'data-type') return topic.type;
          if (attr === 'data-desc') return encodeURIComponent(topic.desc);
          if (attr === 'data-command') return encodeURIComponent(topic.command || '');
          if (attr === 'data-doc') return encodeURIComponent(topic.docUrl || '');
          if (attr === 'data-phase') return `${phase.number}. ${phase.title}`;
          return null;
        }
      };
      openTopicModal(fakeBtn);
      return;
    }
  }
};

/* ─── Progress Bar ─── */
function updateProgressBar() {
  const data = ROADMAP_DATA[currentRoadmapId];
  if (!data) return;

  let totalTopics = 0;
  let completedTopics = 0;

  data.phases.forEach(p => {
    p.topics.forEach(t => {
      totalTopics++;
      const topicKey = `${currentRoadmapId}_${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
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
  if (countEl) countEl.textContent = `${completedTopics} / ${totalTopics} Topics Done`;
}

function initProgressActions() {
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your saved progress for this roadmap?')) {
        const data = ROADMAP_DATA[currentRoadmapId];
        if (data) {
          data.phases.forEach(p => {
            p.topics.forEach(t => {
              const topicKey = `${currentRoadmapId}_${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
              delete userProgress[topicKey];
            });
          });
          saveProgress();
          renderRoadmap(currentRoadmapId);
          showToast('Progress has been reset');
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
            const topicKey = `${currentRoadmapId}_${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
            userProgress[topicKey] = true;
          });
        });
        saveProgress();
        renderRoadmap(currentRoadmapId);
        showToast('All topics marked as completed! 🎉');
      }
    });
  }
}

/* ─── Share Roadmap Link ─── */
function initShareAction() {
  const shareBtn = document.getElementById('share-roadmap-btn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?id=${currentRoadmapId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Roadmap link copied to clipboard! 📋');
      }).catch(() => {
        prompt('Copy this roadmap link:', shareUrl);
      });
    } else {
      prompt('Copy this roadmap link:', shareUrl);
    }
  });
}

function showToast(message) {
  let toast = document.querySelector('.rm-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'rm-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
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
  const docUrl = decodeURIComponent(btn.getAttribute('data-doc') || '');
  const phase = btn.getAttribute('data-phase');

  const titleEl = document.getElementById('modal-topic-title');
  const phaseEl = document.getElementById('modal-topic-phase');
  const typeBadgeEl = document.getElementById('modal-type-badge');
  const descEl = document.getElementById('modal-topic-desc');
  const cmdWrap = document.getElementById('modal-command-wrap');
  const cmdCode = document.getElementById('modal-command-code');
  const docWrap = document.getElementById('modal-doc-wrap');
  const docLink = document.getElementById('modal-doc-link');
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

  if (docWrap && docLink) {
    if (docUrl) {
      docWrap.style.display = 'block';
      docLink.href = docUrl;
    } else {
      docWrap.style.display = 'none';
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
