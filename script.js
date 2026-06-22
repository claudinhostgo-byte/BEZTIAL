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
  const SHOW_PRICES = false;   // la carta del cliente no trae precios por plato
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
        s1: 'Días de maduración', s2: 'Terraza panorámica', s3: 'Vista panorámica',
        tag: 'Maduración en casa'
      },
      carta: {
        label: 'La Carta',
        title: 'Carta Beztial',
        intro: 'Fuego, mar y tierra: cortes a la brasa, fusión costera de Baja California, frescura mediterránea y street premium.',
        note: 'Carta sujeta a disponibilidad de temporada.'
      },
      azotea: {
        label: 'La Experiencia',
        title: 'Una azotea sobre Colina',
        body: 'En el rooftop de Workplace Guay Guay, en Colina, Beztial abre 150 m² de terraza panorámica al aire libre: cielo abierto, fuego al centro y un espacio pensado para quedarse. Un destino sobre el proyecto, para quienes buscan algo más alto.',
        l1: 'Ubicación', l2: 'Horario', l3: 'Reservas',
        addr: 'Rooftop Workplace Guay Guay · Colina, Región Metropolitana',
        hours: 'Martes a Domingo · 13:00 – 00:00 · Lunes cerrado',
        phone: '+56 9 8421 7730',
        cta: 'Reservar por WhatsApp'
      },
      band: { kicker: 'Brasa de espino', quote: '“El producto manda, el fuego decide.”' },
      espacio: { kicker: 'El Espacio', line: '150 m² de terraza panorámica · Colina' },
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
        s1: 'Days of aging', s2: 'Panoramic terrace', s3: 'Panoramic view',
        tag: 'House dry-aging'
      },
      carta: {
        label: 'The Menu',
        title: 'Beztial Menu',
        intro: 'Fire, sea and earth: grilled cuts, Baja California coastal fusion, Mediterranean freshness and street premium.',
        note: 'Menu subject to seasonal availability.'
      },
      azotea: {
        label: 'The Experience',
        title: 'A rooftop above Colina',
        body: 'On the rooftop of Workplace Guay Guay in Colina, Beztial opens 150 m² of open-air panoramic terrace: open sky, fire at the center and a space made to linger. A destination above the project, for those after something higher.',
        l1: 'Location', l2: 'Hours', l3: 'Bookings',
        addr: 'Workplace Guay Guay Rooftop · Colina, Región Metropolitana',
        hours: 'Tuesday to Sunday · 1:00 PM – 12:00 AM · Closed Mondays',
        phone: '+56 9 8421 7730',
        cta: 'Reserve via WhatsApp'
      },
      band: { kicker: 'Espino-wood embers', quote: '“The product leads, the fire decides.”' },
      espacio: { kicker: 'The Space', line: '150 m² panoramic terrace · Colina' },
      footer: { tagline: 'Fire · Sea · Earth', rights: '© 2026 Beztial · Colina, Santiago · All rights reserved' }
    }
  };

  // Carta real Beztial (documento del cliente). Sin precios por plato aún.
  // img: miniatura junto al plato (se amplía al hover). Fotos disponibles:
  //   imagen1=pescado · imagen2=pulpo · imagen3=corte laminado · imagen4=carne
  //   maduracion=corte madurado · hero-poster=carne a la parrilla · grill-band=brasa.
  // Reuso por afinidad: postres/bar/algunos usan imágenes de respaldo (brasa) hasta
  // tener fotos propias. desc = frase inspiradora bajo cada producto.
  const FISH='assets/imagen1.png', PULPO='assets/imagen2.png', CORTE='assets/imagen3.png',
        CARNE='assets/imagen4.png', MADURADO='assets/maduracion.png',
        PARRILLA='assets/hero-poster.png', BRASA='assets/grill-band.png';
  const MENU = {
    es: [
      { name: 'Cortes & Parrilla', items: [
        { name: 'Lomo Vetado 400g', desc: 'El rey de la brasa.', img: CORTE },
        { name: 'Entraña Premium', desc: 'Intensa, jugosa, inolvidable.', img: CARNE },
        { name: 'Asado de Tira 12 hrs', desc: 'Doce horas de paciencia.', img: PARRILLA },
        { name: 'Filete Mantequilla & Hierbas', desc: 'Suave como pocos.', img: CARNE },
        { name: 'Ojo de Bife Madurado', desc: 'El tiempo lo hace noble.', img: MADURADO },
        { name: 'Plateada Cocción Lenta', desc: 'Se deshace en la boca.', img: CORTE },
        { name: 'Agregados', desc: 'Chimichurri Beztial, mantequilla ahumada, sal especiada.', img: BRASA }
      ]},
      { name: 'Baja California · Fusión Costera', items: [
        { name: 'Taco Baja Fish', desc: 'Crujiente brisa del Pacífico.', img: FISH },
        { name: 'Taco Pulpo a la Parrilla', desc: 'El mar al fuego.', img: PULPO },
        { name: 'Taco Rib Eye', desc: 'Fuego y queso, sin reglas.', img: CORTE },
        { name: 'Taco Camarón al Ajillo', desc: 'Pequeño, ardiente, perfecto.', img: FISH },
        { name: 'Tostadas de Atún Fresco', desc: 'Frescura que despierta.', img: FISH },
        { name: 'Tiradito estilo Baja', desc: 'Delicado y atrevido.', img: FISH },
        { name: 'Aguachile Beztial', desc: 'Picante con identidad.', img: PULPO }
      ]},
      { name: 'Mediterráneo', items: [
        { name: 'Burrata', desc: 'Cremosa serenidad del sur.', img: FISH },
        { name: 'Carpaccio de Res', desc: 'Finura en cada lámina.', img: CORTE },
        { name: 'Pulpo Grillado', desc: 'El océano, sin prisa.', img: PULPO },
        { name: 'Ensalada Griega Beztial', desc: 'Color, frescura, equilibrio.', img: FISH }
      ]},
      { name: 'Street Premium', items: [
        { name: 'Hamburguesa Beztial', desc: 'Nuestro sello en cada bocado.', img: CARNE },
        { name: 'BBQ Ribs Burger', desc: 'Ahumada, generosa, adictiva.', img: PARRILLA },
        { name: 'Smash Burger Doble', desc: 'Doble fuego, doble placer.', img: CARNE },
        { name: 'Sándwich de Entraña', desc: 'La calle se vuelve premium.', img: CORTE },
        { name: 'Philly Steak Beztial', desc: 'Clásico con acento propio.', img: CARNE }
      ]},
      { name: 'Acompañamientos', items: [
        { name: 'Papas Fritas Trufadas', desc: 'El lujo de lo simple.', img: PARRILLA },
        { name: 'Papas Rústicas', desc: 'Doradas, honestas, perfectas.', img: PARRILLA },
        { name: 'Vegetales Grillados', desc: 'La huerta tocada por el fuego.', img: PARRILLA },
        { name: 'Puré Rústico', desc: 'Reconfortante como en casa.', img: PARRILLA },
        { name: 'Arroz Mediterráneo', desc: 'Un viaje en cada grano.', img: PARRILLA }
      ]},
      { name: 'Postres', items: [
        { name: 'Cheesecake de Frutos Rojos', desc: 'Dulce final, intenso recuerdo.', img: BRASA },
        { name: 'Volcán de Chocolate', desc: 'Erupción de placer.', img: BRASA },
        { name: 'Tarta Cítrica Mediterránea', desc: 'Luz del sur en un bocado.', img: BRASA },
        { name: 'Helado Artesanal', desc: 'Frescura hecha a mano.', img: BRASA }
      ]},
      { name: 'Bar & Bebidas', items: [
        { name: 'Margarita / Mezcalita Ahumada', desc: 'Humo que enamora.', img: BRASA },
        { name: 'Negroni Beztial', desc: 'Amargo, elegante, eterno.', img: BRASA },
        { name: 'Sour Clásico y de Maracuyá', desc: 'El equilibrio perfecto.', img: BRASA },
        { name: 'Spritz Mediterráneo', desc: 'Burbujas con vista al mar.', img: BRASA },
        { name: 'Carta de Vinos', desc: 'Chile en cada copa.', img: BRASA },
        { name: 'Cervezas Seleccionadas', desc: 'Frías, justas, bien elegidas.', img: BRASA }
      ]}
    ],
    en: [
      { name: 'Cuts & Grill', items: [
        { name: 'Lomo Vetado (Ribeye Cap) 400g', desc: 'King of the embers.', img: CORTE },
        { name: 'Premium Skirt Steak', desc: 'Bold, juicy, unforgettable.', img: CARNE },
        { name: '12-Hour Short Rib', desc: 'Twelve hours of patience.', img: PARRILLA },
        { name: 'Butter & Herb Filet', desc: 'Tender beyond compare.', img: CARNE },
        { name: 'Dry-Aged Ribeye', desc: 'Aged to nobility.', img: MADURADO },
        { name: 'Slow-Cooked Plateada', desc: 'Melts in your mouth.', img: CORTE },
        { name: 'Add-ons', desc: 'Beztial chimichurri, smoked butter, spiced salt.', img: BRASA }
      ]},
      { name: 'Baja California · Coastal Fusion', items: [
        { name: 'Baja Fish Taco', desc: 'A crunch of Pacific breeze.', img: FISH },
        { name: 'Grilled Octopus Taco', desc: 'The sea meets fire.', img: PULPO },
        { name: 'Rib Eye Taco', desc: 'Fire and cheese, no rules.', img: CORTE },
        { name: 'Garlic Shrimp Taco', desc: 'Small, fiery, perfect.', img: FISH },
        { name: 'Fresh Tuna Tostadas', desc: 'Freshness that awakens.', img: FISH },
        { name: 'Baja-Style Tiradito', desc: 'Delicate yet daring.', img: FISH },
        { name: 'Beztial Aguachile', desc: 'Heat with identity.', img: PULPO }
      ]},
      { name: 'Mediterranean', items: [
        { name: 'Burrata', desc: 'Creamy southern calm.', img: FISH },
        { name: 'Beef Carpaccio', desc: 'Finesse in every slice.', img: CORTE },
        { name: 'Grilled Octopus', desc: 'The ocean, unhurried.', img: PULPO },
        { name: 'Beztial Greek Salad', desc: 'Color, freshness, balance.', img: FISH }
      ]},
      { name: 'Street Premium', items: [
        { name: 'Beztial Burger', desc: 'Our mark in every bite.', img: CARNE },
        { name: 'BBQ Ribs Burger', desc: 'Smoky, generous, addictive.', img: PARRILLA },
        { name: 'Double Smash Burger', desc: 'Double fire, double joy.', img: CARNE },
        { name: 'Skirt Steak Sandwich', desc: 'The street goes premium.', img: CORTE },
        { name: 'Beztial Philly Steak', desc: 'A classic, our way.', img: CARNE }
      ]},
      { name: 'Sides', items: [
        { name: 'Truffled Fries', desc: 'The luxury of simple.', img: PARRILLA },
        { name: 'Rustic Potatoes', desc: 'Golden, honest, perfect.', img: PARRILLA },
        { name: 'Grilled Vegetables', desc: 'The garden kissed by fire.', img: PARRILLA },
        { name: 'Rustic Mash', desc: 'Comforting as home.', img: PARRILLA },
        { name: 'Mediterranean Rice', desc: 'A journey in every grain.', img: PARRILLA }
      ]},
      { name: 'Desserts', items: [
        { name: 'Red-Berry Cheesecake', desc: 'A sweet, lasting memory.', img: BRASA },
        { name: 'Chocolate Lava Cake', desc: 'An eruption of pleasure.', img: BRASA },
        { name: 'Mediterranean Citrus Tart', desc: 'Southern light in a bite.', img: BRASA },
        { name: 'Artisan Ice Cream', desc: 'Freshness, handcrafted.', img: BRASA }
      ]},
      { name: 'Bar & Drinks', items: [
        { name: 'Margarita / Smoked Mezcalita', desc: 'Smoke that seduces.', img: BRASA },
        { name: 'Beztial Negroni', desc: 'Bitter, elegant, eternal.', img: BRASA },
        { name: 'Classic & Passion-Fruit Sour', desc: 'Perfect balance.', img: BRASA },
        { name: 'Mediterranean Spritz', desc: 'Bubbles with a sea view.', img: BRASA },
        { name: 'Wine List', desc: 'Chile in every glass.', img: BRASA },
        { name: 'Selected Beers', desc: 'Cold, crisp, well chosen.', img: BRASA }
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

        if (d.desc) {
          const desc = document.createElement('p');
          desc.className = 'menu-item-desc';
          desc.textContent = d.desc;
          body.appendChild(desc);
        }

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
