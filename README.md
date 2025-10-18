# Wing ✈️

**Your Flight Finder**

A modern, cross-platform mobile application built with Expo and React Native that helps travelers search, compare, and track flights with an intuitive and beautiful user interface.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Dependencies Explained](#-dependencies-explained)
- [Available Scripts](#-available-scripts)
- [Configuration Files](#-configuration-files)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Styling & Theming](#-styling--theming)
- [Navigation](#-navigation)
- [Development Workflow](#-development-workflow)
- [Building for Production](#-building-for-production)
- [Troubleshooting](#-troubleshooting)
- [Best Practices](#-best-practices)
- [Resources](#-resources)

---

## 🌟 Overview

**Wing** is a cross-platform mobile experience built with **Expo Router** that helps travelers search, compare, and track flights. The app leverages React Native components, smooth navigation, and polished visuals to keep the booking workflow fast and intuitive across iOS, Android, and web platforms.

### Key Highlights

- 📱 Cross-platform support (iOS, Android, Web)
- 🎨 Modern UI with NativeWind (TailwindCSS for React Native)
- 🚀 File-based routing with Expo Router
- 💾 Efficient state management with Zustand
- ⚡ Fast and optimized performance
- 🎭 Dark mode support
- 🔍 Real-time flight search and tracking

---

## ✨ Features

- **Flight Search**: Search and compare flights from multiple destinations
- **Airport Search**: Find airports worldwide with autocomplete
- **User Authentication**: Sign in/Sign up functionality
- **Profile Management**: Manage user preferences and settings
- **Flight Tracking**: Track and save favorite flights
- **Responsive UI**: Beautiful, adaptive interface for all screen sizes
- **Offline Support**: Partial offline functionality
- **Haptic Feedback**: Enhanced user experience with tactile responses

---

## 🛠 Tech Stack

### Core Technologies

- **[React Native](https://reactnative.dev/)** (0.81.4) - Mobile app framework
- **[Expo](https://expo.dev/)** (~54.0.13) - Development platform
- **[TypeScript](https://www.typescriptlang.org/)** (~5.9.2) - Type safety
- **[Expo Router](https://docs.expo.dev/router/introduction/)** (~6.0.11) - File-based navigation

### UI & Styling

- **[NativeWind](https://www.nativewind.dev/)** (^4.2.1) - TailwindCSS for React Native
- **[TailwindCSS](https://tailwindcss.com/)** (^3.4.18) - Utility-first CSS
- **[Lucide React Native](https://lucide.dev/)** (^0.545.0) - Beautiful icons

### State & Data

- **[Zustand](https://zustand-demo.pmnd.rs/)** (^5.0.8) - State management
- **[Axios](https://axios-http.com/)** (^1.12.2) - HTTP client

### Animation

- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** (~4.1.1)
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** (~2.28.0)
- **[Gorhom Bottom Sheet](https://gorhom.github.io/react-native-bottom-sheet/)** (^5.2.6)

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js** v18 LTS or newer ([Download](https://nodejs.org/))
  - Verify: `node --version`
- **npm** (comes with Node.js) or **yarn**
  - Verify: `npm --version`
- **Git** ([Download](https://git-scm.com/))
  - Verify: `git --version`

### For Android Development

- **[Android Studio](https://developer.android.com/studio)** with:
  - Android SDK (API 31+)
  - Android Emulator
  - Android SDK Platform-Tools

### For iOS Development (macOS only)

- **[Xcode](https://developer.apple.com/xcode/)** (latest version)
- **Xcode Command Line Tools**: `xcode-select --install`
- **CocoaPods**: `sudo gem install cocoapods`

### For Quick Testing

- **[Expo Go](https://expo.dev/client)** app on your physical device
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

---

## 🚀 Getting Started

Follow these steps to set up and run Wing on your local machine.

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-org/wing.git

# Navigate to the project directory
cd wing
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages listed in `package.json`.

### 3. Setup Expo Environment

#### First Time Setup

If you're new to Expo development:

**a) Install Expo CLI (optional but recommended):**

```bash
npm install -g expo-cli
```

**b) Create an Expo account (optional for development):**

```bash
npx expo register
```

**c) Login to Expo (optional):**

```bash
npx expo login
```

#### Android Environment Setup

1. **Install Android Studio**
2. Open Android Studio → Settings → System Settings → Android SDK
3. Install:
   - Android SDK Platform 31+
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools
4. **Set environment variables** (add to `~/.bashrc`, `~/.zshrc`, or Windows Environment Variables):

   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

5. **Create a virtual device (AVD)** in Android Studio

#### iOS Environment Setup (macOS only)

1. **Install Xcode** from Mac App Store
2. **Install Command Line Tools**:

   ```bash
   xcode-select --install
   ```

3. **Accept Xcode license**:

   ```bash
   sudo xcodebuild -license accept
   ```

4. **Install iOS Simulator** from Xcode → Preferences → Components

### 4. Running the Project

#### Start Development Server

```bash
# Start Expo dev server
npx expo start

# OR
npm start
```

This starts Metro bundler and displays a QR code with options.

#### Run on Different Platforms

**Android Emulator:**

- Press `a` in the terminal, OR
- Run: `npm run android`

**iOS Simulator (macOS only):**

- Press `i` in the terminal, OR
- Run: `npm run ios`

**Web Browser:**

- Press `w` in the terminal, OR
- Run: `npm run web`

**Physical Device (using Expo Go):**

1. Install Expo Go on your phone
2. Scan the QR code:
   - **iOS**: Use Camera app
   - **Android**: Use Expo Go app

#### Clear Cache (if needed)

```bash
# Clear Metro bundler cache
npx expo start -c

# OR
npx expo start --clear
```

---

## 📁 Project Structure

```
wing/
├── app/                          # Main application code (Expo Router)
│   ├── (screens)/                # Screen groups
│   │   ├── (tabs)/               # Tab navigator screens
│   │   │   ├── _layout.tsx       # Tab layout configuration
│   │   │   ├── index.tsx         # Home/Search screen (Tab 1)
│   │   │   ├── flights.tsx       # Flights list screen (Tab 2)
│   │   │   ├── airports.tsx      # Airports screen (Tab 3)
│   │   │   └── profile.tsx       # Profile screen (Tab 4)
│   │   └── auth/                 # Authentication screens
│   │       ├── signin/           # Sign in screen
│   │       └── signup/           # Sign up screen
│   ├── _layout.tsx               # Root layout
│   ├── index.tsx                 # Entry point
│   └── global.css                # Global styles
│
├── components/                   # Reusable UI components
│   ├── appbar/                   # Navigation bars
│   ├── bottomsheets/             # Bottom sheet components
│   ├── cards/                    # Card components
│   ├── chips/                    # Chip/tag components
│   ├── custom-buttons/           # Custom button components
│   ├── modals/                   # Modal dialogs
│   ├── profile/                  # Profile-related components
│   └── selectors/                # Selection components
│
├── services/                     # API and external services
│   └── api/                      # API integration
│       ├── apiManager.ts         # Axios instance configuration
│       ├── apiMethods.ts         # API request methods
│       └── endpoints.ts          # API endpoint definitions
│
├── store/                        # State management (Zustand)
│   ├── useAirportStore.ts        # Airport search state
│   └── useUserStore.ts           # User authentication state
│
├── types/                        # TypeScript type definitions
│   ├── searchAirport.ts          # Airport search types
│   ├── searchFlight.ts           # Flight search types
│   └── searchFlightEverywhere.ts # Global flight search types
│
├── constant/                     # Constants and static data
│   ├── Assets.ts                 # Asset references
│   └── Colors.ts                 # Color constants
│
├── hooks/                        # Custom React hooks
│   └── useDebounce.ts            # Debounce hook for search
│
├── assets/                       # Static assets
│   ├── logo/                     # App logos
│   └── app-logo/                 # Platform-specific icons
│
├── app.json                      # Expo configuration
├── package.json                  # Project dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind/NativeWind config
├── babel.config.js               # Babel configuration
├── metro.config.js               # Metro bundler config
└── README.md                     # This file
```

### Directory Explanations

#### `app/` - Application Screens & Routing

Uses **Expo Router** for file-based routing. Each file automatically becomes a route.

- **`(screens)/`**: Grouped routes (parentheses make it a route group)
- **`(tabs)/`**: Tab navigation screens
- **`_layout.tsx`**: Layout files define navigation structure

#### `components/` - Reusable Components

Organized by component type:

- **appbar**: Header navigation components
- **bottomsheets**: Swipeable bottom sheets
- **cards**: Flight cards, airport cards, etc.
- **chips**: Filter chips, category tags
- **custom-buttons**: Styled button variants
- **modals**: Dialog overlays
- **profile**: User profile widgets
- **selectors**: Date pickers, dropdown selectors

#### `services/` - External Integrations

- **api**: Centralized API management with Axios
  - `apiManager.ts`: Configures base URL, headers, interceptors
  - `apiMethods.ts`: GET, POST, PUT, DELETE wrappers
  - `endpoints.ts`: API endpoint constants

#### `store/` - State Management

Uses **Zustand** for lightweight state management:

- **useAirportStore**: Airport search data and cache
- **useUserStore**: User authentication and profile

#### `types/` - TypeScript Definitions

Type definitions for API responses ensure type safety throughout the app.

#### `hooks/` - Custom React Hooks

- **useDebounce**: Delays API calls during user input (search optimization)

---

## 📦 Dependencies Explained

### Why Each Package?

#### **Expo Ecosystem**

- **`expo`**: Core Expo SDK
- **`expo-router`**: File-based routing (similar to Next.js)
- **`expo-font`**: Custom font loading
- **`expo-image`**: Optimized image component with caching
- **`expo-haptics`**: Haptic feedback for better UX
- **`expo-splash-screen`**: Splash screen management
- **`expo-linear-gradient`**: Gradient backgrounds

**Why Expo?** Simplifies React Native development with pre-built modules, over-the-air updates, and unified configuration.

#### **Navigation**

- **`@react-navigation/native`**: Core navigation library
- **`@react-navigation/bottom-tabs`**: Bottom tab navigator
- **`react-native-screens`**: Native screen optimization

**Why React Navigation?** Industry-standard with excellent Expo integration.

#### **UI & Styling**

- **`nativewind`** + **`tailwindcss`**: TailwindCSS for React Native
- **`lucide-react-native`**: 1000+ beautiful icons

**Why NativeWind?** Write Tailwind classes in React Native for consistent styling.

#### **State Management**

- **`zustand`**: Minimalist state management (< 1KB)

**Why Zustand?** Simple API, no boilerplate, excellent TypeScript support.

#### **Data Fetching**

- **`axios`**: Promise-based HTTP client

**Why Axios?** Clean API, interceptors, automatic JSON parsing, better error handling.

#### **Animations & Gestures**

- **`react-native-reanimated`**: High-performance animations
- **`react-native-gesture-handler`**: Native gesture handling
- **`@gorhom/bottom-sheet`**: Smooth bottom sheets

**Why these?** Native-level performance for smooth 60fps animations.

#### **UI Components**

- **`@react-native-community/datetimepicker`**: Native date/time picker
- **`sonner-native`**: Beautiful toast notifications

---

## 🎯 Available Scripts

```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web",
  "lint": "expo lint",
  "reset-project": "node ./scripts/reset-project.js"
}
```

### Common Commands

```bash
# Development
npm start                   # Start Expo dev server
npm run android            # Launch on Android
npm run ios                # Launch on iOS (macOS only)
npm run web                # Open in browser

# Code Quality
npm run lint               # Check for code issues
npm run lint -- --fix      # Auto-fix linting errors

# Troubleshooting
npx expo start -c          # Clear cache and start
npx expo doctor            # Check for setup issues
npm run reset-project      # Reset to clean template

# Dependency Management
npm install                # Install dependencies
npm update                 # Update dependencies
npm outdated              # Check for outdated packages
```

---

## ⚙️ Configuration Files

### `app.json` - Expo Configuration

Main configuration for the Expo app:

- **name**: App display name
- **slug**: URL-friendly identifier
- **version**: App version
- **orientation**: Screen orientation lock
- **icon**: App icon path
- **splash**: Splash screen configuration
- **ios/android**: Platform-specific settings
- **plugins**: Expo plugins (splash screen, router)
- **experiments**: Experimental features (typed routes, React compiler)

### `tailwind.config.js` - Styling Configuration

Defines custom Tailwind theme:

- **Custom Colors**: Primary (#1153EC), Secondary (#02359D), Accent (#DFEAFE)
- **Content Paths**: Where to scan for Tailwind classes
- **NativeWind Preset**: React Native compatibility

### `tsconfig.json` - TypeScript Configuration

- **Strict Mode**: Enabled for type safety
- **Path Aliases**: `@/*` maps to project root
- **Includes**: TypeScript file locations

---

## 💾 State Management

**Wing** uses **Zustand** for state management.

### Store Structure

#### `store/useAirportStore.ts`

Manages airport search functionality:

```typescript
// Example usage
import { useAirportStore } from "@/store/useAirportStore";

function SearchComponent() {
  const { airports, setAirports, searchAirport } = useAirportStore();
  // Use the state and actions
}
```

#### `store/useUserStore.ts`

Handles user authentication:

```typescript
// Example usage
import { useUserStore } from "@/store/useUserStore";

function ProfileComponent() {
  const { user, isAuthenticated, login, logout } = useUserStore();
  // Use the state and actions
}
```

### Why Zustand?

- ✅ Simple, no boilerplate
- ✅ TypeScript-first
- ✅ Minimal re-renders
- ✅ DevTools support
- ✅ Persistent storage ready

---

## 🌐 API Integration

### Architecture

Located in `services/api/`:

#### `apiManager.ts`

Configures Axios instance:

- Base URL
- Default headers
- Request interceptors (add auth tokens)
- Response interceptors (handle errors)

#### `apiMethods.ts`

Wrapper functions for API calls:

```typescript
// Example
export const fetchFlights = (params) => apiGet("/flights", params);
```

#### `endpoints.ts`

Centralized endpoint definitions:

```typescript
export const ENDPOINTS = {
  SEARCH_FLIGHTS: "/search/flights",
  SEARCH_AIRPORTS: "/search/airports",
};
```

### Making API Calls

```typescript
import { fetchFlights } from "@/services/api/apiMethods";

const searchFlights = async () => {
  try {
    const response = await fetchFlights({ from: "LAX", to: "JFK" });
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## 🎨 Styling & Theming

### NativeWind (Tailwind for React Native)

**Wing** uses NativeWind for styling:

```tsx
// Example component
import { View, Text } from "react-native";

export function WelcomeCard() {
  return (
    <View className="flex-1 bg-background p-4 rounded-lg">
      <Text className="text-2xl font-bold text-textPrimary">
        Welcome to Wing
      </Text>
      <View className="bg-primary rounded-lg px-6 py-3 mt-4">
        <Text className="text-white font-semibold text-center">
          Search Flights
        </Text>
      </View>
    </View>
  );
}
```

### Custom Theme Colors

Defined in `tailwind.config.js`:

- **Primary**: Blue (#1153EC) - Main brand color
- **Secondary**: Dark Blue (#02359D) - Accents
- **Accent**: Light Blue (#DFEAFE) - Highlights
- **Background**: Gray (#F3F4F6)
- **Text**: Primary (#111827), Secondary (#6B7280)

### Dark Mode Support

The app automatically adapts to system theme preferences via `userInterfaceStyle: "automatic"` in `app.json`.

---

## 🧭 Navigation

**Wing** uses **Expo Router** for file-based routing (like Next.js).

### Navigation Structure

```
app/
├── (screens)/
│   ├── (tabs)/           → Tab Navigator
│   │   ├── index.tsx     → Home (/)
│   │   ├── flights.tsx   → Flights (/flights)
│   │   ├── airports.tsx  → Airports (/airports)
│   │   └── profile.tsx   → Profile (/profile)
│   └── auth/
│       ├── signin/       → Sign In (/auth/signin)
│       └── signup/       → Sign Up (/auth/signup)
```

### Navigating Between Screens

```tsx
import { router } from "expo-router";

// Push new screen
router.push("/flights");

// Replace screen
router.replace("/auth/signin");

// Go back
router.back();

// With parameters
router.push({
  pathname: "/flights",
  params: { from: "LAX", to: "JFK" },
});
```

---

## 🔧 Development Workflow

### 1. Creating a New Screen

```bash
# Create new file in app directory
touch app/(screens)/(tabs)/booking.tsx
```

```tsx
// app/(screens)/(tabs)/booking.tsx
import { View, Text } from "react-native";

export default function BookingScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl">Booking Screen</Text>
    </View>
  );
}
```

### 2. Creating a New Component

```bash
# Create component folder and file
mkdir components/tickets
touch components/tickets/TicketCard.tsx
```

```tsx
// components/tickets/TicketCard.tsx
import { View, Text } from "react-native";

interface TicketCardProps {
  flightNumber: string;
  from: string;
  to: string;
}

export function TicketCard({ flightNumber, from, to }: TicketCardProps) {
  return (
    <View className="bg-white p-4 rounded-lg shadow">
      <Text className="text-lg font-bold">{flightNumber}</Text>
      <Text>
        {from} → {to}
      </Text>
    </View>
  );
}
```

### 3. Adding a New API Endpoint

```typescript
// 1. Add to services/api/endpoints.ts
export const ENDPOINTS = {
  // ...existing
  BOOK_FLIGHT: "/booking/create",
};

// 2. Add method in services/api/apiMethods.ts
export const bookFlight = (data) => apiPost(ENDPOINTS.BOOK_FLIGHT, data);

// 3. Use in component
import { bookFlight } from "@/services/api/apiMethods";

const handleBooking = async (flightData) => {
  try {
    const response = await bookFlight(flightData);
    console.log("Booking successful:", response.data);
  } catch (error) {
    console.error("Booking failed:", error);
  }
};
```

### 4. Creating a Zustand Store

```typescript
// store/useBookingStore.ts
import { create } from "zustand";

interface Booking {
  id: string;
  flightNumber: string;
  // ...other fields
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
    })),
  removeBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),
}));
```

---

## 🏗 Building for Production

### Android Build

```bash
# Install EAS CLI (first time only)
npm install -g eas-cli

# Login to Expo
eas login

# Configure project (first time only)
eas build:configure

# Build APK (for testing)
eas build --platform android --profile preview

# Build AAB (for Google Play)
eas build --platform android --profile production
```

### iOS Build

```bash
# Build for TestFlight/App Store
eas build --platform ios --profile production
```

### Web Build

```bash
# Export static website
npx expo export:web

# Output will be in web-build/
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. Metro Bundler Issues

```bash
# Clear cache and restart
npx expo start -c

# OR delete cache manually
rm -rf node_modules/.cache
rm -rf .expo
npx expo start
```

#### 2. Dependencies Won't Install

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Android Emulator Not Detected

```bash
# Check Android SDK path
echo $ANDROID_HOME

# List available emulators
emulator -list-avds

# Start emulator manually
emulator -avd <emulator_name>
```

#### 4. iOS Simulator Issues (macOS)

```bash
# Reset Xcode command line tools
sudo xcode-select --reset

# Open simulator
open -a Simulator
```

#### 5. Port Already in Use

**Windows:**

```bash
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

**macOS/Linux:**

```bash
lsof -ti:8081 | xargs kill
```

#### 6. Expo Go Connection Issues

- Ensure phone and computer are on the same Wi-Fi network
- Disable VPN
- Try tunnel mode: `npx expo start --tunnel`

#### 7. White Screen on App Launch

- Clear cache: `npx expo start -c`
- Check for JavaScript errors in terminal
- Verify all imports are correct

#### 8. Tailwind Styles Not Applied

- Restart dev server
- Check `tailwind.config.js` content paths
- Verify `global.css` is imported in `_layout.tsx`

---

## ✅ Best Practices

### Code Organization

- ✅ Keep components small and focused
- ✅ Use TypeScript for type safety
- ✅ Follow the existing folder structure
- ✅ Name files with PascalCase for components
- ✅ Use camelCase for utilities and hooks

### State Management

- ✅ Use Zustand for global state
- ✅ Use React state for local component state
- ✅ Avoid prop drilling - use stores
- ✅ Keep state close to where it's used

### Performance

- ✅ Use `React.memo()` for expensive components
- ✅ Optimize images (use Expo Image)
- ✅ Use `FlatList` for long lists
- ✅ Implement pagination for large datasets
- ✅ Debounce search inputs

### API Calls

- ✅ Handle loading states
- ✅ Handle error states gracefully
- ✅ Add request timeouts
- ✅ Implement retry logic
- ✅ Cache responses when appropriate

### Styling

- ✅ Use Tailwind classes for consistency
- ✅ Follow the custom color palette
- ✅ Support dark mode
- ✅ Test on different screen sizes
- ✅ Use safe area insets

### Git Workflow

- ✅ Write meaningful commit messages
- ✅ Create feature branches
- ✅ Keep commits focused and atomic
- ✅ Test before pushing

---

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit changes: `git commit -m 'feat: Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add flight booking feature
fix: Fix crash on airport search
docs: Update README with new instructions
style: Format code with Prettier
refactor: Restructure API service
perf: Optimize flight list rendering
test: Add tests for booking flow
chore: Update dependencies
```

---

## 📚 Resources

### Official Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

### Community & Support

- [Expo Discord](https://chat.expo.dev/)
- [React Native Community](https://reactnative.dev/community/overview)
- [Stack Overflow - Expo Tag](https://stackoverflow.com/questions/tagged/expo)

### Learning Resources

- [Expo Learn](https://docs.expo.dev/tutorial/introduction/)
- [React Native Express](https://www.reactnative.express/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

## 👨‍💻 Authors

- **Deshan Tharupathi** - Initial work - [GitHub Profile](https://github.com/tharupathi02)

---

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- React Native community
- All contributors who help improve this project

---

**Happy Coding! ✈️**

For questions or support, please open an issue on GitHub.
