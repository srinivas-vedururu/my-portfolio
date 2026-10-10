// ===== MATRIX RAIN =====
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, columns, drops;

  function init() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    columns = Math.floor(W / 18);
    drops = Array(columns).fill(1);
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|<>/01010110101001011010110';

  function drawMatrix() {
    ctx.fillStyle = 'rgba(2, 10, 15, 0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ffcc';
    ctx.font = '14px Share Tech Mono';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.98 ? '#ffffff' : '#00ffcc';
      ctx.fillText(char, i * 18, drops[i] * 18);
      if (drops[i] * 18 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  init();
  window.addEventListener('resize', init);
  setInterval(drawMatrix, 50);
})();

// ===== TYPING EFFECT =====
(function () {
  const roles = ['Data Scientist', 'Data Analyst', 'ML Engineer', 'AI Engineer', 'Business Analyst'];
  const el = document.getElementById('typing-role');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
})();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function () {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);

  // Active link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', function () {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ===== RESUME PROFILE SELECTOR =====
const resumeProfiles = {
  'data-analyst': {
    filename: 'resume-data-analyst.pdf',
    label: 'Download Data Analyst Resume'
  },
  'data-scientist': {
    filename: 'resume-data-scientist.pdf',
    label: 'Download Data Scientist Resume'
  },
  'ai-ml': {
    filename: 'resume-ai-ml.pdf',
    label: 'Download AI ML Resume'
  }
};

const resumeLink = document.getElementById('resume-link');
const resumeButtons = document.querySelectorAll('.resume-profile-btn');
const copyEmailBtn = document.getElementById('copy-email-btn');

if (copyEmailBtn) {
  const defaultCopyLabel = copyEmailBtn.textContent;

  async function copyEmailAddress() {
    const email = copyEmailBtn.dataset.copy || 'srinivasvedururu@gmail.com';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = email;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      copyEmailBtn.textContent = 'Copied!';
      copyEmailBtn.classList.add('copied');
      setTimeout(() => {
        copyEmailBtn.textContent = defaultCopyLabel;
        copyEmailBtn.classList.remove('copied');
      }, 1500);
    } catch (error) {
      copyEmailBtn.textContent = 'Failed';
      setTimeout(() => {
        copyEmailBtn.textContent = defaultCopyLabel;
      }, 1500);
    }
  }

  copyEmailBtn.addEventListener('click', copyEmailAddress);
}

function updateResumeSelection(profileKey) {
  if (!resumeLink) return;

  const profile = resumeProfiles[profileKey] || resumeProfiles['data-analyst'];
  const resumePath = `resumes/${profile.filename}`;
  resumeLink.setAttribute('href', resumePath);
  resumeLink.setAttribute('download', profile.filename);
  const label = resumeLink.querySelector('.contact-label');
  if (label) label.textContent = profile.label;

  resumeButtons.forEach(btn => {
    const active = btn.dataset.profile === profileKey;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

resumeButtons.forEach(button => {
  button.addEventListener('click', () => updateResumeSelection(button.dataset.profile));
});

if (resumeLink) {
  updateResumeSelection('data-analyst');
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { el.textContent = target; clearInterval(timer); return; }
      el.textContent = Math.floor(current);
    }, 40);
  });
}


// ===== CENTRALIZED TECH STACK DATA =====
// Add, remove, or recategorize technologies here without touching HTML markup
const TECH_STACK_DATA = [
  // Programming
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    categoryLabel: 'Programming',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path fill="#387EB8" d="M11.91 2c-3.14 0-5.01 1.36-5.01 4.05v2.1h5.13v.7H4.7C1.96 8.85.62 10.7.62 13.84c0 3.12 1.32 5 4.08 5h1.88v-2.52c0-2.56 1.9-4.46 4.46-4.46h5.12V6.76c0-2.7-1.86-4.06-5.02-4.06h1.52V2h-1.52zm-2.72 1.66a.84.84 0 1 1 0 1.68.84.84 0 0 1 0-1.68z"/><path fill="#FFE873" d="M12.19 22c3.14 0 5.01-1.36 5.01-4.05v-2.1h-5.13v-.7h7.33c2.74 0 4.08-1.85 4.08-5 0-3.11-1.32-5-4.08-5h-1.88v2.52c0 2.56-1.9 4.46-4.46 4.46H7.94v5.12c0 2.7 1.86 4.06 5.02 4.06h-1.52V22h1.52zm2.72-1.66a.84.84 0 1 1 0-1.68.84.84 0 0 1 0 1.68z"/></svg>'
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'programming',
    categoryLabel: 'Programming',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="#00ffcc"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="#00ffcc"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#00b8ff"/></svg>'
  },

  // Data Science & Analytics
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'data-science',
    categoryLabel: 'Data Science & Analytics',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><rect x="4" y="2" width="4" height="9" rx="1" fill="#150458"/><rect x="10" y="5" width="4" height="15" rx="1" fill="#E70488"/><rect x="16" y="8" width="4" height="14" rx="1" fill="#00ffcc"/><rect x="4" y="14" width="4" height="8" rx="1" fill="#ff5f56"/></svg>'
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'data-science',
    categoryLabel: 'Data Science & Analytics',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#013243" stroke="#4DABCF" stroke-width="1.2"/><path d="M7 8.5v7l3-1.6v-3.7l4 3.7 3-1.6v-7l-3 1.6v3.7l-4-3.7L7 8.5z" fill="#4DABCF"/></svg>'
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'data-science',
    categoryLabel: 'Data Science & Analytics',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#11557c" stroke-width="1.5" fill="rgba(17,85,124,0.15)"/><path d="M4 14.5c2.5-3 5-7.5 8-2s5 3 8-1" stroke="#00ffcc" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12.5" r="2.2" fill="#39ff14"/><circle cx="8" cy="9.5" r="1.8" fill="#00b8ff"/><circle cx="17" cy="13.5" r="1.8" fill="#FFD43B"/></svg>'
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    category: 'data-science',
    categoryLabel: 'Data Science & Analytics',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="4" fill="rgba(76,114,176,0.18)" stroke="#4C72B0" stroke-width="1.2"/><path d="M5 18c2-6 5-13 8-10s4 11 6 3" stroke="#4C72B0" stroke-width="2" stroke-linecap="round"/><path d="M5 18c2-6 5-13 8-10s4 11 6 3" stroke="#00ffcc" stroke-width="1.2" stroke-dasharray="2 2"/></svg>'
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    category: 'data-science',
    categoryLabel: 'Data Science & Analytics',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><rect x="4" y="11" width="4" height="10" rx="1" fill="#F2C811"/><rect x="10" y="7" width="4" height="14" rx="1" fill="#E6AD10"/><rect x="16" y="3" width="4" height="18" rx="1" fill="#F2C811"/><path d="M4 11h3v10H4z" fill="#D1960D" opacity="0.3"/></svg>'
  },
  {
    id: 'excel',
    name: 'Excel',
    category: 'data-science',
    categoryLabel: 'Data Science & Analytics',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><rect x="2" y="3" width="20" height="18" rx="3" fill="#107C41"/><path d="M14 7h6v10h-6z" fill="#21A366"/><path d="M5.5 8l3 4-3 4h2l2-2.8 2 2.8h2l-3-4 3-4h-2l-2 2.8-2-2.8h-2z" fill="#fff"/></svg>'
  },

  // AI & Machine Learning
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'ai-machine-learning',
    categoryLabel: 'AI & Machine Learning',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#3499CD" stroke-width="1.4" fill="rgba(52,153,205,0.12)"/><path d="M6 15c2-4 5-7 9-7" stroke="#F89939" stroke-width="2.2" stroke-linecap="round"/><path d="M9 18c3-1 6-4 9-9" stroke="#3499CD" stroke-width="2.2" stroke-linecap="round"/><circle cx="15" cy="8" r="1.8" fill="#F89939"/><circle cx="18" cy="9" r="1.8" fill="#3499CD"/><circle cx="6" cy="15" r="1.8" fill="#F89939"/></svg>'
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai-machine-learning',
    categoryLabel: 'AI & Machine Learning',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M13.5 3a7.5 7.5 0 0 0-4.8 13.2l-2.4 2.4 1.4 1.4 2.4-2.4A7.5 7.5 0 1 0 13.5 3zm0 13a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" fill="#EE4C2C"/><circle cx="16" cy="7" r="1.3" fill="#EE4C2C"/></svg>'
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    category: 'ai-machine-learning',
    categoryLabel: 'AI & Machine Learning',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#00b8ff" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="rgba(0,255,204,0.16)" stroke="#00ffcc" stroke-width="1.6"/><path d="M8 18l1.8-3.4M16 18l-1.8-3.4M8 6l1.8 3.4M16 6l-1.8 3.4" stroke="#00b8ff" stroke-width="1.2" stroke-linecap="round"/></svg>'
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    category: 'ai-machine-learning',
    categoryLabel: 'AI & Machine Learning',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="4" fill="rgba(24,159,89,0.15)" stroke="#189F59" stroke-width="1.2"/><path d="M7 6l4 6-4 6h2.5l2.8-4.2 2.8 4.2H18l-4-6 4-6h-2.5L12.7 10 9.5 6H7z" fill="#189F59"/><path d="M13 3l5 3-5 3V3z" fill="#00ffcc"/></svg>'
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'ai-machine-learning',
    categoryLabel: 'AI & Machine Learning',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#10A37F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.7 14a4.4 4.4 0 0 0 .3-1.6 4.5 4.5 0 0 0-3.9-4.5V6a4.5 4.5 0 0 0-6.1-2.9L8.8 3.9a4.5 4.5 0 0 0-4.5 3.9 4.4 4.4 0 0 0-1.6 3.6 4.5 4.5 0 0 0 1.6 3.4 4.4 4.4 0 0 0-.3 1.6 4.5 4.5 0 0 0 3.9 4.5v1.9a4.5 4.5 0 0 0 6.1 2.9l1.2-.8a4.5 4.5 0 0 0 4.5-3.9 4.4 4.4 0 0 0 1.6-3.6 4.5 4.5 0 0 0-1.6-3.4z"/><circle cx="12" cy="12" r="2.2" fill="#10A37F"/></svg>'
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai-machine-learning',
    categoryLabel: 'AI & Machine Learning',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#00A67E" stroke-width="1.4" fill="rgba(0,166,126,0.12)"/><path d="M9 10a2.5 2.5 0 0 1 3.5-2.3l1.8 1.8a2.5 2.5 0 0 1 0 3.5l-1 1" stroke="#39FF14" stroke-width="1.8" stroke-linecap="round"/><path d="M15 14a2.5 2.5 0 0 1-3.5 2.3l-1.8-1.8a2.5 2.5 0 0 1 0-3.5l1-1" stroke="#00ffcc" stroke-width="1.8" stroke-linecap="round"/></svg>'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'ai-machine-learning',
    categoryLabel: 'AI & Machine Learning',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#FFD21E"/><ellipse cx="9" cy="10" rx="1.5" ry="2" fill="#000"/><ellipse cx="15" cy="10" rx="1.5" ry="2" fill="#000"/><path d="M8.5 14.5c1 1.8 6 1.8 7 0" stroke="#000" stroke-width="1.5" stroke-linecap="round"/><path d="M3 13c1.5 2 3.5 2 4.5 0M21 13c-1.5 2-3.5 2-4.5 0" stroke="#E6A800" stroke-width="1.8" stroke-linecap="round"/></svg>'
  },
  // Tools & Platforms
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M21.6 10.7l-8.3-8.3a1.8 1.8 0 0 0-2.6 0l-1.8 1.8 3.3 3.3a2.2 2.2 0 0 1 2.8 2.8l3.2 3.2a2.2 2.2 0 1 1-1.3 1.3l-3-3v4.6a2.2 2.2 0 1 1-1.8 0V11a2.2 2.2 0 0 1-1.2-2.9L7.3 4.5 2.4 9.4a1.8 1.8 0 0 0 0 2.6l8.3 8.3a1.8 1.8 0 0 0 2.6 0l8.3-8.3a1.8 1.8 0 0 0 0-2.6z" fill="#F05032"/></svg>'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>'
  },
  {
    id: 'jupyter',
    name: 'Jupyter Notebook',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M12 4.5c4.1 0 7.5 1.3 7.5 3s-3.4 3-7.5 3-7.5-1.3-7.5-3 3.4-3 7.5-3z" stroke="#F37626" stroke-width="1.8"/><path d="M12 13.5c4.1 0 7.5 1.3 7.5 3s-3.4 3-7.5 3-7.5-1.3-7.5-3 3.4-3 7.5-3z" stroke="#F37626" stroke-width="1.8"/><circle cx="5" cy="8" r="1.5" fill="#9E9E9E"/><circle cx="19" cy="16" r="1.5" fill="#9E9E9E"/><circle cx="19" cy="7.5" r="1.2" fill="#F37626"/><circle cx="5" cy="16.5" r="1.2" fill="#F37626"/></svg>'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M17.5 2.5l-9.8 8.8L3.5 8l-1.5 1 3.5 3-3.5 3 1.5 1 4.2-3.3 9.8 8.8 4.5-2.2V4.7l-4.5-2.2zm0 4.2v10.6l-5.5-5.3 5.5-5.3z" fill="#007ACC"/></svg>'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#336791" stroke-width="1.4" fill="rgba(51,103,145,0.12)"/><path d="M12 5c-3.5 0-6 2.5-6 6 0 4 2.5 7 5 7s2-2 3-3 3 1 4.5-.5c1.2-1.2 1.5-3.5.5-5.5-1-2-3.5-4-7-4z" stroke="#336791" stroke-width="1.5" stroke-linecap="round"/><path d="M9 11c0 1 .5 2 1.5 2s1.5-1 1.5-2" stroke="#336791" stroke-width="1.2"/><circle cx="9" cy="9.5" r="1" fill="#00ffcc"/></svg>'
  },
  {
    id: 'colab',
    name: 'Google Colab',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M7 8a4 4 0 0 0 0 8c2.5 0 4.5-3.5 5-4-.5-.5-2.5-4-5-4z" stroke="#F9AB00" stroke-width="2.2" stroke-linecap="round"/><path d="M17 8a4 4 0 0 1 0 8c-2.5 0-4.5-3.5-5-4 .5-.5 2.5-4 5-4z" stroke="#E37400" stroke-width="2.2" stroke-linecap="round"/></svg>'
  }
];

// Render tech cards dynamically from data
function renderTechCards(activeCategory = 'all') {
  const container = document.getElementById('tech-cards-grid');
  if (!container) return;

  container.innerHTML = '';

  TECH_STACK_DATA.forEach(tech => {
    const isVisible = activeCategory === 'all' || tech.category === activeCategory;
    const card = document.createElement('div');
    card.className = `tech-card ${isVisible ? '' : 'hidden'}`;
    card.setAttribute('data-category', tech.category);
    card.setAttribute('data-id', tech.id);
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${tech.name} (${tech.categoryLabel})`);

    card.innerHTML = `
      <div class="tech-card-icon-wrap">${tech.icon}</div>
      <div class="tech-card-info">
        <span class="tech-card-name">${tech.name}</span>
        <span class="tech-card-cat">${tech.categoryLabel}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

// Update category filter count badges dynamically
function updateTechCounts() {
  const counts = {
    all: TECH_STACK_DATA.length,
    programming: 0,
    'data-science': 0,
    'ai-machine-learning': 0,
    tools: 0
  };

  TECH_STACK_DATA.forEach(tech => {
    if (counts[tech.category] !== undefined) {
      counts[tech.category]++;
    }
  });

  document.querySelectorAll('.tech-filter-btn').forEach(btn => {
    const cat = btn.dataset.category;
    const badge = btn.querySelector('.tech-count-badge');
    if (badge && counts[cat] !== undefined) {
      badge.textContent = counts[cat];
    }
  });
}

// Initialize tech stack filters and keyboard navigation
function initTechStackFilters() {
  const filterButtons = Array.from(document.querySelectorAll('.tech-filter-btn'));
  const container = document.getElementById('tech-cards-grid');
  if (!filterButtons.length || !container) return;

  function filterCategory(category, targetButton) {
    // Update active tab states
    filterButtons.forEach(btn => {
      const isActive = btn === targetButton;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Update cards with smooth transition
    const cards = container.querySelectorAll('.tech-card');
    cards.forEach(card => {
      const match = category === 'all' || card.dataset.category === category;
      if (match) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(6px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Click handler
  filterButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      filterCategory(btn.dataset.category, btn);
    });

    // Accessible keyboard navigation (ArrowLeft, ArrowRight, Home, End)
    btn.addEventListener('keydown', (e) => {
      let targetIndex = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetIndex = (index + 1) % filterButtons.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetIndex = (index - 1 + filterButtons.length) % filterButtons.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = filterButtons.length - 1;
      }

      if (targetIndex !== -1) {
        e.preventDefault();
        filterButtons[targetIndex].focus();
        filterCategory(filterButtons[targetIndex].dataset.category, filterButtons[targetIndex]);
      }
    });
  });
}

// Expose on window for easy programmatic manipulation
window.TECH_STACK_DATA = TECH_STACK_DATA;
window.refreshTechStack = renderTechCards;

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');

    // Animate metric bars
    entry.target.querySelectorAll('.metric-bar').forEach(bar => {
      const w = bar.dataset.width;
      setTimeout(() => bar.style.width = w + '%', 100);
    });

    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', function () {
  const emailJsConfig = {
    publicKey: 'T9isJC9a6SN32eMDp',
    serviceId: 'service_19bx8r8',
    templateId: 'template_61ysdlq'
  };
  let emailJsInitialized = false;

  if (window.emailjs) {
    try {
      window.emailjs.init({ publicKey: emailJsConfig.publicKey });
      emailJsInitialized = true;
    } catch (error) {
      console.error('EmailJS initialization failed:', error);
    }
  }

  // Add reveal class to sections
  document.querySelectorAll('.section').forEach(s => {
    s.classList.add('reveal');
    observer.observe(s);
  });

  // Hero counter animation on load
  setTimeout(animateCounters, 500);

  // Initialize Tech Stack grid, counts & filters
  renderTechCards('all');
  updateTechCounts();
  initTechStackFilters();


  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const message = formData.get('message').trim();
      const submitButton = document.getElementById('submit-btn');
      const status = document.getElementById('form-success');

      status.hidden = true;
      status.classList.remove('form-failure');

      if (!emailJsInitialized || !window.emailjs) {
        status.textContent = 'The message service is unavailable right now. Please try again later.';
        status.classList.add('form-failure');
        status.hidden = false;
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'SENDING...';

      window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
        name,
        email,
        subject: `Portfolio inquiry from ${name}`,
        message
      })
        .then(() => {
          status.textContent = "Your message has been sent successfully! I'll get back to you soon.";
          status.hidden = false;
          form.reset();
        })
        .catch(error => {
          console.error('EmailJS failed to send the contact form:', {
            status: error && error.status,
            text: error && error.text,
            error
          });
          status.textContent = 'Your message could not be sent. Please try again in a moment.';
          status.classList.add('form-failure');
          status.hidden = false;
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = 'SEND MESSAGE';
        });
    });
  }

  // Smooth nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.nav-links').classList.remove('open');
      }
    });
  });

  // Card glows on mouse move
  document.querySelectorAll('.project-card, .experience-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
  });
});
