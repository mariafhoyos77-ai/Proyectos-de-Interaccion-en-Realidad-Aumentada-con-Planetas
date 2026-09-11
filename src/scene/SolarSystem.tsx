import { useMemo, type RefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { SceneContext } from "./registry";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { Starfield } from "./Starfield";
import { CameraRig } from "./CameraRig";
import { PLANETS } from "../data/celestial";
import type { OrientationData } from "../hooks/useDeviceOrientation";

function OrbitRing({ radius, color }: { radius: number; color: string }) {
  const line = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    return new THREE.Line(g, m);
  }, [radius, color]);

  return <primitive object={line} />;
}

export function SolarSystem({
  selected,
  onSelect,
  arMode,
  orientationRef,
  hasOrientation,
  traveling,
  setTraveling,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  arMode: boolean;
  orientationRef: RefObject<OrientationData>;
  hasOrientation: boolean;
  traveling: boolean;
  setTraveling: (v: boolean) => void;
}) {
  const registry = useMemo(() => ({ refs: new Map<string, THREE.Group>() }), []);

  return (
    <SceneContext.Provider value={registry}>
      <ambientLight intensity={0.45} />

      <Sun id="sol" onSelect={onSelect} />

      {PLANETS.map((p, i) => (
        <group key={p.id}>
          <OrbitRing radius={p.orbit ?? 0} color={p.color} />
          <Planet body={p} index={i} onSelect={onSelect} selected={selected} />
        </group>
      ))}

      <Starfield onSelect={onSelect} selected={selected} arMode={arMode} />

      <OrbitControls
        makeDefault
        enabled={!traveling && !(arMode && hasOrientation)}
        enablePan={false}
        minDistance={2}
        maxDistance={260}
        dampingFactor={0.08}
        enableDamping
      />

      <CameraRig
        selected={selected}
        registry={registry}
        traveling={traveling}
        setTraveling={setTraveling}
        arMode={arMode}
        orientationRef={orientationRef}
      />
    </SceneContext.Provider>
  );
}
