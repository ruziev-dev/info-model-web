import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { TreeNodeInfo, Tree, Button, IconName, Icon } from "@blueprintjs/core";
import { useAppSelector } from "../../store/hooks";
import { graph } from "../../indexedDB/DbConfig";
import { THorizon } from "../../types/graph";
import styles from "./navigator.module.css";

type THeader = { text: string; loading?: boolean; icon?: IconName };

export const Header: React.FC<THeader> = ({ text, loading, icon }) => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <Icon icon={icon} size={30} />
        <span className={styles.textContainer}>
          <h5 className="bp3-heading">{text}</h5>
        </span>
      </div>
    </div>
  );
};
