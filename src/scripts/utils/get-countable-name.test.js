import getCountableName from './get-countable-name';

test('Count apples', () => {
  expect(getCountableName(0, ['яблоко', 'яблока', 'яблок']))
    .toBe('яблок');

  expect(getCountableName(12, ['яблоко', 'яблока', 'яблок']))
    .toBe('яблок');

  expect(getCountableName(10024, ['яблоко', 'яблока', 'яблок']))
    .toBe('яблока');

  expect(getCountableName(91, ['яблоко', 'яблока', 'яблок']))
    .toBe('яблоко');

  expect(getCountableName(-1, ['яблоко', 'яблока', 'яблок']))
    .toBe('яблоко');

  expect(getCountableName(3.122, ['яблоко', 'яблока', 'яблок']))
    .toBe('яблока');
});
