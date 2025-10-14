# Wing

Your Flight Finder

## Overview

Wing is a cross-platform mobile experience built with Expo Router that helps travelers search, compare, and track flights. The app leverages React Native components, smooth navigation, and polished visuals to keep the booking workflow fast and intuitive across iOS, Android, and web.

## Prerequisites

- **Node.js** v18 LTS or newer with npm.
- **Git** for cloning the repository.
- **Expo Go** installed on your device (optional, but recommended for quick previews).
- **Android Studio** or **Xcode** if you want to run native emulators/simulators.

## Clone the repository

```bash
git clone https://github.com/your-org/wing.git
cd wing
```

## Install dependencies

```bash
npm install
```

## Start the Expo development server

```bash
npx expo start
```

- **Press `a`** in the Expo CLI to launch the Android emulator.
- **Press `i`** to open the iOS simulator (macOS only).
- **Press `w`** to use the web build in your browser.
- **Scan the QR code** with Expo Go to preview on a physical device.

## Available npm scripts

- **`npm start`**: Alias for `expo start`.
- **`npm run android`**: Start the project directly on an Android device/emulator.
- **`npm run ios`**: Start the project on the iOS simulator.
- **`npm run web`**: Run the web build.
- **`npm run lint`**: Lint the project with Expo's ESLint config.
- **`npm run reset-project`**: Reset the starter template if you want a clean slate.

## Project structure highlights

- **`app/`**: Source files using Expo Router's file-based routing.
- **`app.json` / `app.config`**: Project configuration for Expo.
- **`package.json`**: Dependencies and scripts referenced above.

## Troubleshooting tips

- **Dependencies fail to install**: Ensure you are on Node.js v18+ and clear npm cache with `npm cache clean --force` if needed.
- **Expo CLI cannot find Android SDK**: Open Android Studio once and install the required SDK packages.
- **Metro bundler stuck**: Stop the server and rerun `npx expo start -c` to clear the bundler cache.

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router guides](https://docs.expo.dev/router/introduction/)
- [React Native documentation](https://reactnative.dev/docs/getting-started)
