const key = 'portfolio-contact-sends';
const windowMs = 3 * 60 * 60 * 1000;
const sendLimit = 2;

let memory = [];
let pending = false;

function readSends(now) {
  let sends = memory;
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(stored)) sends = stored;
  } catch {
    // Keep the limit active during this visit when browser storage is unavailable.
  }
  return sends.filter((time) => Number.isFinite(time) && now - time < windowMs);
}

async function sendWithinLimit(send) {
  if (pending) return false;
  const sends = readSends(Date.now());
  if (sends.length >= sendLimit) return false;

  pending = true;
  try {
    await send();
    memory = [...sends, Date.now()];
    try {
      localStorage.setItem(key, JSON.stringify(memory));
    } catch {
      // The successful send is still tracked in memory.
    }
    return true;
  } finally {
    pending = false;
  }
}

export function sendContactMessage(send) {
  if (navigator.locks?.request) {
    return navigator.locks.request(key, () => sendWithinLimit(send));
  }
  return sendWithinLimit(send);
}
