import Link from 'next/link';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-visual product-photo-wrap">
        {product.main_image_url ? <img className="product-photo" src={product.main_image_url} alt={product.name} /> : <><span>{product.name.slice(0,2).toUpperCase()}</span><small>EGYPTIAN ORIGIN</small></>}
      </Link>
      <div className="product-card-body">
        <div className="product-meta"><span>{product.category}</span><span>{product.form || 'Dried'}</span></div>
        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.short_description || product.description}</p>
        <div className="product-card-footer"><span>Origin: {product.origin || 'Egypt'}</span><Link href={`/contact?product=${encodeURIComponent(product.name)}`}>Inquire →</Link></div>
      </div>
    </article>
  );
}
