import { AnchorButton, Button, Card, Elevation } from "@blueprintjs/core";
import { useCallback, useState } from "react";
import {
  Edges,
  Equipment,
  Excavations,
  graphMetaInfo,
  Horizons,
  Nodes,
  Zones,
} from "./testData";

//эти объекты используются нативным приложение для отправки данных в WebView


enum Theme {
  DARK = "dark",
  LIGHT = "light",
}
export const TestDataInjector = () => {
  const setData = () => {
    window.Edges = Edges;
    window.Equipment = Equipment;
    window.Excavations = Excavations;
    window.Horizons = Horizons;
    window.Nodes = Nodes;
    window.Zones = Zones;
    //window.MetaInfo = MetaInfo;
  };

  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const onThemeChange = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    window.dispatch({ type: "app/changeTheme", payload: newTheme });
    setTheme(newTheme);
  };
  return (
    <Card
      elevation={Elevation.THREE}
      style={{
        margin: 10,
        height: 200,
        width: "50vw",
      }}
    >
      <h6 className="bp3-heading">
        Имитация действий RN приложения через WebView
      </h6>
      <div
        style={{
          height: 140,
          overflowY: "scroll",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          margin: 10,
          padding: 5,
        }}
      >
        <AnchorButton
          onClick={() => window.dispatch({type:"graph/setMetaInfo", payload:JSON.parse(graphMetaInfo) })}
          icon="exchange"
        >
          Засетать метадату
        </AnchorButton>
        <AnchorButton onClick={onThemeChange} icon="exchange">
          Cменить тему
        </AnchorButton>
        <Button onClick={setData} icon="download">
          1. Засетать все данные
        </Button>

        <Button
          onClick={() => {
            window.dispatch({ type: "app/stopRNLoading" });
          }}
          icon="follower"
        >
          2. Отдать управление приложению
        </Button>
      </div>
    </Card>
  );
};
