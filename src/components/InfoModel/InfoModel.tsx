import { H5, NonIdealState } from "@blueprintjs/core";
import {
  Center,
  CubeCamera,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  Html,
  MapControls,
  OrbitControls,
  Stats,
  useProgress,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { useAppSelector } from "../../store/hooks";
import { Excavation } from "./Excavation";
import { Working } from "./Working";

const InfoModel = () => {
  const { progress } = useProgress();

  const { errorMessage, three } = useAppSelector((state) => state.graph);
  if (errorMessage)
    return (
      <NonIdealState
        icon="heart-broken"
        title="Ошибка построения информационной модели"
        description={errorMessage}
      />
    );

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 100],  up: [0, 0, 1],  far: 10000 }}
    >
      <ambientLight />
      <pointLight intensity={4} distance={1} position={[18435, 29200, 100]} />

      {/*       <OrbitControls enableZoom enableDamping enablePan/>*/}
      <MapControls  enableRotate={false} /* enablePan */ />

      {/*   <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
         <GizmoViewport /> 
         <GizmoViewcube />  
      </GizmoHelper> */}
      <Center position={[18435, 29200, 235]} alignTop>
        <CubeCamera>
          {(texture) => (
            <mesh>
              {three ? (
                three.map((tube) => (
                  <Excavation key={tube.edge.Id} tube={tube} />
                ))
              ) : (
                <Html
                  style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <H5>Выберите горизонт для отображения</H5>
                </Html>
              )}
                    {/* process.env.NODE_ENV && <Stats /> */}

            </mesh>
          )}
        </CubeCamera>

        <mesh>
          {/* {three ? (
            three.map((tube) => <Excavation key={tube.edge.Id} tube={tube} />)
          ) : (
            <Html
              position={[0, 0, 0]}
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Выберите горизонт для отображения
            </Html>
          )} */}
          {/*  <Working
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
          /> */}
        </mesh>
      </Center>
    </Canvas>
  );
};

export default InfoModel;
