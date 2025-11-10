export const handleMouseMovement = (mouseX, mouseY, cameraOrientationState) => {
  const now = performance.now();

  cameraOrientationState.lastMouseMoveTime = now;

  const rotationScaleX = 0.2;
  const rotationScaleY = 0.03;

  cameraOrientationState.pitchAngle = mouseY * rotationScaleY * Math.PI; //Remove negative if mouse rotation is inverted
  cameraOrientationState.yawAngle = -(mouseX * rotationScaleX) * Math.PI; //Remove negative if mouse rotation is inverted

  cameraOrientationState.startingPitchAngleForCurrentCoordinates =
    cameraOrientationState.previousPitchAngle;
  cameraOrientationState.startingYawAngleForCurrentCoordinates =
    cameraOrientationState.previousYawAngle;
};

export const handleCameraRotation = (camera, cameraOrientationState) => {
  const now = performance.now();

  const timeElapsed = now - cameraOrientationState.lastMouseMoveTime;

  if (timeElapsed < cameraOrientationState.movementDuration) {
    const timeLeftPercentage =
      timeElapsed / cameraOrientationState.movementDuration;
    const minimumDegreeOfChange = 0.2;

    // Calculate the interpolation factor based on the time elapsed since the last mouse movement
    let interpolationFactor = Math.max(
      timeLeftPercentage,
      minimumDegreeOfChange
    );

    // Linearly interpolate the pitch and yaw angles
    const interpolatedPitchAngle =
      (1 - interpolationFactor) *
        cameraOrientationState.startingPitchAngleForCurrentCoordinates +
      interpolationFactor * cameraOrientationState.pitchAngle; //The max value for t will be one, since the time elapsed is the amount of time since the last update. And t will never be more than 1. It goes from 0 to 1 sort of like 0% of elapsed time cycle to 100%
    const interpolatedYawAngle =
      (1 - interpolationFactor) *
        cameraOrientationState.startingYawAngleForCurrentCoordinates +
      interpolationFactor * cameraOrientationState.yawAngle;

    camera.rotation.x = interpolatedPitchAngle - 0.15;
    camera.rotation.y = interpolatedYawAngle;

    // update the previous pitch and yaw angles
    cameraOrientationState.previousPitchAngle = interpolatedPitchAngle;
    cameraOrientationState.previousYawAngle = interpolatedYawAngle;
  }
};
