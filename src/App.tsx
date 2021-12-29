import Navigator from "./components/Navigator/Navigator";
import InfoModel from "./components/InfoModel/InfoModel";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { Loader } from "./components/Loading/Loading";
import { putDataToIndexedDB } from "./store/graphThunks";
import { DevTool } from "./devtools/DevTool";

function App() {
  const appInfo = useAppSelector((state) => state.app);
  const { theme, isLoading, isRNControlLoading } = appInfo;
  document.documentElement.setAttribute("data-theme", theme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    isRNControlLoading === false && dispatch(putDataToIndexedDB());
  }, [isRNControlLoading]);
  const status = isRNControlLoading
    ? "Ожидание информационной модели"
    : "Подготовка данных";
  return (
    <div className={`app-wrapper bp3-${theme}`}>
      {isLoading ? (
        <Loader status={status} />
      ) : (
        <>
          <InfoModel />
          <Navigator />
        </>
      )}
      {process.env.NODE_ENV && <DevTool />}
    </div>
  );
}

const AppWithStoreProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithStoreProvider;
