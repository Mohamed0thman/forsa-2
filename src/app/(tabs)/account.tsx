import { StyleSheet, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { changeLang } from "../../store/slices/settingSlice";
import { Row, Typography } from "../../components/ui";
import { RootScreen } from "../../components";

const Account = () => {
  const { i18n, t } = useTranslation();

  const { lang, isRtl } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  async function change(lang: string) {
    await i18n.changeLanguage(lang);
    const isRtl = lang === "ar";
    dispatch(changeLang({ lang, isRtl }));
  }

  return (
    <RootScreen>
      <Row
        isRtl={isRtl}
        justifyContent="space-between"
        style={{ paddingHorizontal: 20 }}
      >
        <Typography>{t("profile:changeLang")}</Typography>
        <Picker
          mode="dropdown"
          style={{ width: "50%" }}
          selectedValue={lang}
          onValueChange={(itemValue, itemIndex) => change(itemValue)}
        >
          <Picker.Item label="english" value="en" />
          <Picker.Item label="arabic" value="ar" />
        </Picker>
      </Row>
    </RootScreen>
  );
};

export default Account;

const styles = StyleSheet.create({});
