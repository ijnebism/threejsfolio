import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const TargetedSpotlight = (props) => {
  const light = useRef();
  useFrame(() => {
    if (props) {
      light.current.target = props.object;
      light.current.target.updateMatrixWorld();
      light.current.updateMatrixWorld();
    }
  });

  return <spotLight ref={light} {...props} />;
};

export default TargetedSpotlight;
