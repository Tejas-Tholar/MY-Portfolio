const Recon = () => (
<section className="step" id="recon" data-step="1">
    <div className="step-head"><span className="num">01</span><div><p className="tag">RECON</p><h2>Identify the defender.</h2></div></div>
    <pre className="log">{"$ whoami\n→ Tejas Tholar · BCA ’27 · Somaiya Vidyavihar University\n$ cat experience.log"}</pre>
    <div className="card">
      <p>A BCA student at <b>Somaiya Vidyavihar University</b> targeting <b>VAPT / penetration testing</b> roles. Hands-on with firewall rules, monitoring and network segmentation at Indian Oil — and a full-stack builder, so I think like both the attacker and the developer.</p>
      <div className="exp">
        <p className="mono dim">// EXPERIENCE · MAY–JUL 2025</p>
        <h3>Network Security Intern — Indian Oil Corporation Ltd.</h3>
        <ul>
          <li>Firewall configuration &amp; access-control rule reviews</li>
          <li>Network monitoring for abnormal traffic</li>
          <li>LAN troubleshooting &amp; zone segmentation</li>
          <li>Security best practices across endpoints</li>
        </ul>
      </div>
    </div>
  </section>
);

export default Recon;
