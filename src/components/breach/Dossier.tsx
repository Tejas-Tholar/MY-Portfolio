const Dossier = () => (
<section className="dossier" id="resume" aria-labelledby="dos-h">
    <div className="dos-card">
      <div className="dos-top"><span className="mono">CLASSIFIED // DOSSIER</span><span className="mono dim">FILE TT-2027</span></div>
      <div className="dos-body">
        <a className="dos-thumb" href="/Tejas%20Tholar%20Resume.pdf" target="_blank" rel="noopener" aria-label="Open resume (PDF)">
          <img src="/resume-p1.jpg" width="720" height="1018" alt="Preview of page 1 of Tejas Tholar’s resume" loading="lazy" decoding="async" />
          <span className="stamp">DECLASSIFIED</span>
        </a>
        <div className="dos-info">
          <p className="tag">SUBJECT FILE</p>
          <h2 id="dos-h">Resume</h2>
          <dl>
            <div><dt>Subject</dt><dd>Tejas Tholar</dd></div>
            <div><dt>Role</dt><dd>VAPT · Builder</dd></div>
            <div><dt>Format</dt><dd>PDF · 1 page</dd></div>
            <div><dt>Clearance</dt><dd className="ok">Public</dd></div>
          </dl>
          <div className="dos-btns">
            <a className="btn pri" href="/Tejas%20Tholar%20Resume.pdf" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M21 3l-9 9M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /></svg>Open resume</a>
            <a className="btn" href="/Tejas%20Tholar%20Resume.pdf" download="Tejas Tholar Resume.pdf"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M6 11l6 6 6-6M4 21h16" /></svg>Download</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Dossier;
