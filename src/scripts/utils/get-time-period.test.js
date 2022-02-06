import getTimePeriod from './get-time-period';

test('Count time period', () => {
  expect(getTimePeriod(new Date('2022-02'), new Date('2022-02'))).toEqual([0, 0]);
  expect(getTimePeriod(new Date('1993-01'), new Date('1994-01'))).toEqual([1, 0]);
  expect(getTimePeriod(new Date('1994-01'), new Date('1993-01'))).toEqual([1, 0]);
  expect(getTimePeriod(new Date('2001-07'), new Date('1999-05'))).toEqual([2, 2]);
  expect(getTimePeriod(new Date('2021-06'), new Date('2022-03'))).toEqual([0, 9]);
});
