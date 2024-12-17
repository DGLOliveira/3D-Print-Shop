import React, { Suspense, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Sky } from "@react-three/drei";

export default function Display(props) {
  function Model() {
    const object = useGLTF(props.source);
    object.materials[""].color = new THREE.Color(props.color);
    object.materials[""].metalness = 0.5;
    return <primitive object={object.scene} position={[0, 0, 0]} receiveShadow />;
  }
  return (
    <Canvas dpr={window.devicePixelRatio}>
      <Suspense fallback={null}>
        <OrbitControls maxDistance={10} minDistance={1} enablePan={false} />
        <ambientLight intensity={1} color="hsl(0, 0%, 100%)" />
        <directionalLight position={[0, 10, 300]} intensity={2} />
        <spotLight position={[-10, 10, 10]} intensity={100} />
        <spotLight position={[10, 10, -10]} intensity={100} />
        <Model />
      </Suspense>
    </Canvas>
  );
}
