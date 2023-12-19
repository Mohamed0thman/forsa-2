import { Tabs } from "expo-router/tabs";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/configureStore";
import { COLORS, ICONS, FONTS, SCALE } from "../../constants";
import { Typography } from "../../components/ui";
import { StyleSheet } from "react-native";

const {
  HomeIcon,
  DiscountIcon,
  TagIcon,
  UserIcon,
  HomeIconSolid,
  DiscountIconSolid,
  ProfileIconSolid,
  TagIconSolid,
} = ICONS;
const { SC_Width, s, vs, mvs, ms } = SCALE;

export default function TabsLayout() {
  const { t } = useTranslation();
  const { isRtl } = useAppSelector((state) => state.setting);

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: vs(60),
          transform: [{ scaleX: isRtl ? -1 : 1 }],
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeIconSolid width={s(22)} height={vs(22)} />
            ) : (
              <HomeIcon width={s(22)} height={vs(22)} />
            ),
          tabBarLabel: ({ focused }) => (
            <Typography
              fontWeight={focused ? "Bold" : "Regular"}
              style={[
                styles.label,
                {
                  color: focused ? COLORS.primary : COLORS.lightGrey,
                  transform: [{ scaleX: isRtl ? -1 : 1 }],
                },
              ]}
            >
              {t("main:tabs.home")}
            </Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="retail"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TagIconSolid width={s(22)} height={vs(22)} />
            ) : (
              <TagIcon width={s(22)} height={vs(22)} />
            ),
          tabBarLabel: ({ focused }) => (
            <Typography
              fontWeight={focused ? "Bold" : "Regular"}
              style={[
                styles.label,
                {
                  color: focused ? COLORS.primary : COLORS.lightGrey,
                  transform: [{ scaleX: isRtl ? -1 : 1 }],
                },
              ]}
            >
              {t("main:tabs.retail")}
            </Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <DiscountIconSolid width={s(22)} height={vs(22)} />
            ) : (
              <DiscountIcon width={s(22)} height={vs(22)} />
            ),
          tabBarLabel: ({ focused }) => (
            <Typography
              fontWeight={focused ? "Bold" : "Regular"}
              style={[
                styles.label,
                {
                  color: focused ? COLORS.primary : COLORS.lightGrey,
                  transform: [{ scaleX: isRtl ? -1 : 1 }],
                },
              ]}
            >
              {t("main:tabs.offers")}
            </Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ProfileIconSolid width={s(22)} height={vs(22)} />
            ) : (
              <UserIcon width={s(22)} height={vs(22)} />
            ),
          tabBarLabel: ({ focused }) => (
            <Typography
              fontWeight={focused ? "Bold" : "Regular"}
              style={[
                styles.label,
                {
                  color: focused ? COLORS.primary : COLORS.lightGrey,
                  transform: [{ scaleX: isRtl ? -1 : 1 }],
                },
              ]}
            >
              {t("main:tabs.profile")}
            </Typography>
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  label: {
    ...FONTS.small,
    marginBottom: mvs(10),
  },
});
