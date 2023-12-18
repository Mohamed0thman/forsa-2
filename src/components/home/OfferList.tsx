import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { ProgressiveImage, Row, Typography } from "../ui";
import dayjs from "dayjs";
import { COLORS, SCALE, FONTS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getOffers } from "../../store/slices/offerSlice";

const { s, mvs } = SCALE;

type Props = {};

const OfferList = forwardRef<any, Props>(({}, ref) => {
  const flatListRef = React.useRef<FlatList>(null);

  const { offers, isLoading } = useAppSelector((state) => state.offer);
  const { isRtl } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, []);

  useImperativeHandle(
    ref,
    (): any => {
      return {
        refrish() {
          dispatch(getOffers());
        },
      };
    },
    []
  );

  console.log("offers", offers);

  return (
    <FlatList
      ref={flatListRef}
      data={offers}
      scrollEnabled
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, i) => `${i}`}
      columnWrapperStyle={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
      ListHeaderComponent={
        <Row isRtl={isRtl} justifyContent="space-between" style={styles.header}>
          <Typography style={styles.headerTitle} fontWeight="Bold">
            Offers Select for You
          </Typography>
          <Pressable android_ripple={{ borderless: false, radius: 50 }}>
            <Typography>See All</Typography>
          </Pressable>
        </Row>
      }
      renderItem={({ item, index }) => (
        <View style={styles.itemContainer}>
          <ProgressiveImage
            src={item?.thumbnail}
            containerStyle={{ width: "100%", height: 150 }}
          />
          <View style={styles.itemBody}>
            <Typography>{item?.brand.sector.title_en}</Typography>
            <Typography fontWeight="Bold">{item?.brand.title}</Typography>

            <Typography style={{ textAlign: "center", marginTop: 4 }}>
              {item?.title}
            </Typography>

            <Typography
              fontWeight="Bold"
              style={{
                marginTop: "auto",
                alignSelf: "flex-start",
                marginHorizontal: 4,
                marginBottom: 10,
              }}
            >
              {dayjs(item?.expiry_date).format("D MMM YYYY")}
            </Typography>
          </View>
        </View>
      )}
    />
  );
});

export default OfferList;

const styles = StyleSheet.create({
  header: {
    marginVertical: mvs(10),
  },
  headerTitle: {
    ...FONTS.h3,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    height: 300,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  itemBody: {
    height: "50%",
    backgroundColor: COLORS.white,
    overflow: "hidden",
    borderRadius: 12,
    marginTop: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    alignItems: "center",
  },
});
