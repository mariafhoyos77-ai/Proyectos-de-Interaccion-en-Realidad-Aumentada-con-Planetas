import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import type { Celestial } from "../data/celestial";
import { STARS } from "../data/celestial";
import { useScene } from "./registry";
import { getMilkyWayTexture, getGlowTexture } from "../three/textures";

function FamousStar({
  body,
  onSelect,
  selected,
}: {
  body: Celestial;
  onSelect: (id: string) => void;
  selected: string | null;
}) {
  const group = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Sprite>(null!);
  const { refs } = useScene();
  const glow = getGlowTexture();

  useLayoutEffect(() => {
    refs.set(body.id, group.current);
    return () => {
      refs.delete(body.id);
    };
  }, [body.id, refs]);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const t = clock.elapsedTime;
      glowRef.current.scale.setScalar(
        (body.glow ?? 6) * (1 + Math.sin(t * 2 + (body.orbit ?? 0)) * 0.12),
      );
    }
  });

  return (
    <group ref={group} position={body.position}>
      {/* visual core */}
      <mesh>
        <sphereGeometry args={[Math.max(body.radius, 0.6), 24, 24]} />
        <meshBasicMaterial color={body.color} toneMapped={false} />
      </mesh>
      {/* glowing halo */}
      <sprite ref={glowRef} scale={[body.glow ?? 6, body.glow ?? 6, 1]}>
        <spriteMaterial
          map={glow}
          color={body.color}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.85}
        />
      </sprite>
      {/* invisible but raycastable hit area */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(body.id);
        }}
      >
        <sphereGeometry args={[(body.glow ?? 6) * 0.9, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {selected !== body.id && (
        <Html
          center
          style={{ pointerEvents: "none" }}
          zIndexRange={[10, 0]}
        >
          <div
            style={{
              transform: "translateY(20px)",
              whiteSpace: "nowrap",
              fontFamily: "system-ui, sans-serif",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              textShadow: "0 0 6px rgba(0,0,0,0.95)",
              letterSpacing: 0.3,
            }}
          >
            {body.name}
          </div>
        </Html>
      )}
    </group>
  );
}

export function Starfield({
  onSelect,
  selected,
  arMode,
}: {
  onSelect: (id: string) => void;
  selected: string | null;
  arMode: boolean;
}) {
  const milkyway = getMilkyWayTexture();
  const famous = STARS.filter((s) => s.kind !== "galaxy");

  return (
    <group visible={!arMode}>
      {/* Milky Way backdrop */}
      <mesh scale={[-1, 1, 1]} position={[0, 0, 0]}>
        <sphereGeometry args={[2600, 48, 48]} />
        <meshBasicMaterial
          map={milkyway}
          side={THREE.BackSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* dense surrounding starfield */}
      <Stars radius={900} depth={120} count={8000} factor={4} fade speed={0.6} />

      {/* Clickable famous stars */}
      {famous.map((s) => (
        <FamousStar
          key={s.id}
          body={s}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
    </group>
  );
}
