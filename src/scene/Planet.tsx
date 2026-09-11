import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Celestial, Moon as MoonData } from "../data/celestial";
import { useScene } from "./registry";
import {
  getPlanetTextureFor,
  getRingTexture,
  getGlowTexture,
} from "../three/textures";

function Moon({ m }: { m: MoonData }) {
  const carrier = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const tex = getPlanetTextureFor(m.color, m.color, "rocky", m.distance * 100);

  useFrame((_, delta) => {
    if (carrier.current) carrier.current.rotation.y += delta * m.speed;
  });

  return (
    <group ref={carrier}>
      <group position={[m.distance, 0, 0]}>
        <mesh ref={mesh}>
          <sphereGeometry args={[m.radius, 24, 24]} />
          <meshStandardMaterial map={tex} roughness={1} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}

export function Planet({
  body,
  index,
  onSelect,
  selected,
}: {
  body: Celestial;
  index: number;
  onSelect: (id: string) => void;
  selected: string | null;
}) {
  const carrier = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const { refs } = useScene();
  const [hovered, setHovered] = useState(false);

  useLayoutEffect(() => {
    refs.set(body.id, inner.current);
    return () => {
      refs.delete(body.id);
    };
  }, [body.id, refs]);

  const tex = getPlanetTextureFor(
    body.color,
    body.color2,
    body.textureType,
    index + 5,
  );
  const ringTex = body.ring ? getRingTexture(body.ring.color) : null;
  const glow = getGlowTexture();

  useFrame((_, delta) => {
    if (carrier.current) carrier.current.rotation.y += (body.speed ?? 0.05) * delta;
    if (mesh.current) {
      mesh.current.rotation.y += (body.rotationSpeed ?? 0.2) * delta;
      const target = hovered ? 1.16 : 1;
      const s = THREE.MathUtils.damp(mesh.current.scale.x, target, 8, delta);
      mesh.current.scale.setScalar(s);
    }
  });

  const isSelected = selected === body.id;

  return (
    <group ref={carrier}>
      <group ref={inner} position={[body.orbit ?? 0, 0, 0]}>
        {/* body with axial tilt */}
        <group rotation={[0, 0, body.tilt ?? 0]}>
          <mesh
            ref={mesh}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(body.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHovered(false);
              document.body.style.cursor = "auto";
            }}
          >
            <sphereGeometry args={[body.radius, 48, 48]} />
            <meshStandardMaterial
              map={tex}
              roughness={body.textureType === "gas" ? 0.7 : 0.95}
              metalness={0}
            />
          </mesh>
          {/* subtle atmosphere rim */}
          <sprite scale={[body.radius * 3.1, body.radius * 3.1, 1]}>
            <spriteMaterial
              map={glow}
              color={body.color}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              opacity={0.12}
            />
          </sprite>

          {/* rings */}
          {ringTex && body.ring && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry
                args={[body.ring.inner, body.ring.outer, 128]}
              />
              <meshBasicMaterial
                map={ringTex}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false}
                opacity={0.9}
              />
            </mesh>
          )}
        </group>

        {/* moons */}
        {body.moons?.map((m) => (
          <Moon key={m.name} m={m} />
        ))}

        {/* label */}
        {!isSelected && (
          <Html
            center
            style={{ pointerEvents: "none" } as CSSProperties}
            zIndexRange={[10, 0]}
          >
            <div
              style={{
                transform: "translateY(-8px)",
                whiteSpace: "nowrap",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#dbe4ff",
                  fontSize: 13,
                  fontWeight: 600,
                  textShadow:
                    "0 0 6px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)",
                  letterSpacing: 0.4,
                }}
              >
                <span style={{ fontSize: 15 }}>{body.emoji}</span>
                {body.name}
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
