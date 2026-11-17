beforeEach(() => {
  localStorage.clear();
  jest.resetModules();
});

test('allows two successful sends and blocks a third within three hours across reloads', async () => {
  const now = jest.spyOn(Date, 'now').mockReturnValue(1000);
  const send = jest.fn().mockResolvedValue(undefined);
  const { sendContactMessage } = require('./contactThrottle');

  await expect(sendContactMessage(send)).resolves.toBe(true);
  now.mockReturnValue(2000);
  await expect(sendContactMessage(send)).resolves.toBe(true);

  jest.resetModules();
  const reloaded = require('./contactThrottle');
  await expect(reloaded.sendContactMessage(send)).resolves.toBe(false);
  expect(send).toHaveBeenCalledTimes(2);

  now.mockReturnValue(1000 + 3 * 60 * 60 * 1000);
  await expect(reloaded.sendContactMessage(send)).resolves.toBe(true);
  now.mockRestore();
});

test('does not count a failed delivery or run two sends at the same time', async () => {
  const { sendContactMessage } = require('./contactThrottle');
  let rejectDelivery;
  const delivery = sendContactMessage(() => new Promise((resolve, reject) => {
    rejectDelivery = reject;
  }));
  const send = jest.fn().mockResolvedValue(undefined);

  await expect(sendContactMessage(send)).resolves.toBe(false);
  expect(send).not.toHaveBeenCalled();
  rejectDelivery(new Error('Unavailable'));
  await expect(delivery).rejects.toThrow('Unavailable');

  await expect(sendContactMessage(send)).resolves.toBe(true);
  await expect(sendContactMessage(send)).resolves.toBe(true);
  await expect(sendContactMessage(send)).resolves.toBe(false);
});
