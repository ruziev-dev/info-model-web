import { type } from "os";

export type TAntenna = {
  //на самом деле тут стринги, хз почему. Надо разобраться в парсинге в нативной части
  Edge: number;
  Id: number;
  Number: number;
};

export type TSettings = {
  DefaultThickness: number;
};
export type TEdge = {
  EndPoint: number;
  Id: number;
  StartPoint: number;
  Thickness: number;
};
export type TEquipment = {
  Antennas: Array<TAntenna>;
  EquipmentCategory: string;
  Id: string;
  Name: string;
  Node: string;
  ObjectId: string;
};
export type TExcavation = {
  CaptionText: string;
  Edges: Array<number>;
  Id: number;
  ObjectId: number;
};

export type THorizon = {
  Id: number;
  Name: string;
  ObjectId: number;
  Visible: boolean;
  Active: boolean;
  Altitude: number;
  Backgrounds: object;
  Edges: Array<number>;
};
export type TNode = {
  Id: number;
  X: number;
  Y: number;
  Z: number;
};
export type TZone = {
  CaptionText: string;
  Edges: Array<number>;
  Id: number;
  ObjectId: number;
  Parent: number;
};

export type TMetaData = {
  externalID: number;
  lastChangeDate: string;
  mineID: number;
  name: string;
  version: number;
};


//возможно он вообще не нужен
export type TGraphState = {
  BackgroundImages: object;
  DefaultSettings: TSettings;
  Edges: Array<TEdge>;
  Equipment: Array<TEquipment>;
  Excavations: Array<TExcavation>;
  Horizons: Array<THorizon>;
  Nodes: Array<TNode>;
  Zones: Array<TZone>;
};
