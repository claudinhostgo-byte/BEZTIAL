/* ============================================================
   Beztial — site behaviour
   Ported from the Claude Design prototype Beztial.dc.html:
   bilingual copy, the two-layer hero video crossfade, and the
   cursor smoke trail.
   ============================================================ */
(() => {
  'use strict';

  // ---- Config (the prototype's editable props) ----
  const DEFAULT_LANG = 'es';
  const VIDEO_BG = true;
  const SHOW_PRICES = true;
  const WA = '56984217730';
  const IG = 'https://instagram.com/beztial';

  // ---- Copy ----
  const COPY = {
    es: {
      nav: { concepto: 'Concepto', carta: 'Carta', azotea: 'La Azotea', reservar: 'Reservar' },
      hero: {
        kicker: 'Parrilla de altura · Colina, Santiago',
        title: 'El fuego como ritual',
        sub: 'Cortes premium madurados sobre brasa viva, frente a una vista que abraza la cordillera.',
        cta: 'Reservar mesa', cta2: 'Ver la carta', scroll: 'Desliza'
      },
      concepto: {
        label: 'El Concepto',
        title: 'Fuego, mar y tierra en su forma más honesta',
        body1: 'Beztial nace en la azotea de un nuevo proyecto en Colina: una parrilla contemporánea donde el producto manda y el fuego decide. Carnes maduradas en casa, pescados del día y vegetales al rescoldo, servidos sin artificios.',
        body2: 'Cocina de brasa hecha por manos que entienden el tiempo, la sal y la paciencia. Cada corte pasa por nuestra cámara de maduración antes de tocar la parrilla.',
        s1: 'Días de maduración', s2: 'Piso de altura', s3: 'Vista cordillera',
        tag: 'Maduración en casa'
      },
      carta: {
        label: 'La Carta',
        title: 'Selección de la casa',
        intro: 'Una carta breve y precisa. Producto de temporada, brasa de espino y la mano justa.',
        note: 'Precios en pesos chilenos (CLP). Carta sujeta a disponibilidad de temporada.'
      },
      azotea: {
        label: 'La Experiencia',
        title: 'Una azotea sobre Colina',
        body: 'En el piso 14, Beztial abre el cielo de Colina: atardeceres sobre los Andes, fuego al centro y una terraza pensada para quedarse. Un destino dentro del proyecto inmobiliario, reservado para quienes buscan algo más alto.',
        l1: 'Dirección', l2: 'Horario', l3: 'Reservas',
        addr: 'Camino El Cerro 4500, Piso 14 · Colina, Santiago',
        hours: 'Martes a Domingo · 13:00 – 00:00 · Lunes cerrado',
        phone: '+56 9 8421 7730',
        cta: 'Reservar por WhatsApp'
      },
      band: { kicker: 'Brasa de espino', quote: '“El producto manda, el fuego decide.”' },
      espacio: { kicker: 'El Espacio', line: 'Piso 14 · una terraza sobre Colina' },
      footer: { tagline: 'Fuego · Mar · Tierra', rights: '© 2026 Beztial · Colina, Santiago · Todos los derechos reservados' }
    },
    en: {
      nav: { concepto: 'Concept', carta: 'Menu', azotea: 'The Rooftop', reservar: 'Reserve' },
      hero: {
        kicker: 'Rooftop grill · Colina, Santiago',
        title: 'Fire as ritual',
        sub: 'Premium dry-aged cuts over live embers, facing a view that wraps around the Andes.',
        cta: 'Book a table', cta2: 'View the menu', scroll: 'Scroll'
      },
      concepto: {
        label: 'The Concept',
        title: 'Fire, sea and earth at their most honest',
        body1: 'Beztial is born on the rooftop of a new development in Colina: a contemporary grill where the product leads and the fire decides. House-aged meats, day-boat fish and ember-roasted vegetables, served without artifice.',
        body2: 'Ember cooking by hands that understand time, salt and patience. Every cut passes through our aging chamber before it touches the grill.',
        s1: 'Days of aging', s2: 'Floors up', s3: 'Andes view',
        tag: 'House dry-aging'
      },
      carta: {
        label: 'The Menu',
        title: 'House selection',
        intro: 'A short, precise menu. Seasonal product, espino-wood embers and a steady hand.',
        note: 'Prices in Chilean pesos (CLP). Menu subject to seasonal availability.'
      },
      azotea: {
        label: 'The Experience',
        title: 'A rooftop above Colina',
        body: 'On the 14th floor, Beztial opens up the Colina sky: sunsets over the Andes, fire at the center and a terrace made to linger. A destination within the development, reserved for those after something higher.',
        l1: 'Address', l2: 'Hours', l3: 'Bookings',
        addr: 'Camino El Cerro 4500, Floor 14 · Colina, Santiago',
        hours: 'Tuesday to Sunday · 1:00 PM – 12:00 AM · Closed Mondays',
        phone: '+56 9 8421 7730',
        cta: 'Reserve via WhatsApp'
      },
      band: { kicker: 'Espino-wood embers', quote: '“The product leads, the fire decides.”' },
      espacio: { kicker: 'The Space', line: 'Floor 14 · a terrace above Colina' },
      footer: { tagline: 'Fire · Sea · Earth', rights: '© 2026 Beztial · Colina, Santiago · All rights reserved' }
    }
  };

  // img: thumbnail shown beside each dish (enlarges on hover). Mapped by type:
  //   imagen1 = pescado · imagen2 = pulpo · imagen3 = wagyu · imagen4 = carne.
  //   Tierra (verduras/frutas) has no photo yet — leave img unset.
  const MENU = {
    es: [
      { name: 'Fuego · Carnes', items: [
        { name: 'Ojo de Bife Madurado 45 Días', desc: 'Brasa de espino, sal de Maras y manteca de hierbas ahumadas.', price: '$34.000', img: 'assets/imagen4.png' },
        { name: 'Wagyu A5 al Rescoldo', desc: 'Marmoleo sellado sobre brasa viva, jugo reducido al malbec y tuétano.', price: '$54.000', img: 'assets/imagen3.png' },
        { name: 'Cordero Patagónico a las Brasas', desc: 'Ocho horas de cocción lenta, costra de romero y ajo negro.', price: '$31.000', img: 'assets/imagen4.png' },
        { name: 'Mollejas Glaseadas al Fuego', desc: 'Crocantes por fuera, limón quemado y miel de ulmo.', price: '$19.000', img: 'assets/imagen4.png' }
      ]},
      { name: 'Mar · Pescados y Mariscos', items: [
        { name: 'Pulpo a la Brasa', desc: 'Tentáculo ahumado, puré de papa andina y aceite de pimentón.', price: '$26.000', img: 'assets/imagen2.png' },
        { name: 'Corvina a la Parrilla', desc: 'Pesca del día, emulsión de erizo y algas crujientes.', price: '$30.000', img: 'assets/imagen1.png' },
        { name: 'Ostiones Sellados al Fuego', desc: 'Sobre su concha, beurre blanc cítrico y caviar de limón.', price: '$28.000', img: 'assets/imagen1.png' },
        { name: 'Camarones al Carbón', desc: 'Mantequilla de ajo asado, lima y un toque de merkén.', price: '$24.000', img: 'assets/imagen1.png' }
      ]},
      { name: 'Tierra · Verduras y Frutas', items: [
        { name: 'Verduras de Estación al Rescoldo', desc: 'Raíces asadas en la ceniza, romesco de avellana tostada.', price: '$14.000' },
        { name: 'Provoleta de Campo a la Brasa', desc: 'Provolone fundido, orégano fresco y tomate confitado.', price: '$13.000' },
        { name: 'Zapallo Camote al Fuego', desc: 'Glaseado de miel y comino, yogurt de cabra y granada.', price: '$13.000' },
        { name: 'Duraznos a la Parrilla', desc: 'Fruta caramelizada al fuego, helado de vainilla y almendra tostada.', price: '$11.000' }
      ]}
    ],
    en: [
      { name: 'Fire · Meats', items: [
        { name: '45-Day Dry-Aged Ribeye', desc: 'Espino-wood embers, Maras salt and smoked herb butter.', price: '$34.000', img: 'assets/imagen4.png' },
        { name: 'A5 Wagyu over Embers', desc: 'Marbling seared over live fire, malbec-reduced jus and marrow.', price: '$54.000', img: 'assets/imagen3.png' },
        { name: 'Patagonian Lamb on the Grill', desc: 'Eight-hour slow cook, rosemary and black-garlic crust.', price: '$31.000', img: 'assets/imagen4.png' },
        { name: 'Fire-Glazed Sweetbreads', desc: 'Crisp outside, burnt lemon and ulmo honey.', price: '$19.000', img: 'assets/imagen4.png' }
      ]},
      { name: 'Sea · Fish & Seafood', items: [
        { name: 'Grilled Octopus', desc: 'Smoked tentacle, Andean potato purée and paprika oil.', price: '$26.000', img: 'assets/imagen2.png' },
        { name: 'Grilled Corvina', desc: "Day's catch, sea-urchin emulsion and crisp seaweed.", price: '$30.000', img: 'assets/imagen1.png' },
        { name: 'Fire-Seared Scallops', desc: 'On the shell, citrus beurre blanc and finger-lime caviar.', price: '$28.000', img: 'assets/imagen1.png' },
        { name: 'Charcoal Prawns', desc: 'Roasted garlic butter, lime and a touch of merkén.', price: '$24.000', img: 'assets/imagen1.png' }
      ]},
      { name: 'Earth · Vegetables & Fruit', items: [
        { name: 'Ember-Roasted Seasonal Vegetables', desc: 'Roots cooked in the ash, toasted-hazelnut romesco.', price: '$14.000' },
        { name: 'Grilled Farm Provoleta', desc: 'Melted provolone, fresh oregano and confit tomato.', price: '$13.000' },
        { name: 'Fire-Roasted Sweet Potato', desc: 'Honey-cumin glaze, goat yogurt and pomegranate.', price: '$13.000' },
        { name: 'Grilled Peaches', desc: 'Fire-caramelized fruit, vanilla ice cream and toasted almond.', price: '$11.000' }
      ]}
    ]
  };

  // ---- i18n rendering ----
  let lang = DEFAULT_LANG;

  const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

  function waLink() {
    const msg = lang === 'es'
      ? 'Hola Beztial, quisiera reservar una mesa.'
      : 'Hi Beztial, I would like to book a table.';
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }

  function renderMenu() {
    const host = document.querySelector('[data-menu]');
    if (!host) return;
    host.innerHTML = '';
    MENU[lang].forEach(cat => {
      const col = document.createElement('div');
      col.className = 'menu-cat';

      const h3 = document.createElement('h3');
      h3.className = 'menu-cat-title';
      h3.textContent = cat.name;
      col.appendChild(h3);

      cat.items.forEach(d => {
        const item = document.createElement('div');
        item.className = 'menu-item';
        if (d.img) item.classList.add('has-thumb');

        // Thumbnail (enlarges on hover / tap). Two <img>: a clipped small
        // square and a crisp larger preview that fades in above it.
        if (d.img) {
          const thumb = document.createElement('button');
          thumb.type = 'button';
          thumb.className = 'dish-thumb';
          thumb.setAttribute('aria-label', d.name);

          const small = document.createElement('img');
          small.className = 'thumb-small';
          small.src = d.img;
          small.alt = d.name;
          small.loading = 'lazy';
          thumb.appendChild(small);

          const zoom = document.createElement('img');
          zoom.className = 'thumb-zoom';
          zoom.src = d.img;
          zoom.alt = '';
          zoom.setAttribute('aria-hidden', 'true');
          thumb.appendChild(zoom);

          // Touch / click support — toggle an open state; the document
          // handler below closes any other open thumb.
          thumb.addEventListener('click', e => {
            e.preventDefault();
            const open = thumb.classList.contains('is-open');
            document.querySelectorAll('.dish-thumb.is-open').forEach(t => t.classList.remove('is-open'));
            if (!open) thumb.classList.add('is-open');
          });

          item.appendChild(thumb);
        }

        const body = document.createElement('div');
        body.className = 'menu-item-body';

        const head = document.createElement('div');
        head.className = 'menu-item-head';

        const name = document.createElement('span');
        name.className = 'menu-item-name';
        name.textContent = d.name;
        head.appendChild(name);

        if (SHOW_PRICES) {
          const price = document.createElement('span');
          price.className = 'menu-item-price';
          price.textContent = d.price;
          head.appendChild(price);
        }
        body.appendChild(head);

        const desc = document.createElement('p');
        desc.className = 'menu-item-desc';
        desc.textContent = d.desc;
        body.appendChild(desc);

        item.appendChild(body);
        col.appendChild(item);
      });
      host.appendChild(col);
    });
  }

  function render() {
    const t = COPY[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = get(t, el.getAttribute('data-i18n'));
      if (val != null) el.textContent = val;
    });

    const link = waLink();
    document.querySelectorAll('[data-wa]').forEach(a => { a.href = link; });

    const toggle = document.querySelector('[data-lang-toggle]');
    if (toggle) toggle.textContent = lang === 'es' ? 'EN' : 'ES';

    renderMenu();
  }

  function initLangToggle() {
    const btn = document.querySelector('[data-lang-toggle]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      lang = lang === 'es' ? 'en' : 'es';
      render();
    });
  }

  // ============================================================
  // Hero video crossfade — two stacked layers crossfade between the
  // clip's playable pieces: [0s → 2s] and [5s → 10s]. The 2s–5s
  // segment is skipped; the hand-off is a true video-to-video fade.
  // ============================================================
  function initHeroVideo() {
    if (!VIDEO_BG) return;
    const A = document.querySelector('[data-video="a"]');
    const B = document.querySelector('[data-video="b"]');
    if (!A || !B) return;

    // Swallow the benign autoplay "play() interrupted / background media
    // paused to save power" rejection some browsers fire.
    if (!window.__bzRejGuard) {
      window.__bzRejGuard = true;
      window.addEventListener('unhandledrejection', e => {
        const m = (e && e.reason && (e.reason.message || e.reason.name)) || '';
        if (/play\(\)|background media|interrupted/i.test(String(m))) e.preventDefault();
      });
    }

    const FADE = 2600;      // long, gentle crossfade duration (ms)
    const PLAY_END = 9.9;   // end of the [5,10] piece (clip ~10.0s)
    const SKIP_AT = 1.9;    // end of the [0,2] piece

    [A, B].forEach(v => { v.muted = true; v.removeAttribute('controls'); });

    let active = A, standby = B, activeStart = 0, fading = false, raf = 0;
    const nextStart = s => (s === 0 ? 5 : 0);
    const exitAt = s => (s === 0 ? SKIP_AT : PLAY_END);
    const play = v => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };

    A._op = 1; B._op = 0;
    A.style.opacity = '1'; B.style.opacity = '0';
    A.currentTime = 0; play(A);
    B.currentTime = 5;

    const tick = () => {
      if (!fading && active.paused) play(active);
      // manual crossfade (CSS transitions stall on these <video> layers)
      [A, B].forEach(v => {
        const target = v._op, cur = parseFloat(v.style.opacity) || 0;
        v.style.opacity = Math.abs(target - cur) < 0.004 ? target : (cur + (target - cur) * 0.022);
      });
      if (!fading && active.currentTime >= exitAt(activeStart)) {
        fading = true;
        active.pause();                       // hold last valid frame under the fade
        const sStart = nextStart(activeStart);
        standby.currentTime = sStart;
        play(standby);
        standby._op = 1;
        active._op = 0;
        setTimeout(() => {
          const old = active;
          active = standby; standby = old;
          activeStart = sStart;
          standby.pause();
          standby.currentTime = nextStart(activeStart);  // pre-roll next piece
          fading = false;
        }, FADE + 80);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  // ============================================================
  // Cursor smoke trail — a subtle drifting trail that follows the
  // cursor across the whole page.
  // ============================================================
  function initSmoke() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = document.getElementById('bz-smoke');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W, H;
    const resize = () => {
      W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize);

    const parts = [];
    let lastX = null, lastY = null;
    const spawn = (cx, cy) => {
      const x = cx * dpr, y = cy * dpr;
      let n = 1;
      if (lastX != null) { const d = Math.hypot(x - lastX, y - lastY); n = Math.min(3, 1 + Math.floor(d / (45 * dpr))); }
      for (let i = 0; i < n; i++) {
        parts.push({
          x: x + (Math.random() - 0.5) * 10 * dpr,
          y: y + (Math.random() - 0.5) * 10 * dpr,
          r: (5 + Math.random() * 7) * dpr,
          vx: (Math.random() - 0.5) * 0.35 * dpr,
          vy: (-0.25 - Math.random() * 0.45) * dpr,
          life: 1,
          decay: 0.011 + Math.random() * 0.009,
          max: (30 + Math.random() * 26) * dpr
        });
      }
      lastX = x; lastY = y;
    };
    window.addEventListener('mousemove', e => spawn(e.clientX, e.clientY), { passive: true });
    window.addEventListener('touchmove', e => { const tt = e.touches && e.touches[0]; if (tt) spawn(tt.clientX, tt.clientY); }, { passive: true });

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life -= p.decay;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        p.x += p.vx; p.y += p.vy; p.vy -= 0.004 * dpr;   // gentle rise
        p.r += (p.max - p.r) * 0.045;                    // billow out
        const a = Math.sin(p.life * Math.PI) * 0.085;    // fade in & out
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, 'rgba(228,222,212,' + a + ')');
        g.addColorStop(0.5, 'rgba(214,208,198,' + (a * 0.5) + ')');
        g.addColorStop(1, 'rgba(214,208,198,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  // ---- Boot ----
  function boot() {
    render();
    initLangToggle();
    initHeroVideo();
    initSmoke();
    // Close any tap-opened dish preview when tapping outside it.
    document.addEventListener('click', e => {
      if (e.target.closest && e.target.closest('.dish-thumb')) return;
      document.querySelectorAll('.dish-thumb.is-open').forEach(t => t.classList.remove('is-open'));
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
