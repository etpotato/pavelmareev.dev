import debounce from './debounce';

jest.useFakeTimers();

test('call debounced function after 1 sec', () => {
  let called = false;
  const callback = () => { called = true; };
  const debounced = debounce(callback, 1000);

  debounced();
  expect(called).toBe(false);
  jest.runAllTimers();
  expect(called).toBe(true);
});

test('execute debounced only once', () => {
  let count = 0;
  const addOne = () => { count += 1; };
  const debouncedAddOne = debounce(addOne, 100);

  for (let i = 0; i <= 10000; i++) {
    debouncedAddOne();
  }

  expect(count).toBe(0);
  jest.runAllTimers();
  expect(count).toBe(1);
});

test('can execute debounced function after timeout', () => {
  let count = 0;
  const addOne = () => { count += 1; };
  const debouncedAddOne = debounce(addOne, 50);

  debouncedAddOne();
  expect(count).toBe(0);
  jest.runAllTimers();
  expect(count).toBe(1);
  debouncedAddOne();
  jest.runAllTimers();
  expect(count).toBe(2);
});
