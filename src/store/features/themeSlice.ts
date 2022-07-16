import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@app/store/store";

const initialState = {
  isDarkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const selectIsDarkMode = (state: AppState) => state.theme.isDarkMode;
