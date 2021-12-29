import { createAsyncThunk } from "@reduxjs/toolkit";
import { graph } from "../indexedDB/DbConfig";
import {
  TEdge,
  TEquipment,
  TExcavation,
  THorizon,
  TNode,
} from "../types/graph";

export const putDataToIndexedDB = createAsyncThunk(
  "app/putDataToIndexedDB",
  () => {
    //TODO: решить где хранить MetaInfo
    localStorage.setItem(graph.DefaultSettings, window.DefaultSettings);
    localStorage.setItem(graph.MetaInfo, window.MetaInfo);

    let openRequest = indexedDB.open(graph.dbName, 1);

    openRequest.onupgradeneeded = () => {
      console.log("Сработала ф-ция openRequest.onupgradeneeded");

      let db = openRequest.result;
      db.createObjectStore(graph.tables.Edges, { keyPath: "Id" });
      db.createObjectStore(graph.tables.Equipment, { keyPath: "Id" });
      db.createObjectStore(graph.tables.Excavations, { keyPath: "Id" });
      db.createObjectStore(graph.tables.Horizons, { keyPath: "Id" });
      db.createObjectStore(graph.tables.Nodes, { keyPath: "Id" });
      console.log("Таблицы были созданы");
    };

    openRequest.onerror = () => {
      console.log("openRequest.onerror " + openRequest.error);
    };

    openRequest.onsuccess = () => {
      console.log("openRequest.onsuccess");
      let db = openRequest.result;

      console.log("openRequest.onsuccess создали все таблицы");

      let transaction = db.transaction(graph.tables.Edges, "readwrite");
      let edges = transaction.objectStore(graph.tables.Edges);
      try {
        const edgesData: Array<TEdge> = JSON.parse(window.Edges);
        edgesData.forEach((edge) => edges.add(edge));

        console.log("положили Edges в indexedDb");
      } catch (e) {
        console.log("Edges", e);
      }
      try {
        transaction = db.transaction(graph.tables.Equipment, "readwrite");
        let equipment = transaction.objectStore(graph.tables.Equipment);
        const equipmentData: Array<TEquipment> = JSON.parse(window.Equipment);
        equipmentData.forEach((equip) => equipment.add(equip));
        console.log("положили Equipment в indexedDb");
      } catch (e) {
        console.log("Equipment " + e);
      }

      try {
        transaction = db.transaction(graph.tables.Excavations, "readwrite");
        let excavations = transaction.objectStore(graph.tables.Excavations);
        const excavationsData: Array<TExcavation> = JSON.parse(
          window.Excavations
        );
        excavationsData.forEach((excavation) => excavations.add(excavation));
        console.log("положили Excavations в indexedDb");
      } catch (e) {
        console.log("Excavations " + e);
      }

      try {
        transaction = db.transaction(graph.tables.Horizons, "readwrite");
        let horizons = transaction.objectStore(graph.tables.Horizons);
        const horizonsData: Array<THorizon> = JSON.parse(window.Horizons);
        horizonsData.forEach((horizon) => horizons.add(horizon));
        console.log("положили Horizons в indexedDb");
      } catch (e) {
        console.log("Horizons " + e);
      }

      try {
        transaction = db.transaction(graph.tables.Nodes, "readwrite");
        let nodes = transaction.objectStore(graph.tables.Nodes);
        const nodesData: Array<TNode> = JSON.parse(window.Nodes);
        nodesData.forEach((node) => nodes.add(node));
        console.log("положили Nodes в indexedDb");
      } catch (e) {
        console.log("Nodes " + e);
      }
    };
  }
);
export const buildGraph = createAsyncThunk(
  "app/buildGraph",
  async (args, thunkApi) => {
    try {
      
    } catch (e) {
      thunkApi.rejectWithValue("Какая-то ошибка: " + e);
    }
  }
);
