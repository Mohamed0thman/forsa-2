import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  lang: "en" | "ar" | undefined;
  isRtl: boolean | undefined;
  themeName: "light" | "dark";
}

const initialState: InitialState = {
  lang: undefined,
  isRtl: undefined,
  themeName: "light",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload.lang;
      state.isRtl = action.payload.isRtl;
    },
    changeMode: (state, action) => {
      state.themeName = action.payload;
    },
  },
  extraReducers: (builder) => {},
});
export default settingSlice;
export const { changeLang, changeMode } = settingSlice.actions;
