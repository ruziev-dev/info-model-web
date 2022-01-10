import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { putDataToIndexedDB } from "./graphThunks";

import type { RootState } from "./store";

interface TAppState {
  theme: Theme;
  isLoading: boolean;
  isRNControlLoading: boolean;
  errorMessage?: string;
}
enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const initialState: TAppState = {
  isLoading: true,
  isRNControlLoading: true,
  errorMessage: "",
  theme: Theme.LIGHT,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    stopRNLoading: (state) => {
      state.isRNControlLoading = false;
    },
    stopLoadingMode: (state) => {
      state.isLoading = false;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(putDataToIndexedDB.fulfilled, (state, action) => {
        state.errorMessage = "";
        state.isLoading = false;
      })
      .addCase(putDataToIndexedDB.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { changeTheme, setErrorMessage } = appSlice.actions;

//export const selectCount = (state: RootState) => state.theme;

export default appSlice.reducer;
