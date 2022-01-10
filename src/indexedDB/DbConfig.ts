import { Database } from "@n1md7/indexeddb-promise";
import { TableType } from "@n1md7/indexeddb-promise/lib/types";

export const graph = {
  dbName: "GRAPH",
  DefaultSettings: "DefaultSettings",
  MetaInfo: "MetaInfo",
  indexedTables: {
    Edges: "Edges",
    Equipment: "Equipment",
    Excavations: "Excavations",
    Horizons: "Horizons",
    Nodes: "Nodes",
    Zones: "Zones",
  },
};

//поскольку все таблицы  имеют одинаковый формат: primaryKey Id, то конфиг строим одной функцией
const callback = (tableName: string): TableType => ({
  name: tableName,
  primaryKey: {
    name: "Id",
    autoIncrement: false,
    unique: true,
  },
  indexes: {
    Id: { unique: true, multiEntry: true },
  },
});

const indexedTablesConfig = Object.values(graph.indexedTables).map(callback);

export default new Database({
  version: 1,
  name: graph.dbName,
  tables: indexedTablesConfig,
});
