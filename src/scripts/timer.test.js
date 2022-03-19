/**
 * @jest-environment jsdom
 */

import timer, { getPeriodInText } from './timer';

describe('time counter', () => {
  test('Get time period in text', () => {
    expect(getPeriodInText(new Date('2011-01'), new Date('2010-04'))).toBe('9 months');
    expect(getPeriodInText(new Date('2011-03'), new Date('2013-03'))).toBe('2 years');
    expect(getPeriodInText(new Date('2020-01'), new Date('2014-11'))).toBe('5 years and 2 months');
  });

  test('Set time in HTML', () => {
    const today = new Date('2022-02');

    document.body.innerHTML = `
      <span class="js-timer" id="timer-1" data-timer-start="2020-01">blabla</span>
      <span class="js-timer" id="timer-2" data-timer-start="2021-08">blabla</span>
    `;

    timer(today);

    const timer1 = document.querySelector('#timer-1');
    const timer2 = document.querySelector('#timer-2');

    expect(timer1.textContent).toBe('2 years and 1 month');
    expect(timer2.textContent).toBe('6 months');
  });
});
