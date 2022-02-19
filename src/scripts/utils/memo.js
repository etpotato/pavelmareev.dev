export default (func) => {
  const cache = {};

  return (arg) => {
    let result;

    if (cache[arg]) result = cache[arg];
    else {
      result = func(arg);
      cache[arg] = result;
    }

    return result;
  };
};
