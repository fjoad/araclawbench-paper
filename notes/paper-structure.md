# Definitive paper structure (post-full-lit-review, 2026-08-31)

Synthesized from all 19 papers. Supersedes the provisional stubs. Target: ~11–12 pages
drafted → cut to 9 (ICLR 2027 submission limit). Minimum four evaluated models:
GPT-5.4, Claude Opus 4.8, Claude Sonnet 5, Gemini 3.7 Flash — full task set each.

## Sections

**Abstract** — written last.

**1 Introduction** (~1.75 pp) — 7 paragraphs:
agents on real computers → the established cross-lingual gap (cite macOSWorld 28.8% AR
worst; OmnilingualGAIA2 8.8–18.4; X-WebAgentBench >20%) → the measurement problem
(LILT +32.7 recovered, 35% translation defects; all prior work MT + sandboxed; no
dialects; no native tasks) → missing-target paragraph → introduce AraClawBench →
evaluation summary (4 models, headline \extrap numbers, attribution, mechanisms) →
numbered contributions (4).

**2 Related Work** (~1 pp) — four bolded paragraphs, each ending with what is missing:
computer-use agent benchmarks / multilingual agent evaluation / Arabic and dialectal
evaluation / benchmark validity. Ends with the composite-gap sentence.

**3 AraClawBench** (~2.5 pp):
3.1 Design principles (named, italic: *Paired measurement*, *Ecological validity*,
    *Evidence-based grading*, *Translation fidelity*) — everything later refers back.
3.2 Task corpus: 171 borrowed (OSWorld/ClawBench/Terminal-Bench provenance, selection,
    dedup) + 50 native Arab-world tasks (authoring protocol, walked end-to-end,
    category substitutions with reasons); composition figure; exclusion transparency.
3.3 Language arms: EN + human MSA; four dialect arms; translation protocol; the
    machine-literal parity law (test-enforced); per-arm PROVENANCE TAGS
    (human-translated / model-drafted / model-drafted+human-verified) enabling the
    within-benchmark MT-vs-human analysis (LILT-style, but measured not simulated).
3.4 Environments and harness: matched EN/AR VMs; screenshot + mouse/keyboard only
    (stated as a measurement stance); action space; budgets; model backends.
3.5 Evaluation: one deterministic checker per task graded from recorded evidence;
    capture-and-block for consequential actions (blocked terminal request = evidence;
    task-scoped safety envelope + live block-proof protocol); EVAL_ERROR-never-zero;
    frozen instructions; k=3 adjudication of divergent pairs; audit pipeline figure
    with person-hours (Terminal-Bench Fig-3 style).

**4 Experimental setup** (~0.75 pp): models (4+), paired protocol, metrics (paired SR
gap; McNemar per family with Wilson CIs), run scale (~cells count), infrastructure.

**5 Results** (~1.5 pp) — bolded finding-sentence paragraphs:
(a) main table: model × language × family, paired gaps with significance marks;
(b) universality: is the AR gap present for every model (heatmap w/ robust-cell
    wedges); (c) per-task EN-vs-AR scatter, divergent pairs; (d) provenance split
    (human-translated vs model-drafted arms); (e) dialect results; (f) token/step cost
    per arm (script inflation → budget pressure).

**6 Analysis** (~1.5 pp): failure taxonomy by language WITH COUNTS (the section nobody
else can write): RTL/mirroring behavior, localized filesystem names, Arabic text
input, Arabic-localized forms/CAPTCHA walls, machine-translated-site quality;
behavioral signatures (explore-vs-commit shift, last-mile hesitation); gap attribution
decomposition (genuine / translation-defect / eval-artifact shares); ecosystem
findings (machine-translated Arab web stratum; phone-wall exclusions as findings).

**7 Discussion and limitations** (~0.5 pp): live-web drift vs ABC's frozen-env stance
(our mitigations); single-region scope; dialect arms model-drafted (provenance
sentence); what EVAL_ERROR rates say.

**8 Conclusion** (~0.25 pp) + Ethics / Reproducibility / AI-use statements (the AI-use
statement doubles as our methodology honesty: agent-assisted build with human-gated
merges — cite the audit pipeline).

**Appendix**: ABC self-assessment table; per-task results; task examples EN/AR;
exclusion table with reasons; judge-agreement numbers for the LLM-assisted taxonomy;
harness details; dialect review provenance.

## Figure/table slate (final)

F1 teaser (same task, EN vs AR VM, paired verdict) · F2 harness+evidence pipeline ·
F3 audit/validity pipeline · F4 corpus composition · T1 comparison matrix (rows:
OSWorld, WebArena, ClawBench, Terminal-Bench, AndroidWorld, macOSWorld,
X-WebAgentBench, OmnilingualGAIA2, AraClawBench; cols: real live env / paired langs /
human translation / dialects / native-region tasks / consequential actions / paired
per-task adjudication) · T2 main results · F5 universality heatmap · F6 scatter ·
F7 taxonomy by language · F8 token-cost · T3 provenance split · T4 dialects.

## Writing rules reminder

Plain short sentences; no jargon, no analogies; must not read AI-written; structure
mirrored from anchors, sentences ours; every number from generated tables or \extrap.
