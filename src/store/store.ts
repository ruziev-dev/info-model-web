import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import graphReducer from "./graphReducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    graph: graphReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

window.dispatch = store.dispatch;

//эти объекты используются нативным приложение для отправки данных в WebView
declare global {
  interface Window {
    dispatch: AppDispatch;
    Edges: string;
    Equipment: string;
    Excavations: string;
    Horizons: string;
    Nodes: string;
    DefaultSettings: string;
    Zones: string;
    MetaInfo: string;
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
