import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#222222");

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

  return scene;
};
