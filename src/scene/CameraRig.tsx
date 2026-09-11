import { useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import type { SceneRegistry } from "./registry";
import { findBody } from "../data/celestial";
import type { OrientationData } from "../hooks/useDeviceOrientation";

const HOME_POS = new THREE.Vector3(0, 70, 112);
const HOME_TARGET = new THREE.Vector3(0, 0, 0);
const DEG = Math.PI / 180;

type ControlsLike = {
  target: THREE.Vector3;
  enabled: boolean;
  update: () => void;
};

function damp(current: THREE.Vector3, target: THREE.Vector3, lambda: number, dt: number) {
  current.lerp(target, 1 - Math.exp(-lambda * dt));
}

export function CameraRig({
  selected,
  registry,
  traveling,
  setTraveling,
  arMode,
  orientationRef,
}: {
  selected: string | null;
  registry: SceneRegistry;
  traveling: boolean;
  setTraveling: (v: boolean) => void;
  arMode: boolean;
  orientationRef: RefObject<OrientationData>;
}) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as ControlsLike | null;
  const prevSelected = useRef<string | null | undefined>(undefined);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const o = orientationRef.current;
    const hasOrientation = o.alpha != null;

    // AR: gyro look-around overrides all camera motion when data is present
    if (arMode && hasOrientation) {
      camera.rotation.order = "YXZ";
      const pitch = -((o.beta ?? 90) - 90) * DEG;
      const yaw = -(o.alpha ?? 0) * DEG;
      const roll = -(o.gamma ?? 0) * DEG;
      camera.rotation.set(pitch, yaw, roll);
      damp(camera.position, new THREE.Vector3(0, 9, 36), 5, dt);
      return;
    }

    if (!controls) return;

    // galaxy focus = info only (stay at the overview); others travel to the body
    const bodyId =
      selected && findBody(selected)?.kind === "galaxy" ? null : selected;
    const group = bodyId ? registry.refs.get(bodyId) : null;

    // start a new travel whenever the focused body changes
    if (prevSelected.current !== bodyId) {
      setTraveling(true);
    }
    prevSelected.current = bodyId;

    if (traveling) {
      let desiredCamera;
      let desiredTarget;
      if (group) {
        const world = group.getWorldPosition(new THREE.Vector3());
        const radius = findBody(bodyId ?? "")?.radius ?? 1;
        const distance = radius * 5 + 4;
        const dir = camera.position.clone().sub(world);
        if (dir.lengthSq() < 0.001) dir.set(0, 0.5, 1);
        dir.normalize();
        desiredCamera = world.clone().add(dir.multiplyScalar(distance));
        desiredTarget = world;
      } else {
        // return to the classroom overview
        desiredCamera = HOME_POS.clone();
        desiredTarget = HOME_TARGET.clone();
      }
      damp(camera.position, desiredCamera, 3.4, dt);
      damp(controls.target, desiredTarget, 3.4, dt);
      if (camera.position.distanceTo(desiredCamera) < 0.3) {
        setTraveling(false);
      }
    } else if (group) {
      // keep the selected body centred while leaving the camera to the user
      const world = group.getWorldPosition(new THREE.Vector3());
      damp(controls.target, world, 10, dt);
    } else {
      damp(controls.target, HOME_TARGET, 6, dt);
    }
  });

  return null;
}
