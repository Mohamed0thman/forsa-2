import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Row, SkeletonPlaceholder, Typography } from "../ui";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getServices } from "../../store/slices/serviceSlice";
import { COLORS, FONTS, SCALE } from "../../constants";

const { s, mvs } = SCALE;

type Props = {};

const gradientColors = [
  ["#11232a", "#2b5061"],
  ["#09bdb6", "#44b2be"],
  ["#330a3a", "#214262", "#0c8390"],
  ["#01b1d9", "#0085b2"],
];

const ServiceList = forwardRef<any, Props>(({}, ref) => {
  const flatListRef = React.useRef<FlatList>(null);

  const { services, isLoading } = useAppSelector((state) => state.service);
  const { isRtl } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, []);

  useImperativeHandle(
    ref,
    (): any => {
      return {
        refrish() {
          dispatch(getServices());
        },
      };
    },
    []
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={isLoading ? [1, 2, 3, 4] : services}
        scrollEnabled
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        keyExtractor={(item, i) => `${i}`}
        columnWrapperStyle={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        ListHeaderComponent={
          <Row
            isRtl={isRtl}
            justifyContent="space-between"
            style={styles.header}
          >
            <Typography style={styles.headerTitle} fontWeight="Bold">
              Request Additional Loan
            </Typography>
            <Pressable android_ripple={{ borderless: false, radius: 50 }}>
              <Typography>See All</Typography>
            </Pressable>
          </Row>
        }
        renderItem={({ item, index }) => {
          if (isLoading) {
            return (
              <View style={styles.linearGradient}>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      backgroundColor: COLORS.black,
                      height: 60,
                    }}
                  ></View>
                </SkeletonPlaceholder>
              </View>
            );
          }
          return (
            <LinearGradient
              colors={gradientColors[index]}
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Typography style={styles.serviceText}>
                {item?.name_en}
              </Typography>
            </LinearGradient>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ width: s(20) }} />}
      />
    </View>
  );
});

export default ServiceList;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  serviceText: { ...FONTS.middle, color: COLORS.white },
  header: {
    marginVertical: mvs(10),
  },
  headerTitle: {
    ...FONTS.h3,
  },
});
