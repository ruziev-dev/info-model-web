import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initDB } from "react-indexed-db";
import { DBConfig } from "./indexedDB/DbConfig";
initDB(DBConfig);

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (data: string) => void;
    };
  }
}

/* if (!window.ReactNativeWebView?.postMessage) {
  window.ReactNativeWebView = {
    postMessage: console.log,
  };
}
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
