import { TemperatureUnit } from "../types/weather";

export function convertTemperature(
  celsius: number,
  unit: TemperatureUnit
) {
  if (unit === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  }

  return celsius;
}

export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit
) {
  const convertedTemperature =
    convertTemperature(celsius, unit);

  const symbol =
    unit === "celsius" ? "°C" : "°F";

  return `${Math.round(
    convertedTemperature
  )}${symbol}`;
}

export function getTemperatureSymbol(
  unit: TemperatureUnit
) {
  return unit === "celsius" ? "°C" : "°F";
}