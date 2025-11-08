import * as THREE from "three";

export function createSpotLight(opts = {}) {
  const {
    color = 0xffffff,
    intensity = 100,
    angle = 0.8,
    position = [0, 10.5, 0.5],
    penumbra = 0.1,
    visible = true,
    mapSize = 1024,
    bias = -0.0001,
    near = 0.1,
    far = 100,
    focus = 1,
  } = opts;

  const light = new THREE.SpotLight(color);
  light.intensity = intensity;
  light.castShadow = true;
  light.shadow.camera.near = near;
  light.shadow.camera.far = far;
  light.shadow.focus = focus;
  light.angle = angle;
  light.position.set(...position);
  light.shadow.mapSize.width = mapSize;
  light.shadow.mapSize.height = mapSize;
  light.shadow.bias = bias;
  light.penumbra = penumbra;
  light.visible = visible;
  return light;
}

export const setupLights = (scene) => {
  // Main light
  const mainLight = createSpotLight({
    position: [0, 10.5, 0.5],
    angle: 0.8,
    penumbra: 0.1,
    visible: true,
  });
  scene.add(mainLight);

  // Books light
  const bookLight = createSpotLight({
    position: [9, 5, 7],
    angle: 0.8,
    penumbra: 1,
    visible: false,
  });
  scene.add(bookLight);
  const bookPos = new THREE.Object3D();
  bookPos.position.set(10, 5, 0);
  scene.add(bookPos);
  bookLight.target = bookPos;
  scene.add(bookLight);

  // Board light
  const boardLight = createSpotLight({
    position: [-5, 5, 0],
    angle: 0.5,
    penumbra: 1,
    visible: false,
  });
  scene.add(boardLight);
  const boardPos = new THREE.Object3D();
  boardPos.position.set(-13.2, 6.8, 5.6);
  scene.add(boardPos);
  boardLight.target = boardPos;
  scene.add(boardLight);

  //Fog and Ambient Light
  const fog = new THREE.Fog(0x000000, 1, 33);
  scene.fog = fog;
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambientLight);

  return { mainLight, bookLight, boardLight, bookPos, boardPos };
};
