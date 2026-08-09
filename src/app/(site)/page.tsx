import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { getProducts, getSiteSettings } from '@/lib/data';

export default async function Home() {
  const [featured, settings] = await Promise.all([getProducts({ featured: true }), getSiteSettings()]);
  const shown = featured.slice(0,6);
  return <>
    <section className="hero"><div className="hero-orb hero-orb-one"/><div className="hero-orb hero-orb-two"/><div className="shell hero-grid">
      <div className="hero-copy"><div className="eyebrow">{settings.hero_eyebrow}</div><h1>{settings.hero_title}<span> {settings.hero_accent}</span></h1><p>{settings.hero_description}</p><div className="hero-actions"><Link className="button button-light" href="/products">Explore Products</Link><Link className="button button-outline-light" href="/contact">Request a Quote</Link></div><div className="hero-points"><span>Egyptian Origin</span><span>Commercial Quantities</span><span>Direct B2B Communication</span></div></div>
      <div className="hero-panel"><div className="hero-panel-label">CURRENT PRODUCT RANGE</div><div className="hero-product-list">{shown.slice(0,4).map((p,i)=><div key={p.id}><strong>{String(i+1).padStart(2,'0')}</strong><span>{p.name}</span><small>{p.category.toUpperCase()}</small></div>)}</div><Link href="/products">View all products <span>↗</span></Link></div>
    </div></section>
    <section className="trust-strip"><div className="shell trust-grid"><div><strong>01</strong><span>Egyptian sourcing</span></div><div><strong>02</strong><span>Dried & commercially packed</span></div><div><strong>03</strong><span>Wholesale-focused supply</span></div><div><strong>04</strong><span>Quote-based purchasing</span></div></div></section>
    <section className="section"><div className="shell"><div className="section-heading"><div><div className="eyebrow dark">OUR PRODUCT RANGE</div><h2>Products selected for commercial buyers.</h2></div><p>Browse our current dried herb, seed, and botanical offering. Product specifications and availability can be discussed directly for each order.</p></div><div className="products-grid">{shown.map(p=><ProductCard key={p.id} product={p}/>)}</div><div className="center-action"><Link className="button button-dark" href="/products">View All Products</Link></div></div></section>
    <section className="section section-muted"><div className="shell split-grid"><div className="statement-card"><div className="eyebrow dark">WHY WORK WITH US</div><h2>Clear sourcing. Direct communication. Business-first service.</h2></div><div className="feature-stack"><div className="feature-row"><strong>01</strong><div><h3>Premium Egyptian Origin</h3><p>Our current product range is sourced from Egypt and prepared for bulk commercial supply.</p></div></div><div className="feature-row"><strong>02</strong><div><h3>Built Around B2B Buyers</h3><p>No consumer checkout and no distracting retail pricing. Buyers contact us directly for quantities, specifications, and quotations.</p></div></div><div className="feature-row"><strong>03</strong><div><h3>Growing Product Catalog</h3><p>Your admin dashboard can add new products whenever the catalog expands.</p></div></div></div></div></section>
    <section className="cta-section"><div className="shell cta-card"><div><div className="eyebrow">START A CONVERSATION</div><h2>Looking for a reliable bulk herb supplier?</h2><p>Tell us what product and quantity you need and we’ll get back to you directly.</p></div><Link className="button button-light" href="/contact">Request a Quote</Link></div></section>
  </>;
}
