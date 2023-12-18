import { Platform, StyleSheet, View, StatusBar } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants";
// import { StatusBar } from "expo-status-bar";

type Props = React.ComponentProps<typeof View> & {};

const RootScreen: FC<PropsWithChildren<Props>> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,

        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
    >
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
        }}
      >
        <StatusBar
          translucent
          backgroundColor={COLORS.primary}
          barStyle="light-content"
        />
      </View>
      {children}
    </View>
  );
};

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
