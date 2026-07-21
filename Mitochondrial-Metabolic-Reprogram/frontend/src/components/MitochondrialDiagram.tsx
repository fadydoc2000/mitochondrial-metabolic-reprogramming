import './MitochondrialDiagram.css'

export default function MitochondrialDiagram() {
  return (
    <div className="mito-diagram">
      <div className="mito-panel mito-panel--healthy">
        <div className="mito-panel-label mito-panel-label--healthy">Healthy cell</div>
        <HealthyCell />
        <div className="mito-panel-caption">
          Pyruvate and BHB cross the inner membrane. PDC and ketolysis
          convert them to Acetyl-CoA inside the matrix, feeding the Krebs
          cycle and oxidative phosphorylation. GKI &lt; 1.0.
        </div>
      </div>

      <div className="mito-divider">
        <div className="mito-divider-line" />
        <div className="mito-divider-badge">vs</div>
        <div className="mito-divider-line" />
      </div>

      <div className="mito-panel mito-panel--damaged">
        <div className="mito-panel-label mito-panel-label--damaged">Damaged mitochondria</div>
        <DamagedCell />
        <div className="mito-panel-caption">
          Cristae failure blocks mitochondrial entry. Pyruvate is reduced to
          lactate by LDH in the cytoplasm (Warburg effect). Only 2 ATP per
          glucose. GKI &gt; 3.0.
        </div>
      </div>
    </div>
  )
}

/* ─── Shared SVG defs id prefix convention: hc- = healthy, dc- = damaged ─── */

function HealthyCell() {
  return (
    <svg
      viewBox="0 0 320 500"
      xmlns="http://www.w3.org/2000/svg"
      className="mito-svg"
      aria-label="Healthy cell: glucose and BHB cross the mitochondrial membrane, converted to Acetyl-CoA inside the matrix, feeding the Krebs cycle and ATP production via oxidative phosphorylation"
    >
      <defs>
        <radialGradient id="hc-glu" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#16a34a" />
        </radialGradient>
        <radialGradient id="hc-bhb" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id="hc-mito-grd" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="hc-atp-grd" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
        <filter id="hc-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="hc-atp-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="hc-arr-g" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4ade80" />
        </marker>
        <marker id="hc-arr-b" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#60a5fa" />
        </marker>
        <marker id="hc-arr-w" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
        <marker id="hc-arr-y" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#fbbf24" />
        </marker>
      </defs>

      {/* ── Cell membrane outline ── */}
      <ellipse cx="160" cy="250" rx="148" ry="242" fill="none" stroke="#1e3a5f" strokeWidth="2" strokeDasharray="6 3" opacity="0.45" />
      <text x="160" y="15" fontSize="8" fill="#475569" textAnchor="middle" fontFamily="monospace" letterSpacing="1.5">CELL MEMBRANE</text>

      {/* ──── FUEL SOURCES (cytoplasm) ──── */}
      {/* Glucose */}
      <g className="hc-fuel-glucose">
        <circle cx="80" cy="90" r="24" fill="url(#hc-glu)" filter="url(#hc-glow)" />
        <text x="80" y="86" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Glucose</text>
        <text x="80" y="98" fontSize="7" fill="#bbf7d0" textAnchor="middle">C₆H₁₂O₆</text>
      </g>

      {/* CYTOPLASM label — between the two fuel nodes */}
      <text x="160" y="90" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace" dominantBaseline="middle">CYTOPLASM</text>

      {/* BHB / Ketones */}
      <g className="hc-fuel-bhb">
        <circle cx="242" cy="90" r="24" fill="url(#hc-bhb)" filter="url(#hc-glow)" />
        <text x="242" y="86" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">BHB</text>
        <text x="242" y="98" fontSize="7" fill="#bfdbfe" textAnchor="middle">ketone</text>
      </g>

      {/* ──── GLYCOLYSIS: Glucose → Pyruvate in cytoplasm ──── */}
      <path id="hc-p-glyc" d="M 80 114 L 80 134" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" markerEnd="url(#hc-arr-g)" />
      <text x="56" y="128" fontSize="7.5" fill="#4ade80" fontFamily="monospace">Glycolysis</text>

      {/* animated dots: glucose → pyruvate */}
      <circle r="3" fill="#4ade80" opacity="0.9"><animateMotion dur="2s" repeatCount="indefinite"><mpath href="#hc-p-glyc" /></animateMotion></circle>
      <circle r="3" fill="#4ade80" opacity="0.6"><animateMotion dur="2s" begin="0.7s" repeatCount="indefinite"><mpath href="#hc-p-glyc" /></animateMotion></circle>

      {/* Pyruvate node — cytoplasm */}
      <rect x="44" y="136" width="72" height="24" rx="7" fill="#1e3a5f" stroke="#4ade80" strokeWidth="1.2" />
      <text x="80" y="152" fontSize="9" fontWeight="600" fill="#86efac" textAnchor="middle" fontFamily="monospace">Pyruvate</text>

      {/* ──── MITOCHONDRIAL ENTRY — arrows cross into the oval ──── */}
      {/* Pyruvate crossing arrow (MPC) — from cytoplasm into mito oval */}
      <path id="hc-p-pyr-entry" d="M 80 160 L 80 200" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#hc-arr-g)" opacity="0.8" />
      <text x="38" y="184" fontSize="6.5" fill="#4ade80" fontFamily="monospace">MPC ↓</text>
      <circle r="2.5" fill="#86efac"><animateMotion dur="1.2s" repeatCount="indefinite"><mpath href="#hc-p-pyr-entry" /></animateMotion></circle>

      {/* BHB path: BHB → crosses into mito */}
      <path id="hc-p-bhb-entry" d="M 242 114 L 242 200" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#hc-arr-b)" opacity="0.8" />
      <text x="250" y="152" fontSize="7" fill="#60a5fa" fontFamily="monospace">enters</text>
      <text x="250" y="162" fontSize="7" fill="#60a5fa" fontFamily="monospace">matrix</text>
      <circle r="2.5" fill="#60a5fa"><animateMotion dur="1.8s" begin="0.4s" repeatCount="indefinite"><mpath href="#hc-p-bhb-entry" /></animateMotion></circle>
      <circle r="2.5" fill="#60a5fa"><animateMotion dur="1.8s" begin="1.2s" repeatCount="indefinite"><mpath href="#hc-p-bhb-entry" /></animateMotion></circle>

      {/* ──── MITOCHONDRIA BODY ──── */}
      <g className="hc-mito-body">
        {/* Outer membrane */}
        <ellipse cx="160" cy="308" rx="134" ry="110" fill="url(#hc-mito-grd)" stroke="#334155" strokeWidth="2" />
        {/* Intermembrane space */}
        <ellipse cx="160" cy="308" rx="118" ry="95" fill="#0d1b2e" stroke="#1e3a5f" strokeWidth="1.5" />
        {/* Matrix */}
        <ellipse cx="160" cy="308" rx="102" ry="80" fill="#071020" />

        {/* MITOCHONDRIA label */}
        <text x="160" y="202" fontSize="7.5" fill="#475569" textAnchor="middle" fontFamily="monospace" letterSpacing="1">MITOCHONDRIA</text>

        {/* Cristae — inner membrane folds */}
        {[-44,-22,0,22,44].map((o, i) => (
          <line key={i} x1={160+o} y1={228} x2={160+o} y2={254} stroke="#1e40af" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
        ))}
        {[-33,-11,11,33].map((o, i) => (
          <line key={`b${i}`} x1={160+o} y1={362} x2={160+o} y2={388} stroke="#1e40af" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
        ))}

        {/* PDC conversion: pyruvate → Acetyl-CoA (top-left of matrix) */}
        <path id="hc-p-pdc" d="M 80 200 Q 80 220 108 238" fill="none" stroke="#4ade80" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
        <circle r="2.5" fill="#86efac"><animateMotion dur="1.4s" repeatCount="indefinite"><mpath href="#hc-p-pdc" /></animateMotion></circle>
        <text x="62" y="224" fontSize="6.5" fill="#4ade80" fontFamily="monospace">PDC</text>
        <text x="62" y="233" fontSize="5.5" fill="#4ade80" fontFamily="monospace">(pyruvate</text>
        <text x="62" y="241" fontSize="5.5" fill="#4ade80" fontFamily="monospace">dehydrogenase)</text>

        {/* Ketolysis: BHB → Acetyl-CoA (top-right of matrix) */}
        <path id="hc-p-keto" d="M 242 200 Q 242 220 212 238" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
        <circle r="2.5" fill="#60a5fa"><animateMotion dur="1.6s" begin="0.5s" repeatCount="indefinite"><mpath href="#hc-p-keto" /></animateMotion></circle>
        <text x="218" y="222" fontSize="6.5" fill="#60a5fa" fontFamily="monospace">Ketolysis</text>
        <text x="218" y="231" fontSize="5.5" fill="#60a5fa" fontFamily="monospace">(SCOT /</text>
        <text x="218" y="239" fontSize="5.5" fill="#60a5fa" fontFamily="monospace">thiolase)</text>

        {/* Acetyl-CoA hub — INSIDE MATRIX */}
        <rect x="118" y="240" width="84" height="22" rx="7" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.2" />
        <text x="160" y="255" fontSize="9" fontWeight="700" fill="#93c5fd" textAnchor="middle" fontFamily="monospace">Acetyl-CoA</text>

        {/* Acetyl-CoA → Krebs arrow */}
        <path id="hc-p-acoa" d="M 160 262 L 160 280" fill="none" stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#hc-arr-w)" />
        <circle r="2" fill="#e2e8f0"><animateMotion dur="0.9s" repeatCount="indefinite"><mpath href="#hc-p-acoa" /></animateMotion></circle>

        {/* Krebs cycle ring */}
        <circle cx="160" cy="308" r="26" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
        <text x="160" y="304" fontSize="8" fill="#93c5fd" textAnchor="middle" fontFamily="monospace" fontWeight="600">Krebs</text>
        <text x="160" y="315" fontSize="7" fill="#64748b" textAnchor="middle" fontFamily="monospace">cycle</text>
        {/* Orbiting NADH dot */}
        <circle r="3" fill="#fbbf24" filter="url(#hc-glow)">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#hc-krebs-ring" />
          </animateMotion>
        </circle>
        <path id="hc-krebs-ring" d="M 186 308 A 26 26 0 1 1 185.9 308" fill="none" />

        {/* ETC electron flow labels */}
        <text x="100" y="282" fontSize="5.5" fill="#475569" textAnchor="middle" fontFamily="monospace">CI</text>
        <text x="122" y="278" fontSize="5.5" fill="#475569" textAnchor="middle" fontFamily="monospace">CII</text>
        <text x="160" y="270" fontSize="5.5" fill="#475569" textAnchor="middle" fontFamily="monospace">CIII</text>
        <text x="198" y="278" fontSize="5.5" fill="#475569" textAnchor="middle" fontFamily="monospace">CIV</text>
        <text x="218" y="282" fontSize="5" fill="#475569" textAnchor="middle" fontFamily="monospace">F₀F₁</text>

        {/* ETC electron flow animation across top cristae */}
        <path id="hc-etc" d="M 116 248 L 204 248" fill="none" />
        <circle r="2" fill="#fbbf24" opacity="0.9"><animateMotion dur="0.85s" repeatCount="indefinite"><mpath href="#hc-etc" /></animateMotion></circle>
        <circle r="2" fill="#fbbf24" opacity="0.7"><animateMotion dur="0.85s" begin="0.28s" repeatCount="indefinite"><mpath href="#hc-etc" /></animateMotion></circle>
        <circle r="2" fill="#fbbf24" opacity="0.5"><animateMotion dur="0.85s" begin="0.56s" repeatCount="indefinite"><mpath href="#hc-etc" /></animateMotion></circle>

        {/* O2 + H2O annotation */}
        <text x="242" y="290" fontSize="6.5" fill="#475569" fontFamily="monospace">+ O₂</text>
        <text x="242" y="300" fontSize="6.5" fill="#475569" fontFamily="monospace">→ H₂O</text>

        {/* OXPHOS label */}
        <text x="160" y="400" fontSize="7.5" fill="#3b82f6" textAnchor="middle" fontFamily="monospace">Oxidative phosphorylation</text>

        {/* ATP output arrow — from ATP synthase (bottom cristae) */}
        <path id="hc-p-atp" d="M 160 404 L 160 428" fill="none" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#hc-arr-g)" />
        <circle r="2.5" fill="#4ade80"><animateMotion dur="1.1s" repeatCount="indefinite"><mpath href="#hc-p-atp" /></animateMotion></circle>
      </g>

      {/* ── ATP badge — outside mitochondria, in cytoplasm ── */}
      <g className="hc-atp-badge" filter="url(#hc-atp-glow)">
        <rect x="100" y="430" width="120" height="34" rx="10" fill="url(#hc-atp-grd)" />
        <text x="160" y="447" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">ATP</text>
        <text x="160" y="458" fontSize="7" fill="#bbf7d0" textAnchor="middle" fontFamily="monospace">36–38 mol / glucose</text>
      </g>

      {/* CO2 byproduct */}
      <text x="252" y="444" fontSize="7.5" fill="#475569" fontFamily="monospace">CO₂ out</text>

      {/* GKI badge */}
      <rect x="108" y="474" width="104" height="20" rx="6" fill="#14532d" />
      <text x="160" y="488" fontSize="9" fontWeight="700" fill="#4ade80" textAnchor="middle" fontFamily="monospace">GKI &lt; 1.0  ✓</text>
    </svg>
  )
}

function DamagedCell() {
  return (
    <svg
      viewBox="0 0 320 500"
      xmlns="http://www.w3.org/2000/svg"
      className="mito-svg"
      aria-label="Damaged cell: pyruvate cannot enter the broken mitochondria and is converted to lactate by LDH in the cytoplasm — the Warburg effect. Only 2 ATP produced per glucose."
    >
      <defs>
        <radialGradient id="dc-glu" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <radialGradient id="dc-mito-grd" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#3b1212" />
          <stop offset="100%" stopColor="#1a0808" />
        </radialGradient>
        <filter id="dc-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="dc-lactate-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.3  0 0 0 0 0  0 0 0 0 0  0 0 0 0.8 0" result="colored" />
          <feMerge><feMergeNode in="colored" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="dc-arr-r" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
        </marker>
        <marker id="dc-arr-o" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#f97316" />
        </marker>
      </defs>

      {/* ── Cell membrane ── */}
      <ellipse cx="160" cy="250" rx="148" ry="242" fill="none" stroke="#7f1d1d" strokeWidth="2" strokeDasharray="5 4" opacity="0.5" />
      <text x="160" y="15" fontSize="8" fill="#ef4444" textAnchor="middle" fontFamily="monospace" letterSpacing="1.5" opacity="0.7">CELL MEMBRANE</text>

      {/* CYTOPLASM label — above Glucose */}
      <text x="160" y="55" fontSize="8" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">CYTOPLASM</text>

      {/* ──── GLUCOSE — upregulated, only fuel ──── */}
      <g className="dc-fuel-glucose">
        <circle cx="160" cy="90" r="26" fill="url(#dc-glu)" filter="url(#dc-glow)" />
        <text x="160" y="86" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Glucose</text>
        <text x="160" y="98" fontSize="7" fill="#fecaca" textAnchor="middle">only fuel</text>
      </g>


      {/* ──── GLYCOLYSIS: Glucose → Pyruvate (cytoplasm) ──── */}
      <path id="dc-p-glyc" d="M 160 116 L 160 130" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" markerEnd="url(#dc-arr-o)" />
      <text x="172" y="112" fontSize="7.5" fill="#f97316" fontFamily="monospace">Glycolysis</text>
      <text x="172" y="122" fontSize="6.5" fill="#f97316" fontFamily="monospace">(↑ upregulated)</text>

      {/* fast dots — upregulated glycolysis */}
      <circle r="3" fill="#f97316" opacity="0.9"><animateMotion dur="1s" repeatCount="indefinite"><mpath href="#dc-p-glyc" /></animateMotion></circle>
      <circle r="3" fill="#f97316" opacity="0.7"><animateMotion dur="1s" begin="0.33s" repeatCount="indefinite"><mpath href="#dc-p-glyc" /></animateMotion></circle>
      <circle r="3" fill="#f97316" opacity="0.5"><animateMotion dur="1s" begin="0.67s" repeatCount="indefinite"><mpath href="#dc-p-glyc" /></animateMotion></circle>

      {/* Pyruvate node — cytoplasm */}
      <rect x="106" y="132" width="108" height="24" rx="7" fill="#3b1212" stroke="#ef4444" strokeWidth="1.2" />
      <text x="160" y="148" fontSize="9" fontWeight="600" fill="#fca5a5" textAnchor="middle" fontFamily="monospace">Pyruvate</text>

      {/* Pyruvate → mito entry BLOCKED — X at mito top oval */}
      <path d="M 160 156 L 160 208" fill="none" stroke="#374151" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
      <circle cx="160" cy="208" r="9" fill="#1a0808" stroke="#ef4444" strokeWidth="1.5" />
      <line x1="154.5" y1="202.5" x2="165.5" y2="213.5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <line x1="165.5" y1="202.5" x2="154.5" y2="213.5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <text x="172" y="208" fontSize="6.5" fill="#ef4444" fontFamily="monospace" dominantBaseline="middle">blocked</text>

      {/* ──── LDH BRANCH: Pyruvate → Lactate in CYTOPLASM (routes outside mito oval) ──── */}
      <path id="dc-p-ldh" d="M 106 144 Q 38 144 26 280 Q 26 395 108 410" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" opacity="0.85" markerEnd="url(#dc-arr-r)" />
      <text x="10" y="280" fontSize="7" fill="#ef4444" fontFamily="monospace" transform="rotate(-90 10 280)">LDH — cytoplasm</text>

      {/* flowing dots along LDH bypass */}
      <circle r="3.5" fill="#ef4444" filter="url(#dc-glow)" opacity="0.9"><animateMotion dur="2.6s" repeatCount="indefinite" rotate="auto"><mpath href="#dc-p-ldh" /></animateMotion></circle>
      <circle r="3.5" fill="#ef4444" opacity="0.7"><animateMotion dur="2.6s" begin="0.87s" repeatCount="indefinite" rotate="auto"><mpath href="#dc-p-ldh" /></animateMotion></circle>
      <circle r="3.5" fill="#ef4444" opacity="0.5"><animateMotion dur="2.6s" begin="1.74s" repeatCount="indefinite" rotate="auto"><mpath href="#dc-p-ldh" /></animateMotion></circle>

      {/* ──── DAMAGED MITOCHONDRIA OVAL (smaller, dim) ──── */}
      <g className="dc-mito-body">
        {/* Outer membrane — dashed, broken */}
        <ellipse cx="160" cy="295" rx="110" ry="90" fill="url(#dc-mito-grd)" stroke="#7f1d1d" strokeWidth="2" strokeDasharray="6 4" />
        <ellipse cx="160" cy="295" rx="95" ry="76" fill="#1a0808" stroke="#7f1d1d" strokeWidth="1.2" strokeDasharray="4 3" />
        <ellipse cx="160" cy="295" rx="80" ry="62" fill="#110606" />

        {/* MITOCHONDRIA label — just above oval */}
        <text x="160" y="200" fontSize="7.5" fill="#7f1d1d" textAnchor="middle" fontFamily="monospace" letterSpacing="1">MITOCHONDRIA ✕</text>

        {/* Broken / fragmented cristae */}
        {[-36,-18,0,18,36].map((o, i) => (
          <line key={i}
            x1={160+o+(i%2===0?2:-2)} y1={222+(i%3)*2}
            x2={160+o+(i%2===0?-3:3)} y2={232+(i%2)*4}
            stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" strokeDasharray="2 2"
          />
        ))}
        {[-26,-8,8,26].map((o, i) => (
          <line key={`b${i}`}
            x1={160+o+(i%2===0?2:-2)} y1={354}
            x2={160+o+(i%2===0?-3:3)} y2={363+(i%2)*3}
            stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" strokeDasharray="2 2"
          />
        ))}

        {/* Broken Krebs ring */}
        <circle cx="160" cy="295" r="22" fill="none" stroke="#7f1d1d" strokeWidth="1" strokeDasharray="2 5" opacity="0.3" />
        <text x="160" y="291" fontSize="8" fill="#7f1d1d" textAnchor="middle" fontFamily="monospace" fontWeight="600">Krebs</text>
        <text x="160" y="303" fontSize="7" fill="#4b1818" textAnchor="middle" fontFamily="monospace">halted</text>

        {/* ETC — broken labels */}
        <text x="108" y="268" fontSize="5.5" fill="#374151" textAnchor="middle" fontFamily="monospace">CI ✕</text>
        <text x="130" y="264" fontSize="5.5" fill="#374151" textAnchor="middle" fontFamily="monospace">CII ✕</text>
        <text x="160" y="258" fontSize="5.5" fill="#374151" textAnchor="middle" fontFamily="monospace">CIII ✕</text>
        <text x="190" y="264" fontSize="5.5" fill="#374151" textAnchor="middle" fontFamily="monospace">CIV ✕</text>

        <text x="160" y="378" fontSize="7.5" fill="#7f1d1d" textAnchor="middle" fontFamily="monospace">Cristae failure — OXPHOS broken</text>
      </g>

      {/* ──── CYTOPLASM OUTPUTS — both outside the mitochondria oval ──── */}
      {/* Lactate node — cytoplasm, below mito oval (mito bottom ≈ y=385) */}
      <g className="dc-lactate-badge">
        <rect x="52" y="396" width="110" height="32" rx="9" fill="#dc2626" stroke="#fca5a5" strokeWidth="1.5" />
        <text x="107" y="412" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">Lactate</text>
        <text x="107" y="423" fontSize="7" fill="#fef2f2" textAnchor="middle" fontFamily="monospace">Warburg fermentation</text>
      </g>

      {/* Minimal ATP output — cytoplasm, below mito, right side */}
      <rect x="166" y="396" width="102" height="32" rx="9" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
      <text x="217" y="411" fontSize="10" fontWeight="700" fill="#fca5a5" textAnchor="middle">ATP (minimal)</text>
      <text x="217" y="423" fontSize="7" fill="#ef4444" textAnchor="middle" fontFamily="monospace">2 mol / glucose</text>

      {/* GKI badge */}
      <rect x="108" y="456" width="104" height="20" rx="6" fill="#450a0a" />
      <text x="160" y="470" fontSize="9" fontWeight="700" fill="#ef4444" textAnchor="middle" fontFamily="monospace">GKI &gt; 3.0  ✗</text>
    </svg>
  )
}
