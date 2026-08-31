# The multilingual-agent-evaluation wing (read 2026-08-31)

Three papers read directly; together they define the genre our results section joins.
The genre exists (2025–2026) but every entrant is machine-translated, none touches the
live web, none has dialects, none has native-region tasks — that composite gap is our
"missing target" paragraph.

## GAIA-v2-LILT (arXiv 2604.24929, Apr 2026, LILT) — read in full (6 pp)

The validity paper for translated agent benchmarks. Argues MT + light post-editing
breaks agentic benchmarks; names the failure classes: translationese, MT hallucination,
**functional misalignment** (under-translation: answer key stays English → false
negatives; over-translation: pinned strings translated → exact-match breaks), cultural
misalignment, difficulty drift.
- Workflow: deterministic filters (language ID, **placeholder recall** — pinned
  numbers/URLs must survive verbatim = our machine-literal parity test, independently
  invented), single-axis LLM judges, bilingual human audit + meta-review.
- 165 tasks × 5 languages incl. Arabic. **Arabic edit rate: 84.8% of tasks.**
- Correcting MT recovered up to **+32.7 points** — "a substantial share of the
  multilingual performance gap is benchmark-induced measurement error."
- **Arabic keeps the largest residual gap (up to 30.3%) even after full human audit.**
- Functional-alignment flags have the highest verdict-flip rate (67.9%); fluency flags
  the lowest (40.6%) — prioritize functional/cultural fidelity over fluency.
USE: our defense-in-print for human translation + parity tests + frozen literals; and
the "is your gap real or benchmark-induced?" question our audit must answer explicitly.

## OmnilingualGAIA2 (arXiv 2608.08775, Aug 2026, Meta) — read pp. 1–8

MT expansion of GAIA2 (simulated mobile tool-env, not GUI/web) into 10 languages /
5 scripts; frozen spans for identifiers/timestamps (parity-law analog again).
- **Universal cross-lingual gap: 8.8–18.4 pass@3 points**; agent-asymmetric;
  concentrated on tool-orchestration; **does not close with model scale**.
- **Stratified gap attribution: 55% genuine model failures / 35% translation defects /
  10% verifier artefacts**; bounded MT-contamination floor (6.4% of pairs).
- **Statistics to adopt: paired McNemar test on matched scenario pairs per capability,
  Wilson CIs, per-cell p-values; cross-lingually-robust cells marked on a heatmap.**
- Behavioral signatures off-English: more exploratory reads, fewer state-changing
  writes; tool-strategy JSD per matched scenario. (Resonates with ClawBench's
  "last-mile hesitation" and our budget-edge divergence mechanism.)
- Related-work goldmine: X-WebAgentBench, Ticket-bench, MLCL, MASSIVE-Agents, MAPS,
  TelcoAgent-Bench, SEATauBench, **PolyWorkBench (native multilingual agent benchmark
  built from scratch)**, and the **Agentic Benchmark Checklist (ABC, Zhu et al. 2026)**
  — systematic outcome/task-validity failures in agentic benchmarks; fetch ABC for the
  validity section.
USE: gap-magnitude citation; the attribution framing (our audit classes genuine-PASS /
genuine-FAIL / EVAL_ERROR are a cleaner-by-construction version); the McNemar+Wilson
statistical protocol for our paired results.

## macOSWorld — see skeleton-macosworld.md (28.8% Arabic degradation; MT instructions).

## How the genre positions us (draft positioning paragraph material)

Every multilingual agent benchmark to date: (a) translates by machine (macOSWorld:
GPT-4o; OmnilingualGAIA2: Gemma pipeline; LILT is the corrective audit), (b) runs in
sandboxes or simulated environments (macOS VMs, GAIA2 mobile sim), (c) covers Arabic
only as MSA, never dialects, (d) translates Western tasks rather than sourcing native
ones, and (e) none grades consequential real-world actions. AraClawBench: human
translation with enforced literal parity + four dialects; live production web + real
desktop + terminal; 50 native Arab-world tasks; capture-and-block consequential grading;
paired per-task adjudication with deterministic evidence checkers. The three prior
findings (28.8% macOSWorld AR degradation; 8.8–18.4 universal gap; 30.3% residual AR
gap after human audit) jointly motivate: the gap is real, largest for Arabic, and
requires human-translated, ecologically valid measurement to separate model failure
from benchmark artefact — which is what we build.
