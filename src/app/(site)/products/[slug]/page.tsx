import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/data';

export default async function ProductPage({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params; const p=await getProductBySlug(slug); if(!p) notFound();
  const gallery=p.product_images ?? [];
  return <section className="page-section"><div className="shell product-detail-grid">
    <div><div className="product-detail-main product-photo-wrap">{p.main_image_url?<img className="product-photo" src={p.main_image_url} alt={p.name}/>:<span>{p.name.slice(0,2).toUpperCase()}</span>}</div>{gallery.length>0&&<div className="product-gallery">{gallery.map(img=><div className="product-photo-wrap" key={img.id}><img className="product-photo" src={img.image_url} alt={`${p.name} product`}/></div>)}</div>}</div>
    <div className="product-detail-copy"><div className="eyebrow dark">{p.category} · ORIGIN: {p.origin}</div><h1>{p.name}</h1><p className="lead">{p.description || p.short_description}</p><div className="spec-list"><div><span>Form</span><strong>{p.form || 'Dried'}</strong></div><div><span>Packaging</span><strong>{p.packaging || 'Contact us'}</strong></div><div><span>Minimum Order</span><strong>{p.minimum_order || 'Contact us'}</strong></div><div><span>Availability</span><strong>{p.availability || 'Available on request'}</strong></div><div><span>Quality</span><strong>{p.quality_label || 'Premium Quality'}</strong></div></div>{p.specification_url&&<a className="text-link" href={p.specification_url} target="_blank">View Product Specification ↗</a>}<div className="detail-actions"><Link className="button button-dark" href={`/contact?product=${encodeURIComponent(p.name)}`}>Request a Quote</Link><Link className="button button-soft" href="/products">Back to Products</Link></div></div>
  </div></section>;
}
