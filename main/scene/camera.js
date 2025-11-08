import * as THREE from "three";
import gsap from "gsap";

export const setupCamera = (scene, sizes) => {
  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(0, 8.3, 15);
  scene.add(camera);
  return camera;
};

export const CAMERA_PRESETS = {
  SCREEN: {
    position: { x: 0, y: 6.312, z: 3.118 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  BOOKS: {
    position: { x: 10.17, y: 9.0, z: 4 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  BOARD: {
    position: { x: -8, y: 6.89, z: 5.583 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
  },
};

export function navigateToPreset(camera, preset, duration = 1) {
  const targetPos = CAMERA_PRESETS[preset].position;
  const targetRot = CAMERA_PRESETS[preset].rotation;
  gsap.to(camera.position, {
    x: targetPos.x,
    y: targetPos.y,
    z: targetPos.z,
    duration: duration,
  });
  gsap.to(camera.rotation, {
    x: targetRot.x,
    y: targetRot.y,
    z: targetRot.z,
    duration: duration,
  });
}
