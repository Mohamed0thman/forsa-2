import SCALE from "./scale";

const { rf } = SCALE;

const COLORS = {
  // primary  colors
  primary: "#072040",
  secondary: "#3EBDAC",

  // danger
  danger: "#D7191C",
  lightDanger: "#FEB9BA",

  // success
  success: "#199E74",
  lightSuccess: "#ABF8DF",

  warning: "#FFC709",

  // black
  black: "#333333",

  // white
  white: "#FFFFFF",

  //grey
  lightGrey: "#e1e1e1",
  darkGrey: "#C2C2C2",

  // shadow
  blackShadow: "rgba(20, 20, 20, 0.37)",
};

const SIZES = {
  // global sizes
  base: 10,
  font: 14,
  radius: 12,
  padding: 16,
  margin: 20,

  // font sizes
  largeTitle: rf(30),
  h1: rf(24),
  h2: rf(22),
  h3: rf(20),
  h4: rf(18),
  h5: rf(14),

  xs: rf(12),
  s: rf(14),
  m: rf(16),
  l: rf(24),
  lg: rf(30),
};

const FONTS = {
  largeTitle: {
    fontSize: SIZES.largeTitle,
  },
  h1: {
    fontSize: SIZES.h1,
  },
  h2: {
    fontSize: SIZES.h2,
  },
  h3: {
    fontSize: SIZES.h3,
  },
  h4: {
    fontSize: SIZES.h4,
  },
  h5: {
    fontSize: SIZES.h5,
  },
  large: {
    fontSize: SIZES.l,
  },
  middle: {
    fontSize: SIZES.m,
  },
  small: {
    fontSize: SIZES.s,
  },
  xsmall: {
    fontSize: SIZES.xs,
  },
};

export { COLORS, SIZES, FONTS };
