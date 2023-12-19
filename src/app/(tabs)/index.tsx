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
import { Row, Typography } from "../../components/ui";
import images from "../../constants/images";
import { RootScreen } from "../../components";
import { useTranslation } from "react-i18next";

const { SC_Width, s, vs, mvs, ms } = SCALE;
const { WritingIcon } = ICONS;

export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);
  const flatListRef = React.useRef<FlatList>(null);
  const selectorListRef = React.useRef<any>(null);
  const serviceListRef = React.useRef<any>(null);
  const offerListRef = React.useRef<any>(null);

  const { isRtl } = useAppSelector((state) => state.setting);

  const { t } = useTranslation();

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
              {t("home:sign.title")}
            </Typography>
            <Typography
              fontWeight="Regular"
              isRtl={isRtl}
              style={styles.signSubtitle}
            >
              {t("home:sign.subTitle")}
            </Typography>
          </View>
        </Row>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={images.offerImage}
          style={styles.image}
          contentFit="cover"
        />
        <Row isRtl={isRtl} gap={10}>
          <Image
            source={images.offerBrand}
            style={{ width: s(70), height: vs(70) }}
            contentFit="contain"
          />
          <Typography
            fontWeight="Bold"
            color={COLORS.primary}
            style={{ ...FONTS.h4 }}
          >
            {t("home:offerTitle")}
          </Typography>
        </Row>
      </View>

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
  imageContainer: {
    width: "90%",
    height: vs(130),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    alignSelf: "center",
    marginTop: mvs(SIZES.base),
  },
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  imageTitle: {},
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
