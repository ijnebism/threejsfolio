import * as THREE from "three";
import "./styles/styles.css";
import cameraOrientationState from "./utils/camera_controls/cameraOrientationState.js";
import {
  handleCameraRotation,
  handleMouseMovement,
} from "./utils/camera_controls/camerawithMouse.js";
import gsap from "gsap";
import { setupLights } from "./scene/lights.js";
import { createScene } from "./scene/scene.js";
import { navigateToPreset, setupCamera } from "./scene/camera.js";

//Scene
const scene = createScene();
let zoomed = false;

//Light
const { mainLight, bookLight, boardLight } = setupLights(scene);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Camera
const camera = setupCamera(scene, sizes);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, camera);

//Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

//Camera orientation state
const cameraState = new cameraOrientationState();

//Mouse
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  if (zoomed === false) {
    if (mouse.x > 0.3) {
      bookLight.visible = true;
      boardLight.visible = false;
      mainLight.visible = false;
    } else if (mouse.x < -0.5) {
      bookLight.visible = false;
      boardLight.visible = true;
      mainLight.visible = false;
    } else {
      mainLight.visible = true;
      bookLight.visible = false;
      boardLight.visible = false;
    }
  }

  handleMouseMovement(mouse.x, mouse.y, cameraState);
}

function zoomIn(event) {
  if (zoomed === false) {
    if (mouse.x > 0.3) {
      navigateToPreset(camera, "BOOKS", 1);
    } else if (mouse.x < -0.5) {
      navigateToPreset(camera, "BOARD", 1);
    } else {
      navigateToPreset(camera, "SCREEN", 1);
    }
    zoomed = true;
  }
}

if (zoomed === false) {
  window.addEventListener("click", zoomIn);
}

window.addEventListener("mousemove", onMouseMove);

const loop = () => {
  if (zoomed === false) {
    handleMouseMovement(mouse.x, mouse.y, cameraState);
    handleCameraRotation(camera, cameraState);
  }

  window.requestAnimationFrame(loop);
  renderer.render(scene, camera);
};
loop();
