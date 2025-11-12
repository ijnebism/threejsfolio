import { createContext, useContext } from "react";
export const CameraControllerContext = createContext({ resetCamera: () => {} });
export const useCameraControl = () => useContext(CameraControllerContext);
