import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.replaceState(null, '', '/');
  window.localStorage.clear();
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
