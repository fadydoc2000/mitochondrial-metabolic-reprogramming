# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Style

**Caveman mode: full.** Terse prose. Drop articles, filler, pleasantries. Fragments OK. Technical terms exact. Code unchanged. Pattern: [thing] [action] [reason]. [next step]. Auto-clarity for security warnings or irreversible actions. `/caveman lite|full|ultra` to switch, "stop caveman" to exit.

## Project Overview

This is a **non-profit, public-facing web application** for Mitochondrial Metabolic Reprogramming (MMR), grounded in Professor Thomas Seyfried's 2024-2026 research on metabolic cancer theory. The app helps people track their metabolic health via the Glucose-Ketone Index (GKI) and follow the Press-Pulse Protocol.

Implementation plan: [`docs/superpowers/plans/2024-07-20-mitochondrial-metabolic-reprogramming-plan.md`](docs/superpowers/plans/2024-07-20-mitochondrial-metabolic-reprogramming-plan.md)  
Design spec: [`docs/superpowers/specs/2024-07-20-mitochondrial-metabolic-reprogramming-design.md`](docs/superpowers/specs/2024-07-20-mitochondrial-metabolic-reprogramming-design.md)  
Clinical evidence reference: [`docs/CLINICAL_RESEARCH_INTEGRATION.md`](docs/CLINICAL_RESEARCH_INTEGRATION.md)

## Repository Structure

npm workspaces monorepo:

```
frontend/   React 18 CRA app (port 3000)
backend/    Express.js API (port 5000)
docs/       Implementation plan, design spec, clinical research notes
```

## Database

Prisma ORM — schema at [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma). PostgreSQL 15 via Docker.

```bash
cd backend
npm run db:generate      # regenerate Prisma client after schema changes
npm run db:migrate:dev   # create + apply a new migration (dev)
npm run db:migrate       # apply pending migrations (prod/CI)
npm run db:studio        # open Prisma Studio GUI
```

Prisma client singleton: `backend/src/db.ts` — import `prisma` from there everywhere.

## Commands

```bash
# Install all workspace dependencies
npm run install-all

# Run both frontend + backend together
npm run dev

# Individual services
npm run start:frontend    # port 3000
npm run start:backend     # port 5000, production-mode
cd backend && npm run dev # port 5000, nodemon watch mode

# Tests
npm test                  # all workspaces
npm run test:frontend     # react-scripts test (watch mode by default, add -- --watchAll=false for CI)
npm run test:backend      # jest

# Frontend production build
cd frontend && npm run build
```

## Architecture

**Backend** (`backend/server.js`): Express with `helmet`, `cors`, and `express-rate-limit` already wired. Entry point exports `app` so `supertest` can import without binding a port. No database yet — the plan specifies PostgreSQL + Redis but neither is implemented.

**Frontend** (`frontend/src/`): Create React App shell. Currently a placeholder. The plan targets React 18 + TypeScript + Vite + Redux Toolkit + MUI + Recharts — CRA will be replaced when UI work begins.

**Implementation phases** (see plan Tasks 1-13): The plan is task-numbered. Current code matches roughly Task 1-2 (repo scaffold + basic server). Tasks 7-13 define the clinical features: GKI calculator, biomarker dashboard, Press-Pulse Protocol guidance, medical device integration (CGM/ketone meters), safety screening, adherence coaching, and provider collaboration.

## Key Clinical Concepts (affects data model design)

- **GKI** = Blood Glucose (mg/dL) ÷ (Blood Ketones mmol/L × 18). Target <1.0 for therapeutic ketosis.
- **Press Phase**: sustained ketogenic diet (2:1–2.5:1 fat-to-carbs ratio).
- **Pulse Phase**: periodic targeted interventions (HBOT, fasting windows, strategic medication timing).
- **Metabolic zones**: red (GKI >3), yellow (1–3), green (<1).
- Adherence >6 months is the clinical success threshold from Seyfried's glioblastoma study.

## Branching

- `master` — main branch, always deployable
- `task-X-description` — feature branches per implementation plan task

## GitHub

Remote: https://github.com/fadydoc2000/mitochondrial-metabolic-reprogramming.git
