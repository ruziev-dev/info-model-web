import React, { useEffect, useState } from "react";
//import { useIndexedDB } from "react-indexed-db";
import { TreeNodeInfo, Tree, Button } from "@blueprintjs/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { graph } from "../../indexedDB/DbConfig";
import { THorizon } from "../../types/graph";
import styles from "./navigator.module.css";
import { Header } from "./Header";
import { buildHorizon, getHorizons } from "../../store/graphThunks";

function Navigator() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getHorizons());
  }, []);
  const { metaData, horizons } = useAppSelector((state) => state.graph);

  const onItemClick = (node: TreeNodeInfo) => {
    console.log(node)
    const choosedHorizon = horizons?.find((item) => item.Id === node.id);
    console.log(choosedHorizon)

    choosedHorizon && dispatch(buildHorizon(choosedHorizon));
  };
  return (
    <div className={styles.navigator}>
      <Header
        text={metaData?.name || "Загрузка... "}
        //loading={isLoading}
        icon="mountain"
      />

      <div className={styles.itemsContainer}>
        <Tree
          contents={
            horizons?.map((horizon) => ({
              id: horizon.Id,
              label: horizon.Name,
            })) || []
          }
          onNodeClick={onItemClick}
          onNodeExpand={onItemClick}
        />
      </div>
    </div>
  );
}
export default Navigator;
