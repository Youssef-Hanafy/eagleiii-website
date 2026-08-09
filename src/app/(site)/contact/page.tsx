import { getSiteSettings } from '@/lib/data';
import { emailHref, externalHref, phoneHref, whatsappHref } from '@/lib/contact-links';
import { submitInquiry } from './actions';

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; sent?: string; error?: string }>;
}) {
  const [params, s] = await Promise.all([searchParams, getSiteSettings()]);

  const socialLinks = [
    { label: 'Facebook', value: s.facebook_url },
    { label: 'Messenger', value: s.messenger_url },
    { label: 'Instagram', value: s.instagram_url },
    { label: 'LinkedIn', value: s.linkedin_url },
  ].filter((item) => item.value);

  return (
    <section className="page-section">
      <div className="shell contact-grid">
        <div className="contact-intro">
          <div className="eyebrow dark">REQUEST A QUOTE</div>
          <h1>Tell us what your business needs.</h1>
          <p>
            Send a short inquiry with the product, approximate quantity, and your company details.
            We’ll follow up directly.
          </p>

          <div className="contact-details">
            {s.email && (
              <a className="contact-link-row" href={emailHref(s.email)}>
                <span><small>EMAIL</small><strong>{s.email}</strong></span>
                <b>↗</b>
              </a>
            )}
            {s.phone && (
              <a className="contact-link-row" href={phoneHref(s.phone)}>
                <span><small>PHONE</small><strong>{s.phone}</strong></span>
                <b>↗</b>
              </a>
            )}
            {s.whatsapp && (
              <a className="contact-link-row" href={whatsappHref(s.whatsapp)} target="_blank" rel="noreferrer">
                <span><small>WHATSAPP</small><strong>{s.whatsapp}</strong></span>
                <b>↗</b>
              </a>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="social-links">
              {socialLinks.map((item) => (
                <a key={item.label} href={externalHref(item.value)} target="_blank" rel="noreferrer">
                  {item.label} <span>↗</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <form action={submitInquiry} className="quote-form">
          {params.sent === '1' && (
            <div className="success-box">Inquiry sent successfully. We’ll be in touch.</div>
          )}
          {params.error && (
            <div className="error-box">
              There was a problem sending your inquiry. Please check the required fields and try again.
            </div>
          )}
          <div className="form-row">
            <label>Full Name<input name="name" required placeholder="John Smith" /></label>
            <label>Company<input name="company" required placeholder="ABC Foods LLC" /></label>
          </div>
          <div className="form-row">
            <label>Business Email<input type="email" name="email" required placeholder="john@company.com" /></label>
            <label>Phone Number<input name="phone" placeholder="+1..." /></label>
          </div>
          <div className="form-row">
            <label>Product<input name="product" defaultValue={params.product ?? ''} placeholder="Oregano" /></label>
            <label>Approx. Quantity<input name="quantity" placeholder="2,000 kg" /></label>
          </div>
          <div className="form-row">
            <label>Country<input name="country" placeholder="United States" /></label>
            <label>Preferred Contact<select name="preferred_contact"><option>Email</option><option>Phone</option><option>WhatsApp</option></select></label>
          </div>
          <label>Message<textarea name="message" required rows={6} placeholder="Tell us what specifications or quantities you are looking for..." /></label>
          <button className="button button-dark" type="submit">Send Inquiry</button>
        </form>
      </div>
    </section>
  );
}
