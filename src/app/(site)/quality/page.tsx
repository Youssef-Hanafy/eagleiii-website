export default function QualityPage() {
  return (
    <section className="page-section">
      <div className="shell narrow">
        <div className="eyebrow dark">QUALITY & SOURCING</div>
        <h1>Transparent product information for serious buyers.</h1>
        <p className="lead">
          Product origin, form, packaging, specifications, and available documentation can be provided
          during the purchasing process.
        </p>
        <div className="quality-grid">
          <div className="content-card"><strong>01</strong><h2>Origin</h2><p>Current products are sourced from Egypt.</p></div>
          <div className="content-card"><strong>02</strong><h2>Processing</h2><p>Products are supplied dried and commercially packaged before distribution.</p></div>
          <div className="content-card"><strong>03</strong><h2>Documentation</h2><p>Available specifications and supplier documentation can be shared with qualified buyers.</p></div>
          <div className="content-card"><strong>04</strong><h2>Compliance</h2><p>Regulatory claims will only be displayed when supported by the applicable documentation.</p></div>
        </div>
      </div>
    </section>
  );
}
