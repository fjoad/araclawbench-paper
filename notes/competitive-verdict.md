# Competitive verdict after the FULL 19-paper read (2026-08-31)

Question answered here: others are trying what we do — do our contributions hold, what
should we adopt, what must the framing change?

## The field, honestly

A multilingual-agent-gap literature now exists (2025–2026): macOSWorld (GUI, 5 langs,
AR worst at −28.8%), OmnilingualGAIA2 (10 langs, 8.8–18.4 pt gap, doesn't close with
scale), GAIA-v2-LILT (MT gaps are partly measurement error; +32.7 pts recovered; AR
still worst after human audit), X-WebAgentBench (14 langs, WebShop sandbox, >20% lag),
MPR-GUI (6 langs, static, no Arabic), MAPS (12 langs incl AR; degradation tracks
non-English token share; security degrades too), PolyWorkBench (author-written,
trajectory-level multilinguality, AR in ONE task).

**"There is a cross-lingual agent gap, and Arabic is worst" is now ESTABLISHED, not
novel.** Our intro must not claim it; it must cite it as motivation.

## Why the contributions still hold — the composite nobody occupies

Every entrant translates by machine, runs in sandboxes/simulations, treats Arabic as
MSA-only (or barely at all), translates Western tasks, and grades without consequential
actions. We hold, uniquely and simultaneously:
1. **Human translation** with enforced literal parity (LILT is our printed justification
   that this choice is load-bearing, not a detail).
2. **Live real environments** — production web + localized desktop + terminal; the only
   live-web multilingual agent evaluation of any kind.
3. **Native Arab-world tasks** (50) — everyone else translates Western tasks; nobody
   measures the actual Arabic digital ecosystem.
4. **Dialects** — zero prior agentic dialect evaluation anywhere (AraDiCE is static
   NLP). "First agentic dialect evaluation" is a clean, defensible first.
5. **Consequential-action grading** (capture-and-block) — only ClawBench has this, in
   English only.
6. **Paired, evidence-audited, artifact-controlled measurement** — paired cells,
   deterministic checkers, EVAL_ERROR-never-zero, k=3 adjudication; directly answers
   the literature's own headline problem (LILT: gaps are partly benchmark-induced;
   OmnilingualGAIA2: 35% translation defects + 10% verifier artefacts).
7. **Ecosystem findings** (machine-translated Arab web; phone/CAPTCHA walls).

## Required reframing (intro)

The question is no longer "is there a gap?" It is: **"is the gap real once measurement
error is controlled — and where exactly does it come from, in the real Arabic digital
life rather than a translated sandbox?"** Prior findings (28.8% / 8.8–18.4 / 30.3%
residual) become our motivation paragraph; our paper is the controlled, ecologically
valid, mechanism-level answer.

## Adoptions — what they do that we should do

1. **Paired McNemar test + Wilson CIs** per family on matched cells; mark
   not-significantly-different cells on the results heatmap (OmnilingualGAIA2's orange
   wedges). Our k=3 handles cell-level noise; McNemar handles corpus-level inference.
2. **Gap attribution as a reported decomposition** — our audit already classifies
   genuine-PASS/genuine-FAIL/EVAL_ERROR; add a translation-defect count (should be ~0
   given human translation + parity tests) and report the three shares like
   OmnilingualGAIA2 does. This turns our discipline into a quotable number.
3. **ABC self-assessment** — score AraClawBench against the Agentic Benchmark Checklist
   and put the table in the appendix. Cheap, and it preempts the exact reviewer
   critique class (also: engage ABC's anti-live-website stance directly with our
   preflight/EVAL_ERROR/exclusion machinery).
4. **Quantified judge agreement** wherever an LLM assists the failure taxonomy
   (Terminal-Bench's κ convention): calibrate a sample against the owner's labels.
5. **Per-arm token/step cost analysis** — X-WebAgentBench shows non-Latin scripts cost
   ~2× tokens; MAPS ties degradation to non-English token share. Our manifests already
   record tokens/steps per cell → an Arabic-token-inflation analysis connects directly
   to our budget-edge divergence mechanism (1095). Likely a whole results subsection.
6. **Empirical difficulty per language arm** (Terminal-Bench's pass-rate difficulty):
   does task difficulty rank identically in EN and AR? Cheap and novel.
7. **Behavioral signatures** (OmnilingualGAIA2 exploratory-reads-vs-writes; ClawBench
   last-mile funnel): check the same shift in our AR arms during the audit.

## Pruning note for the ~20-target bib

All 19 earn a place except possibly: tbench-guidelines (single-author opinion; keep if
the task-design section wants its quote), TheAgentCompany (landscape-only). WebArena +
SWE-bench are pre-2-year but canonical anchors of the genre — keep as the user allowed.
Add when found: the ICLR 2027 formatting cites nothing; no more hunting needed unless
sections demand.
