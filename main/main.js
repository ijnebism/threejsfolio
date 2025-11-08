import * as THREE from "three";
import "./styles/styles.css";
import { Reflector } from "three/addons/objects/Reflector.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import cameraOrientationState from "./utils/camera_controls/cameraOrientationState.js";
import {
  handleCameraRotation,
  handleMouseMovement,
} from "./utils/camera_controls/camerawithMouse.js";
import gsap from "gsap";
import { setupLights } from "./scene/lights.js";
import { createScene } from "./scene/scene.js";

//Scene
const scene = createScene();
let zoomed = false;

//Model
const loader = new GLTFLoader();
loader.load("/assets/scene.glb", (gltf) => {
  const model = gltf.scene;

  scene.add(model);
  model.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
});

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Light
const { mainLight, bookLight, boardLight } = setupLights(scene);

//Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 8.3, 15);
scene.add(camera);

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
      gsap.to(camera.position, {
        x: 10.17,
        y: 9.0,
        z: 4,
        duration: 1.5,
      });
      gsap.to(camera.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
      });
    } else if (mouse.x < -0.5) {
      gsap.to(camera.position, {
        x: -8,
        y: 6.89,
        z: 5.583,
        duration: 1.5,
      });
      gsap.to(camera.rotation, {
        x: 0,
        y: 3.14 / 2,
        z: 0,
        duration: 1.5,
      });
    } else {
      gsap.to(camera.position, {
        x: 0,
        y: 6.312,
        z: 3.118,
        duration: 1.5,
      });
      gsap.to(camera.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
      });
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
