import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html, useGLTF, useProgress } from "@react-three/drei";
import CameraController from "./CameraController.jsx";
import PCPage from "./PCPage.jsx";
import Notes from "./component/note.jsx";

function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/scene.glb");
  const CameraControllerRef = props.cameraControllerRef;
  const isEnabled = props.zoomed;

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
        onClick={isEnabled ? () => window.open("/CV.pdf", "_blank") : undefined}
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
function LoadingOverlay() {
  const { progress } = useProgress();
  const p = Math.max(1, Math.floor(progress));
  return (
    <Html fullscreen style={{ pointerEvents: "none" }}>
      <div className="absolute items-center left-1/2 -translate-x-1/2 top-0 -translate-y-[200px] bg-black/60 text-white mb-100">
        <div className="w-[520px] max-w-[92vw] rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/10">
          <h1 className="text-2xl font-bold">Loading…</h1>
          <div className="mt-4 h-2 w-full rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-white/80 transition-all duration-200"
              style={{ width: `${p}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-white/70">{p}%</div>
        </div>
      </div>
    </Html>
  );
}

function IntroOverlay({ onEnter }) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white">
      <div className="w-[680px] max-w-[92vw] rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-bold">Best on desktop</h1>

        <p className="mt-3 text-white/80">
          This site uses 3D/WebGL. For the smoothest experience, use{" "}
          <span className="font-semibold">desktop</span> and enable{" "}
          <span className="font-semibold">Hardware Acceleration</span>.
        </p>

        <div className="mt-5 rounded-2xl bg-white/5 p-4 text-sm text-white/75 space-y-2">
          <div>
            <span className="font-semibold text-white/85">Chrome / Edge:</span>{" "}
            Settings → System → “Use hardware acceleration when available”
          </div>
          <div>
            <span className="font-semibold text-white/85">Firefox:</span>{" "}
            Settings → General → Performance → enable hardware acceleration
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onEnter}
            className="rounded-2xl px-6 py-3 font-semibold bg-white text-black hover:bg-white/90 transition"
          >
            Enter site
          </button>

          <button
            onClick={() => window.open("/CV.pdf", "_blank")}
            className="rounded-2xl px-6 py-3 font-semibold border border-white/20 hover:bg-white/10 transition"
          >
            Open CV
          </button>
        </div>
      </div>
    </div>
  );
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
  const [entered, setEntered] = useState(false);

  return (
    <div className="h-screen w-screen">
      {!entered && <IntroOverlay onEnter={() => setEntered(true)} />}

      {entered && (
        <Canvas
          camera={{ rotation: [0, 0, 0], position: [0, 8.3, 15], fov: 45 }}
        >
          <Suspense fallback={<LoadingOverlay />}>
            <ambientLight intensity={0.35} />

            <group ref={boardPos} position={[-13.2, 6.8, 5.6]} />
            <group ref={bookPos} position={[10, 5, 0]} />
            <group ref={mainPos} position={[0, 0, 0]} />

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

            <LightTargetBinder lightRef={mainLightRef} targetRef={mainPos} />
            <LightTargetBinder lightRef={bookLightRef} targetRef={bookPos} />
            <LightTargetBinder lightRef={boardLightRef} targetRef={boardPos} />

            <fog attach="fog" args={[0x000000, 1, 33]} />
            <Model
              cameraControllerRef={CameraControllerRef}
              zoomed={isZoomed}
            />
            <CameraController
              ref={CameraControllerRef}
              mainLightRef={mainLightRef}
              bookLightRef={bookLightRef}
              boardLightRef={boardLightRef}
              onZoomChange={(isZoomed) => {
                setIsZoomed(isZoomed);
              }}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
