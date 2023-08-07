import "@azure/core-asynciterator-polyfill";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import awsExports from "../src/aws-exports";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { Amplify, DataStore } from "aws-amplify";

Amplify.configure(awsExports);

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Authenticator.Provider>
        <RootSiblingParent>
          <Authenticator
            Container={(props) => (
              // reuse default `Container` and apply custom background
              <Authenticator.Container
                {...props}
                //style={{ backgroundColor: "pink" }}
              />
            )}
            //components={{SignIn: Login}}
          >
            <Stack screenOptions={{}}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
          </Authenticator>
        </RootSiblingParent>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}
