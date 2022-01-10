import { createAsyncThunk } from "@reduxjs/toolkit";

import DB, { graph } from "../indexedDB/DbConfig";
import { TEdge, THorizon, TNode } from "../types/graph";
import { TTube } from "./graphReducer";
import { RootState } from "./store";

export const putDataToIndexedDB = createAsyncThunk(
  "app/putDataToIndexedDB",
  async (args, thunkApi) => {
    try {
      /*  const oldVersionChangeDate = localStorage.getItem(
        JSON.parse(graph.MetaInfo)?.lastChangeDate
      );
      const newVersionChangeDate = JSON.parse(window.MetaInfo)?.lastChangeDate;
      if (oldVersionChangeDate === newVersionChangeDate) return; */

      //TODO: решить где хранить DefaultSettings
      localStorage.setItem(graph.DefaultSettings, window.DefaultSettings);
      localStorage.setItem(graph.MetaInfo, window.MetaInfo);

      const tables = Object.values(graph.indexedTables);

      const globalPromises = tables.map(
        async <EntityType>(tableName: string) => {
          const entityTable = DB.useModel<EntityType>(tableName);
          console.log(tableName);
          //!!! работает в том случае если поля объекта Window в которые пишутся данные совпадают с названиями таблицы
          //@ts-ignore TODO: переделать это говно
          const payload: Array<EntityType> = JSON.parse(window[tableName]);
          const promises = payload.map((payloadItem) =>
            entityTable.insert(payloadItem).catch((error: Error) => {
              //если ключ уже есть, то игнорируем ошибку об этом
              if (error.message.includes("Key already exists")) return;
              else throw error;
            })
          );
          //await Promise.all(promises);
          console.log(
            `[app/putDataToIndexedDB]: Положили ${tableName} в indexedDb`
          );

          return Promise.all(promises);
        }
      );

      await Promise.all(globalPromises);
      console.log(
        "[app/putDataToIndexedDB]: Все таблицы положены по своим местам"
      );
    } catch (e) {
      console.error(e)
      thunkApi.rejectWithValue(
        "Ошибка при попытке положить данные в IndexedDB" + JSON.stringify(e)
      );
    }
  }
);
export const buildHorizon = createAsyncThunk(
  "graph/buildGraph",
  async (horizon: THorizon, thunkApi) => {
    try {
      const edgesTable = DB.useModel<TEdge>(graph.indexedTables.Edges);
      const nodesTable = DB.useModel<TNode>(graph.indexedTables.Nodes);

      const edgesPromises = horizon.Edges.map((edge) =>
        //@ts-ignore
        edgesTable.selectByPk(JSON.parse(edge))
      );
      const allEdges = await Promise.all(edgesPromises);
      const tubesPromises = allEdges.map(async (edge) => {
        if (!edge) return;
        const startPoint = await nodesTable.selectByPk(edge?.StartPoint);
        const endPoint = await nodesTable.selectByPk(edge?.EndPoint);
        const tubeData: TTube = {
          edge,
          startPoint,
          endPoint,
        };
        return tubeData;
      });

      const graphThree = await Promise.all(tubesPromises);
      return graphThree.filter(
        (el) => el?.edge && el.endPoint && el.startPoint
      );
    } catch (e) {
      thunkApi.rejectWithValue("Какая-то ошибка: " + e);
    }
  }
);
export const getHorizons = createAsyncThunk(
  "graph/getHorizons",
  async (args, thunkApi) => {
    try {
      const horizonTable = DB.useModel<THorizon>(graph.indexedTables.Horizons);
      return await horizonTable.selectAll();
    } catch (e) {
      thunkApi.rejectWithValue("Какая-то ошибка: app/getHorizons -> " + e);
    }
  }
);
