/**
 * @jest-environment jsdom
 */

import timer, { getPeriodInText } from './timer';

describe('time counter', () => {
  test('Get time period in text', () => {
    expect(getPeriodInText(new Date('2011-01'), new Date('2010-04'))).toBe('9 месяцев');
    expect(getPeriodInText(new Date('2011-03'), new Date('2013-03'))).toBe('2 года');
    expect(getPeriodInText(new Date('2020-01'), new Date('2014-11'))).toBe('5 лет и 2 месяца');
  });

  test('Set time in HTML', () => {
    const today = new Date('2022-02');

    document.body.innerHTML = `
      <span class="js-timer" id="timer-1" data-timer-start="2020-01">blabla</span>
      <span class="js-timer" id="timer-2" data-timer-start="2021-08">blabla</span>
      <span class="js-year" id="timer-3">blabla</span>
    `;

    timer(today);

    const timer1 = document.querySelector('#timer-1');
    const timer2 = document.querySelector('#timer-2');
    const timer3 = document.querySelector('#timer-3');

    expect(timer1.textContent).toBe('2 года и 1 месяц');
    expect(timer2.textContent).toBe('6 месяцев');
    expect(timer3.textContent).toBe('2022');
  });
});
