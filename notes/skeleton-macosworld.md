# Structural skeleton — macOSWorld (arXiv 2506.04135v4, NeurIPS 2025)

Read directly, main body pp. 1–9, 2026-08-31. **The closest existing work to ours** —
multilingual interactive GUI benchmark whose five languages include Arabic. Must-cite;
our "missing target" paragraph is written against this paper.

## What it is (facts to cite)

- 202 interactive macOS tasks, 30 apps (28 macOS-exclusive); 171 tasks available in
  Arabic. Five languages (EN, ZH, AR, JA, RU) — both task instructions AND the OS
  interface language.
- Tasks authored in English, **translated by GPT-4o** with Google-Translate round-trip
  verification — machine translation, not human.
- Execution-based evaluation scripts (AppleScript/JS/zsh over SSH), binary reward.
  VNC action space; 15 screenshots / 30 dialog turns cap; 1024×768.
- **Headline multilingual finding: Arabic is the worst language — 28.8% average
  degradation vs English** (13.7% vs 19.3% SR averaged over agents). Mechanisms named
  qualitatively: degraded grounding in Arabic; Claude CUA carries left-to-right biases
  into mirrored RTL layouts and clicks non-mirrored locations; GPT-4o loses >60% SR on
  Arabic. Task-language/env-language mismatch degrades further.
- Comparison table axis: Languages (Task × Env) — 5×5 vs everyone else's 1×1.
- Also has a safety subset (deceptive pop-ups) — unrelated to our scope, skip.

## Section structure (NeurIPS style, ~9 pp)

Abstract → 1 Intro (gap: no macOS, English-only, no safety; contributions bulleted, 4)
→ 2 Related Works (bolded mini-paragraphs: GUI agents / benchmarks static-vs-interactive
/ safety) + "Gaps and Contributions" closing paragraph → 3 Infrastructure (agent POMDP,
tasks, environment, testbench pipeline) → 4 Tasks (curation principles, translation
process, statistics, human performance, safety subset) → 5 Benchmarking (setup; results
with bolded finding sentences; per-language table with Δ-vs-English row; qualitative
failure modes per agent tier; multilingual-discrepancy paragraph) → 6 Conclusion.

## How AraClawBench differs (the novelty ledger — use in intro + related work)

1. **Human translation vs MT**: their arms are GPT-4o output; ours are professional
   human MSA + four human dialect arms (borrowed) — and GAIA-v2-LILT documents why MT
   benchmark adaptation is treacherous. Our machine-literal parity checks are the
   disciplined version.
2. **Ecological validity**: they localize macOS system UIs; we run the real Arabic
   digital life — live production web (including Arab-world platforms), localized
   desktop, terminal — where the localization quality itself is part of what's measured
   (machine-translated-web stratum finding).
3. **Native tasks**: their tasks are Western tasks translated; our 50 native tasks are
   Arab-world flows (regional airlines, property, charity, museums, education).
4. **Paired experimental unit**: they compare language-averaged success rates; we run
   matched paired cells, adjudicate divergent pairs at k=3, and audit evidence per cell.
5. **Consequential actions**: our capture-and-block grades real payments/applications/
   posts safely; nothing comparable there.
6. **Dialects**: none there; four here.

## Moves worth stealing

- **Per-language results table with a Δ-vs-English row** (their Table 4) — compact,
  quotable; our version is per-family paired gaps.
- Language on BOTH axes (instruction language × environment language) — we already do
  matched instruction+environment; state the axis explicitly like they do.
- Their mechanism paragraph ("degraded grounding or planning") is qualitative; our
  failure taxonomy can make the same claim quantitative — that's the gap our analysis
  section fills.
