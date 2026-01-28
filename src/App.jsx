import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import CameraController from "./CameraController.jsx";
import PCPage from "./PCPage.jsx";
import { useState } from "react";
import Notes from "./component/note.jsx";

function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/scene.glb");
  const CameraControllerRef = props.cameraControllerRef;
  const isEnabled = props.zoomed;

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Scene} />
      <mesh
        geometry={nodes["Screen"].geometry}
        position={[0, 6.4, -0.69]}
        visible={false}
      >
        <Html
          className="content"
          rotation-x={0}
          position={[0, 0, 0.1]}
          transform
          occlude
          distanceFactor={1}
          scale={1}
        >
          <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
            <PCPage cameraControllerRef={CameraControllerRef} />
          </div>
        </Html>
      </mesh>
      <mesh
        geometry={nodes["Back"].geometry}
        position={nodes["Back"].position}
        rotation={nodes["Back"].rotation}
        scale={nodes["Back"].scale}
        visible={false}
        onClick={
          isEnabled
            ? () => console.log(CameraControllerRef.current.resetCamera())
            : undefined
        }
        onPointerEnter={
          isEnabled ? () => (document.body.style.cursor = "pointer") : undefined
        }
        onPointerLeave={
          isEnabled ? () => (document.body.style.cursor = "auto") : undefined
        }
      ></mesh>
      <mesh
        geometry={nodes["Linkedin"].geometry}
        position={nodes["Linkedin"].position}
        rotation={nodes["Linkedin"].rotation}
        scale={nodes["Linkedin"].scale}
        visible={false}
        onClick={
          isEnabled
            ? () => window.open("https://www.linkedin.com/in/bjqian", "_blank")
            : undefined
        }
        onPointerEnter={
          isEnabled ? () => (document.body.style.cursor = "pointer") : undefined
        }
        onPointerLeave={
          isEnabled ? () => (document.body.style.cursor = "auto") : undefined
        }
      ></mesh>
      <mesh
        geometry={nodes["Git"].geometry}
        position={nodes["Git"].position}
        rotation={nodes["Git"].rotation}
        scale={nodes["Git"].scale}
        visible={false}
        onClick={
          isEnabled
            ? () => window.open("https://github.com/ijnebism", "_blank")
            : undefined
        }
        onPointerEnter={
          isEnabled ? () => (document.body.style.cursor = "pointer") : undefined
        }
        onPointerLeave={
          isEnabled ? () => (document.body.style.cursor = "auto") : undefined
        }
      />
      <mesh
        geometry={nodes["CV"].geometry}
        position={nodes["CV"].position}
        rotation={nodes["CV"].rotation}
        scale={nodes["CV"].scale}
        visible={false}
        onClick={
          isEnabled ? () => window.open("/public/CV.pdf", "_blank") : undefined
        }
        onPointerEnter={
          isEnabled ? () => (document.body.style.cursor = "pointer") : undefined
        }
        onPointerLeave={
          isEnabled ? () => (document.body.style.cursor = "auto") : undefined
        }
      ></mesh>
      <mesh
        geometry={nodes["Leet"].geometry}
        position={nodes["Leet"].position}
        rotation={nodes["Leet"].rotation}
        scale={nodes["Leet"].scale}
        visible={false}
        onClick={
          isEnabled
            ? () => window.open("https://leetcode.com/ijneb/", "_blank")
            : undefined
        }
        onPointerEnter={
          isEnabled ? () => (document.body.style.cursor = "pointer") : undefined
        }
        onPointerLeave={
          isEnabled ? () => (document.body.style.cursor = "auto") : undefined
        }
      ></mesh>
      <mesh
        geometry={nodes["Note"].geometry}
        position={nodes["Note"].position}
        rotation={nodes["Note"].rotation}
        scale={nodes["Note"].scale}
        visible={false}
      >
        <Html
          className="noteContent"
          position={[0.3, -0.05, 0.0]}
          transform
          rotation-y={90 * (Math.PI / 180)}
          distanceFactor={1}
          scale={1}
        >
          <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
            <Notes />
          </div>
        </Html>
      </mesh>
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

  const CameraControllerRef = useRef();

  const [isZoomed, setIsZoomed] = useState(false);

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
      <Model cameraControllerRef={CameraControllerRef} zoomed={isZoomed} />
      <CameraController
        ref={CameraControllerRef}
        mainLightRef={mainLightRef}
        bookLightRef={bookLightRef}
        boardLightRef={boardLightRef}
        onZoomChange={(isZoomed) => {
          setIsZoomed(isZoomed);
        }}
      />
    </Canvas>
  );
}
