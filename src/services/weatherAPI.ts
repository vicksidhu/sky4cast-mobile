import {
  ForecastData,
  LocationCoordinates,
  LocationResult,
  WeatherData,
} from "../types/weather";

const API_KEY =
  process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

const WEATHER_BASE_URL =
  "https://api.openweathermap.org/data/2.5";

const GEOCODING_URL =
  "https://api.openweathermap.org/geo/1.0/direct";

function confirmApiKey() {
  if (!API_KEY) {
    throw new Error(
      "Weather API key is missing."
    );
  }
}

function addCoordinates(
  url: URL,
  location: LocationCoordinates
) {
  url.searchParams.set(
    "lat",
    location.lat.toString()
  );

  url.searchParams.set(
    "lon",
    location.lon.toString()
  );
}

async function handleWeatherResponse(
  response: Response,
  fallbackMessage: string
) {
  if (response.ok) {
    return;
  }

  if (response.status === 404) {
    throw new Error(
      "Weather information could not be found."
    );
  }

  if (response.status === 401) {
    throw new Error(
      "The weather API key is invalid or not active yet."
    );
  }

  if (response.status === 429) {
    throw new Error(
      "Too many requests. Please try again later."
    );
  }

  throw new Error(fallbackMessage);
}

export async function searchLocations(
  query: string,
  signal?: AbortSignal
): Promise<LocationResult[]> {
  confirmApiKey();

  const url = new URL(GEOCODING_URL);

  url.searchParams.set("q", query);
  url.searchParams.set("limit", "5");
  url.searchParams.set("appid", API_KEY!);

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "The weather API key is invalid or not active yet."
      );
    }

    if (response.status === 429) {
      throw new Error(
        "Too many requests. Please try again later."
      );
    }

    throw new Error(
      "Unable to search for locations."
    );
  }

  return response.json();
}

export async function getCurrentWeather(
  location: LocationCoordinates,
  signal?: AbortSignal
): Promise<WeatherData> {
  confirmApiKey();

  const url = new URL(
    `${WEATHER_BASE_URL}/weather`
  );

  addCoordinates(url, location);

  url.searchParams.set("appid", API_KEY!);

  // Always retrieve metric values.
  // Unit switching happens locally.
  url.searchParams.set("units", "metric");

  const response = await fetch(url, {
    signal,
  });

  await handleWeatherResponse(
    response,
    "Unable to retrieve weather data. Please try again later."
  );

  return response.json();
}

export async function getForecast(
  location: LocationCoordinates,
  signal?: AbortSignal
): Promise<ForecastData> {
  confirmApiKey();

  const url = new URL(
    `${WEATHER_BASE_URL}/forecast`
  );

  addCoordinates(url, location);

  url.searchParams.set("appid", API_KEY!);

  // Always retrieve metric values.
  // Unit switching happens locally.
  url.searchParams.set("units", "metric");

  const response = await fetch(url, {
    signal,
  });

  await handleWeatherResponse(
    response,
    "Unable to retrieve the forecast. Please try again later."
  );

  return response.json();
}