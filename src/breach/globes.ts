// @ts-nocheck — direct port of the approved vanilla Three.js prototype (lazy-loaded chunk)
import * as THREE from 'three';
import WORLD from './world.js';
import { BS } from './state';

export function startGlobes(): () => void {
  let stopped = false;

const isMobile = matchMedia('(max-width: 640px)').matches || matchMedia('(pointer: coarse)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DEG = Math.PI / 180;
const RED = new THREE.Color('#ff2d4a'), GRN = new THREE.Color('#22ff9a');
const MUMBAI = { lat: 19.076, lon: 72.8777 };

function ll2v(lat, lon, r = 1) {
  const phi = (90 - lat) * DEG, th = (lon + 180) * DEG;
  return new THREE.Vector3(-Math.sin(phi) * Math.cos(th), Math.cos(phi), Math.sin(phi) * Math.sin(th)).multiplyScalar(r);
}
function faceAngles(lat, lon) { const v = ll2v(lat, lon); return { y: -Math.atan2(v.x, v.z), x: lat * DEG }; }

function makeRenderer(canvas) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 2));
  return r;
}
// dotted sphere + lat/long grid, shared by both globes
function makeGlobe(nDots, color) {
  const tilt = new THREE.Group(), spin = new THREE.Group(); tilt.add(spin);
  const pos = new Float32Array(nDots * 3), ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < nDots; i++) {
    const y = 1 - (i / (nDots - 1)) * 2, rad = Math.sqrt(1 - y * y), th = ga * i;
    pos.set([Math.cos(th) * rad, y, Math.sin(th) * rad], i * 3);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dotMat = new THREE.PointsMaterial({ size: isMobile ? 0.018 : 0.012, color, transparent: true, opacity: 0.75, depthWrite: false });
  spin.add(new THREE.Points(g, dotMat));
  const gridMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.12 });
  spin.add(new THREE.Mesh(new THREE.SphereGeometry(0.995, 24, 16), gridMat));
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.985, 32, 24), new THREE.MeshBasicMaterial({ color: 0x03080a }));
  spin.add(core);
  const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.08, side: THREE.BackSide });
  tilt.add(new THREE.Mesh(new THREE.SphereGeometry(1.12, 32, 24), glowMat));
  return { tilt, spin, dotMat, gridMat, glowMat };
}

/* ---------------- background breach globe ---------------- */
const bgCanvas = document.getElementById('bg');
const bgR = makeRenderer(bgCanvas);
const bgScene = new THREE.Scene();
const bgCam = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
const G = makeGlobe(isMobile ? 1400 : 3200, RED.clone());
bgScene.add(G.tilt);
const fa = faceAngles(MUMBAI.lat, MUMBAI.lon);
G.tilt.rotation.x = fa.x * 0.8; G.spin.rotation.y = fa.y;

const target = ll2v(MUMBAI.lat, MUMBAI.lon, 1.0);
const pin = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
pin.position.copy(target); G.spin.add(pin);
const ring = new THREE.Mesh(new THREE.RingGeometry(0.04, 0.05, 32), new THREE.MeshBasicMaterial({ color: RED.clone(), transparent: true, side: THREE.DoubleSide }));
ring.position.copy(target.clone().multiplyScalar(1.002)); ring.lookAt(target.clone().multiplyScalar(2)); G.spin.add(ring);

const sources = [[39, -98], [55.75, 37.6], [39.9, 116.4], [51.5, -0.12], [-23.5, -46.6], [52.5, 13.4], [-33.9, 151.2], [35.7, 139.7], [1.35, 103.8], [25.2, 55.3]];
const arcs = sources.slice(0, isMobile ? 6 : 10).map(([la, lo], i) => {
  const a = ll2v(la, lo, 1.0), b = target;
  const mid = a.clone().add(b).multiplyScalar(0.5); const d = a.distanceTo(b);
  mid.normalize().multiplyScalar(1 + d * 0.45);
  const pts = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(80);
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color: RED.clone(), transparent: true, opacity: 0.95 });
  const line = new THREE.Line(geo, mat); G.spin.add(line);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  G.spin.add(head);
  return { line, geo, mat, pts, head, off: i / 10, speed: 0.22 + (i % 3) * 0.06 };
});
// shield dome over Mumbai
const shieldMat = new THREE.MeshBasicMaterial({ color: GRN.clone(), wireframe: true, transparent: true, opacity: 0 });
const shield = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 2), shieldMat);
shield.position.copy(target); G.spin.add(shield);
const shellMat = new THREE.MeshBasicMaterial({ color: GRN.clone(), transparent: true, opacity: 0, depthWrite: false });
const shieldFill = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), shellMat); shieldFill.position.copy(target); G.spin.add(shieldFill);

function sizeBg() {
  const w = innerWidth, h = innerHeight; bgR.setSize(w, h, false); bgCam.aspect = w / h; bgCam.updateProjectionMatrix();
  if (w < 700) { bgCam.position.set(0, 0, 5.4); G.tilt.position.set(0, 0.75, 0); }
  else { bgCam.position.set(0, 0, 4.6); G.tilt.position.set(1.35, 0, 0); }
}
sizeBg(); addEventListener('resize', () => { sizeBg(); sizeMap(); });


/* ---------------- threat map globe (real Earth) ---------------- */
const FLAG = { IN: '🇮🇳', MH: '🇮🇳', US: '🇺🇸', GB: '🇬🇧', RU: '🇷🇺', CN: '🇨🇳', BR: '🇧🇷', DE: '🇩🇪', AU: '🇦🇺' };
const LABEL = { MH: 'Mumbai', GB: 'UK' };
const mapCanvas = document.getElementById('mapgl'), mapWrap = document.getElementById('mapwrap');
const pinsEl = document.getElementById('pins'), popEl = document.getElementById('pop');
const mR = makeRenderer(mapCanvas);
const mScene = new THREE.Scene();
const mCam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
let ZMIN = 1.9, ZMAX = 5.2, ZFIT = 3.4; let zoom = 3.4, goalZoom = zoom;
const mTilt = new THREE.Group(), mSpin = new THREE.Group(); mTilt.add(mSpin); mScene.add(mTilt);

// equirectangular earth texture drawn from country outlines
function earthTexture(hotIso) {
  const W = isMobile ? 2048 : 4096, H = isMobile ? 1024 : 2048, c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  const oc = x.createLinearGradient(0, 0, 0, H); oc.addColorStop(0, '#030d14'); oc.addColorStop(0.5, '#05202b'); oc.addColorStop(1, '#030d14');
  x.fillStyle = oc; x.fillRect(0, 0, W, H);
  x.strokeStyle = 'rgba(34,255,154,0.07)'; x.lineWidth = 1.5; // graticule
  for (let lo = -180; lo <= 180; lo += 15) { x.beginPath(); x.moveTo((lo + 180) / 360 * W, 0); x.lineTo((lo + 180) / 360 * W, H); x.stroke(); }
  for (let la = -75; la <= 75; la += 15) { x.beginPath(); x.moveTo(0, (90 - la) / 180 * H); x.lineTo(W, (90 - la) / 180 * H); x.stroke(); }
  const path = rings => { x.beginPath(); rings.forEach(r => { r.forEach(([lo, la], k) => { const px = (lo + 180) / 360 * W, py = (90 - la) / 180 * H; k ? x.lineTo(px, py) : x.moveTo(px, py); }); x.closePath(); }); };
  WORLD.forEach(cn => { path(cn.r); x.fillStyle = hotIso.has(cn.i) ? '#1f6b4c' : '#123d2f'; x.fill('evenodd'); });
  x.lineJoin = 'round';
  WORLD.forEach(cn => { path(cn.r); const h = hotIso.has(cn.i); x.strokeStyle = h ? 'rgba(120,255,190,0.95)' : 'rgba(60,220,150,0.55)'; x.lineWidth = h ? 3.2 : 1.8; x.stroke(); });
  const tex = new THREE.CanvasTexture(c); tex.anisotropy = Math.min(8, mR.capabilities.getMaxAnisotropy());
  if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
const earthMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), earthMat); mSpin.add(earth);
const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.14, 64, 48), new THREE.ShaderMaterial({
  transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
  fragmentShader: 'varying vec3 vN; void main(){ float k = pow(max(0.0, 0.62 - dot(vN, vec3(0.0,0.0,1.0))), 3.0); gl_FragColor = vec4(0.13,1.0,0.6,1.0)*k*1.1; }'
})); mScene.add(atmo);

function sizeMap() {
  const w = mapCanvas.clientWidth, h = mapCanvas.clientHeight; if (!w) return; mR.setSize(w, h, false); mCam.aspect = w / h; mCam.updateProjectionMatrix();
  const half = Math.min(19 * DEG, Math.atan(Math.tan(19 * DEG) * mCam.aspect)); // narrower half-FOV
  const fit = 1.16 / Math.sin(half); const first = ZFIT === 3.4 && zoom === 3.4;
  ZFIT = fit; ZMAX = fit * 1.5; ZMIN = 1.9; if (first) zoom = goalZoom = fit; else goalZoom = Math.min(goalZoom, ZMAX);
}
sizeMap();

let rotY = faceAngles(22, 79).y, rotX = 22 * DEG * 0.8, goalY = rotY, goalX = rotX, autoSpin = true, resumeAt = 0;
const markers = []; let selIdx = -1, popIdx = -1;
const panel = document.getElementById('panel'), placesEl = document.getElementById('places');
const now = new Date();
const fmt = d => d ? new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'date not stated';
const isWeek = d => d && (now - new Date(d + 'T00:00:00Z')) / 864e5 <= 7.5;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ttpUrl = id => 'https://attack.mitre.org/' + (/^TA/.test(id) ? 'tactics/' : 'techniques/') + id.replace('.', '/') + '/';

function flyTo(i) {
  const p = markers[i].place, f = faceAngles(p.lat, p.lon);
  goalX = Math.max(-1.1, Math.min(1.1, f.x));
  goalY = f.y + Math.round((rotY - f.y) / (2 * Math.PI)) * 2 * Math.PI;
  autoSpin = false; resumeAt = Infinity;
  if (goalZoom > ZFIT * 0.85) goalZoom = ZFIT * 0.8;
}
function select(i, scroll) {
  const p = markers[i].place; selIdx = i;
  markers.forEach((m, j) => { m.sel = j === i; m.lab.classList.toggle('sel', j === i); });
  [...placesEl.children].forEach((b, j) => b.setAttribute('aria-selected', j === i));
  const hot = p.incidents.some(x => isWeek(x.date));
  panel.innerHTML = `<h3>${FLAG[p.id] || ''} ${esc(p.name)} <span class="badge ${hot ? '' : 'recent'}">${hot ? '● this week' : 'recent'}</span></h3>` +
    p.incidents.map(x => `<div class="inc"><p>${esc(x.title)}</p>${x.summary ? `<p class="sum">${esc(x.summary)}</p>` : ''}<div class="meta"><span>${fmt(x.date)}${isWeek(x.date) ? ' · this week' : ''}</span>` +
      `<a class="ttp" href="${ttpUrl(x.attack)}" target="_blank" rel="noopener">${esc(x.attack)} · ${esc(x.technique)}</a>` +
      `<a class="src" href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.source)} ↗</a></div></div>`).join('');
  if (scroll) panel.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
function openPop(i) {
  const p = markers[i].place, n = p.incidents.length, wk = p.incidents.filter(x => isWeek(x.date)).length;
  popIdx = i;
  popEl.innerHTML = `<button class="px" type="button" aria-label="Close">✕</button><b>${FLAG[p.id] || ''} ${esc(p.name)}</b>` +
    `<span>${n} recent incident${n === 1 ? '' : 's'}${wk ? ` · ${wk} this week` : ''}</span><button class="pv" type="button">View incidents ↓</button>`;
  popEl.hidden = false;
  popEl.querySelector('.px').onclick = e => { e.stopPropagation(); closePop(); };
  popEl.onclick = () => select(i, true);
  select(i, false);
}
function closePop() { popEl.hidden = true; popIdx = -1; resumeAt = performance.now() + 2500; }

fetch('/data/threats.json', { cache: 'no-cache' }).then(r => { if (!r.ok) throw 0; return r.json(); }).catch(() => import('./threats-seed.json').then(m => m.default)).then(data => {
  document.getElementById('datanote').textContent = `data: ${data.places.length} places · collected ${fmt(data.generated)} · ATT&CK IDs are best-fit mappings of the public reports · auto-updated daily from public news feeds`;
  earthMat.map = earthTexture(new Set(data.places.map(p => p.id))); earthMat.needsUpdate = true;
  data.places.forEach((p, i) => {
    const hot = p.incidents.some(x => isWeek(x.date));
    const col = new THREE.Color(hot ? '#ff2d4a' : '#ffb347');
    const v = ll2v(p.lat, p.lon, 1.0);
    const grp = new THREE.Group(); grp.position.copy(v); grp.lookAt(v.clone().multiplyScalar(2));
    const small = p.id === 'MH';
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, small ? 0.05 : 0.07, 6), new THREE.MeshBasicMaterial({ color: col }));
    stick.rotation.x = Math.PI / 2; stick.position.z = small ? 0.025 : 0.035; grp.add(stick);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(small ? 0.016 : 0.022, 14, 14), new THREE.MeshBasicMaterial({ color: col })); ball.position.z = small ? 0.05 : 0.07; grp.add(ball);
    const rg = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.038, 32), new THREE.MeshBasicMaterial({ color: col, transparent: true, side: THREE.DoubleSide, depthWrite: false })); rg.position.z = 0.003; grp.add(rg);
    mSpin.add(grp);
    const lab = document.createElement('button'); lab.type = 'button'; lab.className = 'pin-lab' + (small ? ' left' : '') + (hot ? ' hot' : '');
    lab.innerHTML = `<i>${FLAG[p.id] || ''}</i>${esc(LABEL[p.id] || p.name)}`; lab.setAttribute('aria-label', p.name + ' — show incidents');
    lab.addEventListener('click', e => { e.stopPropagation(); flyTo(i); openPop(i); });
    pinsEl.appendChild(lab);
    markers.push({ place: p, ball, rg, grp, lab, sel: false, sx: 0, sy: 0, vis: false });
    const b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', 'false');
    b.innerHTML = `<span class="dot ${hot ? 'hot' : ''}"></span>${FLAG[p.id] || ''} ${esc(p.name)}`;
    b.onclick = () => { flyTo(i); openPop(i); mapWrap.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); };
    placesEl.appendChild(b);
  });
  select(0, false);
}).catch(e => { console.error(e); panel.textContent = 'Threat data failed to load.'; });

// one-finger drag rotates (both axes), two-finger pinch / wheel / buttons zoom, tap a pin for its popup
const ptrs = new Map(); let drag = null, pinch = null;
const pinchDist = () => { const [a, b] = [...ptrs.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
mapWrap.addEventListener('pointerdown', e => {
  if (e.target.closest('.pop, .zoom, .pin-lab')) return;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  try { mapWrap.setPointerCapture(e.pointerId); } catch (_) {}
  autoSpin = false; resumeAt = Infinity;
  if (ptrs.size === 1) drag = { x: e.clientX, y: e.clientY, ry: goalY, rx: goalX, moved: false };
  else if (ptrs.size === 2) { pinch = { d: pinchDist(), z: goalZoom }; if (drag) drag.moved = true; }
});
mapWrap.addEventListener('pointermove', e => {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pinch && ptrs.size >= 2) { goalZoom = Math.max(ZMIN, Math.min(ZMAX, pinch.z * pinch.d / Math.max(10, pinchDist()))); return; }
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
  const k = 0.0055 * (zoom - 1) / (ZFIT - 1) * 3.4 / ZFIT; // slower when zoomed in
  goalY = drag.ry + dx * k; goalX = Math.max(-1.2, Math.min(1.2, drag.rx + dy * k));
});
function endPtr(e) {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.delete(e.pointerId);
  if (ptrs.size < 2) pinch = null;
  if (ptrs.size === 1) { const [q] = [...ptrs.values()]; drag = { x: q.x, y: q.y, ry: goalY, rx: goalX, moved: true }; return; }
  if (ptrs.size) return;
  const d = drag; drag = null;
  if (popIdx < 0) resumeAt = performance.now() + 3500;
  if (!d || d.moved || e.type === 'pointercancel') return;
  // tap: nearest visible pin within reach
  const r = mapCanvas.getBoundingClientRect(), tx = e.clientX - r.left, ty = e.clientY - r.top;
  let best = -1, bd = isMobile ? 34 : 24;
  markers.forEach((m, i) => { if (!m.vis) return; const dd = Math.hypot(m.sx - tx, m.sy - ty); if (dd < bd) { bd = dd; best = i; } });
  if (best >= 0) openPop(best); else if (popIdx >= 0) closePop();
}
mapWrap.addEventListener('pointerup', endPtr); mapWrap.addEventListener('pointercancel', endPtr);
mapWrap.addEventListener('wheel', e => { e.preventDefault(); goalZoom = Math.max(ZMIN, Math.min(ZMAX, goalZoom * Math.exp(e.deltaY * 0.0015))); }, { passive: false });
document.getElementById('zin').onclick = () => { goalZoom = Math.max(ZMIN, goalZoom / 1.3); };
document.getElementById('zout').onclick = () => { goalZoom = Math.min(ZMAX, goalZoom * 1.3); };
const _v = new THREE.Vector3();
(window as any).__markerScreen = i => { const m = markers[i], r = mapCanvas.getBoundingClientRect(); return { x: r.left + m.sx, y: r.top + m.sy, vis: m.vis }; }; // QA hook
(window as any).__mapState = () => ({ rotY, rotX, zoom, popIdx });

/* ---------------- render loop ---------------- */
const tmp = new THREE.Color(); let last = performance.now(), t = 0;
let bgOn = true, mapOn = false;
new IntersectionObserver(es => es.forEach(e => { mapOn = e.isIntersecting; }), { rootMargin: '200px' }).observe(mapCanvas);
function frame(ts) {
  if (stopped) return;
  const prog = BS.prog, mapVis = BS.mapVis;
  const dt = Math.min(0.05, (ts - last) / 1000); last = ts; t += dt;
  const p = prog, shieldK = THREE.MathUtils.smoothstep(p, 0.3, 0.55);
  if (mapVis < 0.99) {
    tmp.copy(RED).lerp(GRN, p);
    G.dotMat.color.copy(tmp); G.gridMat.color.copy(tmp); G.glowMat.color.copy(tmp); ring.material.color.copy(tmp);
    G.spin.rotation.y = fa.y + (reduce ? 0 : Math.sin(t * 0.18) * 0.32) + p * 0.25;
    
    ring.scale.setScalar(1 + ((t * 1.5) % 1) * 2.5); ring.material.opacity = 1 - ((t * 1.5) % 1);
    const reach = 1 - shieldK * 0.16; // arcs get stopped at the shield edge
    const arcAlpha = 1 - THREE.MathUtils.smoothstep(p, 0.7, 0.98);
    arcs.forEach(a => {
      const n = a.pts.length, ph = ((t * a.speed + a.off) % 1.25) / 1.0; // >1 = pause
      const headT = Math.min(ph, 1) * reach; const hi = Math.max(1, Math.floor(headT * (n - 1)));
      const tail = Math.max(0, hi - 28); a.geo.setDrawRange(tail, hi - tail + 1);
      a.mat.color.copy(RED).lerp(GRN, shieldK * 0.6); a.mat.opacity = arcAlpha * (ph > 1 ? 0.25 : 0.95);
      a.head.position.copy(a.pts[hi]); a.head.visible = arcAlpha > 0.05 && ph <= 1;
      a.head.material.color.copy(ph >= 0.99 && shieldK > 0.5 ? GRN : (ph >= 1 ? RED : tmp.set(0xffffff)));
    });
    shieldMat.opacity = shieldK * (0.55 + 0.2 * Math.sin(t * 4)); shellMat.opacity = shieldK * 0.12;
    const s = 0.3 + shieldK * 0.9 + p * 0.4; shield.scale.setScalar(s); shieldFill.scale.setScalar(s); shield.rotation.y += dt * 0.6;
    bgR.render(bgScene, bgCam);
  }
  if (mapOn) {
    const nowMs = performance.now();
    if (!autoSpin && popIdx < 0 && nowMs > resumeAt && !ptrs.size) autoSpin = true;
    if (autoSpin && !reduce) goalY += dt * 0.12;
    const kk = Math.min(1, dt * 7);
    rotY += (goalY - rotY) * kk; rotX += (goalX - rotX) * kk; zoom += (goalZoom - zoom) * kk;
    mSpin.rotation.y = rotY; mTilt.rotation.x = rotX; mCam.position.set(0, 0, zoom); mCam.lookAt(0, 0, 0);
    const w = mapCanvas.clientWidth, h = mapCanvas.clientHeight;
    const ps = Math.max(0.28, Math.min(1.1, zoom / 3.6));
    markers.forEach(m => {
      m.grp.scale.setScalar(ps);
      const k = (t * 1.2 + m.place.lat * 0.01) % 1; m.rg.scale.setScalar(1 + k * (m.sel ? 2.2 : 1.4)); m.rg.material.opacity = (1 - k) * (m.sel ? 1 : 0.6); m.ball.scale.setScalar(m.sel ? 1.4 : 1);
      m.ball.getWorldPosition(_v); const facing = _v.z > 1 / zoom + 0.05; _v.project(mCam);
      m.sx = (_v.x + 1) / 2 * w; m.sy = (1 - _v.y) / 2 * h; m.vis = facing && m.sx > -20 && m.sx < w + 20 && m.sy > -20 && m.sy < h + 20;
      m.lab.style.transform = `translate(${m.sx.toFixed(1)}px,${m.sy.toFixed(1)}px)`; m.lab.classList.toggle('off', !m.vis);
    });
    if (popIdx >= 0) { const m = markers[popIdx], pw = popEl.offsetWidth, px = Math.max(pw / 2 + 6, Math.min(w - pw / 2 - 6, m.sx)); popEl.style.setProperty('--ax', (pw / 2 + m.sx - px).toFixed(1) + 'px'); popEl.style.transform = `translate(${px.toFixed(1)}px,${m.sy.toFixed(1)}px)`; popEl.classList.toggle('off', !m.vis); }
    mR.render(mScene, mCam);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);


  return () => { stopped = true; };
}
