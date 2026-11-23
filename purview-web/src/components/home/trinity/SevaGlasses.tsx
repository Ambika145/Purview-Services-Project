"use client";

import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Weights } from "./TrinityScene";

/**
 * SEVA Vision smart glasses on a studio podium (slide 01, the applications).
 *
 * Built in code from physically based materials, following the SEVA product
 * reference: a satin-black frame with a clear-coat finish, refracting lenses,
 * a camera module at the right hinge and a brushed-metal podium with a light
 * ring. A faint heads-up display glows inside the right lens: the AI at work.
 *
 * It sits off to the side of the hall, out of the other cameras' view, and is
 * hidden entirely (no transmission pass) unless the Tech slide is showing.
 */

export const SEVA_AT = new THREE.Vector3(4.7, 0, 2.3);
const PODIUM_TOP = 0.46;
const PODIUM_SCALE = 0.74;

const roundedRect = (w: number, h: number, r: number) => {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
};

/** Soft contact shadow as a radial-gradient texture (no shadow-map pass). */
function useShadowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    grd.addColorStop(0, "rgba(0,0,0,0.85)");
    grd.addColorStop(0.55, "rgba(0,0,0,0.35)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function useBackdropTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(128, 128, 6, 128, 128, 126);
    grd.addColorStop(0, "rgba(150,165,195,0.55)");
    grd.addColorStop(0.45, "rgba(90,108,150,0.22)");
    grd.addColorStop(1, "rgba(60,80,130,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/** A minimal heads-up display: frame, reticle, signal bars and a voice waveform. */
function useHudTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 256;
    const g = c.getContext("2d")!;
    g.strokeStyle = "rgba(170,200,255,0.9)";
    g.fillStyle = "rgba(170,200,255,0.9)";
    g.lineWidth = 3;
    g.lineCap = "round";
    // corner marks
    const m = 18;
    [
      [m, m, 1, 1],
      [512 - m, m, -1, 1],
      [m, 256 - m, 1, -1],
      [512 - m, 256 - m, -1, -1],
    ].forEach(([x, y, sx, sy]) => {
      g.beginPath();
      g.moveTo(x, y + sy * 34);
      g.lineTo(x, y);
      g.lineTo(x + sx * 34, y);
      g.stroke();
    });
    // reticle
    g.beginPath();
    g.arc(140, 128, 46, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.arc(140, 128, 6, 0, Math.PI * 2);
    g.fill();
    // recognition bars
    [150, 210, 120].forEach((wd, i) => {
      g.globalAlpha = 0.85 - i * 0.2;
      g.fillRect(230, 86 + i * 30, wd, 9);
    });
    g.globalAlpha = 1;
    // voice waveform
    g.beginPath();
    for (let x = 230; x <= 470; x += 4) {
      const y = 196 + Math.sin(x * 0.11) * Math.sin(x * 0.023) * 16;
      if (x === 230) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

export function SevaGlasses({
  w,
  animate,
  low,
}: {
  w: React.RefObject<Weights>;
  animate: boolean;
  low?: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const turn = useRef<THREE.Group>(null);
  const hud = useRef<THREE.MeshBasicMaterial>(null);
  const hudTex = useHudTexture();
  const led = useRef<THREE.MeshBasicMaterial>(null);
  const ring = useRef<THREE.MeshBasicMaterial>(null);
  const key = useRef<THREE.PointLight>(null);
  const rim = useRef<THREE.PointLight>(null);
  const top = useRef<THREE.PointLight>(null);
  const backdrop = useRef<THREE.MeshBasicMaterial>(null);
  const glow = useBackdropTexture();
  const shadow = useShadowTexture();

  const geo = useMemo(() => {
    const outer = roundedRect(0.47, 0.275, 0.085);
    outer.holes.push(roundedRect(0.365, 0.19, 0.055));
    const rim = new THREE.ExtrudeGeometry(outer, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.01,
      bevelSegments: 4,
      curveSegments: 18,
    });
    rim.translate(0, 0, -0.025);
    const lens = new THREE.ExtrudeGeometry(roundedRect(0.372, 0.197, 0.058), {
      depth: 0.01,
      bevelEnabled: false,
      curveSegments: 18,
    });
    lens.translate(0, 0, -0.005);
    return { rim, lens };
  }, []);

  const mats = useMemo(() => {
    const frame = new THREE.MeshPhysicalMaterial({
      color: "#111318",
      roughness: 0.32,
      metalness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 2.2,
    });
    const rubber = new THREE.MeshPhysicalMaterial({
      color: "#1b1e24",
      roughness: 0.7,
      metalness: 0,
    });
    const lens = low
      ? new THREE.MeshPhysicalMaterial({
          color: "#8e9bb5",
          roughness: 0.04,
          metalness: 0,
          transparent: true,
          opacity: 0.32,
          clearcoat: 1,
          envMapIntensity: 2,
        })
      : new THREE.MeshPhysicalMaterial({
          color: "#9aa8c2",
          roughness: 0.02,
          metalness: 0,
          transmission: 0.9,
          thickness: 0.02,
          ior: 1.52,
          clearcoat: 1,
          clearcoatRoughness: 0.02,
          attenuationColor: new THREE.Color("#56698f"),
          attenuationDistance: 0.25,
          specularIntensity: 1,
          envMapIntensity: 2.2,
        });
    const camGlass = new THREE.MeshPhysicalMaterial({
      color: "#04060b",
      roughness: 0.04,
      metalness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2,
    });
    const camRing = new THREE.MeshPhysicalMaterial({
      color: "#9aa3b2",
      roughness: 0.25,
      metalness: 1,
      envMapIntensity: 1.4,
    });
    const podium = new THREE.MeshPhysicalMaterial({
      color: "#5a606b",
      roughness: 0.24,
      metalness: 0.9,
      clearcoat: 0.5,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.8,
    });
    const podiumDark = new THREE.MeshPhysicalMaterial({
      color: "#2f343c",
      roughness: 0.3,
      metalness: 0.88,
      envMapIntensity: 1.4,
    });
    return { frame, rubber, lens, camGlass, camRing, podium, podiumDark };
  }, [low]);

  useFrame(({ clock }) => {
    const k = w.current!;
    const on = k.tech;
    if (root.current) root.current.visible = on > 0.01;
    if (!root.current?.visible) {
      if (key.current) key.current.intensity = 0;
      if (rim.current) rim.current.intensity = 0;
      if (top.current) top.current.intensity = 0;
      return;
    }
    const t = clock.elapsedTime;
    // slow, deliberate turntable: a gentle sweep, not a spin
    if (turn.current)
      turn.current.rotation.y =
        0.32 + (animate ? Math.sin(t * 0.32) * 0.34 : 0);
    if (key.current) key.current.intensity = 11 * on;
    if (rim.current) rim.current.intensity = 9 * on;
    if (top.current) top.current.intensity = 6 * on;
    if (backdrop.current) backdrop.current.opacity = 0.9 * on;
    if (led.current)
      led.current.opacity = 0.55 + (animate ? Math.sin(t * 2.4) * 0.35 : 0);
    if (ring.current) ring.current.opacity = 0.75 * on;
    // the heads-up display inside the right lens breathes gently: the glasses are on
    if (hud.current)
      hud.current.opacity =
        on * (0.78 + (animate ? Math.sin(t * 1.1) * 0.12 : 0));
  });

  const hinge = 0.47;
  return (
    <>
      {/* Lights sit outside the toggled group: a constant light count means
        switching slides never forces every shader in the scene to recompile. */}
      <group position={SEVA_AT}>
        <pointLight
          ref={key}
          position={[1.3, 2.1, 1.9]}
          intensity={0}
          distance={6}
          decay={2}
          color="#eef3ff"
        />
        <pointLight
          ref={rim}
          position={[-1.2, 1.4, -1.6]}
          intensity={0}
          distance={5}
          decay={2}
          color={C_SKY}
        />
        <pointLight
          ref={top}
          position={[0.2, 2.7, 0.4]}
          intensity={0}
          distance={4.5}
          decay={2}
          color="#f4f7ff"
        />
      </group>
      <group ref={root} name="seva" position={SEVA_AT} visible={false}>
        {/* studio backdrop: a soft grey-blue glow behind the product, facing the camera */}
        <mesh position={[-1.6, 1.3, -2.5]} rotation={[0, 0.57, 0]}>
          <planeGeometry args={[7, 4.6]} />
          <meshBasicMaterial
            ref={backdrop}
            map={glow}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* podium: brushed metal, a light ring between the tiers */}
        <group scale={[PODIUM_SCALE, 1, PODIUM_SCALE]}>
          <mesh position={[0, 0.1, 0]} material={mats.podiumDark}>
            <cylinderGeometry args={[1.08, 1.12, 0.2, 96]} />
          </mesh>
          <mesh position={[0, 0.206, 0]}>
            <cylinderGeometry args={[1.085, 1.085, 0.012, 96, 1, true]} />
            <meshBasicMaterial
              ref={ring}
              color="#cfe0ff"
              transparent
              opacity={0.75}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0.335, 0]} material={mats.podium}>
            <cylinderGeometry args={[1.0, 1.02, 0.25, 96]} />
          </mesh>
          <mesh
            position={[0, PODIUM_TOP + 0.001, -0.15]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[1.5, 1.35]} />
            <meshBasicMaterial
              map={shadow}
              transparent
              opacity={0.6}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* the glasses */}
        <group ref={turn} position={[0, PODIUM_TOP + 0.2, 0.05]} scale={1.3}>
          <group rotation={[-0.07, 0, 0]}>
            {/* front: two rims with a wrap, brow bar and bridge */}
            {[-1, 1].map((s) => (
              <group
                key={s}
                position={[s * 0.245, 0, -0.012]}
                rotation={[0, s * 0.14, 0]}
              >
                <mesh geometry={geo.rim} material={mats.frame} />
                <mesh geometry={geo.lens} material={mats.lens} />
                {s === 1 && (
                  <mesh position={[0.01, 0.005, 0.009]}>
                    <planeGeometry args={[0.3, 0.15]} />
                    <meshBasicMaterial
                      ref={hud}
                      map={hudTex}
                      transparent
                      opacity={0}
                      depthWrite={false}
                      blending={THREE.AdditiveBlending}
                      toneMapped={false}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                )}
              </group>
            ))}
            <RoundedBox
              args={[0.98, 0.06, 0.06]}
              radius={0.022}
              smoothness={4}
              position={[0, 0.118, -0.02]}
              material={mats.frame}
            />
            <RoundedBox
              args={[0.11, 0.06, 0.05]}
              radius={0.018}
              smoothness={4}
              position={[0, 0.075, 0]}
              material={mats.frame}
            />
            {/* sensor ports on the brow */}
            {[-0.028, 0.028].map((x) => (
              <mesh
                key={x}
                position={[x, 0.149, -0.01]}
                material={mats.camGlass}
              >
                <sphereGeometry args={[0.0065, 12, 12]} />
              </mesh>
            ))}
            {/* nose pads */}
            {[-1, 1].map((s) => (
              <mesh
                key={"n" + s}
                position={[s * 0.058, -0.055, -0.045]}
                rotation={[0.3, 0, s * 0.35]}
                material={mats.rubber}
              >
                <capsuleGeometry args={[0.016, 0.045, 4, 10]} />
              </mesh>
            ))}
            {/* hinge blocks */}
            {[-1, 1].map((s) => (
              <RoundedBox
                key={"h" + s}
                args={[0.07, 0.15, 0.1]}
                radius={0.025}
                smoothness={4}
                position={[s * hinge, 0.04, -0.06]}
                material={mats.frame}
              />
            ))}
            {/* temples: plain left, electronics module on the right */}
            <RoundedBox
              args={[0.042, 0.062, 0.86]}
              radius={0.018}
              smoothness={4}
              position={[-hinge - 0.005, 0.07, -0.53]}
              material={mats.frame}
            />
            <RoundedBox
              args={[0.068, 0.11, 0.38]}
              radius={0.028}
              smoothness={4}
              position={[hinge + 0.004, 0.06, -0.3]}
              material={mats.frame}
            />
            <RoundedBox
              args={[0.042, 0.062, 0.5]}
              radius={0.018}
              smoothness={4}
              position={[hinge, 0.07, -0.72]}
              material={mats.frame}
            />

            {/* camera module at the right hinge */}
            <group position={[hinge, 0.055, -0.006]}>
              <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.camRing}>
                <cylinderGeometry args={[0.027, 0.027, 0.012, 32]} />
              </mesh>
              <mesh
                position={[0, 0, 0.005]}
                rotation={[Math.PI / 2, 0, 0]}
                material={mats.camGlass}
              >
                <cylinderGeometry args={[0.02, 0.02, 0.008, 32]} />
              </mesh>
              <mesh position={[0.006, 0.006, 0.0095]}>
                <sphereGeometry args={[0.004, 10, 10]} />
                <meshBasicMaterial color="#9fc2ff" toneMapped={false} />
              </mesh>
              <mesh position={[0, -0.045, 0.004]}>
                <sphereGeometry args={[0.0045, 10, 10]} />
                <meshBasicMaterial
                  ref={led}
                  color={C_MINT}
                  transparent
                  toneMapped={false}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

const C_SKY = "#8fb3ff";
const C_MINT = "#5ef0c8";
