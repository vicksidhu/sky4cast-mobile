import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  TemperatureUnit,
  WeatherData,
} from "../types/weather";

import { formatTemperature } from "../utils/temperatureHelpers";

type CurrentWeatherProps = {
  weather: WeatherData;
  unit: TemperatureUnit;
  locationLabel?: string;
};

export default function CurrentWeather({
  weather,
  unit,
  locationLabel,
}: CurrentWeatherProps) {
  return (
    <View style={styles.weatherCard}>
      <Text style={styles.cityName}>
        {locationLabel ??
          `${weather.name}, ${weather.sys.country}`}
      </Text>

      <Text style={styles.temperature}>
        {formatTemperature(
          weather.main.temp,
          unit
        )}
      </Text>

      <Text style={styles.description}>
        {weather.weather[0]?.description}
      </Text>

      <View style={styles.details}>
        <Text style={styles.detailText}>
          Feels like:{" "}
          {formatTemperature(
            weather.main.feels_like,
            unit
          )}
        </Text>

        <Text style={styles.detailText}>
          Humidity: {weather.main.humidity}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    marginTop: 32,
    alignItems: "center",
  },

  cityName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },

  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2563eb",
  },

  description: {
    fontSize: 18,
    color: "#4b5563",
    textTransform: "capitalize",
    marginTop: 4,
  },

  details: {
    marginTop: 20,
    alignItems: "center",
    gap: 6,
  },

  detailText: {
    fontSize: 15,
    color: "#6b7280",
  },
});