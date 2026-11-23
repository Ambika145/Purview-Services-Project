"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { useInView, useSceneCapability } from "@/components/three/SceneGate";
import type { RackInfo } from "@/components/three/DataHallScene";

const DataHallScene = dynamic(() => import("@/components/three/DataHallScene"), { ssr: false });

export function DataHallVisual() {
  const cap = useSceneCapability();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [rack, setRack] = useState<RackInfo>(null);
  const use3D = cap && cap.webgl && !cap.mobile;

  return (
    <div ref={ref} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-abyss lg:aspect-auto lg:h-full">
      {use3D ? (
        <>
          <div className="absolute inset-0 cursor-grab active:cursor-grabbing" aria-hidden>
            <DataHallScene animate={!cap.reduced} active={inView} onHover={setRack} />
          </div>
          <div className="pointer-events-none absolute top-4 left-4 rounded border border-sky/20 bg-abyss/80 px-3 py-2 backdrop-blur" aria-live="polite">
            <p className="t-mono text-[0.65rem] text-on-dark-muted">{rack ? `ROW ${rack.row} · RACK ${String(rack.index).padStart(2, "0")}` : "GPU FLOOR · 4 ROWS · 48 RACKS"}</p>
            <p className="text-sm font-bold text-on-dark">{rack ? (rack.live ? "Commissioned · L5 passed" : "Installed · awaiting commissioning") : cap.reduced ? "All racks commissioned" : "Commissioning in progress"}</p>
          </div>
          <p className="t-mono pointer-events-none absolute right-4 bottom-4 text-[0.65rem] text-on-dark-muted">Drag to orbit · illustrative model</p>
        </>
      ) : (
        <>
          <Image src="/img/dc-corridor-light.jpg" alt="Illustrative image of a lit data hall aisle between server racks" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <p className="t-mono absolute right-3 bottom-3 rounded bg-abyss/70 px-2 py-1 text-[0.65rem] text-on-dark">Illustrative imagery</p>
        </>
      )}
      <ul className="pointer-events-none absolute bottom-4 left-4 flex gap-4 text-[0.7rem] text-on-dark-muted" aria-hidden={!use3D}>
        {use3D && (
          <>
            <li className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 bg-[#5ef0c8]" /> Live
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 bg-[#2a3a72]" /> Installed
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
