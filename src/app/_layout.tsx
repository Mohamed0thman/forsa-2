import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import initI18Next from "../localization";
import { persistor, store } from "../store/configureStore";

const onBeforeLift = () => {
  initI18Next();
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SegoeUI-Regular": require("../assets/fonts/SegoeUI.ttf"),
    "SegoeUI-Bold": require("../assets/fonts/SegoeUI-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}
            onBeforeLift={onBeforeLift}
          >
            <Slot />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
