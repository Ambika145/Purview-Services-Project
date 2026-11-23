"use client";

import { useState } from "react";
import { TECH } from "@/content/verticals";
import { AgentWorkflow } from "@/components/visuals/AgentWorkflow";

/**
 * How enterprise AI works in practice: pick a workflow named on the AI
 * Solutions page and the schematic re-labels the request, the agent steps,
 * the human review point and the system-of-record outcome.
 */
export function WorkflowExplorer() {
  const [i, setI] = useState(0);
  const u = TECH.useCases[i];
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-m)] border border-sky/15 bg-ink">
      <div className="blueprint absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex flex-wrap gap-2 border-b border-sky/15 p-3" role="group" aria-label="Choose a workflow">
        {TECH.useCases.map((x, k) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={k === i}
            onClick={() => setI(k)}
            className={`min-h-10 rounded px-3 text-sm font-bold transition-colors ${k === i ? "bg-accent text-[#1a0d04]" : "text-on-dark-muted hover:bg-abyss hover:text-on-dark"}`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="relative p-4 sm:p-6" aria-live="polite">
        <AgentWorkflow key={u.id} className="h-auto w-full motion-safe:animate-[fadeUp_.5s_cubic-bezier(.22,1,.36,1)_both]" labels={{ input: u.input, agents: u.agents, review: u.review, output: u.output }} />
        <p className="sr-only">
          {u.label}: {u.input} enters the Secure AI Engine. Agents {u.agents.join(", ")}. {u.review} go to human review. Outcome: {u.output}, with an audit log per action.
        </p>
      </div>
    </div>
  );
}
