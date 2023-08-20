export function max(values) {
  let max = values[0];
  values.forEach(value => {
    if (value > max) {
      max = value;
    }
  });
  return max;
}

export function min(values) {
  let min = values[0];
  values.forEach(value => {
    if (value < min) {
      min = value;
    }
  });
  return min;
}

export function getValuesForKey(arr, key) {
  return arr.map(obj => obj[key]).filter(value => value !== undefined);
}
