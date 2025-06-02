function NearbyHighlights() {
  return (
    <section className="nearby-highlights">
      <div className="nearby-highlights-card">
        <h3>PRESTIGE CITY</h3>
        <img
          className="max-w-[100px] max-h-[100px] mx-auto block"
          style={{ display: "block", margin: "auto" }}
          src="assets/nearby-highlights-image-1.png"
          alt=""
        />
        <p>
          A landmark township offering luxury residences, retail, and leisure
          spaces, bringing urban convenience to your doorstep
        </p>
        <h4>9 Minutes Away</h4>
        <img
          className="sidebar-image  h-70"
          src="assets/nearby-highlights-image-sidebar.png"
          alt=""
        />
      </div>
      <div className="nearby-highlights-card">
        <h3>GREENWOOD INTL SCHOOL</h3>
        <img
          className="max-w-[100px] max-h-[100px] mx-auto block"
          style={{ display: "block", margin: "auto" }}
          src="assets/nearby-highlights-image-2.png"
          alt=""
        />
        <p>
          One of the city’s premier international schools, known for world-class
          academics and a nurturing environment
        </p>
        <h4>20 minutes away</h4>
      </div>
      <div className="nearby-highlights-card">
        <h3>WIPRO</h3>
        <img
          className="max-w-[100px] max-h-[100px] mx-auto block"
          style={{ display: "block", margin: "auto" }}
          src="assets/nearby-highlights-image-3.png"
          alt=""
        />
        <p>
          A global tech powerhouse and innovation hub, keeping you connected to
          Bengaluru’s thriving IT ecosystem
        </p>
        <h4>15 minutes away</h4>
        <img
          className="sidebar-image-2  h-70"
          src="assets/nearby-highlights-image-sidebar.png"
          alt=""
        />
      </div>
    </section>
  );
}

export default NearbyHighlights;
