import {
  DailyForecast,
  ForecastData,
} from "../types/weather";

export function createDailyForecast(
  forecastData: ForecastData
): DailyForecast[] {
  const groupedForecast: Record<
    string,
    ForecastData["list"]
  > = {};

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
      .toISOString()
      .split("T")[0];

    if (!groupedForecast[date]) {
      groupedForecast[date] = [];
    }

    groupedForecast[date].push(item);
  });

  return Object.entries(groupedForecast)
    .slice(0, 5)
    .map(([date, items]) => {
      const temperatures = items.map(
        (item) => item.main.temp
      );

      const middleItem =
        items[Math.floor(items.length / 2)];

      return {
        date,
        high: Math.max(...temperatures),
        low: Math.min(...temperatures),
        description:
          middleItem.weather[0]?.description ??
          "No description",
      };
    });
}