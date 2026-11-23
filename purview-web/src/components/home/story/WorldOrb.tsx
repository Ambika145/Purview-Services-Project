/**
 * Wireframe network orb for World in Motion.
 * Adapted from Details references (Ethnocare cyan contour language + Optikka
 * abstract object presence) as a production SVG/CSS graphic — not a canvas
 * frame sequence. Decorative only; section copy carries meaning.
 */
export function WorldOrb() {
  return (
    <div className="world-orb" aria-hidden>
      <div className="world-orb-glow world-orb-glow-cyan" />
      <div className="world-orb-glow world-orb-glow-purple" />
      <div className="world-orb-stage">
        <svg className="world-orb-svg" viewBox="0 0 480 480" fill="none">
          <defs>
            <radialGradient id="world-core" cx="36%" cy="30%" r="68%">
              <stop offset="0%" stopColor="#0FA9D2" stopOpacity=".42" />
              <stop offset="42%" stopColor="#5E54A4" stopOpacity=".28" />
              <stop offset="100%" stopColor="#060d26" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="world-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0FA9D2" stopOpacity=".12" />
              <stop offset="48%" stopColor="#0FA9D2" stopOpacity=".9" />
              <stop offset="100%" stopColor="#5E54A4" stopOpacity=".18" />
            </linearGradient>
            <linearGradient id="world-meridian" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#0FA9D2" stopOpacity="0" />
              <stop offset="50%" stopColor="#0FA9D2" stopOpacity=".65" />
              <stop offset="100%" stopColor="#5E54A4" stopOpacity="0" />
            </linearGradient>
            <filter id="world-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          <circle cx="240" cy="240" r="118" fill="url(#world-core)" />

          {/* latitude bands */}
          <g className="world-orb-lat">
            <ellipse cx="240" cy="240" rx="118" ry="118" stroke="url(#world-ring)" strokeWidth="1.25" />
            <ellipse cx="240" cy="240" rx="118" ry="86" stroke="rgba(15,169,210,.32)" strokeWidth="1" />
            <ellipse cx="240" cy="240" rx="118" ry="52" stroke="rgba(94,84,164,.28)" strokeWidth="1" />
            <ellipse cx="240" cy="240" rx="118" ry="22" stroke="rgba(15,169,210,.2)" strokeWidth="1" />
          </g>

          {/* meridians */}
          <g className="world-orb-mer">
            <ellipse cx="240" cy="240" rx="42" ry="118" stroke="url(#world-meridian)" strokeWidth="1.1" />
            <ellipse cx="240" cy="240" rx="78" ry="118" stroke="rgba(15,169,210,.24)" strokeWidth="1" />
            <ellipse cx="240" cy="240" rx="108" ry="118" stroke="rgba(94,84,164,.2)" strokeWidth="1" />
            <line x1="240" y1="122" x2="240" y2="358" stroke="rgba(15,169,210,.22)" strokeWidth="1" />
          </g>

          {/* outer orbital rings — Ethnocare-like contour trails */}
          <g className="world-orb-ring world-orb-ring-a">
            <ellipse cx="240" cy="240" rx="168" ry="62" stroke="rgba(15,169,210,.42)" strokeWidth="1.3" strokeDasharray="3 9" filter="url(#world-soft)" />
            <circle cx="396" cy="220" r="3.6" fill="#0FA9D2" />
            <circle cx="396" cy="220" r="9" fill="rgba(15,169,210,.2)" />
          </g>
          <g className="world-orb-ring world-orb-ring-b">
            <ellipse cx="240" cy="240" rx="148" ry="148" stroke="rgba(94,84,164,.35)" strokeWidth="1.1" strokeDasharray="2 13" />
            <circle cx="132" cy="340" r="2.6" fill="#5E54A4" />
            <circle cx="132" cy="340" r="7.5" fill="rgba(94,84,164,.22)" />
          </g>
          <g className="world-orb-ring world-orb-ring-c">
            <ellipse cx="240" cy="240" rx="195" ry="78" stroke="rgba(15,169,210,.3)" strokeWidth="1" strokeDasharray="1 8" transform="rotate(-28 240 240)" />
            <circle cx="360" cy="330" r="2.8" fill="#0FA9D2" />
          </g>

          {/* network mesh */}
          <g className="world-orb-nodes">
            <circle cx="198" cy="188" r="2.3" fill="#0FA9D2" />
            <circle cx="268" cy="168" r="2" fill="#0FA9D2" />
            <circle cx="292" cy="228" r="2.5" fill="#0FA9D2" />
            <circle cx="214" cy="268" r="2" fill="#5E54A4" />
            <circle cx="252" cy="298" r="1.9" fill="#0FA9D2" />
            <circle cx="176" cy="236" r="1.7" fill="#5E54A4" />
            <circle cx="310" cy="196" r="1.8" fill="#0FA9D2" />
            <path
              d="M198 188 L268 168 L292 228 L214 268 L252 298 M198 188 L176 236 L214 268 M268 168 L310 196 L292 228"
              stroke="rgba(15,169,210,.34)"
              strokeWidth="1"
              fill="none"
            />
          </g>

          <ellipse cx="240" cy="240" rx="118" ry="18" stroke="rgba(15,169,210,.5)" strokeWidth="1.3" className="world-orb-pulse" />
          <circle cx="240" cy="240" r="118" stroke="rgba(15,169,210,.5)" strokeWidth="1.5" />
          <circle cx="240" cy="240" r="128" stroke="rgba(94,84,164,.18)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
