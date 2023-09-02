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
  return (temperature * 9 / 5 + 32).toFixed(2);;
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

export function labelWindDirection(degrees) {
  if (degrees > 348.75 && degrees <= 360) return "North";
  else if (degrees >= 0 && degrees < 11.25) return "North";
  else if (degrees >= 11.25 && degrees < 33.75) return "NNE";
  else if (degrees >= 33.75 && degrees < 56.25) return "NE";
  else if (degrees >= 56.25 && degrees < 78.75) return "ENE";
  else if (degrees >= 78.75 && degrees < 101.25) return "East";
  else if (degrees >= 101.25 && degrees < 123.75) return "ESE";
  else if (degrees >= 123.75 && degrees < 146.25) return "SE";
  else if (degrees >= 146.25 && degrees < 168.75) return "SSE";
  else if (degrees >= 168.75 && degrees < 191.25) return "South";
  else if (degrees >= 191.25 && degrees < 213.75) return "SSW";
  else if (degrees >= 313.75 && degrees < 236.25) return "SW";
  else if (degrees >= 236.25 && degrees < 258.75) return "WSW";
  else if (degrees >= 258.75 && degrees < 281.25) return "West";
  else if (degrees >= 281.25 && degrees < 303.75) return "WNW";
  else if (degrees >= 303.75 && degrees < 326.25) return "NW";
  else if (degrees >= 326.25 && degrees < 348.75) return "NNW";
  else return "Wind direction unknown";
}

export function windChill(temp, windSpeed) {
  let windChill = (13.12 + (0.6215 * temp) - 11.37 * (Math.pow(windSpeed, 0.16)) + 0.3965 * temp * (Math.pow(windSpeed, 0.16)));
  return windChill.toFixed(2);
}