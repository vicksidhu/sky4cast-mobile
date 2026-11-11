# Sky4Cast

Sky4Cast is a React Native weather application built with Expo and the OpenWeather API.

## Features

- Search for weather by city
- Get weather using your current location
- View current weather conditions
- View or hide a 5-day forecast
- Switch between Celsius and Fahrenheit
- View city and country information

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and add your OpenWeather API key:

   ```text
   EXPO_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. Start the app:

   ```bash
   npx expo start
   ```

## Project Structure

- `src/app` - Main application
- `src/components` - UI components
- `src/services` - Weather API services
- `src/types` - TypeScript types
- `src/utils` - Utility functions
