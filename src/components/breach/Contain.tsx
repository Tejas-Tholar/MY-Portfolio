const Contain = () => (
<section className="step" id="contain" data-step="2">
    <div className="step-head"><span className="num">02</span><div><p className="tag">CONTAIN</p><h2>Firewall up. Tools out.</h2></div></div>
    <pre className="log">{"$ sudo ufw enable && ./arsenal --load\n[✓] firewall active · inbound arcs blocked"}</pre>
    <div className="rules">
      <div className="rule"><p className="mono dim">// SECURITY TOOLS</p><div className="chips"><span>Nmap</span><span>Wireshark</span><span>Nuclei</span><span>Kali Linux</span></div></div>
      <div className="rule"><p className="mono dim">// CONCEPTS</p><div className="chips"><span>Vulnerability assessment</span><span>Network security</span><span>Firewall management</span><span>Segmentation</span></div></div>
      <div className="rule"><p className="mono dim">// CODE</p><div className="chips"><span>Python</span><span>JavaScript / React</span><span>C · Java</span><span>ASP.NET · PL/SQL</span></div></div>
      <div className="rule"><p className="mono dim">// WORKFLOW</p><div className="chips"><span>Git &amp; GitHub</span><span>Linux admin</span><span>WordPress</span><span>Research &amp; self-learning</span></div></div>
    </div>
  </section>
);

export default Contain;
