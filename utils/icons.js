export function iconForCode(code) {
  let iconMap = {
    100: "fa-sun",
    200: "fa-cloud-sun",
    100: "fa-sun",
    300: "fa-cloud",
    400: "fa-cloud-sun-rain",
    500: "fa-cloud-showers-heavy",
    600: "fa-cloud-rain",
    700: "fa-snowflake",
    800: "fa-cloud-bolt"
  };

  return "fa " + iconMap[code];
}