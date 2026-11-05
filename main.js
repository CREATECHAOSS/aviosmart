/* =========================================================
   AvioSmart — interactions
   ========================================================= */
(() => {
  "use strict";

  const CONTACT_EMAIL = "info@aviosmart.co"; // ← confirm with client
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------------------------------------------------------
     i18n (EN / ES)
  --------------------------------------------------------- */
  const ES = {
    "nav.services": "Servicios", "nav.approach": "Método", "nav.about": "Nosotros", "nav.contact": "Contacto",
    "nav.cta": "Agendar reunión",
    "hero.eyebrow": "Asesoría estratégica para aerolíneas",
    "hero.t1": "Decisiones más inteligentes", "hero.t2": "a cualquier altitud.",
    "hero.sub": "AvioSmart acompaña a la alta dirección de aerolíneas en las decisiones que definen el balance — desde la estrategia de red y flota hasta las compras y la negociación con proveedores.",
    "hero.cta1": "Solicitar una reunión", "hero.cta2": "Ver servicios →", "hero.now": "Asesorando en",
    "board.kicker": "Salidas", "board.title": "Hacia dónde llevamos a las aerolíneas.",
    "board.h1": "Vuelo", "board.h2": "Destino", "board.h3": "Puerta", "board.h4": "Estado",
    "svc.kicker": "Servicios", "svc.title": "Asesoría construida desde el lado de la aerolínea.",
    "svc.lead": "Orientación independiente y de alto nivel para aerolíneas que quieren claridad antes de invertir capital, firmar contratos o cambiar de rumbo.",
    "svc.1.t": "Estrategia de Aerolínea",
    "svc.1.d": "Estrategia de red, flota y crecimiento contrastada con la realidad del mercado — para que cada ruta y cada avión justifiquen su lugar.",
    "svc.2.t": "Compras y Abastecimiento",
    "svc.2.d": "Abastecimiento estructurado de aeronaves, motores, partes y servicios — un proceso de RFP más preciso y una base de proveedores más amplia y calificada.",
    "svc.3.t": "Negociación con Proveedores",
    "svc.3.d": "Nos sentamos junto a su equipo en la mesa — comparando condiciones, construyendo poder de negociación y cerrando acuerdos que se sostienen en el tiempo.",
    "svc.4.t": "Optimización de Costos",
    "svc.4.d": "Una revisión línea por línea de su estructura de costos para encontrar qué renegociar, reestructurar o eliminar — sin afectar la seguridad ni el servicio.",
    "ap.kicker": "Método", "ap.title": "Cada proyecto vuela el mismo perfil disciplinado.",
    "ap.1.t": "Diagnóstico", "ap.1.d": "Mapeamos su posición actual — costos, contratos, red y restricciones — y acordamos cómo se ve el éxito.",
    "ap.2.t": "Diseño", "ap.2.d": "Construimos, modelamos y ponemos a prueba las opciones. Usted recibe una recomendación clara, no una pila de diapositivas.",
    "ap.3.t": "Ejecución", "ap.3.d": "Dirigimos el abastecimiento, lideramos las negociaciones y mantenemos alineados a los interesados hasta la firma.",
    "ap.4.t": "Resultados", "ap.4.d": "Los ahorros y las condiciones se miden hasta el resultado final, y su equipo conserva el método para la próxima vez.",
    "ab.tag": "Asesor estratégico de aerolíneas", "ab.kicker": "Conozca a su asesor",
    "ab.lead": "Andrés lidera AvioSmart como asesor estratégico de aerolíneas, ayudando a las compañías a tomar mejores decisiones en estrategia, compras y en las relaciones con proveedores que mantienen las flotas en el aire.",
    "ab.body": "Su trabajo está donde la ambición comercial se encuentra con la realidad operativa: aporta la perspectiva de la aerolínea a cada negociación y un enfoque práctico en resultados que se reflejan en los números.",
    "ab.pass.class": "PASE DE ABORDAR · EJECUTIVA", "ab.pass.from": "DESDE", "ab.pass.fromv": "Su desafío",
    "ab.pass.to": "HACIA", "ab.pass.tov": "Su ventaja", "ab.pass.pax": "PASAJERO", "ab.pass.seat": "ASIENTO",
    "ab.pass.focus": "ENFOQUE", "ab.pass.focusv": "ESTRATEGIA · COMPRAS",
    "pr.kicker": "Por qué AvioSmart", "pr.title": "Cielo despejado entre el consejo y los intereses.",
    "pr.1.t": "Siempre del lado de la aerolínea", "pr.1.d": "Trabajamos para la aerolínea. Sin comisiones de proveedores ni incentivos ocultos — solo asesoría alineada con sus intereses.",
    "pr.2.t": "Atención senior", "pr.2.d": "Trabaja directamente con el asesor responsable del proyecto, desde la primera llamada hasta la firma final.",
    "pr.3.t": "Medido en resultados", "pr.3.d": "Cada recomendación está ligada a un número que puede seguir — costo, rendimiento, condiciones o tiempo ahorrado.",
    "ct.kicker": "Contacto", "ct.t1": "¿Listos para el", "ct.t2": "despegue?",
    "ct.lead": "Cuéntenos hacia dónde quiere ir su aerolínea. Le responderemos en un día hábil con una reunión breve y sin compromiso.",
    "ct.f.name": "Su nombre", "ct.f.company": "Aerolínea / empresa", "ct.f.email": "Correo corporativo",
    "ct.f.msg": "¿Qué tiene en su radar?", "ct.f.send": "Enviar mensaje",
    "ft.rights": "Todos los derechos reservados."
  };

  const FLAP = {
    en: ["AIRLINE STRATEGY", "PROCUREMENT", "SUPPLIER DEALS", "FLEET PLANNING", "COST REDUCTION", "NEGOTIATIONS"],
    es: ["ESTRATEGIA", "COMPRAS", "PROVEEDORES", "PLAN DE FLOTA", "AHORRO DE COSTOS", "NEGOCIACIONES"]
  };

  const BOARD = [
    { fl: "AS101", gate: "A1", en: "Airline Strategy", es: "Estrategia de aerolínea", st: "boarding" },
    { fl: "AS204", gate: "B4", en: "Procurement & Sourcing", es: "Compras y abastecimiento", st: "ontime" },
    { fl: "AS318", gate: "C2", en: "Supplier Negotiation", es: "Negociación con proveedores", st: "final" },
    { fl: "AS427", gate: "D7", en: "Cost Optimization", es: "Optimización de costos", st: "ontime" },
    { fl: "AS512", gate: "A3", en: "Fleet Planning", es: "Planificación de flota", st: "boarding" },
    { fl: "AS640", gate: "E1", en: "Commercial Advisory", es: "Asesoría comercial", st: "ontime" }
  ];
  const STATUS = {
    en: { boarding: "Boarding", ontime: "On time", final: "Final call" },
    es: { boarding: "Abordando", ontime: "A tiempo", final: "Última llamada" }
  };

  const i18nEls = $$("[data-i18n]");
  const EN = {};
  i18nEls.forEach(el => { EN[el.dataset.i18n] = el.textContent; });
  let lang = "en";
  try { if (localStorage.getItem("avio-lang") === "es") lang = "es"; } catch (e) {}

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    const dict = l === "es" ? ES : EN;
    i18nEls.forEach(el => {
      const v = dict[el.dataset.i18n] ?? EN[el.dataset.i18n];
      if (v != null) el.textContent = v;
    });
    $$(".lang button").forEach(b => b.classList.toggle("active", b.dataset.lang === l));
    try { localStorage.setItem("avio-lang", l); } catch (e) {}
    renderBoard(true);
    flapIndex = -1; nextFlap();
  }
  $$(".lang button").forEach(b => b.addEventListener("click", () => applyLang(b.dataset.lang)));

  /* ---------------------------------------------------------
     Nav
  --------------------------------------------------------- */
  const nav = $("#nav");
  const onScrollNav = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();
  const burger = $(".burger");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  $$(".nav-links a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false");
  }));

  /* ---------------------------------------------------------
     Reveal on scroll
  --------------------------------------------------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  // stagger siblings
  $$(".reveal").forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty("--d", `${Math.min(i, 6) * 0.08}s`);
    io.observe(el);
  });

  /* ---------------------------------------------------------
     Split-flap display
  --------------------------------------------------------- */
  const flapEl = $("#flap");
  const CELLS = 16;
  const CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ&-";
  const cells = Array.from({ length: CELLS }, () => {
    const c = document.createElement("span");
    c.className = "cell"; c.textContent = " ";
    flapEl.appendChild(c);
    return c;
  });
  let flapIndex = -1, flapTimer = null;

  let flapGen = 0;
  function setFlap(text) {
    const gen = ++flapGen;
    const padded = text.toUpperCase().padEnd(CELLS, " ").slice(0, CELLS);
    flapEl.setAttribute("aria-label", text);
    cells.forEach((cell, i) => {
      const target = padded[i];
      if (reduceMotion) { cell.textContent = target; return; }
      let steps = 3 + Math.floor(Math.random() * 6);
      const tick = () => {
        if (gen !== flapGen) return;
        cell.classList.remove("flip"); void cell.offsetWidth; cell.classList.add("flip");
        if (steps-- <= 0) { cell.textContent = target; return; }
        cell.textContent = CHARSET[1 + Math.floor(Math.random() * (CHARSET.length - 1))];
        setTimeout(tick, 70);
      };
      if (cell.textContent === target) return;
      setTimeout(tick, i * 35);
    });
  }
  function nextFlap() {
    clearTimeout(flapTimer);
    const list = FLAP[lang];
    flapIndex = (flapIndex + 1) % list.length;
    setFlap(list[flapIndex]);
    flapTimer = setTimeout(nextFlap, 3600);
  }

  /* ---------------------------------------------------------
     Departure board
  --------------------------------------------------------- */
  const rowsEl = $("#boardRows");
  function scramble(el, text, dur = 700) {
    if (reduceMotion) { el.textContent = text; return; }
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const start = performance.now();
    const step = now => {
      const p = Math.min(1, (now - start) / dur);
      const n = Math.floor(p * text.length);
      let out = text.slice(0, n);
      for (let i = n; i < text.length; i++) out += text[i] === " " ? " " : glyphs[(Math.random() * glyphs.length) | 0];
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function renderBoard(animate) {
    rowsEl.innerHTML = "";
    BOARD.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "board-row"; row.setAttribute("role", "row");
      row.innerHTML = `
        <span class="fl" role="cell">${r.fl}</span>
        <span class="dest" role="cell"></span>
        <span class="gate hide-sm" role="cell">${r.gate}</span>
        <span class="status-cell" role="cell"><span class="status ${r.st}"></span></span>`;
      rowsEl.appendChild(row);
      const dest = $(".dest", row), st = $(".status", row);
      if (animate) {
        setTimeout(() => { scramble(dest, r[lang]); scramble(st, STATUS[lang][r.st], 500); }, i * 120);
      } else { dest.textContent = r[lang]; st.textContent = STATUS[lang][r.st]; }
    });
  }
  renderBoard(false);
  const boardIO = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { renderBoard(true); boardIO.disconnect(); }
  }, { threshold: 0.3 });
  boardIO.observe($(".board"));
  // gently cycle statuses
  if (!reduceMotion) setInterval(() => {
    const i = (Math.random() * BOARD.length) | 0;
    const order = ["ontime", "boarding", "final"];
    BOARD[i].st = order[(order.indexOf(BOARD[i].st) + 1) % order.length];
    const st = rowsEl.children[i] && $(".status", rowsEl.children[i]);
    if (st) { st.className = `status ${BOARD[i].st}`; scramble(st, STATUS[lang][BOARD[i].st], 450); }
  }, 2800);

  /* ---------------------------------------------------------
     Card tilt + glow
  --------------------------------------------------------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    $$("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------
     Scroll-driven flight path
  --------------------------------------------------------- */
  const path = $("#flightPath"), plane = $("#plane"), pathSvg = $("#pathSvg");
  const pathLen = path.getTotalLength();
  path.style.strokeDasharray = "1000 1000";
  function updatePath() {
    const r = pathSvg.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.75)));
    path.style.strokeDashoffset = 1000 * (1 - p);
    const sw = pathSvg.clientWidth / 1200, sh = pathSvg.clientHeight / 360;
    const L = Math.max(0.5, Math.min(pathLen - 0.5, pathLen * p));
    const a = path.getPointAtLength(L), b = path.getPointAtLength(Math.min(pathLen, L + 2));
    const a0 = path.getPointAtLength(Math.max(0, L - 2));
    const ang = Math.atan2((b.y - a0.y) * sh, (b.x - a0.x) * sw) * 180 / Math.PI;
    plane.style.transform = `translate(${a.x * sw}px, ${a.y * sh}px) rotate(${ang}deg)`;
  }
  window.addEventListener("scroll", () => requestAnimationFrame(updatePath), { passive: true });
  window.addEventListener("resize", updatePath);
  updatePath();

  /* ---------------------------------------------------------
     Hero globe (canvas): rotating dot sphere + live routes
  --------------------------------------------------------- */
  const canvas = $("#globe");
  const ctx = canvas.getContext("2d");
  const HUBS = [
    ["BOG", 4.7, -74.1], ["MIA", 25.8, -80.3], ["MAD", 40.5, -3.6], ["MEX", 19.4, -99.1],
    ["LIM", -12.0, -77.1], ["GRU", -23.4, -46.5], ["PTY", 9.1, -79.4], ["JFK", 40.6, -73.8],
    ["SCL", -33.4, -70.8], ["EZE", -34.8, -58.5], ["CDG", 49.0, 2.5], ["LHR", 51.5, -0.5],
    ["DXB", 25.3, 55.4], ["IST", 41.3, 28.8], ["SIN", 1.4, 104.0], ["DFW", 32.9, -97.0],
    ["LAX", 33.9, -118.4], ["YYZ", 43.7, -79.6], ["FRA", 50.0, 8.6], ["SDQ", 18.4, -69.7]
  ];
  const toV = (lat, lon) => {
    const la = lat * Math.PI / 180, lo = lon * Math.PI / 180;
    return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
  };
  const hubs = HUBS.map(([c, la, lo]) => ({ code: c, v: toV(la, lo) }));
  const ROUTES = [
    ["BOG", "MIA"], ["BOG", "MAD"], ["MEX", "JFK"], ["LIM", "GRU"], ["PTY", "BOG"], ["SCL", "EZE"],
    ["MIA", "LHR"], ["MAD", "IST"], ["GRU", "CDG"], ["JFK", "LHR"], ["DXB", "SIN"], ["FRA", "DXB"],
    ["LAX", "MEX"], ["DFW", "BOG"], ["YYZ", "FRA"], ["SDQ", "MIA"], ["PTY", "LIM"], ["MAD", "BOG"],
    ["LHR", "DXB"], ["EZE", "MAD"]
  ];
  const hubByCode = Object.fromEntries(hubs.map(h => [h.code, h]));
  const routes = ROUTES.map(([a, b], i) => ({
    a: hubByCode[a].v, b: hubByCode[b].v,
    t: Math.random(), speed: 0.0016 + Math.random() * 0.0018, delay: i * 0.05
  }));

  // fibonacci sphere dots
  const N = 1500, dots = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = ga * i;
    dots.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }

  const slerp = (a, b, t) => {
    const d = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
    const om = Math.acos(d);
    if (om < 1e-4) return a.slice();
    const s = Math.sin(om), k1 = Math.sin((1 - t) * om) / s, k2 = Math.sin(t * om) / s;
    return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
  };
  routes.forEach(r => {
    const d = Math.acos(Math.max(-1, Math.min(1, r.a[0] * r.b[0] + r.a[1] * r.b[1] + r.a[2] * r.b[2])));
    r.lift = 0.04 + d * 0.09;
  });

  let W = 0, H = 0, DPR = 1, cx = 0, cy = 0, R = 0;
  let rot = 1.35, tilt = -0.32, mx = 0, my = 0, tmx = 0, tmy = 0;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (W > 900) { cx = W * 0.75; cy = H * 0.54; R = Math.min(H * 0.36, W * 0.28); }
    else { cx = W * 0.72; cy = H * 0.9; R = Math.min(W * 0.62, H * 0.32); }
  }
  window.addEventListener("resize", resize);
  resize();
  window.addEventListener("pointermove", e => {
    tmx = (e.clientX / window.innerWidth - 0.5); tmy = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  function project(v, scale = 1) {
    const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt + my * 0.25), st = Math.sin(tilt + my * 0.25);
    const x = v[0] * cr + v[2] * sr, z1 = -v[0] * sr + v[2] * cr;
    const y = v[1] * ct - z1 * st, z = v[1] * st + z1 * ct;
    return [cx + x * R * scale, cy - y * R * scale, z, x * scale, y * scale];
  }
  const visible = p => p[2] > 0 || (p[3] * p[3] + p[4] * p[4]) > 1;

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) requestAnimationFrame(frame); })
    .observe($(".hero"));

  function frame() {
    if (!running) return;
    mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
    if (!reduceMotion) rot += 0.0016;
    const r0 = rot; rot = r0 + mx * 0.4;

    ctx.clearRect(0, 0, W, H);

    // atmosphere glow
    const g = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.35);
    g.addColorStop(0, "rgba(92,200,255,0.10)"); g.addColorStop(0.6, "rgba(92,200,255,0.04)"); g.addColorStop(1, "rgba(92,200,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2); ctx.fill();
    // sphere body
    const b = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    b.addColorStop(0, "rgba(30,48,86,0.55)"); b.addColorStop(1, "rgba(8,14,28,0.35)");
    ctx.fillStyle = b; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(140,180,255,0.18)"; ctx.lineWidth = 1; ctx.stroke();

    // dots
    for (let i = 0; i < N; i++) {
      const p = project(dots[i]);
      if (p[2] <= 0) continue;
      const a = 0.16 + p[2] * 0.62, s = 0.8 + p[2] * 1.3;
      ctx.fillStyle = `rgba(170,200,255,${a})`;
      ctx.fillRect(p[0] - s / 2, p[1] - s / 2, s, s);
    }

    // routes
    const SEG = 48;
    routes.forEach(r => {
      if (!reduceMotion) r.t += r.speed;
      if (r.t > 1.45) r.t = -0.1;
      const head = Math.min(1, Math.max(0, r.t)), tail = Math.max(0, r.t - 0.45);
      if (head <= tail) return;
      // faint full arc
      ctx.beginPath(); let started = false;
      for (let k = 0; k <= SEG; k++) {
        const t = k / SEG, v = slerp(r.a, r.b, t), p = project(v, 1 + r.lift * Math.sin(Math.PI * t));
        if (!visible(p)) { started = false; continue; }
        started ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); started = true;
      }
      ctx.strokeStyle = "rgba(92,200,255,0.10)"; ctx.lineWidth = 1; ctx.stroke();
      // bright trail
      let prev = null;
      for (let k = 0; k <= SEG; k++) {
        const t = tail + (head - tail) * (k / SEG);
        const v = slerp(r.a, r.b, t), p = project(v, 1 + r.lift * Math.sin(Math.PI * t));
        if (prev && visible(p) && visible(prev)) {
          const f = k / SEG;
          ctx.strokeStyle = `rgba(255,${Math.round(150 + 60 * f)},${Math.round(60 + 30 * f)},${f * 0.95})`;
          ctx.lineWidth = 0.6 + f * 1.6;
          ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();
        }
        prev = p;
      }
      if (r.t >= 0 && r.t <= 1) {
        const v = slerp(r.a, r.b, head), p = project(v, 1 + r.lift * Math.sin(Math.PI * head));
        if (visible(p)) {
          const hg = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 10);
          hg.addColorStop(0, "rgba(255,226,168,1)"); hg.addColorStop(1, "rgba(255,181,71,0)");
          ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(p[0], p[1], 10, 0, Math.PI * 2); ctx.fill();
        }
      }
    });

    // hubs + labels
    ctx.font = "600 10px 'JetBrains Mono', monospace";
    hubs.forEach(h => {
      const p = project(h.v);
      if (p[2] <= 0.05) return;
      const a = Math.min(1, p[2] * 1.4);
      ctx.fillStyle = `rgba(92,200,255,${a})`;
      ctx.beginPath(); ctx.arc(p[0], p[1], 2.4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(92,200,255,${a * 0.35})`;
      ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, Math.PI * 2); ctx.stroke();
      if (p[2] > 0.25 && W > 900) {
        ctx.fillStyle = `rgba(234,240,255,${a * 0.75})`;
        ctx.fillText(h.code, p[0] + 9, p[1] + 3.5);
      }
    });

    rot = r0;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------------------------------------------------------
     Contact form → mailto
  --------------------------------------------------------- */
  const form = $("#contactForm"), note = $("#formNote");
  $("#emailLink").href = `mailto:${CONTACT_EMAIL}`;
  $("#emailLink").textContent = CONTACT_EMAIL;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim(), email = form.email.value.trim();
    let ok = true;
    [["name", !!name], ["email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)]].forEach(([f, valid]) => {
      form[f].closest(".field").classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      note.style.color = "#FF6B6B";
      note.textContent = lang === "es" ? "Revise su nombre y correo." : "Please check your name and email.";
      return;
    }
    const topics = $$("input[name=topic]:checked", form).map(i => i.value).join(", ");
    const subject = `AvioSmart briefing request — ${form.company.value.trim() || name}`;
    const body = `Name: ${name}\nCompany: ${form.company.value.trim()}\nEmail: ${email}\nTopics: ${topics || "-"}\n\n${form.message.value.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.style.color = "";
    note.textContent = lang === "es" ? "¡Gracias! Abriendo su correo…" : "Thanks! Opening your email client…";
  });

  $("#yr").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  if (lang !== "en") applyLang(lang); else nextFlap();
})();
