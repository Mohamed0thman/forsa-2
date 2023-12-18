import { View, Text, StyleProp, TextStyle } from "react-native";
import React, { PropsWithChildren } from "react";

type Props = {
  style?: StyleProp<TextStyle>;
  fontWeight?: "Bold" | "Regular";
  color?: string;
  isRtl?: boolean;
};

export default ({
  children,
  style,
  fontWeight,
  color,
  isRtl = true,
}: PropsWithChildren<Props>) => {
  return (
    <Text
      style={[
        {
          fontFamily: `SegoeUI-${fontWeight || "Regular"}`,
          textAlign: isRtl ? "right" : "left",
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
