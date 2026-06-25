document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const selectedLabel = document.getElementById('selectedType');
  const usernameInput = document.getElementById('username');
  const registerBtn = document.getElementById('registerBtn');
  const nombre = document.getElementById('nombre').value.trim();
// ... validación y contadores ...


  let selectedType = null;

  const counters = {
    Pilas: 0,
    Cables: 0,
    Accesorios: 0,
    Dispositivos: 0,
    total: 0,
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedType = card.dataset.type;
      selectedLabel.textContent = selectedType;
    });
  });

  registerBtn.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    if (!name) {
      alert('Por favor, ingresa tu nombre antes de registrar. 🌱');
      usernameInput.focus();
      return;
    }
    if (!selectedType) {
      alert('Selecciona un tipo de residuo para reciclar. ♻️');
      return;
    }

    counters[selectedType] += 1;
    counters.total += 1;
    animateCount(`count-${selectedType}`, counters[selectedType]);
    animateCount('count-total', counters.total);

    alert(`¡Gracias ${name}! Registraste 1 ${selectedType.toLowerCase()} ♻️`);

    usernameInput.value = '';
    cards.forEach((c) => c.classList.remove('selected'));
    selectedType = null;
    selectedLabel.textContent = 'Ninguno';
  });

  function animateCount(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const start = parseInt(el.textContent, 10) || 0;
    const duration = 500;
    const startTime = performance.now();
    function tick(now) {
      const p = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(start + (target - start) * p);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Nav active link on scroll
  const links = document.querySelectorAll('.nav-menu a');
  const sections = ['inicio', 'nosotros', 'punto', 'impacto']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    let current = 'inicio';
    sections.forEach((s) => { if (s.offsetTop <= y) current = s.id; });
    links.forEach((l) => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  });
});
/* ===== HOJAS DE OTOÑO CAYENDO ===== */
(function () {
  const container = document.createElement('div');
  container.id = 'leaves-container';
  document.body.appendChild(container);

  const leaves = ['🍂', '🍁', '🍃'];

  function spawnLeaf() {
    const leaf = document.createElement('span');
    leaf.className = 'leaf';
    leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
    const duration = 6 + Math.random() * 6;
    leaf.style.animationDuration = duration + 's';
    leaf.style.setProperty('--drift', (Math.random() * 300 - 150) + 'px');
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);
  }

  setInterval(spawnLeaf, 600);
  for (let i = 0; i < 6; i++) setTimeout(spawnLeaf, i * 200);
})();

/* ===== MODAL DE FELICITACIONES ===== */
function mostrarFelicitaciones(nombre = '') {
  // Confeti
  const colores = ['#ff6b6b', '#ffd93d', '#6bcB77', '#4d96ff', '#b66bff', '#ff9f43'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colores[Math.floor(Math.random() * colores.length)];
    c.style.animationDelay = Math.random() * 1.5 + 's';
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4500);
  }

  const overlay = document.createElement('div');
  overlay.className = 'congrats-overlay';
  overlay.innerHTML = `
    <div class="congrats-box">
      <span class="emoji">🌍</span>
      <h1>¡Felicitaciones${nombre ? ', ' + nombre : ''}!</h1>
      <p>Tu registro fue exitoso ✨</p>
      <p><strong>Gracias por ayudar a construir un mundo mejor 🌱💚</strong></p>
      <p>Cada residuo reciclado cuenta. ¡Sigamos cuidando el planeta!</p>
      <button class="congrats-close">¡Genial!</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.querySelector('.congrats-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
}
