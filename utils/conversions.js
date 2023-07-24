export function describeConditions(code) {
  let conditions = {
    100: "Clear",
    200: "Partial Clouds",
    300: "Cloudy",
    400: "Light showers",
    500: "Heavy showers",
    600: "Rain",
    700: "Snow",
    800: "Thunder"
  }

  return conditions[code];
}

export function CelsiusToFarenheit(temperature) {
  return temperature * 9 / 5 + 32;
}

export function beaufort(windSpeed) {
  if (windSpeed == 1) {
    return 0;
  } else if (windSpeed > 1 && windSpeed <= 5) {
    return 1;
  } else if (windSpeed > 5 && windSpeed <= 11) {
    return 2;
  } else if (windSpeed > 11 && windSpeed <= 19) {
    return 3;
  } else if (windSpeed > 19 && windSpeed <= 28) {
    return 4;
  } else if (windSpeed > 28 && windSpeed <= 38) {
    return 5;
  } else if (windSpeed > 38 && windSpeed <= 49) {
    return 6;
  } else if (windSpeed > 49 && windSpeed <= 61) {
    return 7;
  } else if (windSpeed > 61 && windSpeed <= 74) {
    return 8;
  } else if (windSpeed > 74 && windSpeed <= 88) {
    return 9;
  } else if (windSpeed > 88 && windSpeed <= 102) {
    return 10;
  } else if (windSpeed > 102 && windSpeed <= 117) {
    return 11;
  } else return -1;
}
