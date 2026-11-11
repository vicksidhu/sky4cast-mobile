import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TemperatureUnit } from "../types/weather";

type UnitToggleProps = {
  unit: TemperatureUnit;
  onChange: (
    unit: TemperatureUnit
  ) => void;
};

export default function UnitToggle({
  unit,
  onChange,
}: UnitToggleProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.option,
          unit === "celsius" &&
            styles.selectedOption,
        ]}
        onPress={() => onChange("celsius")}
      >
        <Text
          style={[
            styles.optionText,
            unit === "celsius" &&
              styles.selectedOptionText,
          ]}
        >
          °C
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          unit === "fahrenheit" &&
            styles.selectedOption,
        ]}
        onPress={() =>
          onChange("fahrenheit")
        }
      >
        <Text
          style={[
            styles.optionText,
            unit === "fahrenheit" &&
              styles.selectedOptionText,
          ]}
        >
          °F
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    padding: 3,
    marginBottom: 24,
  },

  option: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },

  selectedOption: {
    backgroundColor: "#2563eb",
  },

  optionText: {
    color: "#4b5563",
    fontSize: 15,
    fontWeight: "600",
  },

  selectedOptionText: {
    color: "#ffffff",
  },
});