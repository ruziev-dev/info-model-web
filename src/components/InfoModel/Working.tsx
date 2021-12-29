import { useRef, useState } from "react";
import * as THREE from "three";
import { Billboard, Html } from "@react-three/drei";

type TWorkingProps = {
  meshProps?: JSX.IntrinsicElements["mesh"];
  points: Array<Array<number>>;
  color?: string;
};
export function Working({ meshProps, points, color }: TWorkingProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const tube = useRef<THREE.Curve<any>>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  let vectorArray = [];
  for (let i = 0; i < points.length; i++) {
    const x = points[i][0];
    const y = 0;
    const z = points[i][1];
    vectorArray[i] = new THREE.Vector3(x, y, z);
  }
  const path = new THREE.CatmullRomCurve3(vectorArray);

  return (
    <mesh
      {...meshProps}
      ref={mesh}
      scale={active ? 0.5 : 0.5}
      onClick={(event) => {
        setActive(!active);
        window.ReactNativeWebView?.postMessage(JSON.stringify(path));
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <Billboard position={path.getPointAt(0.5).setComponent(1, 1.5)}>
        <Html className="html-container">
          <p className="working-header">Выработка</p>
        </Html>
      </Billboard>
      <tubeGeometry ref={tube} args={[path, , , ,true]} />
      <meshStandardMaterial color={active ? color || "#818cab" : "green"} />
    </mesh>
  );
}
