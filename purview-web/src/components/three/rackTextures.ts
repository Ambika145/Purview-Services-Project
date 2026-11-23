import * as THREE from "three";

/**
 * Procedural rack faceplate textures (no downloaded assets).
 * colour map: 42U rack with server/switch bezels; emissive map: status LEDs only.
 * Generic hardware, not a specific OEM product.
 */
export function makeRackTextures(seed = 7) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;

  const W = 256;
  const H = 768;
  const color = document.createElement("canvas");
  const glow = document.createElement("canvas");
  color.width = glow.width = W;
  color.height = glow.height = H;
  const c = color.getContext("2d")!;
  const g = glow.getContext("2d")!;

  c.fillStyle = "#0d1838";
  c.fillRect(0, 0, W, H);
  g.fillStyle = "#000";
  g.fillRect(0, 0, W, H);

  // rails
  c.fillStyle = "#1c2a58";
  c.fillRect(0, 0, 14, H);
  c.fillRect(W - 14, 0, 14, H);

  const U = H / 44;
  let y = U;
  while (y < H - U * 2) {
    const r = rand();
    const units = r < 0.55 ? 2 : r < 0.8 ? 1 : 4; // GPU servers are tall
    const h = units * U - 3;
    const isGpu = units === 4;
    c.fillStyle = isGpu ? "#1a2a5c" : r < 0.65 ? "#15224b" : "#1b2a57";
    c.fillRect(18, y, W - 36, h);
    // vents
    c.fillStyle = "#0e1838";
    for (let x = 30; x < W - 60; x += 6) c.fillRect(x, y + 4, 3, h - 8);
    // bezel highlight
    c.fillStyle = "rgba(143,179,255,0.28)";
    c.fillRect(18, y, W - 36, 1);
    // LEDs
    const leds = isGpu ? 6 : 3;
    for (let i = 0; i < leds; i++) {
      const lx = W - 40 + (i % 3) * 7;
      const ly = y + 6 + Math.floor(i / 3) * 8;
      const k = rand();
      const col = k < 0.72 ? "#8fb3ff" : k < 0.93 ? "#5ef0c8" : "#ff8a3d";
      g.fillStyle = col;
      g.fillRect(lx, ly, 3, 3);
      c.fillStyle = col;
      c.fillRect(lx, ly, 3, 3);
    }
    if (isGpu) {
      // light bar on accelerator trays
      g.fillStyle = "rgba(143,179,255,0.55)";
      g.fillRect(30, y + h - 5, W - 90, 1.5);
    }
    y += units * U;
    if (rand() < 0.12) y += U; // blank panel
  }

  const map = new THREE.CanvasTexture(color);
  const emissiveMap = new THREE.CanvasTexture(glow);
  map.colorSpace = THREE.SRGBColorSpace;
  emissiveMap.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = emissiveMap.anisotropy = 4;
  return { map, emissiveMap };
}
