import { getTimePeriod, getCountableName } from './utils';

const YEAR_NAMES = ['год', 'года', 'лет'];
const MONTH_NAMES = ['месяц', 'месяца', 'месяцев'];

export default () => {
  const elements = [...document.querySelectorAll('.js-timer')];
  const today = new Date();

  elements.forEach((element) => {
    const start = new Date(element.dataset.timerStart);
    const [years, months] = getTimePeriod(start, today);
    const yearPart = years > 0
      ? `${years} ${getCountableName(years, YEAR_NAMES)}`
      : '';
    const monthPart = months > 0
      ? `${months} ${getCountableName(months, MONTH_NAMES)}`
      : '';
    const and = yearPart && monthPart ? ' и ' : '';
    // eslint-disable-next-line no-param-reassign
    element.textContent = yearPart + and + monthPart;
  });
};
