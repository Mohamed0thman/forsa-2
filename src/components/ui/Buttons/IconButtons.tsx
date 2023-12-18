import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";

type Props = {
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const IconButtons = ({ icon, style }: Props) => {
  return (
    <TouchableOpacity>
      <View style={[styles.container, style]}>{icon}</View>
    </TouchableOpacity>
  );
};

export default IconButtons;

const styles = StyleSheet.create({
  container: {},
});
