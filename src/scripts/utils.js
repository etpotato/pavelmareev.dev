export const getTimePeriod = (start, end) => {
  const years = (end.getMonth() - start.getMonth() >= 0)
    ? end.getFullYear() - start.getFullYear()
    : end.getFullYear() - start.getFullYear() - 1;
  const months = (end.getMonth() - start.getMonth() >= 0)
    ? end.getMonth() - start.getMonth()
    : 12 - start.getMonth() + end.getMonth();

  return [years, months];
};

export const getCountableName = (number, [one, two, five]) => {
  const bigRemainer = Math.abs(number) % 100;
  const smallRemainer = bigRemainer % 10;
  let name;

  if (bigRemainer > 10 && bigRemainer < 20) name = five;
  else if (smallRemainer > 1 && smallRemainer < 5) name = two;
  else if (smallRemainer === 1) name = one;
  else name = five;

  return name;
};
