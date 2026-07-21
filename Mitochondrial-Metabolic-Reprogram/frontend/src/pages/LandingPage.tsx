import './LandingPage.css'
import MitochondrialDiagram from '../components/MitochondrialDiagram'

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

          {/* Animated metabolic pathway diagram */}
          <MitochondrialDiagram />

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
