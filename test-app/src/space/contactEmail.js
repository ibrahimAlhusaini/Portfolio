import emailjs from '@emailjs/browser';
import { profile } from './content';

export function sendPortfolioEmail(form) {
  return emailjs.sendForm(
    'service_8o769i9',
    'template_up4nw3y',
    form,
    { publicKey: 'jG7XCvmJokOPAE34v' },
  );
}

export function contactFailure(error) {
  if (error?.status === 429) return 'providerRateLimited';
  if ([400, 401, 403, 404, 412].includes(error?.status)) return 'providerUnavailable';
  return 'error';
}

export function emailDraft(fields) {
  const subject = fields.get('subject').trim();
  const body = [fields.get('message').trim(), '', fields.get('user_name').trim(), fields.get('user_email').trim()].join('\n');
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
