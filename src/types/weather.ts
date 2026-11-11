export type LocationCoordinates = {
  lat: number;
  lon: number;
};

export type LocationResult = LocationCoordinates & {
  name: string;
  country: string;
  state?: string;
};

export type WeatherData = {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
};

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
  }[];
};

export type ForecastData = {
  list: ForecastItem[];
};

export type DailyForecast = {
  date: string;
  high: number;
  low: number;
  description: string;
};

export type TemperatureUnit = "celsius" | "fahrenheit";