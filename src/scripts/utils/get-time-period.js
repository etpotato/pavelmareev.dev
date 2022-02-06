export default (date, anotherDate) => {
  const start = date > anotherDate ? anotherDate : date;
  const end = date > anotherDate ? date : anotherDate;
  const monthDiff = end.getMonth() - start.getMonth();
  const years = monthDiff >= 0
    ? end.getFullYear() - start.getFullYear()
    : end.getFullYear() - start.getFullYear() - 1;
  const months = monthDiff >= 0
    ? monthDiff
    : 12 - start.getMonth() + end.getMonth();

  return [Math.abs(years), Math.abs(months)];
};
