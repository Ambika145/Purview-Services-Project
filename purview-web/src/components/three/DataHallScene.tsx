"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { makeRackTextures } from "./rackTextures";

/**
 * GPU floor, going live. An isometric data hall of four rows; a
 * commissioning wave travels along the hall and racks light up as they pass
 * L5. Drag to orbit (limited), point at a rack to inspect it.
 * Generic, illustrative hardware and layout.
 */
export type RackInfo = { row: string; index: number; live: boolean } | null;

const ROWS = 4;
const PER = 12;
const W = 0.6;
const D = 1.0;
const H = 2.0;
const PITCH = 0.66;
const ROW_GAP = 2.4;

function layout() {
  const out: { x: number; z: number; row: number; i: number; facing: 1 | -1 }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let i = 0; i < PER; i++) {
      out.push({ x: (i - (PER - 1) / 2) * PITCH, z: (r - (ROWS - 1) / 2) * ROW_GAP + (r % 2 ? -0.35 : 0.35), row: r, i, facing: r % 2 ? -1 : 1 });
    }
  }
  return out;
}

function Hall({ animate, onHover }: { animate: boolean; onHover: (r: RackInfo) => void }) {
  const bodies = useRef<THREE.InstancedMesh>(null);
  const fronts = useRef<THREE.InstancedMesh>(null);
  const caps = useRef<THREE.InstancedMesh>(null);
  const racks = useMemo(() => layout(), []);
  const tex = useMemo(() => makeRackTextures(23), []);
  const hovered = useRef(-1);
  const dim = useMemo(() => new THREE.Color("#1b2550"), []);
  const live = useMemo(() => new THREE.Color("#ffffff"), []);
  const capLive = useMemo(() => new THREE.Color("#5ef0c8"), []);
  const capIdle = useMemo(() => new THREE.Color("#2a3a72"), []);
  const capHover = useMemo(() => new THREE.Color("#ff8a3d"), []);
  const state = useRef<boolean[]>(racks.map(() => !animate));

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const s = new THREE.Vector3(1, 1, 1);
    racks.forEach((k, n) => {
      m.compose(new THREE.Vector3(k.x, H / 2, k.z), new THREE.Quaternion(), s);
      bodies.current!.setMatrixAt(n, m);
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), k.facing === 1 ? 0 : Math.PI);
      m.compose(new THREE.Vector3(k.x, H / 2, k.z + k.facing * (D / 2 + 0.002)), q, s);
      fronts.current!.setMatrixAt(n, m);
      m.compose(new THREE.Vector3(k.x, H + 0.012, k.z), new THREE.Quaternion(), s);
      caps.current!.setMatrixAt(n, m);
      fronts.current!.setColorAt(n, animate ? dim : live);
      caps.current!.setColorAt(n, animate ? capIdle : capLive);
    });
    [bodies, fronts, caps].forEach((r) => (r.current!.instanceMatrix.needsUpdate = true));
    fronts.current!.instanceColor!.needsUpdate = true;
    caps.current!.instanceColor!.needsUpdate = true;
  }, [racks, animate, dim, live, capIdle, capLive]);

  useFrame(({ clock }) => {
    if (!animate) return;
    // wave sweeps row by row, then the hall stays live for a beat and resets
    const cycle = 14;
    const t = (clock.elapsedTime % cycle) / cycle;
    const front = t * 1.25 * racks.length;
    let changed = false;
    racks.forEach((_, n) => {
      const on = n < front;
      if (state.current[n] !== on) {
        state.current[n] = on;
        changed = true;
      }
      fronts.current!.setColorAt(n, on ? live : dim);
      caps.current!.setColorAt(n, n === hovered.current ? capHover : on ? capLive : capIdle);
    });
    if (changed || hovered.current >= 0) {
      fronts.current!.instanceColor!.needsUpdate = true;
      caps.current!.instanceColor!.needsUpdate = true;
    }
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const id = e.instanceId ?? -1;
    hovered.current = id;
    if (id >= 0) {
      const k = racks[id];
      onHover({ row: String.fromCharCode(65 + k.row), index: k.i + 1, live: state.current[id] });
      if (!animate) {
        caps.current!.setColorAt(id, capHover);
        caps.current!.instanceColor!.needsUpdate = true;
      }
    }
  };
  const out = () => {
    if (!animate && hovered.current >= 0) {
      caps.current!.setColorAt(hovered.current, capLive);
      caps.current!.instanceColor!.needsUpdate = true;
    }
    hovered.current = -1;
    onHover(null);
  };

  return (
    <group>
      <instancedMesh ref={bodies} args={[undefined, undefined, racks.length]} onPointerMove={over} onPointerOut={out}>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#1a2752" metalness={0.55} roughness={0.42} />
      </instancedMesh>
      <instancedMesh ref={fronts} args={[undefined, undefined, racks.length]}>
        <planeGeometry args={[W - 0.02, H - 0.04]} />
        <meshStandardMaterial map={tex.map} emissiveMap={tex.emissiveMap} emissive="#ffffff" emissiveIntensity={1.1} roughness={0.45} metalness={0.4} />
      </instancedMesh>
      <instancedMesh ref={caps} args={[undefined, undefined, racks.length]}>
        <boxGeometry args={[W - 0.08, 0.02, 0.08]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {/* containment and fibre trays */}
      {Array.from({ length: ROWS / 2 }).map((_, p) => {
        const z = (p * 2 + 0.5 - (ROWS - 1) / 2) * ROW_GAP;
        return (
          <group key={p}>
            <mesh position={[0, H + 0.4, z]}>
              <boxGeometry args={[PER * PITCH + 0.4, 0.04, 0.32]} />
              <meshStandardMaterial color="#24366e" metalness={0.5} roughness={0.45} />
            </mesh>
            <mesh position={[0, 0.004, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[PER * PITCH + 0.4, 0.02]} />
              <meshBasicMaterial color="#8fb3ff" toneMapped={false} transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#070f2b" metalness={0.4} roughness={0.6} />
      </mesh>
      <gridHelper args={[30, 50, "#1d2d63", "#111d45"]} position={[0, 0.002, 0]} />
    </group>
  );
}

export default function DataHallScene({ animate, active, onHover }: { animate: boolean; active: boolean; onHover: (r: RackInfo) => void }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={animate && active ? "always" : "demand"}
      camera={{ position: [11.5, 9.4, 12.5], fov: 30 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <color attach="background" args={["#060d26"]} />
      <fog attach="fog" args={["#060d26", 14, 30]} />
      <ambientLight intensity={0.45} color="#b8c6ea" />
      <directionalLight position={[4, 10, 6]} intensity={0.9} color="#dfe8ff" />
      <pointLight position={[0, 3, 0]} intensity={10} distance={12} color="#9fbcff" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={1.5} color="#8fb3ff" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[12, 6, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#2f5bd6" position={[-8, 3, 0]} rotation-y={Math.PI / 2} scale={[14, 2, 1]} />
      </Environment>
      <Hall animate={animate} onHover={onHover} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={animate && active}
        autoRotateSpeed={0.35}
        minPolarAngle={0.6}
        maxPolarAngle={1.15}
        target={[0, 0.8, 0]}
      />
    </Canvas>
  );
}
