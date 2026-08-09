'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

function clean(value: FormDataEntryValue | null) {
  return String(value || '').trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function sendQuoteNotification(payload: {
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  product_name: string | null;
  quantity: string | null;
  preferred_contact: string | null;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not configured. Inquiry saved without email notification.');
    return;
  }

  const supabase = await createClient();
  const { data: settings } = await supabase
    .from('site_settings')
    .select('company_name,email')
    .eq('id', 1)
    .single();

  const notifyEmail = settings?.email?.trim();
  if (!notifyEmail) {
    console.warn('No website contact email is configured. Inquiry saved without email notification.');
    return;
  }

  const companyName = settings?.company_name?.trim() || 'Egypt Herbs Wholesale';
  const fromEmail = process.env.RESEND_FROM_EMAIL || `${companyName} <onboarding@resend.dev>`;
  const subjectProduct = payload.product_name ? ` - ${payload.product_name}` : '';

  const rows = [
    ['Name', payload.name],
    ['Company', payload.company],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['Country', payload.country],
    ['Product', payload.product_name],
    ['Approx. Quantity', payload.quantity],
    ['Preferred Contact', payload.preferred_contact],
  ].filter(([, value]) => value);

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e7e7e2;color:#677068;font-size:12px;width:160px;">${escapeHtml(String(label))}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e7e7e2;color:#15251b;font-size:14px;font-weight:600;">${escapeHtml(String(value))}</td>
        </tr>`,
    )
    .join('');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f0e6;padding:32px;color:#15251b;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #dedfd8;">
        <div style="background:#173d2a;color:#ffffff;padding:26px 30px;">
          <div style="font-size:11px;letter-spacing:2px;color:#d9c291;margin-bottom:8px;">NEW WEBSITE INQUIRY</div>
          <div style="font-family:Georgia,serif;font-size:30px;">New quote request${payload.product_name ? ` for ${escapeHtml(payload.product_name)}` : ''}</div>
        </div>
        <div style="padding:26px 30px;">
          <p style="margin:0 0 20px;color:#657067;line-height:1.6;">A buyer submitted a request through the ${escapeHtml(companyName)} website.</p>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e7e7e2;">${htmlRows}</table>
          <div style="margin-top:24px;padding:18px;background:#f7f6f1;border-left:4px solid #173d2a;">
            <div style="font-size:11px;letter-spacing:1.4px;color:#657067;margin-bottom:8px;">MESSAGE</div>
            <div style="font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
          </div>
          <p style="margin:22px 0 0;color:#657067;font-size:12px;line-height:1.6;">Replying to this email will reply directly to ${escapeHtml(payload.email)}.</p>
        </div>
      </div>
    </div>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      reply_to: payload.email,
      subject: `New quote request${subjectProduct} - ${payload.name}`,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend notification failed:', response.status, detail);
  }
}

export async function submitInquiry(formData: FormData) {
  const supabase = await createClient();
  const payload = {
    name: clean(formData.get('name')),
    company: clean(formData.get('company')) || null,
    email: clean(formData.get('email')),
    phone: clean(formData.get('phone')) || null,
    country: clean(formData.get('country')) || null,
    product_name: clean(formData.get('product')) || null,
    quantity: clean(formData.get('quantity')) || null,
    preferred_contact: clean(formData.get('preferred_contact')) || null,
    message: clean(formData.get('message')),
  };

  if (!payload.name || !payload.email || !payload.message) {
    redirect('/contact?error=missing');
  }

  const { error } = await supabase.from('inquiries').insert(payload);
  if (error) redirect('/contact?error=submit');

  // The lead is already safely stored in Supabase. A temporary email-provider
  // problem should never cause the buyer to submit the same inquiry twice.
  try {
    await sendQuoteNotification(payload);
  } catch (error) {
    console.error('Quote notification error:', error);
  }

  redirect('/contact?sent=1');
}
