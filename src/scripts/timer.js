import getTimePeriod from './utils/get-time-period';
import getCountableName from './utils/get-countable-name';

const YEAR_NAMES = ['год', 'года', 'лет'];
const MONTH_NAMES = ['месяц', 'месяца', 'месяцев'];

export const getPeriodInText = (date, anotherDate) => {
  const [years, months] = getTimePeriod(date, anotherDate);
  const yearPart = years > 0
    ? `${years} ${getCountableName(years, YEAR_NAMES)}`
    : '';
  const monthPart = months > 0
    ? `${months} ${getCountableName(months, MONTH_NAMES)}`
    : '';
  const and = yearPart && monthPart ? ' и ' : '';
  return yearPart + and + monthPart;
};

export default (today) => {
  const elements = [...document.querySelectorAll('.js-timer')];

  elements.forEach((element) => {
    const start = new Date(element.dataset.timerStart);
    // eslint-disable-next-line no-param-reassign
    element.textContent = getPeriodInText(start, today);
  });
};
