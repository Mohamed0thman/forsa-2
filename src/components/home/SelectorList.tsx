import { StyleSheet, View, Pressable, Text } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FlatList } from "react-native-gesture-handler";
import { ProgressiveImage, Row, SkeletonPlaceholder, Typography } from "../ui";
import { COLORS, IMAGES, SCALE, FONTS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getSelectors } from "../../store/slices/selectorsSlice";
import { getBrands, getMoreBrands } from "../../store/slices/brandSlice";
import { useTranslation } from "react-i18next";
const { s, vs, mvs, ms } = SCALE;

type Props = {};

const SelectorList = forwardRef<any, Props>(({}, ref) => {
  const [selectedValue, setSelectedValue] = useState("1");
  const [brandPage, setBrandPage] = React.useState(1);

  const selectorListRef = React.useRef<FlatList>(null);
  const brandListRef = React.useRef<FlatList>(null);

  const { t } = useTranslation();

  const { selectors, isLoading: selectorLoading } = useAppSelector(
    (state) => state.selector
  );
  const {
    brands,
    next,
    isLoading: brandLoading,
    moreLoading,
  } = useAppSelector((state) => state.brand);

  const { isRtl } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSelectors());
  }, []);

  useEffect(() => {
    dispatch(getBrands({ page: 1, categoryId: selectedValue }));
  }, [selectedValue]);

  const onBrandEnd = () => {
    if (next) {
      dispatch(getMoreBrands({ page: brandPage, categoryId: selectedValue }));
      setBrandPage(brandPage + 1);
    }
  };

  useImperativeHandle(
    ref,
    (): any => {
      return {
        refrish() {
          selectorListRef.current?.scrollToOffset({
            offset: 0,
            animated: false,
          });
          brandListRef.current?.scrollToOffset({
            offset: 0,
            animated: false,
          });

          setBrandPage(1);
          dispatch(getBrands({ page: 1, categoryId: "1" }));
          dispatch(getSelectors());
        },
      };
    },
    []
  );

  const renderLoadingSelector = () => {
    return (
      <View style={{ width: s(100), height: vs(20) }}>
        <SkeletonPlaceholder>
          <View
            style={{
              backgroundColor: COLORS.black,
              height: vs(20),
            }}
          ></View>
        </SkeletonPlaceholder>
      </View>
    );
  };

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <Pressable
          android_ripple={{ borderless: false, radius: 50 }}
          onPress={() => {
            setBrandPage(1);
            setSelectedValue(item.value);
            brandListRef.current?.scrollToOffset({
              offset: 0,
              animated: false,
            });
          }}
        >
          <View
            style={[
              styles.selectorItem,
              {
                backgroundColor:
                  item.value === selectedValue
                    ? COLORS.secondary
                    : "transparent",
              },
            ]}
          >
            <Typography
              fontWeight="Bold"
              style={[
                styles.label,
                {
                  color:
                    item.value === selectedValue
                      ? COLORS.white
                      : COLORS.primary,
                },
              ]}
            >
              {item?.label}
            </Typography>
          </View>
        </Pressable>
      );
    },
    [selectedValue]
  );

  const renderBrandLoading = () => {
    return (
      <View style={[{ width: s(100), height: vs(110), paddingVertical: 6 }]}>
        <SkeletonPlaceholder>
          <View
            style={[
              {
                backgroundColor: COLORS.black,
                height: vs(100),
              },
              styles.image,
            ]}
          ></View>
        </SkeletonPlaceholder>
      </View>
    );
  };

  const renderBrand = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <Pressable
          android_ripple={{ borderless: false, radius: 50 }}
          style={{ paddingVertical: 6 }}
        >
          <ProgressiveImage
            src={item.thumbnail}
            defaultImageSrc={IMAGES.defaultImg}
            containerStyle={styles.image}
          />
        </Pressable>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <Row isRtl={isRtl} justifyContent="space-between" style={styles.header}>
        <Typography style={styles.headerTitle} fontWeight="Bold">
          {t("home:title.selectors")}
        </Typography>
        <Pressable android_ripple={{ borderless: false, radius: 50 }}>
          <Typography> {t("home:subTitle.viewAll")}</Typography>
        </Pressable>
      </Row>
      <FlatList
        ref={selectorListRef}
        data={selectorLoading ? [1, 2, 3, 4, 5] : selectors}
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginBottom: 5 }}
        keyExtractor={(item, i) => `${i}`}
        renderItem={selectorLoading ? renderLoadingSelector : renderItem}
        ItemSeparatorComponent={() => <View style={{ width: s(10) }} />}
        inverted={isRtl}
      />

      <FlatList
        ref={brandListRef}
        data={brandLoading ? [1, 2, 3, 4] : brands}
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        keyExtractor={(item, i) => `${i}`}
        renderItem={brandLoading ? renderBrandLoading : renderBrand}
        ItemSeparatorComponent={() => <View style={{ width: s(20) }} />}
        onEndReached={onBrandEnd}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() => {
          if (next && moreLoading) {
            return (
              <View
                style={[
                  {
                    width: s(100),
                    height: vs(110),
                    paddingVertical: 6,
                    marginHorizontal: ms(20),
                  },
                ]}
              >
                <SkeletonPlaceholder>
                  <View
                    style={[
                      {
                        backgroundColor: COLORS.black,
                        height: vs(100),
                      },
                      styles.image,
                    ]}
                  ></View>
                </SkeletonPlaceholder>
              </View>
            );
          }
        }}
        getItemLayout={(_, index) => ({
          length: s(100) + s(20), //  WIDTH + (MARGIN_HORIZONTAL * 2)
          offset: (s(100) + s(20)) * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
          index,
        })}
        inverted={isRtl}
      />
    </View>
  );
});

export default SelectorList;

const styles = StyleSheet.create({
  container: {
    marginBottom: mvs(10),
  },
  header: {
    marginVertical: mvs(10),
  },
  headerTitle: {
    ...FONTS.h3,
  },
  selectorItem: {
    padding: ms(6),
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    ...FONTS.h5,
  },
  image: {
    width: s(100),
    height: vs(100),
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
