const Contact = () => (
<section className="contact" id="contact">
    <p className="mono ok">secure channel open</p>
    <h2>Let’s secure something.</h2>
    <a className="mail" href="mailto:tejastholar@outlook.com">tejastholar@outlook.com</a>
    <div className="links">
      <a href="https://www.linkedin.com/in/tejas-tholar-36b016317" target="_blank" rel="noopener">LinkedIn ↗</a>
      <a href="https://github.com/Tejas-Tholar" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
    <p className="fine">© {new Date().getFullYear()} Tejas Tholar · Mumbai</p>
  </section>
);

export default Contact;
