"use client";

import { useSyncExternalStore, type ReactNode } from "react";

type Version = "a" | "b";
const KEY = "purview-eco-version";
const EVENT = "purview-eco-version";
const DEFAULT: Version = "b";
/** In-session choice: works even when browser storage is blocked. */
let memory: Version | null = null;

function read(): Version {
  if (memory) return memory;
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "a" || saved === "b") return saved;
  } catch {
    /* storage unavailable */
  }
  return DEFAULT;
}
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
function write(v: Version) {
  memory = v;
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* storage unavailable: the choice still applies via the event below */
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Ecosystem section only: switch between two designs of the capability map.
 *   A — the previous map (field of nodes around the core)
 *   B — the current map (core with two families of six)
 * Only the selected version is mounted. The choice is remembered per browser.
 */
export function EcoSwitch({ a, b }: { a: ReactNode; b: ReactNode }) {
  const v = useSyncExternalStore(subscribe, read, () => DEFAULT);

  return (
    <>
      <div className="eco-switch" role="group" aria-label="Ecosystem map version">
        <span className="eco-switch-label">Version</span>
        {(["a", "b"] as const).map((k) => (
          <button
            key={k}
            type="button"
            className="eco-switch-btn"
            aria-pressed={v === k}
            onClick={() => write(k)}
            title={k === "a" ? "Version A: previous map" : "Version B: current map"}
          >
            {k.toUpperCase()}
            <span className="sr-only">{k === "a" ? " (previous map)" : " (current map)"}</span>
          </button>
        ))}
      </div>
      {v === "a" ? a : b}
    </>
  );
}
