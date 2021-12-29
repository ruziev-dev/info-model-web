import { LogMonitor } from "./LogMonitor";
import { TestDataInjector } from "./TestDataSetter";

export const DevTool = () => {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0 }}>
      {window.ReactNativeWebView ? <LogMonitor /> : <TestDataInjector />}
    </div>
  );
};
