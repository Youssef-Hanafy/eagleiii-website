export function emailHref(email: string) {
  return `mailto:${email.trim()}`;
}

export function phoneHref(phone: string) {
  const normalized = phone.trim().replace(/[^\d+]/g, '');
  return `tel:${normalized}`;
}

export function whatsappHref(value: string) {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const digits = trimmed.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

export function externalHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
