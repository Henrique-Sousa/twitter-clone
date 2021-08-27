import getFormatedDate from '../lib/getFormatedDate';

describe('test formated date', () => {
  const baseTime = 1600 * (10 ** 9);
  const baseDate = new Date(baseTime);
  const getDateBefore = (time) => new Date(baseTime - time);
  const s = 1000;
  const m = 60 * s;
  const h = 60 * m;

  test('seconds', () => {
    expect(getFormatedDate(
      getDateBefore(30 * s),
      baseDate,
    ))
      .toBe('30s');
  });

  test('minutes', () => {
    expect(getFormatedDate(
      getDateBefore(m + 10 * s),
      baseDate,
    ))
      .toBe('1m');
  });

  test('hours', () => {
    expect(getFormatedDate(
      getDateBefore(2 * h + 21 * m + 35 * s),
      baseDate,
    ))
      .toBe('2h');
  });
});
