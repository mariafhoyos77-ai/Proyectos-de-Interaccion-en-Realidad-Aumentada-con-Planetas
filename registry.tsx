import { createContext, useContext } from "react";
import * as THREE from "three";

export interface SceneRegistry {
  refs: Map<string, THREE.Group>;
}

export const SceneContext = createContext<SceneRegistry>({ refs: new Map() });

export function useScene() {
  return useContext(SceneContext);
}
