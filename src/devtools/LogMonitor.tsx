import { Card, Elevation } from "@blueprintjs/core";
import { useState } from "react";
import { Colors } from "@blueprintjs/core";

//эти объекты используются нативным приложение для отправки данных в WebView
declare global {
  interface Window {
    log: (data: string) => void;
  }
}

type logInfo = {
  time: Date;
  data: string;
};

//эта функция используется только если это RNWebView, поэтому console.log подменяется на LogMonitor
export const LogMonitor = () => {
  const [log, setLog] = useState<Array<logInfo>>([]);
  window.log = (data: string) => {
    setLog([...log, { time: new Date(Date.now()), data }]);
  };
  console.log = window.log;
  return (
    <Card
      elevation={Elevation.THREE}
      style={{ width: 500, margin: 10, height: 200 }}
    >
      <h6 className="bp3-heading">Log Monitor</h6>
      <div style={{ height: 140, overflowY: "scroll" }}>
        {[...log].reverse().map((item) => (
          <div
            key={item.time.getTime()}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <p style={{ color: Colors.GOLD1 }}>
              {item.time.toLocaleTimeString()}
              {"#  "}
            </p>

            <p>{JSON.stringify(item.data)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
