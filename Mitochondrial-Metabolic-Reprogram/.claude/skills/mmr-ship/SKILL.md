---
name: mmr-ship
description: MMR full pre-push workflow — tests, doc update, code review, then push. Run this before every git push.
---

# MMR Ship Workflow

Run in order. Each step gates the next.

```
1. Tests          npm run test:backend && npm run test:frontend -- --run
2. Docs           /mmr-doc-update
3. Complexity     /ponytail:ponytail-review
4. Correctness    /code-review
5. Push           git push  (hook confirms review was done)
```

---

## Step 1 — Tests

```bash
npm run test:backend
cd frontend && npm test -- --run
```

Both must pass. Fix failures before proceeding.  
Coverage: `npm test -- --coverage` if touching business logic.  
See `/mmr-test-suite` for patterns, edge cases, and naming conventions.

---

## Step 2 — Documentation

Run `/mmr-doc-update` and work through its checklist:

- Implementation plan: task complete / new subtask
- Design spec: user-visible changes reflected
- CLAUDE.md: commands, structure, architecture current
- Clinical reference: only if GKI/zone/protocol logic changed

Commit doc changes before the review steps so the diff is clean.

```bash
git add docs/ CLAUDE.md
git commit -m "Update docs to reflect [feature]"
```

---

## Step 3 — Complexity check

```
/ponytail:ponytail-review
```

Flags dead code, unused deps, logic that can shrink. Fix CONFIRMED findings.  
PLAUSIBLE findings: fix or add inline `// ponytail:` comment with reason.

---

## Step 4 — Correctness + security review

```
/code-review
```

Flags bugs, null derefs, missing auth guards, security issues. Fix all CONFIRMED findings.  
For phase-ending PRs: `/code-review ultra` instead.

---

## Step 5 — Push

```bash
git push origin <branch>
# pre-push hook asks: "Have you run /code-review? [y/N]"
# answer y
```

Hook requires a real terminal — non-interactive Claude Code sessions cannot satisfy it.

---

## Quick reference

| Situation | Skip |
|-----------|------|
| Docs-only commit | Steps 1, 3, 4 |
| Tests-only commit | Step 2, can skip 3 |
| Phase-ending PR | Replace step 4 with `/code-review ultra` |
| Hotfix on master | All steps — no shortcuts on main |
