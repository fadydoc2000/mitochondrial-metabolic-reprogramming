import './LandingPage.css'

interface Props {
  onStart: () => void
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="mmrlp">
      {/* Nav */}
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="brand-mark">M</span>
            <span className="brand-name">Mitochondrial Metabolic Reprogramming</span>
          </div>
          <nav className="nav-links" aria-label="Section navigation">
            <a href="#objective">Objective</a>
            <a href="#science">The Science</a>
            <a href="#mitochondria">Mitochondrial View</a>
            <a href="#protocol">Protocol</a>
            <a href="#disclaimer">Safety</a>
          </nav>
          <div className="nav-actions">
            <button className="btn btn-ghost btn-sm" onClick={onStart}>Sign in</button>
            <button className="btn btn-primary btn-sm" onClick={onStart}>Get started</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow"><span className="dot" />Non-profit · Evidence-based metabolic health</span>
            <h1>Track the metabolism that <em>fuels disease</em> — and shift it toward health.</h1>
            <p className="lede">
              A free tool to measure your Glucose-Ketone Index, follow the Press-Pulse Protocol, and bring
              your metabolism toward therapeutic ketosis — grounded in Professor Thomas Seyfried's 2024–2026 research.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={onStart}>Start tracking your GKI</button>
              <a className="btn btn-ghost" href="#science">Read the science</a>
            </div>
            <p className="hero-fine">
              <strong>For education and self-tracking.</strong> Not a substitute for professional medical care.
            </p>
          </div>
          <div className="gauge-wrap">
            {/* Half-circle speedometer gauge */}
            <div className="gauge" role="img" aria-label="Glucose-Ketone Index metabolic zones: green under 1.0, yellow 1.0 to 3.0, red over 3.0">
              <svg viewBox="0 0 340 185" xmlns="http://www.w3.org/2000/svg">
                {/* Track background */}
                <path d="M 30 170 A 140 140 0 0 1 310 170" fill="none" stroke="#e4ddcf" strokeWidth="28" strokeLinecap="butt"/>
                {/* Red zone — outer third (right, high GKI) */}
                <path d="M 30 170 A 140 140 0 0 1 100.4 53.8" fill="none" stroke="#c62828" strokeWidth="28" strokeLinecap="butt"/>
                {/* Yellow zone — middle third */}
                <path d="M 100.4 53.8 A 140 140 0 0 1 239.6 53.8" fill="none" stroke="#c98a00" strokeWidth="28" strokeLinecap="butt"/>
                {/* Green zone — left third (low GKI, therapeutic) */}
                <path d="M 239.6 53.8 A 140 140 0 0 1 310 170" fill="none" stroke="#2e7d32" strokeWidth="28" strokeLinecap="butt"/>
                {/* Inner white mask for donut effect */}
                <circle cx="170" cy="170" r="112" fill="#f7f5f0"/>
                {/* Needle — pointing to green zone (therapeutic, ~35° from positive x-axis) */}
                <line
                  x1="170" y1="170"
                  x2={170 + 105 * Math.cos((35 * Math.PI) / 180)}
                  y2={170 - 105 * Math.sin((35 * Math.PI) / 180)}
                  stroke="#1b1b19" strokeWidth="3" strokeLinecap="round"
                />
                <circle cx="170" cy="170" r="7" fill="#1b1b19"/>
                <circle cx="170" cy="170" r="3.5" fill="#f7f5f0"/>
                {/* Zone labels */}
                <text x="62" y="158" fontSize="9" fill="#c62828" fontWeight="600" textAnchor="middle">HIGH</text>
                <text x="170" y="28" fontSize="9" fill="#b8762a" fontWeight="600" textAnchor="middle">MID</text>
                <text x="278" y="158" fontSize="9" fill="#2e7d32" fontWeight="600" textAnchor="middle">LOW ✓</text>
              </svg>
            </div>
            <div className="gauge-readout">
              <div className="label">GKI</div>
              <div className="value">{'<'} 1.0</div>
              <div className="zone">⬤ Therapeutic ketosis</div>
            </div>
            <div className="gauge-legend">
              <span className="g"><i />GKI {'<'} 1.0 · green</span>
              <span className="y"><i />1.0–3.0 · yellow</span>
              <span className="r"><i />{'>'} 3.0 · red</span>
            </div>
          </div>
        </div>
      </section>

      {/* Objective */}
      <section id="objective" className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">The objective</div>
            <h2>Make a hard metabolic state measurable and livable.</h2>
          </div>
          <div className="prose">
            <p>
              Therapeutic ketosis is hard to reach and harder to keep. The MMR app turns a single
              finger-prick — glucose and ketones — into a number you can act on, then coaches you
              through the diet, devices, and routines that move that number down.
            </p>
            <p>
              As a non-profit, public-facing tool, it exists to make Professor Thomas Seyfried's
              metabolic research <strong>accessible, safe, and trackable</strong> for anyone
              working with — or alongside — their healthcare provider. It screens for the conditions
              that make this approach unsafe, watches your biomarkers, and keeps your care team in the loop.
            </p>
          </div>
        </div>
      </section>

      {/* Seyfried findings */}
      <section id="science" className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">The evidence</div>
            <h2>What Dr. Thomas Seyfried's research found</h2>
            <p className="sec-sub">
              Professor Seyfried and collaborators advanced a metabolic framing of cancer and chronic disease
              grounded in measurable blood chemistry. Four findings shape this app.
            </p>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="n">66.7%</div>
              <div className="t">3-year survival in diet-adherent glioblastoma patients, vs a typical 12–15 month prognosis.</div>
              <a className="src" href="https://pubmed.ncbi.nlm.nih.gov/40199815/" target="_blank" rel="noopener noreferrer">Seyfried et al., small GBM study (n=18) ↗</a>
            </div>
            <div className="stat">
              <div className="n">{'>'} 6 mo</div>
              <div className="t">Adherence threshold: only patients compliant past six months gained therapeutic benefit.</div>
              <a className="src" href="https://pubmed.ncbi.nlm.nih.gov/40199815/" target="_blank" rel="noopener noreferrer">Seyfried et al., GBM trial ↗</a>
            </div>
            <div className="stat">
              <div className="n">{'<'} 1.0</div>
              <div className="t">Therapeutic GKI target. Disease stabilization tracked with reaching and holding this range.</div>
              <a className="src" href="https://nutritionandmetabolism.biomedcentral.com/articles/10.1186/s12986-015-0009-2" target="_blank" rel="noopener noreferrer">Meidenbauer & Seyfried, GKI Calculator, Nutr Metab 2015 ↗</a>
            </div>
          </div>

          <div className="cards" style={{ marginTop: 32 }}>
            <div className="card">
              <div className="icon" style={{ background: 'var(--primary-tint)', color: 'var(--primary)' }}>1</div>
              <h3>The Glucose-Ketone Index (GKI)</h3>
              <p>
                GKI = blood glucose ÷ ketones (adjusted for units). It quantifies the shift from
                glucose-burning to ketone-burning metabolism from a simple, low-cost test — no imaging required.
                Below 1.0 marks therapeutic ketosis; above 3.0 signals a glucose-dependent state.
              </p>
            </div>
            <div className="card">
              <div className="icon" style={{ background: 'var(--green-tint)', color: 'var(--green)' }}>2</div>
              <h3>The Press-Pulse Protocol</h3>
              <p>
                A sustained <strong>Press</strong> creates glucose and glutamine scarcity through a
                Mediterranean-style ketogenic diet, while periodic <strong>Pulse</strong> interventions
                add targeted metabolic stress. Coordinated, the two phases exploit the vulnerability that
                the Press phase creates in glucose-dependent cells.
              </p>
            </div>
          </div>

          <div className="cites">
            <a className="cite" href="https://pubmed.ncbi.nlm.nih.gov/40199815/" target="_blank" rel="noopener noreferrer">Seyfried et al. · Mitochondrial Metabolic Theory of Cancer, J. Bioenerg. Biomembr. ↗</a>
            <a className="cite" href="https://pubmed.ncbi.nlm.nih.gov/42302750/" target="_blank" rel="noopener noreferrer">Duraj et al. · Ketogenic metabolic therapy framework in glioblastoma, BMC Medicine ↗</a>
            <a className="cite" href="https://nutritionandmetabolism.biomedcentral.com/articles/10.1186/s12986-015-0009-2" target="_blank" rel="noopener noreferrer">Meidenbauer, Mukherjee &amp; Seyfried · The Glucose Ketone Index Calculator, Nutr Metab 2015 ↗</a>
          </div>
        </div>
      </section>

      {/* Mitochondrial view */}
      <section id="mitochondria" className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">The unifying idea</div>
            <h2>One metabolism, many diseases.</h2>
            <p className="sec-sub">
              Healthy mitochondria flexibly burn either glucose or ketones. When that flexibility breaks down —
              the cell's engines can no longer burn cleanly — it falls back on fermentation. The
              mitochondrial metabolic theory traces this breakdown beneath a cluster of chronic diseases.
            </p>
          </div>

          {/* Mitochondria illustration + metabolic pathway diagram */}
          <div className="mito-visual-row">
            {/* Mitochondrion illustration — textbook cross-section */}
            <div className="mito-illus-card">
              <div className="mito-illus-label">The Mitochondrion — cross-section (textbook view)</div>
              <svg viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg" className="mito-svg">
                <defs>
                  <clipPath id="inner-mito">
                    <ellipse cx="280" cy="115" rx="122" ry="64"/>
                  </clipPath>
                  <linearGradient id="outer-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dce8fa"/>
                    <stop offset="100%" stopColor="#b8d0f0"/>
                  </linearGradient>
                </defs>

                {/* Outer membrane */}
                <ellipse cx="280" cy="115" rx="158" ry="98" fill="url(#outer-grad)" stroke="#0d3b7a" strokeWidth="3.5"/>
                {/* Intermembrane space */}
                <ellipse cx="280" cy="115" rx="135" ry="76" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="2.2"/>
                {/* Matrix */}
                <ellipse cx="280" cy="115" rx="122" ry="64" fill="#c2d9f5"/>

                {/* Top cristae */}
                <rect x="182" y="-8" width="18" height="86" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>
                <rect x="226" y="-8" width="18" height="88" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>
                <rect x="271" y="-8" width="18" height="90" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>
                <rect x="316" y="-8" width="18" height="88" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>
                <rect x="358" y="-8" width="18" height="85" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>
                {/* Bottom cristae */}
                <rect x="204" y="143" width="18" height="88" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>
                <rect x="248" y="146" width="18" height="88" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>
                <rect x="293" y="143" width="18" height="88" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>
                <rect x="338" y="146" width="18" height="88" rx="4" fill="#edf4ff" stroke="#0d3b7a" strokeWidth="1.8" clipPath="url(#inner-mito)"/>

                {/* ATP synthase — F₁ particles on crista tips */}
                {[191,235,280,325,367].map(x => (
                  <circle key={x} cx={x} cy={88} r="3.5" fill="#0d3b7a" opacity="0.8"/>
                ))}
                {[213,257,302,347].map(x => (
                  <circle key={`b${x}`} cx={x} cy={144} r="3.5" fill="#0d3b7a" opacity="0.8"/>
                ))}

                {/* Matrix text — inside, centered */}
                <text x="280" y="111" fontSize="12" fontWeight="700" fill="#0d3b7a" textAnchor="middle">Matrix</text>
                <text x="280" y="126" fontSize="9" fill="#1a5298" textAnchor="middle">Krebs cycle · ATP synthesis</text>

                {/* ── LEFT LABELS (text right-aligned, leader lines →right) ── */}
                {/* Outer membrane */}
                <line x1="108" y1="62" x2="148" y2="62" stroke="#0d3b7a" strokeWidth="1.1"/>
                <text x="104" y="58" fontSize="9.5" fontWeight="700" fill="#0d3b7a" textAnchor="end">Outer</text>
                <text x="104" y="70" fontSize="9.5" fontWeight="700" fill="#0d3b7a" textAnchor="end">membrane</text>

                {/* Inner membrane */}
                <line x1="108" y1="92" x2="155" y2="92" stroke="#0d3b7a" strokeWidth="1.1"/>
                <text x="104" y="88" fontSize="9.5" fontWeight="700" fill="#0d3b7a" textAnchor="end">Inner</text>
                <text x="104" y="100" fontSize="9.5" fontWeight="700" fill="#0d3b7a" textAnchor="end">membrane</text>

                {/* Cristae — point to a visible crista tip at lower left */}
                <line x1="108" y1="148" x2="204" y2="148" stroke="#0d3b7a" strokeWidth="1.1"/>
                <text x="104" y="144" fontSize="9.5" fontWeight="700" fill="#0d3b7a" textAnchor="end">Cristae</text>
                <text x="104" y="156" fontSize="8.5" fill="#1a5298" textAnchor="end">(inner folds)</text>

                {/* ── RIGHT LABELS (text left-aligned, leader lines ←left) ── */}
                {/* Intermembrane space */}
                <line x1="416" y1="76" x2="452" y2="76" stroke="#0d3b7a" strokeWidth="1.1"/>
                <text x="456" y="72" fontSize="9.5" fontWeight="700" fill="#0d3b7a" textAnchor="start">Intermembrane</text>
                <text x="456" y="84" fontSize="9.5" fontWeight="700" fill="#0d3b7a" textAnchor="start">space (IMS)</text>

                {/* ATP synthase — point to rightmost bottom dot at x=347 y=144 */}
                <line x1="351" y1="144" x2="452" y2="152" stroke="#0d3b7a" strokeWidth="1.1"/>
                <text x="456" y="148" fontSize="9.5" fontWeight="700" fill="#0d3b7a" textAnchor="start">ATP synthase</text>
                <text x="456" y="160" fontSize="8.5" fill="#1a5298" textAnchor="start">(F₁ subunits)</text>
              </svg>
              <p className="mito-illus-caption">
                Cristae (inner membrane folds) host the electron transport chain and ATP synthase.
                Damaged cristae impair oxidative phosphorylation — the cell reverts to glucose fermentation (Warburg effect).
              </p>
            </div>

            {/* Metabolic pathway diagram */}
            <div className="mito-pathway-card">
              <div className="mito-illus-label">Healthy vs. Damaged Mitochondria — Seyfried's model</div>
              <svg viewBox="0 0 310 220" xmlns="http://www.w3.org/2000/svg" className="mito-svg">
                {/* ── HEALTHY side ── */}
                <rect x="6" y="6" width="138" height="208" rx="10" fill="#e7f1e8" stroke="#2e7d32" strokeWidth="1.5"/>
                <text x="75" y="24" fontSize="10" fontWeight="700" fill="#2e7d32" textAnchor="middle">HEALTHY CELL</text>

                {/* Fuel sources */}
                <rect x="18" y="32" width="50" height="22" rx="5" fill="#2e7d32"/>
                <text x="43" y="47" fontSize="9" fill="#fff" fontWeight="600" textAnchor="middle">Glucose</text>
                <rect x="78" y="32" width="54" height="22" rx="5" fill="#1565c0"/>
                <text x="105" y="47" fontSize="9" fill="#fff" fontWeight="600" textAnchor="middle">Ketones</text>

                {/* Arrows down to mito */}
                <line x1="43" y1="54" x2="75" y2="76" stroke="#2e7d32" strokeWidth="1.5" markerEnd="url(#arr-g)"/>
                <line x1="105" y1="54" x2="75" y2="76" stroke="#1565c0" strokeWidth="1.5" markerEnd="url(#arr-b)"/>

                {/* Mitochondria box — tall enough for 3-line content */}
                <rect x="22" y="78" width="104" height="44" rx="6" fill="#b8d4f0" stroke="#1565c0" strokeWidth="1.2"/>
                <text x="74" y="94" fontSize="9" fontWeight="700" fill="#0d47a1" textAnchor="middle">Mitochondria</text>
                <text x="74" y="106" fontSize="7.5" fill="#1565c0" textAnchor="middle">Oxidative</text>
                <text x="74" y="116" fontSize="7.5" fill="#1565c0" textAnchor="middle">phosphorylation</text>

                {/* Arrow to ATP */}
                <line x1="74" y1="124" x2="74" y2="140" stroke="#2e7d32" strokeWidth="1.5" markerEnd="url(#arr-g)"/>
                <rect x="44" y="142" width="60" height="22" rx="5" fill="#2e7d32"/>
                <text x="74" y="157" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">ATP ✓</text>

                <text x="74" y="178" fontSize="8" fill="#2e7d32" textAnchor="middle">Flexible fuel burning</text>
                <text x="74" y="189" fontSize="8" fill="#2e7d32" textAnchor="middle">Clean energy · Low lactate</text>
                <text x="74" y="200" fontSize="8" fill="#2e7d32" textAnchor="middle">GKI &lt; 1.0</text>

                {/* ── DAMAGED side ── */}
                <rect x="166" y="6" width="138" height="208" rx="10" fill="#f9e3e3" stroke="#c62828" strokeWidth="1.5"/>
                <text x="235" y="24" fontSize="10" fontWeight="700" fill="#c62828" textAnchor="middle">DAMAGED CELL</text>

                {/* Fuel — glucose only */}
                <rect x="178" y="32" width="114" height="22" rx="5" fill="#c62828"/>
                <text x="235" y="47" fontSize="9" fill="#fff" fontWeight="600" textAnchor="middle">Glucose (only fuel)</text>

                {/* Arrow down */}
                <line x1="235" y1="54" x2="235" y2="76" stroke="#c62828" strokeWidth="1.5" markerEnd="url(#arr-r)"/>

                {/* Damaged mito */}
                <rect x="190" y="78" width="88" height="32" rx="6" fill="#f9e3e3" stroke="#c62828" strokeWidth="1.2" strokeDasharray="4 2"/>
                <text x="234" y="94" fontSize="9" fontWeight="700" fill="#c62828" textAnchor="middle">Mitochondria ✕</text>
                <text x="234" y="107" fontSize="8" fill="#c62828" textAnchor="middle">Cristae damaged</text>

                {/* Branch: fermentation path */}
                <line x1="234" y1="110" x2="234" y2="130" stroke="#c62828" strokeWidth="1.5" markerEnd="url(#arr-r)"/>
                <rect x="178" y="132" width="114" height="22" rx="5" fill="#c62828" opacity="0.85"/>
                <text x="235" y="147" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Fermentation (Warburg)</text>

                <text x="235" y="172" fontSize="8" fill="#c62828" textAnchor="middle">Glucose-locked metabolism</text>
                <text x="235" y="184" fontSize="8" fill="#c62828" textAnchor="middle">High lactate · Inflammation</text>
                <text x="235" y="196" fontSize="8" fill="#c62828" textAnchor="middle">GKI &gt; 3.0</text>

                {/* Arrow markers */}
                <defs>
                  <marker id="arr-g" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#2e7d32"/>
                  </marker>
                  <marker id="arr-b" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#1565c0"/>
                  </marker>
                  <marker id="arr-r" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#c62828"/>
                  </marker>
                </defs>
              </svg>
              <p className="mito-illus-caption">
                Based on Seyfried's mitochondrial metabolic theory (2024–2026): cancer and chronic disease
                arise when damaged mitochondria can no longer respire — cells revert to glucose fermentation.
                Lowering GKI starves fermentation-dependent cells while healthy cells switch to ketones.
              </p>
            </div>
          </div>

          <div className="cards">
            <div className="card cancer">
              <div className="icon">●</div>
              <h3>Cancer</h3>
              <p>
                Building on Otto Warburg's observation that tumor cells ferment glucose even with oxygen present,
                Seyfried argues cancer is fundamentally a disease of damaged mitochondrial energy production.
                Tumor cells lean on glucose and glutamine fermentation because they can no longer respire
                properly — making metabolism, not mutations alone, the root cause to target.
              </p>
            </div>
            <div className="card obesity">
              <div className="icon">●</div>
              <h3>Obesity</h3>
              <p>
                Fat accumulation tracks with metabolic inflexibility — the inability to switch between
                fuel sources. When cells lose the capacity to burn fat and ketones efficiently, energy gets
                stored rather than used. Restoring metabolic flexibility, not just cutting calories, is the lever.
              </p>
            </div>
            <div className="card insulin">
              <div className="icon">●</div>
              <h3>Insulin resistance & type 2 diabetes</h3>
              <p>
                Cells stop responding to insulin when chronic glucose surplus and mitochondrial dysfunction
                blunt their uptake machinery. Elevated glucose and lactate mark the broken loop. Lowering the
                glucose load and raising ketones can restore the responsiveness the system lost.
              </p>
            </div>
            <div className="card syndrome">
              <div className="icon">●</div>
              <h3>Metabolic syndrome</h3>
              <p>
                High blood pressure, dyslipidemia, and chronic inflammation cluster with obesity and insulin
                resistance because they share the same upstream defect: impaired mitochondrial energy
                flexibility. Inflammatory markers like CRP and IL-6 fall as GKI improves — one system, read
                through one index.
              </p>
            </div>
          </div>

          <div className="prose" style={{ marginTop: 36 }}>
            <p>
              The common thread: <strong>a cell that can burn either glucose or ketones is healthy; a cell
              stuck on glucose fermentation is vulnerable</strong>. GKI is the dashboard for that
              flexibility. The Press-Pulse Protocol is the intervention. This app makes both legible and
              repeatable for the person living with the disease.
            </p>
          </div>
        </div>
      </section>

      {/* Protocol */}
      <section id="protocol" className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">How it works</div>
            <h2>Press, then Pulse — read through three zones.</h2>
          </div>

          <div className="pp">
            <div className="pp-col pp-press">
              <div className="pp-tag">Press · sustained</div>
              <h3>Sustained metabolic stress</h3>
              <p>A Mediterranean-style ketogenic diet at a 2:1–2.5:1 fat-to-carbohydrate ratio, calorie-restricted to maintain nutritional ketosis.</p>
              <ul>
                <li>Creates glucose and glutamine scarcity</li>
                <li>Protects healthy cells, which switch to ketone metabolism</li>
                <li>Ongoing baseline — tracked daily to weekly</li>
              </ul>
            </div>
            <div className="pp-col pp-pulse">
              <div className="pp-tag">Pulse · periodic</div>
              <h3>Targeted interventions</h3>
              <p>Time-limited metabolic stressors, 2–4 weeks at a time, coordinated to exploit the vulnerability the Press phase opens.</p>
              <ul>
                <li>Hyperbaric oxygen therapy (HBOT)</li>
                <li>Fasting windows and exercise protocols</li>
                <li>Strategic medication timing (as studied)</li>
              </ul>
            </div>
          </div>

          <div className="zones" aria-label="Metabolic zones">
            <div className="zone green">
              <div className="gki">GKI {'<'} 1.0</div>
              <div className="name">Green · therapeutic</div>
              <div className="desc">Therapeutic ketosis. Blood glucose {'<'} 80 mg/dL, ketones 2–5 mmol/L.</div>
            </div>
            <div className="zone yellow">
              <div className="gki">GKI 1.0–3.0</div>
              <div className="name">Yellow · mild ketosis</div>
              <div className="desc">Nutritional ketosis in progress. Continue the Press; refine inputs.</div>
            </div>
            <div className="zone red">
              <div className="gki">GKI {'>'} 3.0</div>
              <div className="name">Red · glucose-dependent</div>
              <div className="desc">Predominantly glucose metabolism. Dietary adjustments needed.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta-band">
        <div className="wrap">
          <h2>Six months of adherence is the goal. Start the first day.</h2>
          <p>
            Free, privacy-first, non-profit. Screen for safety, track your GKI, and let the protocol coach you
            toward the green zone — all in one place.
          </p>
          <button className="btn btn-primary" onClick={onStart}>Create a free account</button>
        </div>
      </section>

      {/* Safety + disclaimer */}
      <section id="disclaimer" className="block">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">Safety</div>
            <h2>This approach isn't right for everyone.</h2>
          </div>
          <div className="disclaimer">
            <h3>Important</h3>
            <p>
              Metabolic therapy carries real risk for some people — including type 1 diabetes (ketoacidosis
              risk), advanced kidney or liver disease, pregnancy, and certain medications and cancer types.
              The app screens for these contraindications during onboarding and urges you to work with a
              qualified healthcare provider. The information here summarizes emerging, peer-reviewed research;
              it is educational, not medical advice, and the underlying evidence is still developing.
              Nothing on this site replaces diagnosis, treatment, or supervision by a licensed clinician.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="wrap foot-grid">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>
              <span className="brand-mark">M</span>
              <span className="brand-name">Mitochondrial Metabolic Reprogramming</span>
            </div>
            <p className="foot-note">
              A non-profit, public-facing tool grounded in Thomas Seyfried's 2024–2026 research on metabolic
              cancer theory. Educational use only — not a substitute for professional medical care.
            </p>
          </div>
          <div className="foot-meta">
            <div>Free · Open research participation</div>
            <div style={{ marginTop: 6 }}>© 2026 MMR · Non-profit</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
