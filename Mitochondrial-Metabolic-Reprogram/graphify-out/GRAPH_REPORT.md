# Graph Report - .  (2026-07-21)

## Corpus Check
- Corpus is ~11,698 words - fits in a single context window. You may not need a graph.

## Summary
- 126 nodes · 138 edges · 13 communities (9 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Clinical Protocol & Adherence|Clinical Protocol & Adherence]]
- [[_COMMUNITY_Backend API Dependencies|Backend API Dependencies]]
- [[_COMMUNITY_Frontend React Setup|Frontend React Setup]]
- [[_COMMUNITY_Biomarker & Assessment Models|Biomarker & Assessment Models]]
- [[_COMMUNITY_Monorepo Configuration|Monorepo Configuration]]
- [[_COMMUNITY_Core App Stack|Core App Stack]]
- [[_COMMUNITY_NPM Scripts & Build|NPM Scripts & Build]]
- [[_COMMUNITY_Express Server|Express Server]]
- [[_COMMUNITY_Frontend Build Scripts|Frontend Build Scripts]]
- [[_COMMUNITY_React App Entry|React App Entry]]
- [[_COMMUNITY_Claude Permissions|Claude Permissions]]
- [[_COMMUNITY_README|README]]
- [[_COMMUNITY_User Profile Model|User Profile Model]]

## God Nodes (most connected - your core abstractions)
1. `MMR Implementation Plan (2024-07-20, v2.0)` - 15 edges
2. `Mitochondrial Metabolic Reprogramming Application` - 14 edges
3. `Glucose-Ketone Index (GKI)` - 9 edges
4. `scripts` - 8 edges
5. `Clinical Research Integration Document (Thomas Seyfried 2024-2026)` - 6 edges
6. `scripts` - 5 edges
7. `Press-Pulse Protocol` - 5 edges
8. `Medical Device Integration (CGM, Ketone Meters, Wearables)` - 5 edges
9. `scripts` - 4 edges
10. `Professor Thomas Seyfried` - 4 edges

## Surprising Connections (you probably didn't know these)
- `TODO List (129 Tasks)` --conceptually_related_to--> `MMR Implementation Plan (2024-07-20, v2.0)`  [INFERRED]
  .superpowers/sdd/todos.txt → docs/superpowers/plans/2024-07-20-mitochondrial-metabolic-reprogramming-plan.md
- `Mitochondrial Metabolic Reprogramming Application` --implements--> `Biomarker Panel (Glucose, Ketones, CRP, IL-6, Lipids, Liver)`  [EXTRACTED]
  CLAUDE.md → docs/CLINICAL_RESEARCH_INTEGRATION.md
- `Mitochondrial Metabolic Reprogramming Application` --conceptually_related_to--> `Non-Profit Public Health Mission`  [EXTRACTED]
  CLAUDE.md → docs/CLINICAL_RESEARCH_INTEGRATION.md
- `Mitochondrial Metabolic Reprogramming Application` --implements--> `Medical Provider Collaboration Features`  [EXTRACTED]
  CLAUDE.md → docs/CLINICAL_RESEARCH_INTEGRATION.md
- `Mitochondrial Metabolic Reprogramming Application` --implements--> `Research Data Collection Infrastructure (Opt-in)`  [EXTRACTED]
  CLAUDE.md → docs/CLINICAL_RESEARCH_INTEGRATION.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **MMR Application Core Clinical Framework** — mmr_application, gki_concept, press_pulse_protocol, metabolic_zones, therapeutic_ketosis, adherence_threshold [EXTRACTED 1.00]
- **Press-Pulse Protocol Components** — press_pulse_protocol, press_phase, pulse_phase, ketogenic_diet, hbot [EXTRACTED 1.00]
- **Device Integration Ecosystem** — device_integration, cgm_devices, ketone_meters, wearables, gki_concept [EXTRACTED 1.00]
- **Backend PostgreSQL Data Models** — backend_express, postgresql_db, user_model, profile_model, assessment_model, zone_model, biomarker_reading_model [EXTRACTED 1.00]
- **Frontend Technology Stack** — frontend_react, redux_toolkit, mui_library, recharts, gki_tracker_component, biomarker_dashboard_page [EXTRACTED 1.00]
- **Clinical Research Foundation (Seyfried 2024-2026)** — thomas_seyfried, glioblastoma_study, gki_concept, adherence_threshold, clinical_research_doc [EXTRACTED 1.00]
- **Project Documentation Set** — claude_md, readme_md, implementation_plan, design_spec, clinical_research_doc, todos_txt, progress_md [EXTRACTED 1.00]

## Communities (13 total, 4 thin omitted)

### Community 0 - "Clinical Protocol & Adherence"
Cohesion: 0.11
Nodes (25): Adherence Coaching and Behavioral Support System, Adherence >6 Months Critical Success Factor, Continuous Glucose Monitors (Dexcom, Freestyle Libre, Medtronic), Clinical Research Integration Document (Thomas Seyfried 2024-2026), Medical Device Integration (CGM, Ketone Meters, Wearables), GKICalculator Service (backend), Glucose-Ketone Index (GKI), Glioblastoma Clinical Study (Seyfried 2024-2026) (+17 more)

### Community 1 - "Backend API Dependencies"
Cohesion: 0.10
Nodes (19): dependencies, cors, express, express-rate-limit, helmet, description, devDependencies, jest (+11 more)

### Community 2 - "Frontend React Setup"
Cohesion: 0.12
Nodes (16): browserslist, development, production, dependencies, react, react-dom, react-scripts, @testing-library/jest-dom (+8 more)

### Community 3 - "Biomarker & Assessment Models"
Cohesion: 0.18
Nodes (14): Assessment Data Model, BiomarkerDashboard React Page, Biomarker Panel (Glucose, Ketones, CRP, IL-6, Lipids, Liver), BiomarkerReading Data Model, CLAUDE.md Repository Guidance, MMR Application Design Document (2024-07-20, v2.0), Docker Compose Development Environment, GitHub Actions CI/CD Pipeline (+6 more)

### Community 4 - "Monorepo Configuration"
Cohesion: 0.18
Nodes (10): description, devDependencies, concurrently, engines, node, license, name, private (+2 more)

### Community 5 - "Core App Stack"
Cohesion: 0.20
Nodes (10): Express.js Backend API (port 5000), React 18 Frontend (CRA, port 3000), GKITracker React Component, JWT-Based Authentication with Refresh Tokens, Material-UI (MUI) Component Library, npm Workspaces Monorepo, PostgreSQL 15+ Database, Recharts Data Visualization Library (+2 more)

### Community 6 - "NPM Scripts & Build"
Cohesion: 0.25
Nodes (8): scripts, dev, install-all, start:backend, start:frontend, test, test:backend, test:frontend

### Community 7 - "Express Server"
Cohesion: 0.29
Nodes (6): app, cors, express, helmet, limiter, rateLimit

### Community 8 - "Frontend Build Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, eject, start, test

## Knowledge Gaps
- **65 isolated node(s):** `allow`, `name`, `version`, `description`, `main` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MMR Implementation Plan (2024-07-20, v2.0)` connect `Biomarker & Assessment Models` to `Clinical Protocol & Adherence`, `Core App Stack`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `Mitochondrial Metabolic Reprogramming Application` connect `Clinical Protocol & Adherence` to `Biomarker & Assessment Models`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `Glucose-Ketone Index (GKI)` connect `Clinical Protocol & Adherence` to `Biomarker & Assessment Models`, `Core App Stack`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `allow`, `name`, `version` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Clinical Protocol & Adherence` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Backend API Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Frontend React Setup` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._