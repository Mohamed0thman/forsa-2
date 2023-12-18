import { StyleSheet, View, Animated, StyleProp } from "react-native";
import React from "react";
import { Image, ImageSource, ImageStyle } from "expo-image";

const AnimateFastImage = Animated.createAnimatedComponent(Image);
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type Props = {
  src: ImageSource;
  defaultImageSrc?: number;
  containerStyle?: StyleProp<ImageStyle>;
};

export default ({ defaultImageSrc, src, containerStyle }: Props) => {
  const defaultImageAnimate = React.useRef(new Animated.Value(0));
  const imageAnimate = React.useRef(new Animated.Value(0));

  function handleDefaultLoad() {
    Animated.timing(defaultImageAnimate.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function handleImageLoad() {
    Animated.timing(imageAnimate.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <AnimateFastImage
        source={defaultImageSrc}
        style={[{ opacity: defaultImageAnimate.current }, styles.image]}
        onLoad={handleDefaultLoad}
        // resizeMode={FastImage.resizeMode.cover}
        // placeholder={blurhash}
        contentFit="cover"
      />
      <AnimateFastImage
        source={src}
        style={[
          { opacity: imageAnimate.current },
          styles.image,
          StyleSheet.absoluteFillObject,
        ]}
        onLoad={handleImageLoad}
        // resizeMode={FastImage.resizeMode.cover}
        // placeholder={blurhash}
        contentFit="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e4e8",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
});
