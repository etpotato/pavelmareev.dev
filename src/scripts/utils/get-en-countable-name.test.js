import getEnCountableName from './get-en-countable-name';

test('Count apples', () => {
  expect(getEnCountableName(0, ['apple', 'apples']))
    .toBe('apples');

  expect(getEnCountableName(1, ['apple', 'apples']))
    .toBe('apple');

  expect(getEnCountableName(10024, ['apple', 'apples']))
    .toBe('apples');

  expect(getEnCountableName(3.122, ['apple', 'apples']))
    .toBe('apples');
});
