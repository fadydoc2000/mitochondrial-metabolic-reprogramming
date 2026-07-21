---
name: mmr-test-suite
description: MMR project test spec kit — backend unit tests (Jest), frontend component tests (Vitest), web app E2E tests (Playwright), and code review gate. Use when writing, running, or planning tests for this project.
---

# MMR Test Suite

Four layers. Each has a distinct scope. Run them in order — unit first, E2E last.

```
1. Backend unit tests   → Jest + Supertest          cd backend && npm test
2. Frontend unit tests  → Vitest + Testing Library  cd frontend && npm test
3. Code review gate     → /code-review              before every push
4. Web app E2E tests    → Playwright MCP            against http://localhost:3000
```

Coverage threshold for both: **80% lines / functions / branches** (enforced in config).

---

## 1 — Backend Unit Tests (Jest + ts-jest)

**Location:** `backend/tests/*.test.ts` and `*.test.js`  
**Run:** `cd backend && npm test`  
**Coverage:** `cd backend && npm test -- --coverage`

### What to test

| Target | Test what |
|--------|-----------|
| `gkiCalculator.ts` | Zone classification (GREEN/YELLOW/RED), rounding, zero-ketone throw |
| `protocolAdvisor.ts` | `buildProtocolStatus` — phase transitions, pulse readiness, recommendation text |
| `adherenceCoach.ts` | `computeAdherence` — streak counting, milestone detection, 30-day adherence % |
| `safetyScreening.ts` | `checkSafety` blockers (T1D, pregnancy) and warnings (kidney, liver, meds); `checkBiomarkerAlerts` thresholds |
| `dataAnonymizer.ts` | `getAnonymizedResearchData` — use a mock Prisma client; verify no PII in output |
| Routes (`auth`, `biomarkers`, `protocol`, etc.) | Supertest against `server.js` — happy path + auth guard (401 without token) |

### Patterns

```ts
// Service unit test
import { calculateGKI } from '../src/services/gkiCalculator'

it('GKI <1.0 → GREEN', () => {
  const r = calculateGKI(72, 5)   // 72/18/5 = 0.8
  expect(r.zone).toBe('GREEN')
  expect(r.isTherapeutic).toBe(true)
})

// Route test with auth guard
const res = await request(app).get('/api/biomarkers/latest')
expect(res.status).toBe(401)

// Route test with token
const res = await request(app)
  .get('/api/biomarkers/latest')
  .set('Authorization', `Bearer ${token}`)
expect(res.status).toBe(200)
```

### Auth token for route tests

```ts
// Register a test user, capture the token
const reg = await request(app).post('/api/auth/register')
  .send({ email: 'test@test.com', password: 'password123', firstName: 'Test', lastName: 'User' })
const token = reg.body.token
```

### Key edge cases

- `calculateGKI(x, 0)` must throw
- `computeAdherence([])` must return zeroed status (no crash)
- `checkSafety` with both T1D + pregnancy → two blockers
- `checkBiomarkerAlerts` at exactly 250 mg/dL glucose → `urgent`
- Safety blocker present → `cleared: false`

---

## 2 — Frontend Component Tests (Vitest + Testing Library)

**Location:** `frontend/src/**/*.test.tsx` (co-locate next to component)  
**Run:** `cd frontend && npm test` (watch) or `npm test -- --run` (CI)  
**Coverage:** `npm test -- --coverage --run`  
**Config:** `vite.config.ts` → `test.environment: 'jsdom'`, setup in `src/setupTests.ts`

### What to test

| Component / page | Test what |
|-----------------|-----------|
| `GKITracker` | Renders glucose + ketone inputs; submit calls `createBiomarker`; GKI result displayed |
| `AuthPage` | Sign-in and register tab switching; form submit calls `login`/`register`; error message rendered |
| `SafetyAssessment` | Blocker message shown when T1D checked; form submit disabled until all fields answered |
| `AdherenceCoach` | Streak count visible; milestone badge shown at 180 days |
| `MetricCard` | Renders value, label, zone colour |
| `LandingPage` | Citation links have correct `href` and `target="_blank"`; nav links present |

### Patterns

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import GKITracker from './GKITracker'
import * as api from '../services/api'

vi.mock('../services/api')

it('displays calculated GKI after submit', async () => {
  vi.mocked(api.createBiomarker).mockResolvedValue({
    id: 1, gkiScore: 0.8, metabolicZone: 'GREEN',
    bloodGlucoseMgdl: 72, betaHydroxybutyrateMmol: 5,
    readingAt: new Date().toISOString(), source: 'manual',
    metabolicState: 'KETONE_ADAPTED', notes: null,
    crpMgL: null, triglyceridesMgdl: null, hdlMgdl: null, ldlMgdl: null, lactateMmol: null,
  })
  render(<GKITracker />)
  fireEvent.change(screen.getByLabelText(/glucose/i), { target: { value: '72' } })
  fireEvent.change(screen.getByLabelText(/ketone/i), { target: { value: '5' } })
  fireEvent.click(screen.getByRole('button', { name: /log/i }))
  expect(await screen.findByText(/0\.8/)).toBeInTheDocument()
})
```

### Mock api.ts

```ts
// At top of test file
vi.mock('../services/api', () => ({
  createBiomarker: vi.fn(),
  getBiomarkerLatest: vi.fn(),
  getProtocolStatus: vi.fn(),
  getAdherence: vi.fn(),
}))
```

### Mock auth.ts

```ts
vi.mock('../services/auth', () => ({
  login: vi.fn().mockResolvedValue('mock-token'),
  register: vi.fn().mockResolvedValue('mock-token'),
  logout: vi.fn(),
  getToken: vi.fn().mockReturnValue('mock-token'),
  getRole: vi.fn().mockReturnValue('PATIENT'),
}))
```

### Key edge cases

- `AuthPage` error state: mock `login` to reject → error message visible
- `SafetyAssessment` with T1D = true → blocker text in DOM
- Citation `<a>` tags: `href` matches exact PubMed URLs (regression guard)
- Empty GKI tracker (no readings) → no crash, empty state shown

---

## 3 — Code Review Gate

Run both in order before every `git push`:

```
1. /ponytail:ponytail-review   complexity check on the diff (dead code, unused deps, shrinkable logic)
2. /code-review                correctness + security check (bugs, null derefs, missing guards)
3. git push                    pre-push hook confirms review was done
```

**Before phase-ending PRs:** `/code-review ultra` (deeper multi-agent pass; still run ponytail-review first).

The pre-push hook reads from `/dev/tty` — must be run from a real terminal. Claude Code non-interactive sessions cannot satisfy it:

```bash
git push origin <branch>
# hook prompts: "Have you run /code-review? [y/N]"
# answer y after running both commands above
```

Fix all **CONFIRMED** findings from either tool before pushing. **PLAUSIBLE** findings: fix or add an inline comment explaining why deferred.

---

## 4 — Web App E2E Tests (Playwright MCP)

**Requires:** dev server running at `http://localhost:3000` + backend at `http://localhost:5000`  
**Start servers:** `npm run dev` (root)  
**Tools:** Playwright MCP (`mcp__playwright__*`)

### Key flows to verify

| Flow | Steps | Assert |
|------|-------|--------|
| Landing page loads | Navigate to `/` | Hero text visible; 3 citation links present with correct hrefs |
| Register | Click "Create free account" → fill form → submit | Redirected to safety screen |
| Safety screening | Answer all questions (no blockers) → submit | Redirected to dashboard |
| GKI log | Enter glucose + ketone → submit | GKI value and zone shown |
| Protocol guidance | Click Protocol nav | Phase cards visible; recommendations listed |
| Citation links | Click each cite pill | New tab opens to correct PubMed/BioMedCentral URL |
| Auth guard | Navigate to `/api/biomarkers/latest` without token | 401 response |

### Playwright MCP pattern

```
1. mcp__playwright__browser_navigate  → http://localhost:3000
2. mcp__playwright__browser_snapshot  → get accessibility tree
3. mcp__playwright__browser_find      → locate element by text/role
4. mcp__playwright__browser_fill_form → fill inputs
5. mcp__playwright__browser_click     → submit / navigate
6. mcp__playwright__browser_snapshot  → assert result state
7. mcp__playwright__browser_take_screenshot → attach proof
```

### Register flow example

```
navigate → http://localhost:3000
click "Get Started Free" button
snapshot → confirm AuthPage rendered
click "Register" tab
fill_form: firstName=Test, lastName=User, email=test+{timestamp}@test.com, password=Test123!
click "Create free account"
snapshot → assert safety screen heading visible
```

### Regression smoke after every UI change

1. Landing page renders without console errors
2. Auth page: both tabs render, name row equal-width
3. Mitochondria section: SVG renders, no overflow
4. Dashboard GKI gauge visible after login
5. All nav links reachable

---

## Running everything

```bash
# Full suite (from repo root)
npm run test:backend   # Jest — 30 tests, ~6s
npm run test:frontend  # Vitest — add -- --run for non-watch CI

# Coverage reports
cd backend  && npm test -- --coverage
cd frontend && npm test -- --coverage --run

# E2E (manual, requires running servers)
npm run dev   # in separate terminal
# then use Playwright MCP tools in Claude Code
```

## File naming conventions

```
backend/tests/          gkiCalculator.test.ts
                        protocolAdvisor.test.ts
                        adherenceCoach.test.ts
                        safetyScreening.test.ts
                        dataAnonymizer.test.ts   ← missing, add it
                        server.test.js

frontend/src/
  components/           GKITracker.test.tsx
                        MetricCard.test.tsx
                        AdherenceCoach.test.tsx
                        SafetyAssessment.test.tsx
  pages/                LandingPage.test.tsx
                        AuthPage.test.tsx
```
