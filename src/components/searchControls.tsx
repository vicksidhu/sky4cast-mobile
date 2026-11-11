import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { LocationResult } from "../types/weather";

type SearchControlsProps = {
  query: string;
  loading: boolean;
  searchingLocations: boolean;
  locations: LocationResult[];
  onQueryChange: (query: string) => void;
  onSearchLocations: () => void;
  onSelectLocation: (
    location: LocationResult
  ) => void;
  onUseLocation: () => void;
};

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

export default function SearchControls({
  query,
  loading,
  searchingLocations,
  locations,
  onQueryChange,
  onSearchLocations,
  onSelectLocation,
  onUseLocation,
}: SearchControlsProps) {
  const controlsDisabled =
    loading || searchingLocations;

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={onQueryChange}
          onSubmitEditing={
            onSearchLocations
          }
          returnKeyType="search"
          autoCapitalize="words"
          autoCorrect={false}
          editable={!controlsDisabled}
        />

        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed &&
              styles.searchButtonPressed,
            controlsDisabled &&
              styles.disabledButton,
          ]}
          onPress={onSearchLocations}
          disabled={controlsDisabled}
        >
          <Text style={styles.searchButtonText}>
            {searchingLocations
              ? "Finding Cities..."
              : "Find Cities"}
          </Text>
        </Pressable>
      </View>

      {locations.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            Choose a location
          </Text>

          {locations.map((location) => {
            const label =
              getLocationLabel(location);

            return (
              <Pressable
                key={`${location.lat}-${location.lon}`}
                style={({ pressed }) => [
                  styles.locationResult,
                  pressed &&
                    styles.locationResultPressed,
                ]}
                onPress={() =>
                  onSelectLocation(location)
                }
                disabled={loading}
              >
                <Text
                  style={
                    styles.locationResultName
                  }
                >
                  {location.name}
                </Text>

                <Text
                  style={
                    styles.locationResultDetails
                  }
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />

        <Text style={styles.dividerText}>
          OR
        </Text>

        <View style={styles.divider} />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.useLocationButton,
          pressed &&
            styles.useLocationButtonPressed,
          controlsDisabled &&
            styles.disabledLocationButton,
        ]}
        onPress={onUseLocation}
        disabled={controlsDisabled}
      >
        <Text
          style={styles.useLocationButtonText}
        >
          Use My Location
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    gap: 12,
  },

  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1f2937",
  },

  searchButton: {
    width: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  searchButtonPressed: {
    opacity: 0.8,
  },

  disabledButton: {
    opacity: 0.6,
  },

  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  resultsContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginTop: 12,
    overflow: "hidden",
  },

  resultsTitle: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    textTransform: "uppercase",
  },

  locationResult: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  locationResultPressed: {
    backgroundColor: "#eff6ff",
  },

  locationResultName: {
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "600",
  },

  locationResultDetails: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 3,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#d1d5db",
  },

  dividerText: {
    marginHorizontal: 12,
    color: "#9ca3af",
    fontSize: 13,
    fontWeight: "600",
  },

  useLocationButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  useLocationButtonPressed: {
    backgroundColor: "#eff6ff",
  },

  disabledLocationButton: {
    opacity: 0.6,
  },

  useLocationButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
});