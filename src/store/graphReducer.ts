import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMetaData } from "../types/graph";
import { buildGraph } from "./graphThunks";

const initialState = {
  metaData: <TMetaData | null>null,
  graphThree: <any | null>null,
  loading: <false>true,
  errorMessage: <string>"",
};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setMetaInfo: (state, action: PayloadAction<TMetaData>) => {
      console.log("setMetaInfo", action);
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buildGraph.fulfilled, (state, action) => {
        state.graphThree = action.payload;
        state.loading = false;
      })
      .addCase(buildGraph.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          "Ошибка построения модели: " + action.error.message;
      });
  },
});

export const { setMetaInfo } = graphSlice.actions;

export default graphSlice.reducer;
