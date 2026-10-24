const Terminal = () => (
<>
<button className="egg" id="egg" aria-label="Open terminal">&gt;_</button>
<div className="shell" id="shell" role="dialog" aria-modal="true" aria-label="Terminal" hidden>
  <div className="term-bar"><i></i><i></i><i></i><span>guest@tejas:~</span><button id="shellx" aria-label="Close terminal">✕</button></div>
  <pre id="out">{"Type \"help\" to begin.\n"}</pre>
  <form id="cmdf"><label htmlFor="cmd">$</label><input id="cmd" autoComplete="off" autoCapitalize="off" spellCheck={false} enterKeyHint="send" /></form>
</div>
</>
);

export default Terminal;
