import { fireEvent, render, screen, within } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import App from './App';

jest.mock('@emailjs/browser', () => ({ sendForm: jest.fn() }));

beforeEach(() => {
  window.history.replaceState(null, '', '/');
  window.localStorage.clear();
  emailjs.sendForm.mockReset();
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('opens a destination from the star map and returns home', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ibrahim');

  const map = screen.getByRole('region', { name: 'Star map' });
  fireEvent.click(within(map).getByRole('link', { name: 'Skills' }));
  expect(window.location.hash).toBe('#skills');
  expect(screen.getByRole('heading', { name: 'Technical skills' })).toHaveFocus();
  expect(screen.getByText('Express.js')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: 'Star map' }));
  expect(window.location.hash).toBe('#home');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ibrahim');
});

test('preserves the destination while switching to Arabic and supports project deep links', () => {
  window.history.replaceState(null, '', '/#projects1');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'MetaForm GYM' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'العربية' }));
  expect(document.documentElement).toHaveAttribute('dir', 'rtl');
  expect(screen.getByRole('heading', { name: 'مختارات من مشاريعي' })).toBeInTheDocument();
  expect(window.location.hash).toBe('#projects1');
  expect(window.localStorage.getItem('portfolio-language')).toBe('ar');
});


test('links to the CV and social profiles in the footer', () => {
  render(<App />);
  const footer = within(screen.getByRole('contentinfo'));
  expect(footer.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/IBRAHIM%20ALHUSAINI%20CV.pdf');
  expect(footer.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
  expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
});

test('offers the filled message as an email draft when the provider refuses delivery', async () => {
  window.history.replaceState(null, '', '/#contact');
  emailjs.sendForm.mockRejectedValue({ status: 403 });
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  render(<App />);
  const fields = [
    ['Name', 'Test Visitor'],
    ['Email', 'visitor@example.com'],
    ['Subject', 'Portfolio enquiry'],
    ['Message', 'مرحبا & hello'],
  ];

  for (const [label, value] of fields) {
    const input = screen.getByLabelText(label, { exact: true });
    expect(input).toBeRequired();
    fireEvent.change(input, { target: { value } });
  }
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

  const draft = await screen.findByRole('link', { name: 'Open in email app' });
  const href = draft.getAttribute('href');
  expect(href).toMatch(/^mailto:ibrahimalhusaini21@gmail\.com\?/);
  const query = new URLSearchParams(href.split('?')[1]);
  expect(query.get('subject')).toBe('Portfolio enquiry');
  expect(query.get('body')).toContain('مرحبا & hello');
  expect(screen.getByLabelText('Message')).toHaveValue('مرحبا & hello');
  expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
});
