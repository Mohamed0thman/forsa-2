import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { IconButtons, Row } from "../ui";
import { ICONS } from "../../constants";

const { HeartIcon, BellIcon, SearchIcon, ForsaLogoIcon } = ICONS;

type Props = {
  style?: StyleProp<ViewStyle>;
  isRtl?: boolean;
};

const Header = ({ style, isRtl }: Props) => {
  return (
    <Row isRtl={isRtl} justifyContent="space-between" style={[style]}>
      <IconButtons icon={<SearchIcon />} />

      <IconButtons
        style={{ alignSelf: "center", width: "33.333%" }}
        icon={<ForsaLogoIcon />}
      />

      <Row gap={10} isRtl={isRtl}>
        <IconButtons icon={<HeartIcon />} />
        <IconButtons icon={<BellIcon />} />
      </Row>
    </Row>
  );
};

export default Header;

const styles = StyleSheet.create({});
