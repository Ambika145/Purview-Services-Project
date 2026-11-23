/**
 * Illustrative agent workflow, drawn as a technical schematic:
 * business input → SAIE orchestration (agents + tools + guardrails) →
 * human review on exceptions → system of record. Pure SVG; the signal
 * animation is CSS and stops under prefers-reduced-motion.
 */
export type WorkflowLabels = { input: string; agents: [string, string, string] | string[]; review: string; output: string };

const DEFAULT_LABELS: WorkflowLabels = { input: "claim · KYC · ticket", agents: ["classify, extract", "plan, decide", "execute, draft"], review: "approve or correct", output: "updated, with an" };

export function AgentWorkflow({ dark = true, className = "", labels = DEFAULT_LABELS }: { dark?: boolean; className?: string; labels?: WorkflowLabels }) {
  const fg = dark ? "#f3f6ff" : "#14203f";
  const muted = dark ? "#b8c6ea" : "#5a6788";
  const line = dark ? "rgba(143,179,255,.35)" : "rgba(23,48,111,.25)";
  const panel = dark ? "rgba(10,21,56,.85)" : "#ffffff";
  const stroke = dark ? "rgba(143,179,255,.28)" : "#d6ddee";
  return (
    <svg viewBox="0 0 640 460" className={className} role="img" aria-labelledby="wf-t wf-d">
      <title id="wf-t">Illustrative agentic workflow</title>
      <desc id="wf-d">A business request enters the Secure AI Engine, where agents call tools under guardrails. Exceptions go to a human reviewer; completed work is written back to the system of record with an audit log.</desc>
      <defs>
        <marker id="wf-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8" fill="none" stroke={muted} strokeWidth="1.2" />
        </marker>
      </defs>

      {/* orchestration boundary */}
      <rect x="170" y="40" width="300" height="300" rx="10" fill="none" stroke="#ff8a3d" strokeOpacity=".55" strokeDasharray="4 5" />
      <text x="186" y="64" fill="#ff8a3d" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.5">SAIE · ORCHESTRATION</text>
      <text x="186" y="80" fill={muted} fontFamily="var(--font-mono)" fontSize="10">inside your data boundary</text>

      {/* input */}
      <g>
        <rect x="16" y="170" width="120" height="74" rx="8" fill={panel} stroke={stroke} />
        <text x="30" y="194" fill={muted} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">INPUT</text>
        <text x="30" y="214" fill={fg} fontSize="14" fontWeight="700">Business request</text>
        <text x="30" y="232" fill={muted} fontSize="11">{labels.input}</text>
      </g>

      {/* agents */}
      {[
        { y: 104, t: "Intake agent", s: labels.agents[0] },
        { y: 178, t: "Reasoning agent", s: labels.agents[1] },
        { y: 252, t: "Action agent", s: labels.agents[2] },
      ].map((a) => (
        <g key={a.t}>
          <rect x="196" y={a.y} width="132" height="56" rx="8" fill={panel} stroke={stroke} />
          <circle cx="212" cy={a.y + 18} r="4" fill="#8fb3ff" />
          <text x="224" y={a.y + 22} fill={fg} fontSize="13" fontWeight="700">{a.t}</text>
          <text x="212" y={a.y + 42} fill={muted} fontSize="11">{a.s}</text>
        </g>
      ))}

      {/* tools + guardrails */}
      {[
        { y: 104, t: "Tools & APIs" },
        { y: 178, t: "Knowledge · RAG" },
        { y: 252, t: "Guardrails · eval" },
      ].map((tl) => (
        <g key={tl.t}>
          <rect x="350" y={tl.y + 10} width="102" height="36" rx="6" fill="none" stroke={stroke} />
          <text x="362" y={tl.y + 33} fill={muted} fontSize="11.5">{tl.t}</text>
          <line x1="328" y1={tl.y + 28} x2="350" y2={tl.y + 28} stroke={line} />
        </g>
      ))}

      {/* review + output */}
      <g>
        <rect x="500" y="96" width="126" height="70" rx="8" fill={panel} stroke="#ff8a3d" strokeOpacity=".6" />
        <text x="514" y="120" fill="#ff8a3d" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">EXCEPTIONS</text>
        <text x="514" y="140" fill={fg} fontSize="13.5" fontWeight="700">Human review</text>
        <text x="514" y="156" fill={muted} fontSize="11">{labels.review}</text>
      </g>
      <g>
        <rect x="500" y="222" width="126" height="84" rx="8" fill={panel} stroke={stroke} />
        <text x="514" y="246" fill={muted} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1">OUTPUT</text>
        <text x="514" y="266" fill={fg} fontSize="13.5" fontWeight="700">System of record</text>
        <text x="514" y="284" fill={muted} fontSize="11">{labels.output === DEFAULT_LABELS.output ? "updated, with an" : labels.output}</text>
        <text x="514" y="298" fill={muted} fontSize="11">audit log per action</text>
      </g>

      {/* connections */}
      <g fill="none" stroke={line} strokeWidth="1.2">
        <path d="M136 207 C160 207 170 132 196 132" markerEnd="url(#wf-arrow)" />
        <path d="M136 207 L196 206" markerEnd="url(#wf-arrow)" />
        <path d="M136 207 C160 207 170 280 196 280" markerEnd="url(#wf-arrow)" />
        <path d="M262 160 L262 178" markerEnd="url(#wf-arrow)" />
        <path d="M262 234 L262 252" markerEnd="url(#wf-arrow)" />
        <path d="M470 150 C485 150 485 131 500 131" markerEnd="url(#wf-arrow)" />
        <path d="M470 270 L500 264" markerEnd="url(#wf-arrow)" />
        <path d="M563 166 L563 222" strokeDasharray="3 4" markerEnd="url(#wf-arrow)" />
      </g>

      {/* the signal: one request travelling through the system */}
      <path id="wf-signal" d="M136 207 L196 206 L262 206 L262 252 L262 280 L328 280 L470 270 L500 264" fill="none" stroke="#ff8a3d" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="22 600" className="motion-safe:animate-[wfsignal_4.8s_cubic-bezier(.65,0,.35,1)_infinite]" />
      <style>{`@keyframes wfsignal { from { stroke-dashoffset: 22; } to { stroke-dashoffset: -560; } }`}</style>

      {/* legend */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill={muted} letterSpacing="1">
        <circle cx="22" cy="392" r="4" fill="#8fb3ff" />
        <text x="34" y="396">AGENT</text>
        <rect x="96" y="386" width="12" height="12" rx="2" fill="none" stroke="#ff8a3d" />
        <text x="116" y="396">HUMAN IN THE LOOP</text>
        <line x1="262" y1="392" x2="290" y2="392" stroke="#ff8a3d" strokeWidth="2.2" />
        <text x="298" y="396">ONE REQUEST</text>
        <text x="16" y="430" fill={muted} opacity=".8">ILLUSTRATIVE SCHEMATIC · NOT A PRODUCT SCREENSHOT</text>
      </g>
    </svg>
  );
}
