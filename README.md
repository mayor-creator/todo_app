# TodoApp

A beautiful, theme-able Todo application built with React Native and Expo.

## Features

- **Todo Management**: Create, read, update, and delete todo items.
- **Filtering**: Filter todos by "All", "Active", and "Completed" statuses.
- **Theming**: Supports Light and Dark modes based on system settings.
- **Persistence**: Todos are saved locally using AsyncStorage.
- **Responsive Design**: Adapts to different screen sizes.

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: `StyleSheet` with a custom theme system
- **Storage**: `@react-native-async-storage/async-storage`
- **Icons**: `@expo/vector-icons`
- **Assets**: `expo-image`, `expo-font`

## Project Structure

```
TodoApp/
├── app/                  # Expo Router app directory
│   └── index.tsx         # Main entry point
├── components/           # Reusable UI components
│   ├── container.tsx     # Main layout container
│   ├── header.tsx        # App header
│   ├── main.tsx          # Main todo list logic and UI
│   └── themedBackgroundScreen.tsx # Background wrapper
├── src/
│   └── theme.ts          # Theme definitions (colors, spacing, typography)
├── assets/               # Images and fonts
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, but recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TodoApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npx expo start
```

- **iOS**: Press `i` in the terminal (requires Xcode Simulator).
- **Android**: Press `a` in the terminal (requires Android Studio Emulator).
- **Web**: Press `w` in the terminal.

## License

This project is licensed under the MIT License.
