// @ts-nocheck — direct port of the approved prototype's non-3D behaviour (runs immediately, no Three.js)
import { BS } from './state';

export function initCore(): () => void {
  let stopped = false;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bgCanvas = document.getElementById('bg');
/* ---------------- scroll → defense progress ---------------- */
const root = document.documentElement;
const pctEl = document.getElementById('pct'), bar = document.getElementById('barfill'), statusEl = document.getElementById('status');
const securedEl = document.getElementById('secured'), mapSec = document.getElementById('map');
const STAT = [[0.02, 'INTRUSION DETECTED'], [0.25, 'RECON · TRACING'], [0.5, 'CONTAINING'], [0.75, 'PATCHING'], [0.97, 'NEUTRALIZING'], [2, 'SYSTEM SECURED']];
function onScroll() {
  const end = securedEl.offsetTop - innerHeight * 0.35;
  BS.prog = Math.min(1, Math.max(0, scrollY / Math.max(1, end)));
  const threat = Math.round(98 * (1 - BS.prog));
  pctEl.textContent = threat; bar.style.width = threat + '%';
  root.style.setProperty('--t', (1 - BS.prog).toFixed(3));
  statusEl.textContent = STAT.find(([p]) => BS.prog < p)[1];
  const r = mapSec.getBoundingClientRect();
  BS.mapVis = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.6)));
  bgCanvas.style.opacity = (1 - BS.mapVis * 0.9).toFixed(2);
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();


/* ---------------- attack terminal ---------------- */
const atk = document.getElementById('atk');
const LINES = [
  ['[!] inbound scan from 203.0.113.45 → tejas.portfolio', ''],
  ['$ nmap -sS -p- tejas.portfolio', ''],
  ['[+] 22/tcp open · 443/tcp open', 'y'],
  ['[!] brute-force on /admin · 1,204 attempts', ''],
  ['[!] payload staged · exfil channel → 198.51.100.7', ''],
  ['[!] 10 hostile arcs converging on MUMBAI', ''],
  ['[*] defender online · scroll to respond', 'g'],
];
let li = 0, ci = 0, cur = null;
function typeTick() {
  if (stopped) return;
  if (li >= LINES.length) { setTimeout(() => { atk.textContent = ''; li = 0; typeTick(); }, 3500); return; }
  if (!cur) { cur = document.createElement('div'); if (LINES[li][1]) cur.className = LINES[li][1]; atk.appendChild(cur); }
  cur.textContent = LINES[li][0].slice(0, ++ci);
  if (ci >= LINES[li][0].length) { li++; ci = 0; cur = null; setTimeout(typeTick, 380); }
  else setTimeout(typeTick, reduce ? 0 : 18 + Math.random() * 30);
  while (atk.childNodes.length > 8) atk.removeChild(atk.firstChild);
}
typeTick();


(()=>{const s=document.getElementById('secured');if(!s)return;
if(!('IntersectionObserver'in window)){s.classList.add('in');return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){s.classList.add('in');io.disconnect()}}),{threshold:.45});io.observe(s)})();

/* ---------------- terminal easter egg ---------------- */
const shellEl = document.getElementById('shell'), out = document.getElementById('out'), cmd = document.getElementById('cmd');
const CMDS = {
  help: () => 'commands: help, whoami, projects, contact, clear',
  whoami: () => 'Tejas Tholar — BCA ’27 @ Somaiya Vidyavihar University\nex Network Security Intern @ Indian Oil Corporation (May–Jul 2025)\nfocus: VAPT · building secure products',
  projects: () => '• Volunteer Connect — OWASP-aligned volunteer–NGO platform\n• DineFlow — contactless QR ordering\n• Skillora — AI learning in 10+ Indian languages (founder)\n• Traffic Violation Detection — ASP.NET academic project\n• BrandlyCollab — creator marketing agency (founder)',
  contact: () => 'email    tejastholar@outlook.com\nlinkedin linkedin.com/in/tejas-tholar-36b016317\ngithub   github.com/Tejas-Tholar',
  clear: () => { out.textContent = ''; return null; },
};
document.getElementById('egg').onclick = () => { shellEl.hidden = !shellEl.hidden; if (!shellEl.hidden) cmd.focus(); };
document.getElementById('shellx').onclick = () => { shellEl.hidden = true; };
document.getElementById('cmdf').onsubmit = e => {
  e.preventDefault(); const c = cmd.value.trim().toLowerCase(); cmd.value = ''; if (!c) return;
  out.textContent += `$ ${c}\n`;
  const r = CMDS[c] ? CMDS[c]() : `command not found: ${c} — try "help"`;
  if (r !== null) out.textContent += r + '\n';
  out.scrollTop = out.scrollHeight;
};
addEventListener('keydown', e => { if (e.key === 'Escape') shellEl.hidden = true; });

  return () => { stopped = true; removeEventListener('scroll', onScroll); };
}
