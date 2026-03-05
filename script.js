/* ===== AUTO YEAR ===== */
document.getElementById('footer-year').textContent = new Date().getFullYear();

/* ===== ANIMATED BACKGROUND CANVAS ===== */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      r: randomBetween(0.8, 2.2),
      dx: randomBetween(-0.15, 0.15),
      dy: randomBetween(-0.15, 0.15),
      opacity: randomBetween(0.2, 0.6),
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < 90; i++) particles.push(createParticle());
  }

  function drawLine(a, b, dist) {
    const op = 1 - dist / 160;
    ctx.strokeStyle = `rgba(99,179,237,${op * 0.08})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // draw particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,179,237,${p.opacity})`;
      ctx.fill();
    }
    // lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) drawLine(particles[i], particles[j], d);
      }
    }
  }

  function update() {
    for (const p of particles) {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    }
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }

  window.addEventListener('resize', () => { resize(); init(); });
  resize(); init(); loop();
})();

/* ===== TYPED TEXT ===== */
(function () {
  const phrases = [
    'Full-Stack Developer',
    'Backend Engineer',
    'Cloud & DevOps Enthusiast',
    'Network & Security Builder',
    'AI / RAG App Architect',
  ];
  const el = document.querySelector('.typed-text');
  if (!el) return;
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (deleting) {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 500); return; }
      setTimeout(tick, 45);
    } else {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(tick, 2000); return; }
      setTimeout(tick, 80);
    }
  }
  tick();
})();

/* ===== SCROLL REVEAL ===== */
(function () {
  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ===== SKILL BAR ANIMATION ===== */
(function () {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.style.transform = 'scaleX(1)';
        observer.unobserve(e.target);
      }
    }
  }, { threshold: 0.4 });
  bars.forEach(b => observer.observe(b));
})();

/* ===== ACTIVE NAV LINK ===== */
(function () {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // scrolled class
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // active section
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });
})();

/* ===== CONTACT FORM ===== */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '✓ Message sent!';
    btn.style.background = 'linear-gradient(135deg, #68d391, #38b2ac)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();
