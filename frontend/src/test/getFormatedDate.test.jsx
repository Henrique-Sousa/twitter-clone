import getFormatedDate from '../lib/getFormatedDate';

test('seconds', () => {
  expect(getFormatedDate(
    new Date(Date.now() - 30000),
    new Date(Date.now()),
  ))
    .toBe('30s');
});

test('minutes', () => {
  expect(getFormatedDate(
    new Date(Date.now() - 70000),
    new Date(Date.now()),
  ))
    .toBe('1m');
});
