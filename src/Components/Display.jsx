import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, PresentationControls, Backdrop, Billboard, Text } from "@react-three/drei";
export default function Display(props) {

  const FallbackModel = () => 
    <Billboard>
      <Text follow={true} color={"black"}>Loading</Text>
    </Billboard>;
  
  function Model() {
    const object = useGLTF(props.source);
    object.materials[""].color = new THREE.Color(props.color);
    object.materials[""].metalness = 0.5;
    if(object.scene.children[0]){
      object.scene.children.forEach((obj)=>{obj.castShadow = true});
    }
    
    return <primitive object={object.scene} position={[0, 0, 0]} receiveShadow castShadow />;
  }
  return (
    <Canvas dpr={window.devicePixelRatio} shadows>
      <Suspense fallback={<FallbackModel />}>
        <OrbitControls
          maxDistance={10}
          minDistance={1}
          target={[0, 0, 0]}
          enablePan={false}
          enableRotate={false}
          enableZoom={true}
          zoomSpeed={0.5}
        />
        <PresentationControls
          enabled={true}
          cursor={true}
          global={true}
          config={{ mass: 1, tension: 100, friction: 26 }}
        >
          <Model />
        </PresentationControls>
      </Suspense>
      <Backdrop
        scale={[50, 30, 20]}
        position={[0, -5, -0]}
        floor={10000}
        segments={200}
        receiveShadow={true}
      >
        <meshPhysicalMaterial roughness={1} color="hsl(0, 0%, 90%)" />
      </Backdrop>
      <ambientLight intensity={0.75} color="hsl(0, 0%, 100%)" />
      <spotLight position={[-5, 10, 5]} intensity={300} castShadow />
      <spotLight position={[5, 10, 5]} intensity={300} castShadow />
    </Canvas>
  );
}
