import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { TreeNodeInfo, Tree, Button } from "@blueprintjs/core";
import { useAppSelector } from "../../store/hooks";
import { graph } from "../../indexedDB/DbConfig";
import { THorizon } from "../../types/graph";
import styles from './navigator.module.css'
import { Header } from "./Header";

function Navigator() {
  const { metaData } = useAppSelector((state) => state.graph);
  const db = useIndexedDB(graph.tables.Horizons);
  const [horisons, setHorizons] = useState<Array<TreeNodeInfo>>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    db.getAll().then((res: Array<THorizon>) => {
      const newItems = res.map((horizon) => ({
        id: horizon.Id,
        hasCaret: true,
        label: horizon.Name,
        childNodes: [
          {
            id: 123,
            label: "Тест 1",
          },
          {
            id: 1231,
            label: "Тест 2",
          },
        ],
      }));
      setHorizons(newItems);
      setLoading(false);
    });
  }, []);

  const onItemClick = (node: TreeNodeInfo) => {
    const newHorizons = horisons.map((horizon) => ({
      ...horizon,
      isExpanded:
        node.id === horizon.id ? !horizon.isExpanded : horizon.isExpanded,
    }));
    setHorizons(newHorizons);
  };
  return (
    <div className={styles.navigator}>

      <Header
        text={metaData?.name || "Загрузка... "}
        loading={isLoading}
        icon="mountain"
      />

      <div className={styles.itemsContainer}>
        <Tree
          contents={horisons}
          onNodeClick={onItemClick}
          onNodeExpand={onItemClick}
        />
        </div>
      </div>
  );
}
export default Navigator;
