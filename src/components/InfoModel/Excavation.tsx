import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Billboard, Html } from "@react-three/drei";
import { TEdge, TNode } from "../../types/graph";
import { useIndexedDB } from "react-indexed-db";
import { graph } from "../../indexedDB/DbConfig";

type TWorkingProps = {
  edge: TEdge;
  meshProps?: JSX.IntrinsicElements["mesh"];
  color?: string;
};

export function Excavation({ meshProps, edge, color }: TWorkingProps) {
  const [startPoint, setStartPoint] = useState<THREE.Vector3>();
  const [endPoint, setEndPoint] = useState<THREE.Vector3>();
  const nodes = useIndexedDB(graph.tables.Nodes);

  useEffect(() => {
    nodes.getByID(edge.StartPoint).then((node: TNode) => {
      node && setStartPoint(new THREE.Vector3(node.X, node.Z, node.Y));
    });
    nodes.getByID(edge.EndPoint).then((node: TNode) => {
      node && setEndPoint(new THREE.Vector3(node.X, node.Z, node.Y));
    });
  }, []);

  const mesh = useRef<THREE.Mesh>(null!);
  const tube = useRef<THREE.Curve<any>>(null!);
  const [active, setActive] = useState(false);

  const isReady = startPoint && endPoint;
  //TODO: переделать создание объекта
  let path = new THREE.CatmullRomCurve3();
  if (isReady) {
    path = new THREE.CatmullRomCurve3([startPoint, endPoint]);
  }

  return (
    <mesh
      {...meshProps}
      ref={mesh}
      //scale={active ? 0.55 : 0.5}
      onClick={(event) => {
        setActive(!active);
        // window.ReactNativeWebView?.postMessage(JSON.stringify(path));
      }}
    >
      {/* <Billboard position={path.getPointAt(0.5).setComponent(1, 1.5)}>
        <Html className="html-container">
          <p className="working-header">Выработка</p>
        </Html>
      </Billboard> */}
      {isReady && <tubeGeometry ref={tube} args={[path,,,,true]} />}
      <meshStandardMaterial color={active ? color || "#818cab" : "green"} />
    </mesh>
  );
}
