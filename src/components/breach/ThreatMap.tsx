const ThreatMap = () => (
<section className="map" id="map" aria-labelledby="map-h">
    <div className="map-head">
      <p className="tag">LIVE THREAT MAP</p>
      <p className="explain">Live threat map — tap a country to see this week’s real cyber attacks there and how they worked.</p>
      <h2 id="map-h">Tap a country.</h2>
    </div>
    <div className="map-wrap" id="mapwrap"><canvas id="mapgl" aria-label="Interactive 3D Earth with country markers — drag to rotate, pinch or use + and − to zoom"></canvas><div className="pins" id="pins"></div><div className="pop off" id="pop" hidden></div><div className="zoom"><button id="zin" type="button" aria-label="Zoom in">+</button><button id="zout" type="button" aria-label="Zoom out">−</button></div><div className="map-tip" id="tip">drag · pinch to zoom · tap a pin</div></div>
    <div className="places" id="places" role="tablist" aria-label="Places"></div>
    <div className="panel" id="panel" aria-live="polite"></div>
    <p className="fine" id="datanote"></p>
  </section>
);

export default ThreatMap;
