const Patch = () => (
<section className="step" id="patch" data-step="3">
    <div className="step-head"><span className="num">03</span><div><p className="tag">PATCH</p><h2>Patches shipped.</h2></div></div>
    <pre className="log">{"$ git log --oneline --projects"}</pre>
    <div className="projects">
      <article className="proj"><p className="mono dim">FULL-STACK · OWASP-ALIGNED</p><h3>Volunteer Connect</h3><p>Volunteer–NGO platform secured with JWT + bcrypt, role-based access, rate limiting and audit logs.</p><div className="chips sm"><span>React</span><span>Node.js</span><span>PostgreSQL</span><span>Prisma</span></div></article>
      <article className="proj"><p className="mono dim">NEXT.JS · QR ORDERING</p><h3>DineFlow</h3><p>Contactless QR ordering for restaurants — real-time kitchen tracking, staff login, UPI / card / cash.</p><div className="chips sm"><span>Next.js</span><span>Realtime</span><span>Payments</span></div></article>
      <article className="proj"><p className="mono dim">FOUNDER · IN DEVELOPMENT</p><h3>Skillora</h3><p>AI-powered personalised learning — generated courses, roadmaps and adaptive paths in 10+ Indian languages.</p><div className="chips sm"><span>AI</span><span>EdTech</span><span>skillorai.in</span></div></article>
      <article className="proj"><p className="mono dim">ASP.NET · ACADEMIC</p><h3>Traffic Violation Detection</h3><p>Citizen road-safety reporting with evidence upload and an authority-side verification workflow.</p><div className="chips sm"><span>ASP.NET</span><span>C#</span><span>SQL</span></div></article>
      <article className="proj"><p className="mono dim">FOUNDER · AGENCY</p><h3>BrandlyCollab</h3><p>Creator marketing agency connecting D2C brands with nano &amp; micro creators — end to end.</p><div className="chips sm"><span>Business</span><span>brandlycollab.in</span></div></article>
    </div>
  </section>
);

export default Patch;
