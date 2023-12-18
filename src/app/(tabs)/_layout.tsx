import { Tabs } from "expo-router/tabs";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/configureStore";
import { COLORS, ICONS, FONTS, SCALE } from "../../constants";
import { Typography } from "../../components/ui";

const { HomeIcon, DiscountIcon, TagIcon, UserIcon } = ICONS;
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
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              fill={focused ? COLORS.primary : "none"}
              stroke={focused ? "none" : COLORS.lightGrey}
              width={s(22)}
              height={vs(22)}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Typography
              fontWeight={focused ? "Bold" : "Regular"}
              style={{
                ...FONTS.small,
                color: focused ? COLORS.primary : COLORS.lightGrey,
                transform: [{ scaleX: isRtl ? -1 : 1 }],
              }}
            >
              {t("main:tabs.home")}
            </Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="retail"
        options={{
          tabBarIcon: ({ focused }) => (
            <TagIcon
              fill={focused ? COLORS.primary : "none"}
              stroke={focused ? "none" : COLORS.lightGrey}
              width={s(22)}
              height={vs(22)}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Typography
              fontWeight={focused ? "Bold" : "Regular"}
              style={{
                ...FONTS.small,
                color: focused ? COLORS.primary : COLORS.lightGrey,
                transform: [{ scaleX: isRtl ? -1 : 1 }],
              }}
            >
              {t("main:tabs.retail")}
            </Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          tabBarIcon: ({ focused }) => (
            <DiscountIcon
              fill={focused ? COLORS.primary : "none"}
              stroke={focused ? "none" : COLORS.lightGrey}
              width={s(22)}
              height={vs(22)}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Typography
              fontWeight={focused ? "Bold" : "Regular"}
              style={{
                ...FONTS.small,
                color: focused ? COLORS.primary : COLORS.lightGrey,
                transform: [{ scaleX: isRtl ? -1 : 1 }],
              }}
            >
              {t("main:tabs.offers")}
            </Typography>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <UserIcon
              fill={focused ? COLORS.primary : "none"}
              stroke={focused ? "none" : COLORS.lightGrey}
              width={s(22)}
              height={vs(22)}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Typography
              fontWeight={focused ? "Bold" : "Regular"}
              style={{
                ...FONTS.small,
                color: focused ? COLORS.primary : COLORS.lightGrey,
                transform: [{ scaleX: isRtl ? -1 : 1 }],
              }}
            >
              {t("main:tabs.profile")}
            </Typography>
          ),
        }}
      />
    </Tabs>
  );
}
