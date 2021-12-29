import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { putDataToIndexedDB } from "./graphThunks";
import type { RootState } from "./store";

interface TAppState {
  theme: Theme;
  isLoading: boolean;
  isRNControlLoading: boolean;
}
enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const initialState: TAppState = {
  isLoading: true,
  isRNControlLoading: true,
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
    startLoadingMode: (state) => {
      state.isLoading = true;
    },
    stopLoadingMode: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(putDataToIndexedDB.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { changeTheme } = appSlice.actions;

//export const selectCount = (state: RootState) => state.theme;

export default appSlice.reducer;
