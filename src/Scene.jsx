import { useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Building, Human, Sculpture } from "./Model";
import { getRandom } from "./utils";

const Scene = () => {
  const [focus, onFocus] = useState(null);
  const [lerp, onLerp] = useState(false);
  const [light, setLight] = useState([0, 5, 0]);

  useEffect(() => {
    if (!focus) {
      onLerp(true);
      setTimeout(() => {
        onLerp(false);
      }, 3000);
    }
  }, [focus]);

  useFrame((state) => {
    if (!focus && lerp) {
      // console.log("lerping to normal");

      state.camera.lookAt(new THREE.Vector3(0, 0, 0));
      state.camera.position.lerp(new THREE.Vector3(-12, 12, 20), 0.01);
      state.camera.updateProjectionMatrix();
    }
    setLight([
      4 * Math.cos(state.clock.getElapsedTime() * 0.1),
      5,
      4 * Math.sin(state.clock.getElapsedTime() * 0.1),
    ]);
  });

  return (
    <>
      <Environment files="/assets/sunset.hdr" blur={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={light}
        intensity={0.8}
        shadow-mapSize={[5000, 5000]}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-20, 20, 20, -20, 1, 100]}
        />
      </directionalLight>
      <Sculpture
        focus={focus}
        onFocus={onFocus}
        model={1}
        pos={[0, 0, 5]}
        foc={[-10, 5, -5]}
        look={[0, 1.5, 0]}
        scale={0.6}
      />
      <Sculpture
        focus={focus}
        onFocus={onFocus}
        model={2}
        foc={[-15, 5, -8]}
        look={[0, 2.2, 0]}
        pos={[4, 0, -5]}
        scale={0.1}
      />
      <Sculpture
        focus={focus}
        onFocus={onFocus}
        model={3}
        foc={[-15, 5, -8]}
        look={[0, 2.2, 0]}
        pos={[-7, 0, 1]}
        scale={0.7}
      />

      {/* <Sculpture focus={focus} onFocus={onFocus} model={1} pos={[2, 0.5, 2]}>
        <mesh position={[2, 0.5, 2]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </Sculpture>
      <Sculpture focus={focus} onFocus={onFocus} model={2} pos={[-2, 0.5, -2]}>
        <mesh position={[-2, 0.5, -2]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </Sculpture> */}
      <mesh scale={100} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
      <Building name={"building1"} pos={[4, 0, 1]} scale={1} />
      <Building name={"building2"} pos={[4, 0, 3]} scale={0.6} />
      <Building name={"building3"} pos={[-2, 0, -1]} scale={0.6} />
      <Building name={"building4"} pos={[1, 0, -8]} scale={0.5} />
      <Building name={"building5"} pos={[-6, 0, -5]} scale={0.5} />
      <Building name={"building6"} pos={[-3, 0, -2]} scale={0.3} />
      <Building name={"building7"} pos={[-5, 0, 4]} scale={0.3} />

      <Building name={"sign"} pos={[5, 0, 4]} scale={0.15} />
      <Building name={"taxi"} pos={[2, 0, -4]} scale={0.2} />

      <Human
        index={1}
        pos={[0, 0, 0]}
        scale={0.5}
        interval={getRandom(10) * 1000 + 3000}
      />
      <Human
        index={2}
        pos={[2, 0, 2]}
        scale={0.5}
        interval={getRandom(10) * 1000 + 3000}
      />
      <Human
        index={3}
        pos={[-3, 0, 4]}
        scale={0.5}
        interval={getRandom(10) * 1000 + 3000}
      />
      <Human
        index={4}
        pos={[-2, 0, -3]}
        scale={0.5}
        interval={getRandom(10) * 1000 + 3000}
      />
      <Human
        index={5}
        pos={[2, 0, -5]}
        scale={0.5}
        interval={getRandom(10) * 1000 + 3000}
      />

      <OrbitControls enableRotate={false} enabled={!focus} makeDefault />
      <pointLight intensity={0.75} position={[5, 5, 5]} />
    </>
  );
};
export default Scene;
