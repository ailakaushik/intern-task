import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'; // ✅ Missing imports added
import { useNavigation } from '@react-navigation/native';

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide the splash screen after fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Show loading screen while fonts are loading
  if (!loaded) {
    return <SplashScreenPage />;
  }

  return (
    <ThemeProvider value={DefaultTheme}> {/* ✅ Force light mode */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// ✅ Custom loading splash screen component
const SplashScreenPage = () => (
  <View style={styles.splashContainer}>
    <Text style={styles.splashText}>Loading...</Text>
  </View>
);

// ✅ Style definitions
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Optional: for better visibility in light mode
  },
});
