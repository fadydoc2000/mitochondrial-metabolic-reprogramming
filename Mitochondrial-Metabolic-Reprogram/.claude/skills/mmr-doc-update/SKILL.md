---
name: mmr-doc-update
description: MMR project documentation update — keep plan, design spec, CLAUDE.md, and clinical reference in sync after code changes. Use after completing any feature, task, or phase.
---

# MMR Documentation Update

Three documents to keep in sync. Check each one after every significant code change.

```
1. Implementation plan   → docs/superpowers/plans/2024-07-20-mitochondrial-metabolic-reprogramming-plan.md
2. Design spec           → docs/superpowers/specs/2024-07-20-mitochondrial-metabolic-reprogramming-design.md
3. CLAUDE.md             → CLAUDE.md (architecture, commands, structure)
```

Clinical reference (`docs/CLINICAL_RESEARCH_INTEGRATION.md`) is research-driven — only update if clinical concepts or GKI thresholds change in code.

---

## When to update each

| Changed in code | Update |
|----------------|--------|
| New route, service, or DB table | Plan (mark task complete or add subtask) + CLAUDE.md |
| New component or page | Plan + Design spec (user journey or component list) |
| Schema change (Prisma) | CLAUDE.md (Architecture section) |
| New npm script or command | CLAUDE.md (Commands section) |
| New env var or config | CLAUDE.md |
| GKI formula or zone thresholds changed | Clinical reference + Design spec |
| Phase boundary crossed (Tasks 1–13) | Plan (mark phase complete) |

---

## 1 — Implementation Plan

File: `docs/superpowers/plans/2024-07-20-mitochondrial-metabolic-reprogramming-plan.md`

**After completing a task:**
- Find the task heading (e.g. `### Task 5`)
- Add a completion marker at the top of the task block:

```markdown
**Status**: ✓ Complete — [brief note on what was built, date if notable]
```

**After adding unplanned work:**
- Add a subtask under the nearest parent task or append as `### Task 13b` (continuation style)
- Include: Files created/modified, what it does, why it was added

**Never:**
- Change the original task descriptions retroactively
- Delete tasks — mark them complete or deferred

---

## 2 — Design Spec

File: `docs/superpowers/specs/2024-07-20-mitochondrial-metabolic-reprogramming-design.md`

Update when the user-facing behaviour changes:

- **New page or major component** → add to component inventory section
- **User journey changed** → update the relevant phase steps
- **New user type or role** → update User Types section
- **API contract changed** (new endpoint, changed response shape) → update API section if present

Keep updates brief — one or two lines per change. This is a spec, not a changelog.

---

## 3 — CLAUDE.md

File: `CLAUDE.md`

Update when any of these change:

```
Repository Structure   → new top-level directory or workspace
Commands               → new npm script, new useful command
Architecture           → new middleware, new service layer, new DB dependency
Branching              → naming convention changed
Key Clinical Concepts  → GKI formula, zone thresholds, protocol phases
```

**Pattern for adding a command:**
```markdown
npm run new:command     # one-line description of what it does
```

**Pattern for adding architecture notes:**
```markdown
**NewService** (`backend/src/services/newService.ts`): one-line description.
```

---

## Checklist (run after every feature or task)

- [ ] Implementation plan: task marked complete or new subtask added
- [ ] Design spec: user-visible changes reflected
- [ ] CLAUDE.md: commands, structure, architecture current
- [ ] Clinical reference: only if GKI/zone/protocol logic changed

If nothing changed in a doc's domain, skip it — don't touch for the sake of touching.
