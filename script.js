document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const selectedLabel = document.getElementById('selectedType');
  const usernameInput = document.getElementById('username');
  const registerBtn = document.getElementById('registerBtn');

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