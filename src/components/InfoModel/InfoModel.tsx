import {
  Center,
  CubeCamera,
  GizmoHelper,
  GizmoViewcube,
  MapControls,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { graph } from "../../indexedDB/DbConfig";
import { TEdge, TNode } from "../../types/graph";
import { Excavation } from "./Excavation";
import { Working } from "./Working";

const InfoModel = () => {
  const [edges, setEdges] = useState<Array<TEdge>>([]);
  const db = useIndexedDB(graph.tables.Edges);
  useEffect(() => {
    db.getAll().then((edgesData) => setEdges(edgesData));
  }, []);
  return (
    <Canvas /* orthographic */ flat shadows >

      <ambientLight />
     {/*  <pointLight intensity={4} distance={1}  position={[18435, 29200, 100]}/> */}

      <OrbitControls /* enablePan={true} */ enableZoom={true} /* enableRotate={true}  *//>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewcube />
      </GizmoHelper>
      <Center position={[18435, 29200, 235]} alignTop>
      <CubeCamera >
      {(texture) => (
      <mesh>
        {edges.map((edge) => (
          <Excavation key={edge.Id} edge={edge}/>
        ))}
        </mesh>
      )}
      </CubeCamera>

        {/*<Working
          points={[
            [0, 2],
            [0, 30],
          ]}
        />
        <Working
          points={[
            [-19, 3],
            [-19, -27],
          ]}
        />
        <Working
          points={[
            [-13, 3],
            [-13, -27],
          ]}
        />
        <Working
          points={[
            [-25, 3],
            [-25, -27],
          ]}
        />
        <Working
          points={[
            [-8, 3],
            [-8, -27],
          ]}
        />
        <Working
          points={[
            [0, 2],
            [-40, 7],
            [-39, 15],
            [-37, 20],
            [-8, 25],
            [2, 25],
          ]}
        /> 
      </mesh>*/}


      </Center>
    </Canvas>
  );
};

export default InfoModel;

function Node(props: any) {
  return (
    <mesh {...props}>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial />
    </mesh>
  );
}
