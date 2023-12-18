import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { COLORS, ICONS, SCALE, SIZES, FONTS } from "../../constants";
import { useAppSelector } from "../../store/configureStore";
import {
  Header,
  OfferList,
  SelectorList,
  ServiceList,
} from "../../components/home";
import { Carousel, Row, Typography } from "../../components/ui";
import images from "../../constants/images";
import { RootScreen } from "../../components";

const { SC_Width, s, vs, mvs, ms } = SCALE;
const { WritingIcon } = ICONS;

export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);
  const flatListRef = React.useRef<FlatList>(null);
  const selectorListRef = React.useRef<any>(null);
  const serviceListRef = React.useRef<any>(null);
  const offerListRef = React.useRef<any>(null);

  const { isRtl } = useAppSelector((state) => state.setting);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      selectorListRef.current.refrish();
      serviceListRef.current.refrish();
      offerListRef.current.refrish();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeader = () => {
    return (
      <View style={{ flex: 1 }}>
        <SelectorList ref={selectorListRef} />
        <ServiceList ref={serviceListRef} />
        <OfferList ref={offerListRef} />
      </View>
    );
  };

  return (
    <RootScreen style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          alignSelf: "center",
          backgroundColor: "#072040",
          width: SC_Width * 1.5,
          height: vs(260),
          borderBottomEndRadius: SC_Width * 0.4,
          borderBottomStartRadius: SC_Width * 0.4,
        }}
      />
      <Header isRtl={isRtl} style={{ paddingHorizontal: ms(SIZES.padding) }} />

      <View style={{ paddingHorizontal: ms(SIZES.padding) }}>
        <Row isRtl={isRtl} gap={20} style={styles.sign}>
          <WritingIcon />

          <View>
            <Typography
              fontWeight="Bold"
              isRtl={isRtl}
              style={styles.signTitle}
            >
              Get your limit
            </Typography>
            <Typography
              fontWeight="Regular"
              isRtl={isRtl}
              style={styles.signSubtitle}
            >
              Complete your infoand get up to EGP 100,000
            </Typography>
          </View>
        </Row>
      </View>

      <Carousel
        data={[1, 2, 3]}
        carouselItem={() => {
          return (
            <View
              style={{
                width: s(325),
                height: vs(130),
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 22,
              }}
            >
              <Image
                source={images.offerImage}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: -1,
                  borderRadius: 22,
                }}
                contentFit="cover"
              />
              <Typography
                fontWeight="Bold"
                color={COLORS.white}
                style={{ ...FONTS.h4 }}
              >
                Check out latest offers
              </Typography>
            </View>
          );
        }}
        style={{ marginVertical: vs(SIZES.base) }}
      />

      <FlatList
        ref={flatListRef}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={[]}
        contentContainerStyle={{
          paddingBottom: 150,
          paddingHorizontal: ms(SIZES.padding),
        }}
        renderItem={() => <></>}
        ListFooterComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </RootScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: SIZES.margin,
  },
  sign: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.warning,
    alignSelf: "flex-start",
    padding: ms(SIZES.padding),
    marginTop: mvs(SIZES.base * 2),
    borderRadius: 16,
  },
  signTitle: {
    ...FONTS.h4,
    color: COLORS.warning,
  },
  signSubtitle: {
    ...FONTS.xsmall,
    color: COLORS.warning,
    marginTop: mvs(SIZES.base),
  },
});
