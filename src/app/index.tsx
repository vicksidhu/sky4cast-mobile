import { useState } from "react";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import CurrentWeather from "../components/currentWeather";
import ForecastList from "../components/forecastList";
import SearchControls from "../components/searchControls";
import UnitToggle from "../components/unitToggle";

import {
  getCurrentWeather,
  getForecast,
  searchLocations,
} from "../services/weatherAPI";

import {
  DailyForecast,
  LocationCoordinates,
  LocationResult,
  TemperatureUnit,
  WeatherData,
} from "../types/weather";

import { createDailyForecast } from "../utils/forecastHelpers";

function getLocationLabel(
  location: LocationResult
) {
  return [
    location.name,
    location.state,
    location.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function Index() {
  const [query, setQuery] = useState("");

  const [locations, setLocations] =
    useState<LocationResult[]>([]);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(null);

  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [forecast, setForecast] =
    useState<DailyForecast[]>([]);

  const [unit, setUnit] =
    useState<TemperatureUnit>("celsius");

  const [
    forecastVisible,
    setForecastVisible,
  ] = useState(true);

  const [loading, setLoading] =
    useState(false);

  const [
    searchingLocations,
    setSearchingLocations,
  ] = useState(false);

  const [error, setError] = useState("");

  const loadWeather = async (
    location: LocationCoordinates
  ) => {
    const [weatherData, forecastData] =
      await Promise.all([
        getCurrentWeather(location),
        getForecast(location),
      ]);

    setWeather(weatherData);

    setForecast(
      createDailyForecast(forecastData)
    );
  };

  const handleQueryChange = (
    newQuery: string
  ) => {
    setQuery(newQuery);
    setLocations([]);
    setError("");
  };

  const handleSearchLocations = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter a city.");
      return;
    }

    try {
      setSearchingLocations(true);
      setError("");
      setLocations([]);

      const matchingLocations =
        await searchLocations(trimmedQuery);

      if (matchingLocations.length === 0) {
        setError(
          `No locations found for "${trimmedQuery}".`
        );

        return;
      }

      setLocations(matchingLocations);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to search for locations."
        );
      }
    } finally {
      setSearchingLocations(false);
    }
  };

  const handleSelectLocation = async (
    location: LocationResult
  ) => {
    try {
      setLoading(true);
      setError("");
      setLocations([]);
      setSelectedLocation(location);
      setQuery(getLocationLabel(location));

      await loadWeather({
        lat: location.lat,
        lon: location.lon,
      });
    } catch (err) {
      setWeather(null);
      setForecast([]);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to retrieve weather information."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = async () => {
    try {
      setLoading(true);
      setError("");
      setLocations([]);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError(
          "Location permission is required to use your current location."
        );

        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync(
          {}
        );

      setSelectedLocation(null);
      setQuery("Current Location");

      await loadWeather({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      });
    } catch (err) {
      setWeather(null);
      setForecast([]);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to retrieve weather for your current location."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Sky4Cast
      </Text>

      <Text style={styles.subtitle}>
        Search for a city or use your current
        location.
      </Text>

      <UnitToggle
        unit={unit}
        onChange={setUnit}
      />

      <SearchControls
        query={query}
        loading={loading}
        searchingLocations={
          searchingLocations
        }
        locations={locations}
        onQueryChange={handleQueryChange}
        onSearchLocations={
          handleSearchLocations
        }
        onSelectLocation={
          handleSelectLocation
        }
        onUseLocation={
          handleUseLocation
        }
      />

      {(loading || searchingLocations) && (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={styles.loadingIndicator}
        />
      )}

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      {weather && !loading && (
        <CurrentWeather
          weather={weather}
          unit={unit}
          locationLabel={
            selectedLocation
              ? getLocationLabel(
                  selectedLocation
                )
              : undefined
          }
        />
      )}

      {forecast.length > 0 &&
        !loading && (
          <ForecastList
            forecast={forecast}
            unit={unit}
            visible={forecastVisible}
            onVisibilityChange={
              setForecastVisible
            }
          />
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },

  loadingIndicator: {
    marginTop: 32,
  },

  errorText: {
    color: "#dc2626",
    fontSize: 15,
    textAlign: "center",
    marginTop: 24,
  },
});