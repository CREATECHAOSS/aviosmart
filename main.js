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
    py = desktop ? H * 0.56 : H * 0.6;
    sunAz = desktop ? 0.2 : 0.06;
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
