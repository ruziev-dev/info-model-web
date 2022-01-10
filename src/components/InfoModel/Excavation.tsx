import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Billboard, Html, useCamera } from "@react-three/drei";
import { TEdge, TNode } from "../../types/graph";
//import { useIndexedDB } from "react-indexed-db";
import { graph } from "../../indexedDB/DbConfig";
import { TTube } from "../../store/graphReducer";
import { useAppDispatch } from "../../store/hooks";
import { setErrorMessage } from "../../store/appReducer";

type TWorkingProps = {
  tube: TTube;
  meshProps?: JSX.IntrinsicElements["mesh"];
  color?: string;
};

export function Excavation({ meshProps, tube, color }: TWorkingProps) {
  const isDataEnought = tube.endPoint && tube.endPoint;
  const [active, setActive] = useState(false);

  if (!isDataEnought) return null;
  
    const startPoint = new THREE.Vector3(
      tube.startPoint?.X,
      tube.startPoint?.Y,
      tube.startPoint?.Z
    );
    const endPoint = new THREE.Vector3(
      tube.endPoint?.X,
      tube.endPoint?.Y,
      tube.endPoint?.Z
    );
    let path = new THREE.CatmullRomCurve3([startPoint, endPoint]);

  return (
    <mesh
      {...meshProps}
      //scale={active ? 0.55 : 0.5}
      onClick={(event) => {
        setActive(!active);
        console.log(tube);
        // window.ReactNativeWebView?.postMessage(JSON.stringify(path));
      }}
    >
      {/* <Billboard position={path.getPointAt(0.5).setComponent(1, 1.5)}>
        <Html className="html-container">
          <p className="working-header">Выработка</p>
        </Html>
      </Billboard> */}
      <tubeGeometry args={[path, , , , true]} />
      <meshStandardMaterial color={active ? color || "#818cab" : "green"} />
    </mesh>
  );
}
