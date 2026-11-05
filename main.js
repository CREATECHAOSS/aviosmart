/* =========================================================
   AvioSmart — interactions
   ========================================================= */
(() => {
  "use strict";

  const CONTACT_EMAIL = "info@aviosmart.co";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------------------------------------------------------
     i18n (EN / ES)
  --------------------------------------------------------- */
  const ES = {
    "nav.services": "Qué hacemos", "nav.approach": "Proceso", "nav.about": "Experiencia", "nav.contact": "Contacto",
    "nav.cta": "Hablemos de su proyecto",
    "hero.eyebrow": "Ejecución de compras aeronáuticas",
    "hero.t1": "Sus pendientes no deberían dejarlo", "hero.t2": "en tierra.",
    "hero.sub": "AvioSmart cierra la brecha entre la estrategia y la ejecución en las compras aeronáuticas. Fortalecemos los equipos de compras con compradores de aviación experimentados — sin alejar a su gente de la operación diaria.",
    "hero.cta1": "Hablemos de su proyecto", "hero.cta2": "Cuándo llamarnos →", "hero.now": "Ejecutando ahora",
    "board.kicker": "Tablero de estado", "board.title": "¿Cuándo debería una aerolínea llamar a AvioSmart?",
    "board.lead": "Si alguna de estas señales está hoy en su tablero, cada requerimiento pendiente tiene una consecuencia operativa.",
    "board.h1": "Ref", "board.h2": "Señal", "board.h3": "Puerta", "board.h4": "Estado",
    "board.hint": "Pase el cursor o toque una fila para verla con AvioSmart a bordo.",
    "svc.kicker": "Soporte especializado en compras", "svc.title": "Capacidad adicional cuando su operación la necesita.",
    "svc.lead": "Los pendientes de compras crecen cuando los equipos internos no tienen la capacidad o la especialización necesaria. AvioSmart brinda soporte experimentado en compras aeronáuticas para procesos completos o subprocesos específicos, por proyecto o de forma continua.",
    "svc.1.t": "Reducción de Pendientes",
    "svc.1.d": "Compradores de aviación experimentados que avanzan las requisiciones pendientes y su seguimiento, para que las compras críticas dejen de esperar en la fila.",
    "svc.2.t": "Proyectos de Compras Críticas",
    "svc.2.d": "Ejecución de principio a fin: productos, panorama de proveedores, estándares aeronáuticos, requisitos técnicos y marco contractual.",
    "svc.3.t": "Negociaciones Estratégicas",
    "svc.3.d": "Procesos estructurados de contratación y negociación que generan poder de negociación con los proveedores y cierran condiciones que se sostienen.",
    "svc.4.t": "Control de Contratos y Garantías",
    "svc.4.d": "Monitoreo constante de vencimientos, hitos contractuales y reclamos de garantía, para no dejar valor recuperable sobre la mesa.",
    "band.kicker": "Por qué importa", "band.q1": "Cada requerimiento pendiente tiene una", "band.q2": "consecuencia operativa.",
    "band.sub": "AvioSmart no solo identifica los problemas de compras. Aportamos la capacidad especializada necesaria para ejecutar la solución.",
    "ap.kicker": "Nuestro proceso", "ap.title": "De la presión operativa a la ejecución controlada.",
    "ap.lead": "Cada proyecto comienza con su desafío operativo específico. Definimos el soporte requerido, establecemos un alcance claro y construimos un modelo de ejecución alrededor de los productos, proveedores, regulaciones y condiciones contractuales involucradas.",
    "ap.1.t": "Entendemos el desafío", "ap.1.d": "Usted comparte sus pendientes de compras, requisitos del proyecto, necesidades de negociación, restricciones internas y resultados esperados. Identificamos dónde se está demorando la ejecución.",
    "ap.2.t": "Evaluamos el panorama", "ap.2.d": "Revisamos los productos o servicios, el panorama de proveedores, los estándares aeronáuticos, los requisitos técnicos y los contratos — y definimos si necesita un proceso completo o un subproceso específico.",
    "ap.3.t": "Proponemos el modelo operativo", "ap.3.d": "Alcance, responsabilidades, estructura del equipo y método de ejecución. Una vez aprobado, presentamos las condiciones comerciales y formalizamos el acuerdo de servicio.",
    "ap.4.t": "Ejecutamos con visibilidad", "ap.4.d": "Compradores experimentados ejecutan bajo la guía de un equipo senior, con visibilidad sobre requerimientos, compromisos de proveedores, hitos contractuales, riesgos de entrega y avance.",
    "ab.tag": "26+ años en aviación", "ab.kicker": "Experiencia en la industria",
    "ab.lead": "Una perspectiva de compras construida desde ambos lados de la industria. Andrés es un ejecutivo de aviación con más de 26 años de experiencia en operaciones de aerolíneas y manufactura aeroespacial.",
    "ab.body": "Esa combinación aporta una visión práctica de la urgencia operativa de las aerolíneas, los requisitos técnicos, las restricciones de la cadena de suministro, las condiciones contractuales y las limitaciones de producción que afectan el desempeño de los proveedores.",
    "ab.pass.class": "PASE DE ABORDAR · EJECUTIVA", "ab.pass.from": "DESDE", "ab.pass.fromv": "Operación de aerolíneas",
    "ab.pass.to": "HACIA", "ab.pass.tov": "Manufactura aeroespacial", "ab.pass.pax": "PASAJERO", "ab.pass.seat": "ASIENTO",
    "ab.pass.focus": "EXPERIENCIA", "ab.pass.focusv": "26+ AÑOS",
    "tr.kicker": "Trayectoria", "tr.title": "Resultados que se reflejan en los números.",
    "tr.s1": "Tasa de éxito en reclamos de garantía para un importante grupo aerolíneo",
    "tr.s2": "Recuperación anual reportada por reclamos de garantía",
    "tr.s3": "Aumento de ingresos reportado en el primer año para un fabricante aeronáutico líder",
    "tr.s4": "Crecimiento reportado en negocios recurrentes y referidos con aerolíneas y MROs",
    "tr.m1": "Creó un Departamento de Abastecimiento Estratégico y Control de Garantías para un importante grupo aerolíneo.",
    "tr.m2": "Desarrolló procesos estratégicos de contratación y negociación para un importante grupo aerolíneo.",
    "tr.m3": "Creó una base de datos centralizada de contratos que mejoró el acceso a la documentación de compras en toda la organización.",
    "tr.m4": "Construyó una red internacional de relaciones con aerolíneas, MROs, fabricantes y proveedores aeronáuticos.",
    "ct.kicker": "Contacto", "ct.t1": "¿Listos para el", "ct.t2": "despegue?",
    "ct.lead": "Atienda los pendientes antes de que limiten sus opciones. Si su equipo necesita más capacidad para reducir requisiciones pendientes, mejorar los procesos de compras o ejecutar negociaciones estratégicas, hablemos de su proyecto.",
    "ct.lead2": "Dirección",
    "ct.careers": "¿Comprador de aviación? AvioSmart siempre está abierto a profesionales talentosos. Envíe su hoja de vida a info@aviosmart.co.",
    "ct.f.name": "Su nombre", "ct.f.company": "Aerolínea / MRO", "ct.f.email": "Correo corporativo",
    "ct.f.msg": "¿Qué tiene en su radar?", "ct.f.send": "Enviar mensaje",
    "ft.rights": "Todos los derechos reservados."
  };

  const FLAP = {
    en: ["BACKLOG CONTROL", "CRITICAL BUYS", "NEGOTIATIONS", "WARRANTY CLAIMS", "SUPPLIER DEALS", "CONTRACT CONTROL"],
    es: ["PENDIENTES", "COMPRAS CRITICAS", "NEGOCIACIONES", "GARANTIAS", "PROVEEDORES", "CONTRATOS"]
  };

  // "When should an airline contact AvioSmart?" — signals from the current aviosmart.co
  const BOARD = [
    { fl: "REQ01", gate: "A1", sev: "bad",
      en: ["Requisitions piling up", "Requisitions are accumulating faster than the team can process them.", "Delayed", "Cleared"],
      es: ["Requisiciones acumuladas", "Las requisiciones se acumulan más rápido de lo que el equipo puede procesarlas.", "Demorado", "Despejado"] },
    { fl: "CRT02", gate: "B4", sev: "warn",
      en: ["Critical buys stalled", "Critical purchases are delayed due to limited follow-up capacity.", "Holding", "On time"],
      es: ["Compras críticas detenidas", "Las compras críticas se retrasan por falta de capacidad de seguimiento.", "En espera", "A tiempo"] },
    { fl: "OPS03", gate: "C2", sev: "warn",
      en: ["Team pulled off ops", "Projects and negotiations are pulling internal teams away from daily operations.", "Diverted", "On course"],
      es: ["Equipo fuera de la operación", "Los proyectos y negociaciones alejan al equipo interno de la operación diaria.", "Desviado", "En curso"] },
    { fl: "WTY04", gate: "D7", sev: "bad",
      en: ["Warranties unmonitored", "Contract expirations and warranty claims are not being consistently monitored.", "At risk", "Monitored"],
      es: ["Garantías sin control", "Los vencimientos de contratos y los reclamos de garantía no se monitorean de forma constante.", "En riesgo", "Controlado"] },
    { fl: "CAP05", gate: "E1", sev: "warn",
      en: ["Need buyers, not headcount", "You need experienced aviation buyers without immediately expanding the permanent team.", "Final call", "Boarding"],
      es: ["Compradores sin ampliar nómina", "Necesita compradores de aviación experimentados sin ampliar de inmediato el equipo permanente.", "Última llamada", "Abordando"] }
  ];

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
     Status board: problems flip to "with AvioSmart" on hover / tap
  --------------------------------------------------------- */
  const rowsEl = $("#boardRows");
  function scramble(el, text, dur = 700) {
    if (reduceMotion) { el.textContent = text; return; }
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const start = performance.now();
    const token = (el._scr = (el._scr || 0) + 1);
    const step = now => {
      if (el._scr !== token) return;
      const p = Math.min(1, (now - start) / dur);
      const n = Math.floor(p * text.length);
      let out = text.slice(0, n);
      for (let i = n; i < text.length; i++) out += text[i] === " " ? " " : glyphs[(Math.random() * glyphs.length) | 0];
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function setRowState(row, r, fixed) {
    row.classList.toggle("fixed", fixed);
    const st = $(".status", row);
    st.className = `status ${fixed ? "ok" : r.sev}`;
    scramble(st, r[lang][fixed ? 3 : 2], 420);
  }
  function renderBoard(animate) {
    rowsEl.innerHTML = "";
    BOARD.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "board-row"; row.setAttribute("role", "row"); row.tabIndex = 0;
      row.innerHTML = `
        <span class="fl" role="cell">${r.fl}</span>
        <span class="dest-cell" role="cell"><span class="dest"></span><span class="desc">${r[lang][1]}</span></span>
        <span class="gate hide-sm" role="cell">${r.gate}</span>
        <span class="status-cell" role="cell"><span class="status ${r.sev}"></span></span>`;
      rowsEl.appendChild(row);
      const dest = $(".dest", row), st = $(".status", row);
      if (animate) setTimeout(() => { scramble(dest, r[lang][0]); scramble(st, r[lang][2], 500); }, i * 120);
      else { dest.textContent = r[lang][0]; st.textContent = r[lang][2]; }
      row.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") setRowState(row, r, true); });
      row.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") setRowState(row, r, false); });
      row.addEventListener("click", e => { if (e.pointerType !== "mouse") setRowState(row, r, !row.classList.contains("fixed")); });
      row.addEventListener("focus", () => setRowState(row, r, true));
      row.addEventListener("blur", () => setRowState(row, r, false));
    });
  }
  renderBoard(false);
  const boardIO = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { renderBoard(true); boardIO.disconnect(); }
  }, { threshold: 0.3 });
  boardIO.observe($(".board"));
  if (!window.matchMedia("(hover: hover)").matches) {
    const hint = $(".board-hint");
    if (hint) hint.dataset.touch = "1";
  }

  /* ---------------------------------------------------------
     Count-up stats
  --------------------------------------------------------- */
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target, to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
      const pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
      const fmtN = v => pre + v.toFixed(dec) + suf;
      if (reduceMotion) { el.textContent = fmtN(to); return; }
      const t0 = performance.now(), dur = 1600;
      const step = now => {
        const p = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - p, 3);
        el.textContent = fmtN(to * k);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  $$(".count").forEach(el => countIO.observe(el));

  /* ---------------------------------------------------------
     Photo parallax
  --------------------------------------------------------- */
  const parallax = $$(".band-media img, .contact-media img");
  function updateParallax() {
    if (reduceMotion) return;
    const vh = window.innerHeight;
    parallax.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
      img.style.transform = `translate3d(0, ${p * -18}%, 0) scale(1.18)`;
    });
  }
  window.addEventListener("scroll", () => requestAnimationFrame(updateParallax), { passive: true });
  updateParallax();

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
     Hero: live cockpit view — WebGL dawn sky + cloud sea, with HUD
  --------------------------------------------------------- */
  const hero = $(".hero");
  const canvas = $("#sky");
  const hudCenter = $("#hudCenter"), hudHorizon = $("#hudHorizon"), rollPtr = $("#rollPtr");
  const hdgStrip = $("#hdgStrip"), hdgVal = $("#hdgVal");
  const altStrip = $("#altStrip"), altVal = $("#altVal");
  const tGs = $("#tGs"), tHdg = $("#tHdg"), tFl = $("#tFl");

  // ---- build HUD tapes
  const DEG_PX = 6, FT_PX = 0.08, ALT_MAX = 45000;
  (() => {
    let h = "";
    for (let d = -40; d <= 400; d += 5) {
      const x = (d + 40) * DEG_PX, n = ((d % 360) + 360) % 360;
      h += `<i style="left:${x}px" class="${d % 10 === 0 ? "maj" : ""}"></i>`;
      if (d % 10 === 0) h += `<b style="left:${x}px">${String(n / 10).padStart(2, "0")}</b>`;
    }
    hdgStrip.innerHTML = h;
    let a = "";
    for (let ft = 0; ft <= ALT_MAX; ft += 500) {
      const y = (ALT_MAX - ft) * FT_PX;
      a += `<b style="top:${y}px">${ft % 1000 === 0 ? (ft / 1000).toFixed(0) + "<small>000</small>" : ""}</b>`;
    }
    altStrip.innerHTML = a;
    altStrip.style.height = ALT_MAX * FT_PX + "px";
  })();

  // ---- pitch ladder (depends on viewport height)
  const FOCAL = 1.25;
  function buildLadder(Hc) {
    let g = `<line x1="-520" y1="0" x2="-70" y2="0" class="hz"/><line x1="70" y1="0" x2="520" y2="0" class="hz"/>`;
    [-10, -5, 5, 10].forEach(deg => {
      const y = -Math.tan(deg * Math.PI / 180) * FOCAL * Hc;
      const dash = deg < 0 ? ` stroke-dasharray="8 6"` : "";
      const tip = deg < 0 ? -8 : 8;
      g += `<path d="M-130 ${y + tip} V${y} H-60 M60 ${y} H130 V${y + tip}"${dash}/>`;
      g += `<text x="-140" y="${y + 4}" text-anchor="end">${Math.abs(deg)}</text><text x="140" y="${y + 4}">${Math.abs(deg)}</text>`;
    });
    hudHorizon.innerHTML = g;
  }

  // ---- WebGL
  const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
  const FS = `
  precision highp float;
  uniform vec2 uRes, uPivot, uPos;
  uniform float uTime, uRoll, uPitch, uYaw, uSunAz;
  float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
    return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 6; i++) { v += a * noise(p); p = m * p; a *= .5; }
    return v;
  }
  mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
  void main(){
    vec2 uv = (gl_FragCoord.xy - uPivot) / uRes.y;
    uv = rot(-uRoll) * uv;
    uv.y += uPitch;
    vec3 rd = normalize(vec3(uv, ${FOCAL.toFixed(2)}));
    float az = uSunAz - uYaw;
    vec3 sunDir = normalize(vec3(sin(az), .03, cos(az)));
    float h = rd.y;
    float sd = max(dot(rd, sunDir), 0.);
    float side = pow(max(dot(normalize(rd.xz), normalize(sunDir.xz)), 0.), 2.5);
    vec3 horC = mix(vec3(.30, .22, .40), vec3(1., .52, .24), side);
    vec3 sky = mix(horC, vec3(.07, .09, .22), smoothstep(0., .16, h));
    sky = mix(sky, vec3(.012, .018, .05), smoothstep(.16, .62, h));
    sky += vec3(1., .74, .42) * smoothstep(.99955, .99985, sd) * 1.5
         + vec3(1., .6, .3) * pow(sd, 90.) * .55
         + vec3(1., .5, .25) * pow(sd, 10.) * .22
         + vec3(1., .45, .25) * pow(sd, 3.) * .08;
    // stars
    vec2 sg = vec2(atan(rd.x, rd.z) + uYaw, rd.y / length(rd.xz)) * 140.;
    vec2 cell = floor(sg);
    float r = hash(cell);
    vec2 o = vec2(hash(cell + 7.1), hash(cell + 3.7)) - .5;
    float star = smoothstep(.09, 0., length(fract(sg) - .5 - o * .7)) * step(.985, r);
    star *= smoothstep(.1, .4, h) * (.55 + .45 * sin(uTime * 1.7 + r * 90.));
    sky += star * vec3(.85, .9, 1.);
    vec3 col = sky;
    if (h < 0.) {
      float d = .22 / -h;
      vec2 wp = rot(-uYaw) * rd.xz * d + uPos;
      vec2 sunW = vec2(sin(uSunAz), cos(uSunAz));
      float n  = fbm(wp * 1.7);
      float n2 = fbm(wp * 1.7 + sunW * .05);
      float dens = smoothstep(.32, .68, n);
      float lit = clamp((n - n2) * 7. + .35, 0., 1.);
      vec3 cc = mix(vec3(.06, .07, .17), vec3(1., .66, .44), lit);
      cc *= .5 + side * .9;
      vec3 deck = mix(vec3(.02, .025, .07), cc, dens);
      float haze = 1. - exp(-d * .16);
      col = mix(deck, horC * .92, haze);
    }
    vec2 q = gl_FragCoord.xy / uRes;
    col *= .72 + .28 * pow(16. * q.x * q.y * (1. - q.x) * (1. - q.y), .25);
    gl_FragColor = vec4(col, 1.);
  }`;

  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
  let prog = null, U = {};
  if (gl) {
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; };
    const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (vs && fs) {
      prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) prog = null;
    }
    if (prog) {
      gl.useProgram(prog);
      const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      ["uRes", "uPivot", "uPos", "uTime", "uRoll", "uPitch", "uYaw", "uSunAz"].forEach(n => U[n] = gl.getUniformLocation(prog, n));
    }
  }
  if (!prog) hero.classList.add("no-webgl");

  let W = 0, H = 0, SCALE = 0.75, px = 0, py = 0, sunAz = 0.2;
  function resize() {
    W = hero.clientWidth; H = hero.clientHeight;
    const desktop = W > 900;
    SCALE = Math.min(window.devicePixelRatio || 1, desktop ? 1 : 1.5) * (desktop ? 0.7 : 0.8);
    canvas.width = Math.round(W * SCALE); canvas.height = Math.round(H * SCALE);
    px = desktop ? W * 0.68 : W * 0.5;
    py = desktop ? H * 0.56 : H * 0.84;
    sunAz = desktop ? 0.2 : 0.17;
    hero.style.setProperty("--px", px + "px");
    hero.style.setProperty("--py", py + "px");
    buildLadder(H);
    if (gl && prog) gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener("resize", resize);
  resize();

  // ---- flight state
  let roll = 0, pitch = 0, yaw = 0, posX = 0, posZ = 0, tRoll = 0, tPitch = 0;
  const hasHover = window.matchMedia("(hover: hover)").matches;
  window.addEventListener("pointermove", e => {
    if (!hasHover || W <= 900) return;
    tRoll = Math.max(-1, Math.min(1, (e.clientX - px) / (W * 0.5))) * 0.2;
    tPitch = (0.5 - e.clientY / window.innerHeight) * 0.05;
  }, { passive: true });

  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; if (heroVisible) requestAnimationFrame(frame); })
    .observe(hero);

  const t0 = performance.now();
  let last = t0;
  const fmt = n => Math.round(n).toLocaleString("en-US");
  function frame(now) {
    if (!heroVisible) return;
    now = now || performance.now();
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const t = (now - t0) / 1000;

    const sp = Math.min(1, window.scrollY / Math.max(1, H));
    const steer = hasHover && W > 900;
    if (!steer) { tRoll = 0; tPitch = 0; }
    const autoRoll = steer ? 0 : Math.sin(t * 0.25) * 0.05;
    roll += ((tRoll + autoRoll) - roll) * Math.min(1, dt * 2.2);
    pitch += ((tPitch - sp * 0.16) - pitch) * Math.min(1, dt * 3);
    if (!reduceMotion) {
      yaw += roll * dt * 0.22;
      yaw = Math.max(-0.55, Math.min(0.55, yaw));
      const spd = 0.075;
      posX += Math.sin(yaw) * spd * dt; posZ += Math.cos(yaw) * spd * dt;
    }

    // altitude: climb to cruise on load, descend as you scroll
    const climb = reduceMotion ? 1 : 1 - Math.pow(1 - Math.min(1, t / 4), 3);
    const alt = 33000 + 6000 * climb - sp * 9000 + Math.sin(t * 0.8) * 12;
    const hdg = ((72 + yaw * 57.2958) % 360 + 360) % 360;
    const gs = 486 + Math.sin(t * 0.37) * 3 - pitch * 60;

    if (prog) {
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform2f(U.uPivot, px * SCALE, (H - py) * SCALE);
      gl.uniform2f(U.uPos, posX, posZ);
      gl.uniform1f(U.uTime, t);
      gl.uniform1f(U.uRoll, roll);
      gl.uniform1f(U.uPitch, pitch);
      gl.uniform1f(U.uYaw, yaw);
      gl.uniform1f(U.uSunAz, sunAz);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // HUD
    const rd = roll * 57.2958;
    hudHorizon.setAttribute("transform", `rotate(${-rd}) translate(0 ${pitch * H})`);
    rollPtr.setAttribute("transform", `rotate(${-rd})`);
    hdgStrip.style.transform = `translateX(${-(hdg + 40) * DEG_PX}px)`;
    hdgVal.textContent = String(Math.round(hdg) % 360).padStart(3, "0");
    altStrip.style.transform = `translateY(${-(ALT_MAX - alt) * FT_PX}px)`;
    altVal.textContent = fmt(Math.round(alt / 10) * 10);
    tGs.textContent = Math.round(gs);
    tHdg.textContent = hdgVal.textContent + "°";
    tFl.textContent = "FL" + String(Math.round(alt / 1000) * 10).padStart(3, "0");

    if (!reduceMotion || t < 0.1) requestAnimationFrame(frame);
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
