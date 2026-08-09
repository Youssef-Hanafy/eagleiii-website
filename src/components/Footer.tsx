import Link from 'next/link';
import { getSiteSettings } from '@/lib/data';
import { emailHref, externalHref, phoneHref, whatsappHref } from '@/lib/contact-links';

export async function Footer() {
  const s = await getSiteSettings();
  const socialLinks = [
    { label: 'Facebook', value: s.facebook_url },
    { label: 'Messenger', value: s.messenger_url },
    { label: 'Instagram', value: s.instagram_url },
    { label: 'LinkedIn', value: s.linkedin_url },
  ].filter((item) => item.value);

  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">E</span><span><strong>{s.company_name}</strong><small>{s.tagline}</small></span></div>
          <p className="footer-copy">Premium dried herbs, seeds, and botanicals sourced from Egypt for wholesale and commercial buyers.</p>
        </div>
        <div>
          <h3>Navigate</h3>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/quality">Quality & Sourcing</Link>
          <Link href="/contact">Request a Quote</Link>
        </div>
        <div>
          <h3>Contact</h3>
          {s.email && <a href={emailHref(s.email)}>Email: {s.email}</a>}
          {s.phone && <a href={phoneHref(s.phone)}>Phone: {s.phone}</a>}
          {s.whatsapp && <a href={whatsappHref(s.whatsapp)} target="_blank" rel="noreferrer">WhatsApp: {s.whatsapp}</a>}
          {socialLinks.map((item) => (
            <a key={item.label} href={externalHref(item.value)} target="_blank" rel="noreferrer">{item.label}</a>
          ))}
        </div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 {s.company_name}. All rights reserved.</span><Link href="/admin/login">Admin</Link></div>
    </footer>
  );
}
