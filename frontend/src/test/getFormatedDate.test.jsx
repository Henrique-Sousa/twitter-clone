import getFormatedDate from '../lib/getFormatedDate';

describe('test formated date', () => {
  const baseTime = 1600 * (10 ** 9);
  const baseDate = new Date(baseTime);
  const getDateBefore = (time) => new Date(baseTime - time);

  test('seconds', () => {
    expect(getFormatedDate(
      getDateBefore(30 * 1000),
      baseDate,
    ))
      .toBe('30s');
  });

  test('minutes', () => {
    expect(getFormatedDate(
      getDateBefore(70 * 1000),
      baseDate,
    ))
      .toBe('1m');
  });
});
