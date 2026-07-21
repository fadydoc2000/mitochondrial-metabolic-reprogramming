# Product

## Register

product

## Users

Two primary users, often the same person at different moments:

1. **Patient / person with cancer** — tracking metabolic health daily while under treatment or pursuing metabolic therapy. Emotional state: anxious, hopeful, disciplined. Needs clarity, reassurance, and actionable data without cognitive overload.
2. **Health-conscious self-optimizer** — following Seyfried's Press-Pulse protocol preventively or as adjunct therapy. Motivated, scientifically literate, wants depth and rigor. Treats GKI as a serious biomarker, not a wellness vanity metric.

Secondary: **Clinician / oncologist** accessing the provider portal — analytical, time-pressed, needs data density and scan-friendly layout.

## Product Purpose

MMR (Mitochondrial Metabolic Reprogramming) is a non-profit public health tool grounded in Professor Thomas Seyfried's 2024–2026 research on metabolic cancer theory. It helps people track the Glucose-Ketone Index (GKI) and follow the Press-Pulse Protocol — a structured metabolic intervention with a clinical evidence base.

Success looks like: a patient logging their GKI daily, staying in therapeutic ketosis (GKI <1.0), adhering to the protocol for 6+ months, and having that data available to their care team.

## Brand Personality

Clinical · Precise · Trustworthy

Voice: authoritative without arrogance. Uses scientific vocabulary correctly. Treats the user as an intelligent adult making serious health decisions. Never softens the rigor to seem friendlier — the rigor IS the reassurance.

## Anti-references

- **No wellness/spa aesthetic** — no soft pastels, no organic curves, no crystal-adjacent language. This is hard metabolic science.
- **No generic SaaS blue** — not the typical navy + gradient dashboard look. The existing deep cobalt (#0d47a1) is deliberate; it should read as institutional precision, not SaaS template.
- **No clinical coldness** — not sterile hospital white. The interface should feel human and considered despite being rigorous. Data-dense without being dehumanizing.
- **No survivorship-pink or cancer-charity emotional appeal** — science-first, not hope-poster aesthetic. Evidence is the emotional anchor.

## Design Principles

1. **Rigor is the reassurance** — precision in numbers, labels, and copy builds trust more than soft language ever could. Never round, approximate, or soften data to seem friendlier.
2. **Clarity at the hard moment** — users may be reading their GKI at 6am after a fast, or during a stressful treatment week. Every screen must be scannable in 3 seconds.
3. **Evidence earns authority** — citations, Seyfried references, and clinical thresholds should be present and accessible, not buried. The science is the product.
4. **Human at the edges** — the data is clinical; the experience is not. Error states, empty states, and onboarding flows must feel considered and warm, not system-generated.
5. **Design both registers** — the landing/auth surface (brand: design IS the product) and the app shell (product: design serves the workflow) share a token system but serve different masters. Never let the app shell drift into marketing aesthetics, or the landing page drift into dashboard density.

## Accessibility & Inclusion

- WCAG AA minimum throughout (4.5:1 body contrast, 3:1 large text)
- Explicit `@media (prefers-reduced-motion: reduce)` support on all animations
- Placeholder text contrast: 4.5:1 (not the browser muted-gray default)
- Color must not be the sole data carrier — metabolic zones (red/yellow/green GKI bands) always paired with label text
