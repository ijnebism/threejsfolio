import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import CameraController from "./CameraController.jsx";

function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/scene.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Scene} />
    </group>
  );
}

/** Binds each light's target once both refs exist (runs inside Canvas). */
function LightTargetBinder({ lightRef, targetRef }) {
  useEffect(() => {
    const l = lightRef.current;
    const t = targetRef.current;
    if (!l || !t) return;
    l.target = t;
    t.updateMatrixWorld();
    l.updateMatrixWorld();
  }, [lightRef, targetRef]);
  return null;
}

export default function App() {
  const mainLightRef = useRef();
  const bookLightRef = useRef();
  const boardLightRef = useRef();

  const boardPos = useRef();
  const mainPos = useRef();
  const bookPos = useRef();

  return (
    <Canvas camera={{ rotation: [0, 0, 0], position: [0, 8.3, 15], fov: 45 }}>
      <ambientLight intensity={0.35} />

      {/* Targets MUST be scene children */}
      <group ref={boardPos} position={[-13.2, 6.8, 5.6]} />
      <group ref={bookPos} position={[10, 5, 0]} />
      <group ref={mainPos} position={[0, 0, 0]} />

      {/* Lights (no `target` prop). Set visible=true temporarily to verify aim */}
      <spotLight
        ref={mainLightRef}
        position={[0, 10.5, 0.5]}
        angle={0.8}
        intensity={50}
        penumbra={1}
        castShadow
        visible
        onUpdate={(l) => {
          const t = mainPos.current;
          if (t) {
            l.target = t;
            t.updateMatrixWorld();
            l.updateMatrixWorld();
          }
        }}
      />
      <spotLight
        ref={bookLightRef}
        position={[9, 5, 7]}
        angle={0.8}
        intensity={50}
        penumbra={1}
        castShadow
        visible
        onUpdate={(l) => {
          const t = bookPos.current;
          if (t) {
            l.target = t;
            t.updateMatrixWorld();
            l.updateMatrixWorld();
          }
        }}
      />
      <spotLight
        ref={boardLightRef}
        position={[-5.2, 5, 0]}
        angle={0.5}
        intensity={50}
        penumbra={1}
        castShadow
        visible
        onUpdate={(l) => {
          const t = boardPos.current;
          if (t) {
            l.target = t;
            t.updateMatrixWorld();
            l.updateMatrixWorld();
          }
        }}
      />

      {/* One-time binders (pure React hook, safe inside Canvas) */}
      <LightTargetBinder lightRef={mainLightRef} targetRef={mainPos} />
      <LightTargetBinder lightRef={bookLightRef} targetRef={bookPos} />
      <LightTargetBinder lightRef={boardLightRef} targetRef={boardPos} />

      <fog attach="fog" args={[0x000000, 1, 33]} />
      <Model />
      <CameraController
        mainLightRef={mainLightRef}
        bookLightRef={bookLightRef}
        boardLightRef={boardLightRef}
      />
    </Canvas>
  );
}
