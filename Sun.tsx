import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScene } from "./registry";
import { getSunTexture, getGlowTexture } from "../three/textures";

export function Sun({
  id,
  onSelect,
}: {
  id: string;
  onSelect: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const { refs } = useScene();

  useLayoutEffect(() => {
    refs.set(id, group.current);
    return () => {
      refs.delete(id);
    };
  }, [id, refs]);

  const tex = getSunTexture();
  const glow = getGlowTexture();

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={group}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[4.2, 64, 64]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>

      {/* Corona glow */}
      <sprite scale={[42, 42, 1]}>
        <spriteMaterial
          map={glow}
          color="#ff9b2e"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </sprite>
      <sprite scale={[20, 20, 1]}>
        <spriteMaterial
          map={glow}
          color="#fff0b0"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </sprite>

      <pointLight color="#fff1d0" intensity={3} distance={0} decay={0} />
    </group>
  );
}
