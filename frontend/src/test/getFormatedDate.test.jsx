import getFormatedDate from '../lib/getFormatedDate';

describe('test formated date', () => {
  const baseDate = new Date('December 17, 1995 03:24:00');
  const thirtySecsBefore = new Date('December 17, 1995 03:23:30');
  const oneMinBefore = new Date('December 17, 1995 03:23:00');
  const twoHoursBefore = new Date('December 17, 1995 01:19:15');
  const dec14 = new Date('December 14, 1995 17:33:43');
  const feb21 = new Date('February 21, 1995 13:23:21');

  test('seconds', () => {
    expect(getFormatedDate(
      thirtySecsBefore,
      baseDate,
    ))
      .toBe('30s');
  });

  test('minutes', () => {
    expect(getFormatedDate(
      oneMinBefore,
      baseDate,
    ))
      .toBe('1m');
  });

  test('hours', () => {
    expect(getFormatedDate(
      twoHoursBefore,
      baseDate,
    ))
      .toBe('2h');
  });

  test('dec 14', () => {
    expect(getFormatedDate(
      dec14,
      baseDate,
    ))
      .toBe('Dec 14');
  });

  test('feb 21', () => {
    expect(getFormatedDate(
      feb21,
      baseDate,
    ))
      .toBe('Feb 21');
  });
});
