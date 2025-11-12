// CameraController.jsx
import * as THREE from "three";
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useThree, useFrame } from "@react-three/fiber";
import cameraOrientationState from "./utils/camera_controls/cameraOrientationState.js";
import {
  handleCameraRotation,
  handleMouseMovement,
} from "./utils/camera_controls/camerawithMouse.js";
import { navigateToPreset } from "./utils/camera_controls/camera.js";

const CameraController = forwardRef(function CameraController(
  { mainLightRef, bookLightRef, boardLightRef },
  ref
) {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const zoomed = useRef(false);
  const cameraState = useRef(null);
  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      console.log("Resetting camera to DEFAULT preset");
      navigateToPreset(camera, "DEFAULT", 1);
      zoomed.current = false;

      // restore light visibilities (tweak to your defaults)
      if (mainLightRef?.current) mainLightRef.current.visible = true;
      if (bookLightRef?.current) bookLightRef.current.visible = false;
      if (boardLightRef?.current) boardLightRef.current.visible = false;
    },
    isZoomed: () => zoomed.current,
  }));

  useEffect(() => {
    cameraState.current = new cameraOrientationState();

    const onMouseMove = (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      const nx = (event.clientX / rect.width) * 2 - 1;
      const ny = -(event.clientY / rect.height) * 2 + 1;
      mouse.current.x = nx;
      mouse.current.y = ny;

      if (cameraState.current) handleMouseMovement(nx, ny, cameraState.current);

      // light gating only when not zoomed
      if (!zoomed.current) {
        if (nx > 0.3) {
          if (bookLightRef?.current) bookLightRef.current.visible = true;
          if (boardLightRef?.current) boardLightRef.current.visible = false;
          if (mainLightRef?.current) mainLightRef.current.visible = false;
        } else if (nx < -0.5) {
          if (bookLightRef?.current) bookLightRef.current.visible = false;
          if (boardLightRef?.current) boardLightRef.current.visible = true;
          if (mainLightRef?.current) mainLightRef.current.visible = false;
        } else {
          if (mainLightRef?.current) mainLightRef.current.visible = true;
          if (bookLightRef?.current) bookLightRef.current.visible = false;
          if (boardLightRef?.current) boardLightRef.current.visible = false;
        }
      }
    };

    const onClick = () => {
      if (zoomed.current) return;
      const nx = mouse.current.x;
      if (nx > 0.3) navigateToPreset(camera, "BOOKS", 1);
      else if (nx < -0.5) navigateToPreset(camera, "BOARD", 1);
      else navigateToPreset(camera, "SCREEN", 1);
      zoomed.current = true;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, [gl.domElement, mainLightRef, bookLightRef, boardLightRef, camera]);

  useFrame(() => {
    if (!zoomed.current && cameraState.current) {
      handleCameraRotation(camera, cameraState.current);
    }
  });

  return null;
});

export default CameraController;
