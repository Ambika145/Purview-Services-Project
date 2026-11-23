"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Weights } from "./TrinityScene";

/**
 * Slide 03, the people: an arc carousel of real Purview workforce photography.
 *
 * Motion follows the AIR people carousel (Details 777b06f00e28409495baa26889770dca):
 * five photo cards on a convex cylinder; the centre card faces the viewer and
 * its neighbours turn away on Y with their outer edges receding. Changing the
 * index glides every card along the arc with a smoothed (damped) index, and a
 * fragment shader smears each card horizontally in proportion to its speed,
 * with rounded corners cut in the shader. AIR's own arc/blur module was not
 * capturable, so the layout and timing are matched to its recorded frames.
 *
 * Here the index advances on a timer while the slide is showing and also moves
 * with page scroll. Hidden (and paused) unless the Workforce slide is showing.
 */

export const WALL_AT = new THREE.Vector3(-5.4, 0, 1.0);

const CARDS = [
  { src: "/img/workforce-professionals.jpg", aspect: 1536 / 1024 }, // corporate team at work
  { src: "/img/rtd.jpg", aspect: 1536 / 1024 }, // engineers on the data-centre floor
  { src: "/img/volume-recruitment.jpg", aspect: 1536 / 1024 }, // recruitment
  { src: "/img/offshore.jpg", aspect: 1536 / 1024 }, // distributed delivery team
  { src: "/img/workforce-team.jpg", aspect: 1 }, // operations team
];
const N = CARDS.length;

const CARD_W = 2.9;
const CARD_H = CARD_W / 1.5;
const RADIUS = 6.2; // cylinder radius
const STEP = 0.57; // radians between card centres: wide gaps, as in AIR
const CENTRE_Y = 1.55;
const FACE_CAMERA = 0.33; // turn the whole arc toward the Workforce camera
const AUTO_EVERY = 2.15; // seconds per card while the slide shows
const SCROLL_CARDS = 1.6; // cards travelled across a full hero scroll

/** Shortest signed distance from the centre index, wrapped into [-N/2, N/2). */
const wrap = (x: number) => ((((x + N / 2) % N) + N) % N) - N / 2;

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uImgAspect;   // image width / height
  uniform float uCardAspect;  // card width / height
  uniform float uBlur;        // horizontal smear, in UV units
  uniform float uShift;       // inner parallax as the card travels the arc
  uniform float uOpacity;
  uniform float uRadius;      // corner radius, in card-height units
  varying vec2 vUv;

  vec2 coverUv(vec2 uv) {
    // object-fit: cover
    vec2 s = uImgAspect > uCardAspect ? vec2(uCardAspect / uImgAspect, 1.0) : vec2(1.0, uImgAspect / uCardAspect);
    return (uv - 0.5) * s + 0.5;
  }

  void main() {
    // rounded corners
    vec2 p = (vUv - 0.5) * vec2(uCardAspect, 1.0);
    vec2 h = vec2(uCardAspect, 1.0) * 0.5 - uRadius;
    float d = length(max(abs(p) - h, 0.0)) - uRadius;
    float edge = 1.0 - smoothstep(-0.004, 0.004, d);
    if (edge <= 0.0) discard;

    vec2 uv = vUv;
    uv.x = 0.5 + (uv.x - 0.5) * 0.94 + uShift; // a little overscan for the inner parallax
    uv = coverUv(uv);

    // horizontal motion blur: weighted taps along x, scaled by card speed
    vec4 c = vec4(0.0);
    float wsum = 0.0;
    for (int i = -6; i <= 6; i++) {
      float t = float(i) / 6.0;
      float w = 1.0 - abs(t) * 0.7;
      c += texture2D(uMap, clamp(uv + vec2(t * uBlur, 0.0), 0.0, 1.0)) * w;
      wsum += w;
    }
    c /= wsum;

    gl_FragColor = vec4(c.rgb, uOpacity * edge);
    #include <colorspace_fragment>
  }
`;

export function WorkforceWall({ w, animate, progress }: { w: React.RefObject<Weights>; animate: boolean; progress: React.RefObject<number> }) {
  const root = useRef<THREE.Group>(null);
  const cards = useRef<(THREE.Mesh | null)[]>([]);
  const fill = useRef<THREE.PointLight>(null);
  const state = useRef({ index: 0, target: 0, last: 0, timer: 0, vel: 0 });
  const textures = useTexture(CARDS.map((c) => c.src));
  useLayoutEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.generateMipmaps = true;
      t.needsUpdate = true;
    });
  }, [textures]);

  const geometry = useMemo(() => new THREE.PlaneGeometry(CARD_W, CARD_H, 1, 1), []);
  const materials = useMemo(
    () =>
      CARDS.map(
        (c, i) =>
          new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true,
            depthWrite: false,
            uniforms: {
              uMap: { value: textures[i] },
              uImgAspect: { value: c.aspect },
              uCardAspect: { value: CARD_W / CARD_H },
              uBlur: { value: 0 },
              uShift: { value: 0 },
              uOpacity: { value: 0 },
              uRadius: { value: 0.035 },
            },
          }),
      ),
    [textures],
  );
  useLayoutEffect(
    () => () => {
      materials.forEach((m) => m.dispose());
      geometry.dispose();
    },
    [materials, geometry],
  );

  useFrame((_, dt) => {
    const on = w.current!.people;
    if (root.current) root.current.visible = on > 0.01;
    if (fill.current) fill.current.intensity = 4 * on;
    if (!root.current?.visible) return;

    const s = state.current;
    const step = Math.min(dt, 0.05);
    // advance one card at a time while the slide is in focus
    if (animate && on > 0.6) {
      s.timer += step;
      if (s.timer >= AUTO_EVERY) {
        s.timer = 0;
        s.target += 1;
      }
    }
    // page scroll moves the arc too (continuous, not snapped)
    const scrollOffset = (progress.current ?? 0) * SCROLL_CARDS;
    const goal = s.target + scrollOffset;
    // smoothed index: critically damped toward the goal
    const k = animate ? 1 - Math.exp(-step * 3.4) : 1;
    const before = s.index;
    s.index += (goal - s.index) * k;
    const v = step > 0 ? (s.index - before) / step : 0;
    s.vel += (v - s.vel) * Math.min(1, step * 14); // light smoothing so the blur never flickers

    const blur = Math.min(0.045, Math.abs(s.vel) * 0.03);
    for (let i = 0; i < N; i++) {
      const mesh = cards.current[i];
      if (!mesh) continue;
      const o = wrap(i - s.index); // offset from centre, in cards
      const a = o * STEP;
      mesh.position.set(Math.sin(a) * RADIUS, 0, Math.cos(a) * RADIUS - RADIUS);
      mesh.rotation.y = a;
      // three cards in view; the rest fade out past the edges instead of popping
      const vis = 1 - THREE.MathUtils.smoothstep(Math.abs(o), 1.35, 1.95);
      mesh.visible = vis > 0.001;
      const u = (mesh.material as THREE.ShaderMaterial).uniforms;
      u.uOpacity.value = vis * on;
      u.uBlur.value = blur * (0.55 + Math.min(1, Math.abs(o)) * 0.45);
      u.uShift.value = THREE.MathUtils.clamp(-o * 0.025, -0.03, 0.03);
      mesh.renderOrder = 10 - Math.round(Math.abs(o) * 2);
    }
  });

  return (
    <>
      {/* outside the toggled group: constant light count, no recompiles on switch */}
      <group position={WALL_AT}>
        <pointLight ref={fill} position={[1.5, 2.6, 3.2]} intensity={0} distance={7} decay={2} color="#dfe8ff" />
      </group>
      <group ref={root} name="workforce" position={WALL_AT} visible={false}>
        <group position={[0, CENTRE_Y, 0]} rotation={[0, FACE_CAMERA, 0]}>
          {CARDS.map((c, i) => (
            <mesh
              key={c.src}
              ref={(m) => {
                cards.current[i] = m;
              }}
              geometry={geometry}
              material={materials[i]}
            />
          ))}
        </group>
      </group>
    </>
  );
}
