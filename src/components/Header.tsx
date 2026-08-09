import Link from 'next/link';
import { getSiteSettings } from '@/lib/data';

export async function Header() {
  const settings = await getSiteSettings();
  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Link className="brand" href="/">
          <span className="brand-mark">E</span>
          <span><strong>{settings.company_name}</strong><small>{settings.tagline}</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/">Home</Link><Link href="/products">Products</Link><Link href="/about">About</Link><Link href="/quality">Quality & Sourcing</Link><Link href="/contact">Contact</Link>
        </nav>
        <Link className="button button-dark nav-cta" href="/contact">Request a Quote</Link>
      </div>
    </header>
  );
}
