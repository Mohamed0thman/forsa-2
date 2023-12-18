import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  FlexStyle,
} from "react-native";
import React, { PropsWithChildren } from "react";

type Props = FlexStyle & {
  style?: StyleProp<ViewStyle>;
  isRtl?: boolean;
  gap?: number;
};

const Row = ({
  children,
  isRtl = false,
  justifyContent = "center",
  alignItems = "center",
  style,
  gap = 2,
}: PropsWithChildren<Props>) => {
  return (
    <View
      style={[
        {
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent,
          alignItems,
          gap,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Row;
