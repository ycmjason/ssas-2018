export const mapValues = (obj, fn) =>
  Object.entries(obj).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: fn(v),
    }),
    {},
  );

export const uniqBy = (xs, fn) => {
  const uniqued = [];
  const valueSet = new Set();
  for (const x of xs) {
    const v = fn(x);
    if (!valueSet.has(v)) {
      valueSet.add(v);
      uniqued.push(x);
    }
  }
  return uniqued;
};
