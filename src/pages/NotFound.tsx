import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  return (
    <main className="contact" style={{ minHeight: "100vh", display: "grid", placeContent: "center", textAlign: "center" }}>
      <p className="mono ok">404 · {location.pathname}</p>
      <h2>Nothing to breach here.</h2>
      <div className="links"><a href="/">Return to base ↩</a></div>
    </main>
  );
};

export default NotFound;
