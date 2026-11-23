"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Line } from "@react-three/drei";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { makeRackTextures } from "@/components/three/rackTextures";
import { SEVA_AT, SevaGlasses } from "./SevaGlasses";
import { WALL_AT, WorkforceWall } from "./WorkforceWall";

/**
 * THE PURVIEW TRINITY — one scene, three capabilities.
 *
 *   A · Applications   SEVA Vision smart glasses on a studio podium (and, in the
 *                      overview, the agent workflow board above the hall)
 *   B · Infrastructure two rows of GPU racks, overhead fibre, signal traffic
 *   C · People         an arc carousel of Purview workforce photography
 *
 * `focus` (ref, not state): -1 overview, 0 Tech, 1 Data Centre, 2 Workforce.
 * Every frame the camera and each layer's emphasis ease toward the focused
 * state, so switching never re-renders React or rebuilds geometry.
 * Generic, illustrative hardware; not a depiction of a real facility.
 */

export type Focus = -1 | 0 | 1 | 2;

const C = { abyss: "#060d26", sky: "#8fb3ff", blue: "#2f5bd6", accent: "#ff8a3d", mint: "#5ef0c8" };
const ROW_X = 1.2;
const RACK = { w: 0.66, h: 2.1, d: 1.0 };
const COUNT = 10;
const PITCH = 0.72;
const Z0 = -1.2;
/*
 * The agent workflow stands upright as a board above the hall, facing the
 * viewer: requests enter at the top, agents and tools work through it, and
 * the bottom of the board feeds the racks below.
 */
const BOARD_Z = -2.6;
const BOARD_TOP = 5.25;
const BOARD_H = 2.45;
const BOARD_X = 1.2;
const BOARD = { x0: -1.62, x1: 1.62, y0: BOARD_TOP - BOARD_H - 0.32, y1: BOARD_TOP + 0.3 };

/* Camera keyframes: overview, applications, infrastructure, people.
 * Infrastructure (index 2) is the reference framing and is unchanged; the
 * others put their subject in the same place: centred in the visual area,
 * above the call-to-action row. */
const CAMS = [
  { p: new THREE.Vector3(0.3, 4.3, 11.4), t: new THREE.Vector3(0, 1.75, -1.8) },
  // 01 · SEVA Vision glasses on their podium
  { p: new THREE.Vector3(SEVA_AT.x + 2.4, 1.72, SEVA_AT.z + 4.0), t: new THREE.Vector3(SEVA_AT.x - 0.42, 0.44, SEVA_AT.z) },
  { p: new THREE.Vector3(0.18, 1.45, 4.6), t: new THREE.Vector3(0.05, 1.35, -4.5) },
  // 03 · the workforce carousel: square-on to the centre card of the arc
  { p: new THREE.Vector3(WALL_AT.x + 3.11, 1.85, WALL_AT.z + 9.08), t: new THREE.Vector3(WALL_AT.x, 1.1, WALL_AT.z) },
];

/* scratch objects (mutated only in the render loop) */
const vP = new THREE.Vector3();
const vT = new THREE.Vector3();
const lookAt = new THREE.Vector3();
const m4 = new THREE.Matrix4();
const q = new THREE.Quaternion();
const sc = new THREE.Vector3();
const tmp = new THREE.Vector3();

export type Weights = { overview: number; tech: number; dc: number; people: number };

function rackList() {
  const out: { x: number; z: number; side: 1 | -1 }[] = [];
  const start = Z0 - ((COUNT - 1) * PITCH) / 2;
  for (const side of [-1, 1] as const) for (let i = 0; i < COUNT; i++) out.push({ x: side * ROW_X, z: start + i * PITCH, side });
  return out;
}

/* ---------------- B · infrastructure ---------------- */
function Hall({ w }: { w: React.RefObject<Weights> }) {
  const bodies = useRef<THREE.InstancedMesh>(null);
  const fronts = useRef<THREE.InstancedMesh>(null);
  const frontMat = useRef<THREE.MeshStandardMaterial>(null);
  const stripMat = useRef<THREE.MeshBasicMaterial>(null);
  const racks = useMemo(() => rackList(), []);
  const tex = useMemo(() => makeRackTextures(11), []);

  useLayoutEffect(() => {
    const s = new THREE.Vector3(1, 1, 1);
    racks.forEach((r, i) => {
      m4.compose(new THREE.Vector3(r.x, RACK.h / 2, r.z), new THREE.Quaternion(), s);
      bodies.current!.setMatrixAt(i, m4);
      const fq = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), r.side === -1 ? Math.PI / 2 : -Math.PI / 2);
      m4.compose(new THREE.Vector3(r.x - r.side * (RACK.d / 2 + 0.002), RACK.h / 2, r.z), fq, s);
      fronts.current!.setMatrixAt(i, m4);
    });
    bodies.current!.instanceMatrix.needsUpdate = true;
    fronts.current!.instanceMatrix.needsUpdate = true;
  }, [racks]);

  useFrame(({ clock }) => {
    const k = w.current!;
    const emph = 0.55 + k.dc * 1.15 + k.overview * 0.45;
    if (frontMat.current) frontMat.current.emissiveIntensity = emph * (1 + Math.sin(clock.elapsedTime * 1.7) * 0.06);
    if (stripMat.current) stripMat.current.opacity = 0.35 + k.dc * 0.65;
  });

  const len = COUNT * PITCH;
  return (
    <group>
      <instancedMesh ref={bodies} args={[undefined, undefined, racks.length]}>
        <boxGeometry args={[RACK.d, RACK.h, RACK.w]} />
        <meshStandardMaterial color="#1a2752" metalness={0.55} roughness={0.42} />
      </instancedMesh>
      <instancedMesh ref={fronts} args={[undefined, undefined, racks.length]}>
        <planeGeometry args={[RACK.w - 0.02, RACK.h - 0.04]} />
        <meshStandardMaterial ref={frontMat} map={tex.map} emissiveMap={tex.emissiveMap} emissive="#ffffff" emissiveIntensity={1.2} metalness={0.5} roughness={0.45} />
      </instancedMesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * ROW_X * 0.92, RACK.h + 0.28, Z0]}>
          <boxGeometry args={[0.34, 0.05, len + 0.6]} />
          <meshStandardMaterial color="#24366e" metalness={0.5} roughness={0.45} />
        </mesh>
      ))}
      {[-0.74, 0.74].map((x) => (
        <mesh key={"s" + x} position={[x, RACK.h + 0.62, Z0]}>
          <boxGeometry args={[0.05, 0.02, len + 0.4]} />
          <meshBasicMaterial ref={x < 0 ? stripMat : undefined} color="#dfe8ff" toneMapped={false} transparent opacity={0.9} />
        </mesh>
      ))}
      {[-0.62, 0.62].map((x) => (
        <mesh key={"f" + x} position={[x, 0.004, Z0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.025, len + 1]} />
          <meshBasicMaterial color={C.sky} toneMapped={false} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- A · applications ---------------- */
const NODES: { id: string; p: [number, number]; kind: "io" | "agent" | "tool" }[] = [
  { id: "in", p: [0, -5.2], kind: "io" },
  { id: "a1", p: [-0.75, -3.9], kind: "agent" },
  { id: "a2", p: [0.1, -3.6], kind: "agent" },
  { id: "a3", p: [0.85, -4.1], kind: "agent" },
  { id: "t1", p: [-0.9, -2.3], kind: "tool" },
  { id: "t2", p: [-0.1, -2.0], kind: "tool" },
  { id: "t3", p: [0.75, -2.4], kind: "tool" },
  { id: "rev", p: [0.35, -0.9], kind: "agent" },
  { id: "out", p: [-0.15, 0.3], kind: "io" },
];
const EDGES: [string, string][] = [
  ["in", "a1"], ["in", "a2"], ["in", "a3"], ["a1", "t1"], ["a2", "t2"], ["a3", "t3"], ["a2", "t1"], ["t1", "rev"], ["t2", "rev"], ["t3", "rev"], ["rev", "out"],
];
/** Node layout is authored top-to-bottom (p[1] from -5.2 at the top to 0.3 at the bottom). */
const np = (id: string) => {
  const n = NODES.find((x) => x.id === id)!;
  return new THREE.Vector3(n.p[0] * BOARD_X, BOARD_TOP - ((n.p[1] + 5.2) / 5.5) * BOARD_H, BOARD_Z);
};

/** How present the applications board is: full for Tech and the overview, faint elsewhere. */
const boardPresence = (k: Weights) => Math.max(0.1, 1 - k.dc * 0.88 - k.people * 0.72 - k.tech * 0.9);

function Workflow({ w }: { w: React.RefObject<Weights> }) {
  const group = useRef<THREE.Group>(null);
  const mats = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const lineGroup = useRef<THREE.Group>(null);
  const panel = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const k = w.current!;
    const on = boardPresence(k);
    if (group.current) group.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.04 + k.tech * 0.08;
    mats.current.forEach((m, i) => {
      if (!m) return;
      const base = NODES[i].kind === "io" ? 1.4 : NODES[i].kind === "agent" ? 0.8 : 0.45;
      const pulse = NODES[i].kind === "agent" ? 0.45 * Math.max(0, Math.sin(clock.elapsedTime * 2.2 - i)) * k.tech : 0;
      m.emissiveIntensity = base * (0.35 + k.tech * 1.3 + k.overview * 0.55) + pulse;
      m.opacity = on;
    });
    lineGroup.current?.children.forEach((c, i) => {
      const mat = (c as unknown as { material: THREE.Material & { opacity: number } }).material;
      if (mat) mat.opacity = (i === 0 ? 0.35 : 0.22 + k.tech * 0.5 + k.overview * 0.2) * on;
    });
    if (panel.current) panel.current.opacity = (0.05 + k.tech * 0.05) * on;
  });
  const { x0, x1, y0, y1 } = BOARD;
  const z = BOARD_Z - 0.04;
  return (
    <group ref={group}>
      {/* the board: a faint glass panel with a frame */}
      <mesh position={[0, (y0 + y1) / 2, z - 0.01]}>
        <planeGeometry args={[x1 - x0, y1 - y0]} />
        <meshBasicMaterial ref={panel} color={C.sky} transparent opacity={0.06} depthWrite={false} toneMapped={false} />
      </mesh>
      <group ref={lineGroup}>
        <Line points={[[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], [x0, y0, z]]} color={C.sky} transparent opacity={0.35} lineWidth={1} />
        {EDGES.map(([a, b]) => (
          <Line key={a + b} points={[np(a), np(b)]} color={C.sky} transparent opacity={0.4} lineWidth={1.3} />
        ))}
      </group>
      {NODES.map((n, i) => (
        <mesh key={n.id} position={np(n.id)}>
          <boxGeometry args={n.kind === "io" ? [0.5, 0.16, 0.05] : n.kind === "agent" ? [0.3, 0.3, 0.07] : [0.22, 0.22, 0.04]} />
          <meshStandardMaterial
            ref={(m) => {
              mats.current[i] = m;
            }}
            color={n.kind === "agent" ? "#1b2f6e" : "#0f1c45"}
            emissive={n.kind === "io" ? C.accent : C.sky}
            emissiveIntensity={1}
            metalness={0.3}
            roughness={0.4}
            transparent
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- signals: workflow → racks → fibre ---------------- */
type Journey = { pts: THREE.Vector3[]; lens: number[]; total: number; speed: number; off: number };
function journeys() {
  const racks = rackList();
  const trayY = RACK.h + 0.31;
  const mk = (pts: THREE.Vector3[], speed: number, off: number): Journey => {
    const lens = pts.slice(1).map((p, i) => p.distanceTo(pts[i]));
    return { pts, lens, total: lens.reduce((a, b) => a + b, 0), speed, off };
  };
  const drops: Journey[] = (
    [
      ["a1", "t1", 2],
      ["a2", "t2", COUNT + 3],
      ["a3", "t3", COUNT + 5],
      ["a2", "t1", 5],
    ] as const
  ).map(([a, t, ri], i) => {
    const r = racks[ri];
    const tp = np(t);
    const tx = r.side * ROW_X * 0.92;
    return mk([np("in"), np(a), tp, new THREE.Vector3(tx, trayY, tp.z), new THREE.Vector3(tx, trayY, r.z), new THREE.Vector3(r.x, RACK.h + 0.02, r.z)], 0.85 + i * 0.07, i * 0.27);
  });
  const z0 = Z0 - (COUNT * PITCH) / 2;
  const z1 = Z0 + (COUNT * PITCH) / 2;
  const fibre = Array.from({ length: 8 }, (_, i) => {
    const x = (i % 2 ? 1 : -1) * ROW_X * 0.92;
    const a = new THREE.Vector3(x, trayY, z0);
    const b = new THREE.Vector3(x, trayY, z1);
    return mk(i % 3 === 0 ? [b, a] : [a, b], 1.2 + (i % 3) * 0.3, i / 8);
  });
  return { drops, fibre };
}

function place(mesh: THREE.InstancedMesh | null, js: Journey[], t: number, size: number) {
  if (!mesh) return;
  js.forEach((j, i) => {
    for (let k = 0; k < 2; k++) {
      const prog = (((t * j.speed) / j.total + j.off + k * 0.5) % 1 + 1) % 1;
      let d = prog * j.total;
      let seg = 0;
      while (seg < j.lens.length - 1 && d > j.lens[seg]) d -= j.lens[seg++];
      tmp.copy(j.pts[seg]).lerp(j.pts[seg + 1], Math.min(1, d / j.lens[seg]));
      sc.setScalar(size * (0.6 + Math.sin(prog * Math.PI) * 0.6));
      m4.compose(tmp, q, sc);
      mesh.setMatrixAt(i * 2 + k, m4);
    }
  });
  mesh.instanceMatrix.needsUpdate = true;
}

function Signals({ w, animate }: { w: React.RefObject<Weights>; animate: boolean }) {
  const { drops, fibre } = useMemo(() => journeys(), []);
  const dropRef = useRef<THREE.InstancedMesh>(null);
  const fibreRef = useRef<THREE.InstancedMesh>(null);
  const clockT = useRef(3.2);
  useFrame((_, dt) => {
    const k = w.current!;
    // the focused layer runs its traffic faster
    if (animate) clockT.current += dt * (0.8 + k.dc * 0.9 + k.tech * 0.5);
    place(dropRef.current, drops, clockT.current, 1 + k.tech * 0.4);
    place(fibreRef.current, fibre, clockT.current * (1 + k.dc), 1 + k.dc * 0.5);
  });
  return (
    <>
      {drops.map((j, i) => (
        <Line key={i} points={[j.pts[2], j.pts[3]]} color={C.accent} transparent opacity={0.35} lineWidth={1} dashed dashSize={0.06} gapSize={0.06} />
      ))}
      <instancedMesh ref={dropRef} args={[undefined, undefined, drops.length * 2]}>
        <sphereGeometry args={[0.032, 12, 12]} />
        <meshBasicMaterial color={C.accent} toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={fibreRef} args={[undefined, undefined, fibre.length * 2]}>
        <sphereGeometry args={[0.022, 10, 10]} />
        <meshBasicMaterial color="#cfe0ff" toneMapped={false} />
      </instancedMesh>
    </>
  );
}

/**
 * Compile the hidden layers' shaders and upload their textures once, at idle
 * after load, so the first switch to SEVA or Workforce never stalls a frame.
 * Mounted inside the Suspense boundary, i.e. after the photographs load.
 */
function Warmup() {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    const run = () => {
      const layers = ["seva", "workforce"].map((n) => scene.getObjectByName(n)).filter(Boolean) as THREE.Object3D[];
      const was = layers.map((l) => l.visible);
      layers.forEach((l) => (l.visible = true));
      gl.compile(scene, camera);
      layers.forEach((l) =>
        l.traverse((o) => {
          const m = (o as THREE.Mesh).material as (THREE.MeshBasicMaterial & { uniforms?: { uMap?: { value: THREE.Texture } } }) | undefined;
          if (m && "map" in m && m.map) gl.initTexture(m.map);
          const u = m?.uniforms?.uMap?.value;
          if (u) gl.initTexture(u);
        }),
      );
      layers.forEach((l, i) => (l.visible = was[i]!));
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(run, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(run, 300);
    return () => window.clearTimeout(id);
  }, [gl, scene, camera]);
  return null;
}

/* ---------------- choreography ---------------- */
function Director({ focus, w, animate, progress }: { focus: React.RefObject<Focus>; w: React.RefObject<Weights>; animate: boolean; progress: React.RefObject<number> }) {
  const intro = useRef<number | null>(null);
  const placed = useRef(false);
  useFrame((state, dt) => {
    const f = focus.current ?? -1;
    const k = w.current!;
    const target = { overview: f === -1 ? 1 : 0, tech: f === 0 ? 1 : 0, dc: f === 1 ? 1 : 0, people: f === 2 ? 1 : 0 };
    const ease = animate ? 1 - Math.pow(0.04, dt) : 1;
    (Object.keys(target) as (keyof Weights)[]).forEach((key) => (k[key] += (target[key] - k[key]) * ease));

    // blended camera keyframe
    vP.set(0, 0, 0);
    vT.set(0, 0, 0);
    const ws = [k.overview, k.tech, k.dc, k.people];
    const sum = ws.reduce((a, b) => a + b, 0) || 1;
    ws.forEach((wi, i) => {
      vP.addScaledVector(CAMS[i].p, wi / sum);
      vT.addScaledVector(CAMS[i].t, wi / sum);
    });

    const cam = state.camera;
    if (!placed.current) {
      cam.position.copy(animate ? new THREE.Vector3(0.2, 8, 18) : vP);
      placed.current = true;
    }
    if (animate) {
      if (intro.current === null) intro.current = state.clock.elapsedTime;
      const p = progress.current ?? 0;
      const t = state.clock.elapsedTime;
      // slow cinematic drift on the product and people shots (parallax between layers)
      vP.x += Math.sin(t * 0.18) * 0.22 * k.tech;
      vP.x += state.pointer.x * 0.35;
      vP.y += state.pointer.y * 0.18 - p * 0.8;
      vP.z -= p * 1.4;
      const introEase = Math.min(1, (state.clock.elapsedTime - intro.current) / 2.6);
      cam.position.lerp(vP, (1 - Math.pow(0.002, dt)) * (0.35 + introEase * 0.65));
    } else {
      cam.position.copy(vP);
    }
    lookAt.lerp(vT, animate ? 1 - Math.pow(0.002, dt) : 1);
    cam.lookAt(lookAt);
  });
  return null;
}

export default function TrinityScene({
  focus,
  animate,
  active,
  progress,
  onReady,
  low,
}: {
  focus: React.RefObject<Focus>;
  animate: boolean;
  active: boolean;
  progress: React.RefObject<number>;
  onReady?: () => void;
  low?: boolean;
}) {
  const weights = useRef<Weights>({ overview: 1, tech: 0, dc: 0, people: 0 });
  return (
    <Canvas
      dpr={low ? [1, 1.25] : [1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      camera={{ fov: 34, near: 0.1, far: 60, position: [0.3, 4.3, 11.4] }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        onReady?.();
      }}
      aria-hidden
    >
      <color attach="background" args={[C.abyss]} />
      <fog attach="fog" args={[C.abyss, 9, 27]} />
      <ambientLight intensity={0.3} color="#b8c6ea" />
      <directionalLight position={[3, 7, 6]} intensity={0.55} color="#dfe8ff" />
      <pointLight position={[0, BOARD_TOP - BOARD_H / 2, BOARD_Z + 1.4]} intensity={6} distance={7} color={C.accent} />
      <pointLight position={[0, 1.4, 1.2]} intensity={9} distance={9} color="#9fbcff" />
      <pointLight position={[0, 1.4, -3.6]} intensity={9} distance={9} color="#9fbcff" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={1.4} color={C.sky} position={[0, 5, -6]} scale={[10, 0.4, 1]} />
        <Lightformer form="rect" intensity={0.8} color={C.blue} position={[-5, 2, 0]} rotation-y={Math.PI / 2} scale={[12, 1, 1]} />
        <Lightformer form="rect" intensity={0.8} color={C.blue} position={[5, 2, 0]} rotation-y={-Math.PI / 2} scale={[12, 1, 1]} />
        <Lightformer form="ring" intensity={1.2} color={C.accent} position={[0, 4, 4]} scale={1.2} />
      </Environment>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#050b22" metalness={low ? 0.5 : 0.85} roughness={low ? 0.55 : 0.28} envMapIntensity={0.9} />
      </mesh>
      <gridHelper args={[40, 56, "#1d2d63", "#111d45"]} position={[0, 0.002, -2]} />
      <Hall w={weights} />
      <Workflow w={weights} />
      <Signals w={weights} animate={animate} />
      <SevaGlasses w={weights} animate={animate} low={low} />
      <Suspense fallback={null}>
        <WorkforceWall w={weights} animate={animate} progress={progress} />
        <Warmup />
      </Suspense>
      <Director focus={focus} w={weights} animate={animate} progress={progress} />
    </Canvas>
  );
}
