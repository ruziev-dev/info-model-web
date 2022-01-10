import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEdge, THorizon, TMetaData, TNode } from "../types/graph";
import { buildHorizon, getHorizons } from "./graphThunks";

export interface TTube {
  edge: TEdge;
  startPoint?: TNode;
  endPoint?: TNode;
}
export interface THorizonLabels {
  label: string;
  point: THREE.Vector3;
}
interface TGraphState {
  metaData?: TMetaData;
  three?: Array<TTube>;
  horizons?: Array<THorizon>;
  horixonLabels?: Array<THorizonLabels>;
  errorMessage?: string;
}

const initialState: TGraphState = {};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setMetaInfo: (state, action: PayloadAction<TMetaData>) => {
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buildHorizon.fulfilled, (state, action) => {
        //@ts-ignore
        state.three = action.payload;

        state.errorMessage = "";
      })
      .addCase(buildHorizon.rejected, (state, action) => {
        state.errorMessage =
          "Ошибка построения модели: " + action.error.message;
      })
      .addCase(getHorizons.fulfilled, (state, action) => {
        state.horizons = action.payload;
        state.errorMessage = "";
      })
      .addCase(getHorizons.rejected, (state, action) => {
        state.errorMessage =
          "Ошибка построения модели: " + action.error.message;
      });
  },
});

export const { setMetaInfo } = graphSlice.actions;

export default graphSlice.reducer;
