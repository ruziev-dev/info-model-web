export const graph = {
  dbName: "GRAPH",
  DefaultSettings: "DefaultSettings",
  MetaInfo: "MetaInfo",
  tables: {
    Edges: "Edges",
    Equipment: "Equipment",
    Excavations: "Excavations",
    Horizons: "Horizons",
    Nodes: "Nodes",
  },
};

export const DBConfig = {
  name: graph.dbName,
  version: 1,
  objectStoresMeta: [
    {
      store: graph.tables.Edges,
      storeConfig: { keyPath: "Id", autoIncrement: false },
      storeSchema: [
        { name: "EndPoint", keypath: "EndPoint", options: { unique: false } },
        {
          name: "StartPoint",
          keypath: "StartPoint",
          options: { unique: false },
        },
        { name: "Thickness", keypath: "Thickness", options: { unique: false } },
      ],
    },
    /* сделать Equipment
    {},
  
    {
      store: graph.tables.Excavations,
      storeConfig: { keyPath: "Id", autoIncrement: false },
      storeSchema: [
        { name: "Edges", keypath: "Edges", options: { unique: false } },
        {
          name: "CaptionText",
          keypath: "CaptionText",
          options: { unique: false },
        },
        { name: "ObjectId", keypath: "ObjectId" },
      ],
    }, */
  ],
};
