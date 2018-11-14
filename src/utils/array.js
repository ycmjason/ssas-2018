export const mapValues = (obj, fn) => Object.entries(obj).reduce((acc, [k, v]) => ({
  ...acc,
  [k]: fn(v),
}), {});
