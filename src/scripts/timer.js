import getTimePeriod from './utils/get-time-period';
import getEnCountableName from './utils/get-en-countable-name';

const YEAR_NAMES = ['year', 'years'];
const MONTH_NAMES = ['month', 'months'];

export const getPeriodInText = (date, anotherDate) => {
  const [years, months] = getTimePeriod(date, anotherDate);
  const yearPart = years > 0
    ? `${years} ${getEnCountableName(years, YEAR_NAMES)}`
    : '';
  const monthPart = months > 0
    ? `${months} ${getEnCountableName(months, MONTH_NAMES)}`
    : '';
  const and = yearPart && monthPart ? ' and ' : '';
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
