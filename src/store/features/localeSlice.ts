import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@app/store/store";

const initialState = {
  locale: "en",
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export const selectLocale = (state: AppState) => state.locale.locale;
