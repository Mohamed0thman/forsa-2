import * as Localization from "expo-localization";
import locales from "./locales";
import { I18nManager } from "react-native";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { store } from "../store/configureStore";
import { changeLang } from "../store/slices/settingSlice";

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const resources = locales;

export async function initI18Next() {
  const lang = store.getState().setting.lang;

  if (!lang) {
    store.dispatch(
      changeLang({
        lang: Localization.locale,
        isRtl: Localization.locale === "ar" ? true : false,
      })
    );
  }
  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    fallbackLng: "en",
    lng: store.getState().setting.lang || Localization.locale,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });
}

export default initI18Next;
