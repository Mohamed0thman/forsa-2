import { StyleSheet, View, FlatList, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import { COLORS, SCALE, SIZES } from "../../../constants";
const { SC_Width, vs, mvs, ms, s } = SCALE;

type Props = {
  data: any[];
  carouselItem: (item: any) => React.JSX.Element;
  time?: number;
  style?: StyleProp<ViewStyle>;
};

export default ({ data, carouselItem, time, style }: Props) => {
  let index = 0;
  const totalIndex = data.length - 1;
  const flatListRef = React.useRef<FlatList>(null);
  React.useEffect(() => {
    if (!data.length) return;
    const intervalId = setInterval(() => {
      index++;
      if (index <= totalIndex) {
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
      } else {
        index = 0;
        flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
      }
    }, time || 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={data}
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={[{ flexGrow: 0 }, style]}
        keyExtractor={(item, i) => `${i}`}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>{carouselItem(item)}</View>
        )}
        getItemLayout={(_, i) => ({
          length: SC_Width,
          offset: SC_Width * i,
          index: i,
        })}
        initialScrollIndex={0}
        initialNumToRender={data.length}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: SC_Width,
    justifyContent: "center",
    alignItems: "center",
  },
});
