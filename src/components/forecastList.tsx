import {
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import {
  DailyForecast,
  TemperatureUnit,
} from "../types/weather";

import { formatTemperature } from "../utils/temperatureHelpers";

type ForecastListProps = {
  forecast: DailyForecast[];
  unit: TemperatureUnit;
  visible: boolean;
  onVisibilityChange: (
    visible: boolean
  ) => void;
};

function formatForecastDate(date: string) {
  return new Date(
    `${date}T12:00:00`
  ).toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function ForecastList({
  forecast,
  unit,
  visible,
  onVisibilityChange,
}: ForecastListProps) {
  return (
    <View style={styles.forecastSection}>
      <View style={styles.header}>
        <Text style={styles.forecastTitle}>
          5-Day Forecast
        </Text>

        <Switch
          value={visible}
          onValueChange={onVisibilityChange}
          trackColor={{
            false: "#d1d5db",
            true: "#93c5fd",
          }}
          thumbColor={
            visible ? "#2563eb" : "#f9fafb"
          }
        />
      </View>

      {visible &&
        forecast.map((day) => (
          <View
            key={day.date}
            style={styles.forecastCard}
          >
            <View style={styles.forecastInfo}>
              <Text
                style={styles.forecastDate}
              >
                {formatForecastDate(day.date)}
              </Text>

              <Text
                style={
                  styles.forecastDescription
                }
              >
                {day.description}
              </Text>
            </View>

            <View
              style={
                styles.forecastTemperatures
              }
            >
              <Text
                style={styles.highTemperature}
              >
                {formatTemperature(
                  day.high,
                  unit
                )}
              </Text>

              <Text
                style={styles.lowTemperature}
              >
                {formatTemperature(
                  day.low,
                  unit
                )}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  forecastSection: {
    width: "100%",
    marginTop: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  forecastTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
  },

  forecastCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forecastInfo: {
    flex: 1,
    paddingRight: 12,
  },

  forecastDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },

  forecastDescription: {
    fontSize: 14,
    color: "#6b7280",
    textTransform: "capitalize",
  },

  forecastTemperatures: {
    alignItems: "flex-end",
    gap: 4,
  },

  highTemperature: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1f2937",
  },

  lowTemperature: {
    fontSize: 15,
    color: "#9ca3af",
  },
});