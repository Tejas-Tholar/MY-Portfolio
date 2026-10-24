const Hero = () => (
<section className="hero" id="breach">
    <div className="alert glitch" data-text="⚠ INTRUSION DETECTED">⚠ INTRUSION DETECTED</div>
    <h1 className="name glitch" data-text="TEJAS THOLAR">TEJAS THOLAR</h1>
    <p className="role">Cybersecurity · VAPT · Builder — Mumbai</p>
    <div className="term" aria-label="Simulated attack log">
      <div className="term-bar"><i></i><i></i><i></i><span>attacker@203.0.113.45</span></div>
      <pre id="atk"></pre>
    </div>
    <a className="hint" href="#recon">scroll to defend <span>↓</span></a>
  </section>
);

export default Hero;
