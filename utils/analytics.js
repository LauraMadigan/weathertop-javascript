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

export function getTrendIcon(key, readings) {
  // 'key' is the reading field to check
  // 'readings' is an array of all readings for a station

  if (readings.length < 3) { // not enough readings to check trends
    return false;
  }

  let lastValue = readings[readings.length - 1][key];
  let secondLastValue = readings[readings.length - 2][key];
  let thirdLastValue = readings[readings.length - 3][key];

  let trend;

  if ((lastValue > secondLastValue) && (secondLastValue > thirdLastValue)) {
    trend = 'fa-solid fa-arrow-up'; // ascending
  } else if ((lastValue < secondLastValue) && (secondLastValue < thirdLastValue)) {
    trend = 'fa-solid fa-arrow-down'; // descending
  } else {
    trend = 'fa-solid fa-grip-lines'; // steady
  }

  return trend;
}


