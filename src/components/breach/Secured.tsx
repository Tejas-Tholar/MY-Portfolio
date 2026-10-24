const Secured = () => (
<section className="secured" id="secured">
    <p className="mono ok">threat level 0% · all arcs blocked</p>
    <h2 className="sec-h"><span>SYSTEM SECURED</span>
      <span className="tick" aria-hidden="true"><svg viewBox="0 0 120 120" width="120" height="120">
        <circle className="rip r1" cx="60" cy="60" r="44" /><circle className="rip r2" cx="60" cy="60" r="44" />
        <path className="shield" pathLength="1" d="M60 10 L100 25 V58 C100 84 82 102 60 110 C38 102 20 84 20 58 V25 Z" />
        <path className="chk" pathLength="1" d="M41 60 L54 73 L81 45" />
      </svg></span></h2>
    <p className="dim">Now look at the real world ↓</p>
  </section>
);

export default Secured;
