export default (number, [one, two, five]) => {
  const bigRemainer = Math.abs(number) % 100;
  const smallRemainer = bigRemainer % 10;
  let name;

  if (bigRemainer > 10 && bigRemainer < 20) name = five;
  else if (smallRemainer > 1 && smallRemainer < 5) name = two;
  else if (smallRemainer === 1) name = one;
  else name = five;

  return name;
};
