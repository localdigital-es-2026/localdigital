"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

// Marca para los tests: este módulo solo se evalúa si se descarga el 3D (plan.md, Hero3DScene).
(globalThis as { __LD_3D_LOADED__?: boolean }).__LD_3D_LOADED__ = true;

// Paleta v1.2 (RF-29): móvil plateado, pantalla blanca, burbujas grises y azul de marca.
const FRAME = "#d2d2d7";
const SCREEN = "#ffffff";
const BRAND = "#0d4964";
const INCOMING = "#e5e5ea";
const LIGHT_BRAND = "#5b8fb0";

function Bubble({ position, width, color, phase }: { position: [number, number, number]; width: number; color: string; phase: number }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + phase) * 0.06;
  });
  return (
    <group ref={ref} position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.13, width, 8, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Phone() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = -0.35 + Math.sin(clock.elapsedTime * 0.4) * 0.12;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.05;
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.5, 3, 0.16]} />
        <meshStandardMaterial color={FRAME} roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.085]}>
        <planeGeometry args={[1.32, 2.7]} />
        <meshBasicMaterial color={SCREEN} />
      </mesh>
      <Bubble position={[-0.18, 0.95, 0.18]} width={0.6} color={INCOMING} phase={0} />
      <Bubble position={[0.16, 0.45, 0.18]} width={0.7} color={BRAND} phase={1} />
      <Bubble position={[-0.22, -0.05, 0.18]} width={0.5} color={INCOMING} phase={2} />
      <Bubble position={[0.14, -0.55, 0.18]} width={0.75} color={BRAND} phase={3} />
      <Bubble position={[-1.25, 0.55, 0.45]} width={0.35} color={LIGHT_BRAND} phase={4} />
      <Bubble position={[1.15, -1.05, 0.45]} width={0.25} color={LIGHT_BRAND} phase={5} />
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <Phone />
    </Canvas>
  );
}
