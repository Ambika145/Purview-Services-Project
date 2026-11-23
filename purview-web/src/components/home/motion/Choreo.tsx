"use client";

import { useRef, type ReactNode } from "react";
import { useScrollScene } from "./useScrollScene";
import { SCENES, type SceneName } from "./scenes";

/**
 * A <section> that attaches a named scroll choreography to server-rendered
 * children. The markup stays a server component (no hydration cost for the
 * content); only this small wrapper runs on the client.
 */
export function Choreo({
  scene,
  desktopOnly = false,
  eager = false,
  children,
  className,
  id,
  labelledBy,
}: {
  scene: SceneName;
  desktopOnly?: boolean;
  eager?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollScene(ref, SCENES[scene], { desktopOnly, eager });
  return (
    <section ref={ref} id={id} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
