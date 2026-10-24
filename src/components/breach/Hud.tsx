const Hud = () => (
<header className="hud" role="banner">
  <a className="brand" href="#top">&gt;_ tejas<span>.tholar</span></a>
  <div className="meter" role="status" aria-live="polite">
    <div className="meter-row"><span id="status">INTRUSION DETECTED</span><b><span id="pct">98</span>%</b></div>
    <div className="bar"><i id="barfill"></i></div>
    <small>THREAT LEVEL</small>
  </div>
</header>
);

export default Hud;
