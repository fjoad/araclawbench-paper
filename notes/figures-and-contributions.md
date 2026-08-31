# Figures plan + contributions draft (from anchor reading, 2026-08-31)

## Figure typology observed in the anchors

Consistent pattern (~half concept, half analysis):
1. Fig 1 teaser = whole argument in one image (ClawBench: 3-panel overview; T-Bench:
   headline ranking w/ CIs; OSWorld: examples + env diagram).
2. 2–3 mechanism/process diagrams (env pipeline, grading pipeline, audit flowchart).
3. Composition donut/histogram + comparison checkmark matrix (all three).
4. 4–6 analysis figures: rankings w/ error bars, cost scatter, failure taxonomy
   donut/bars, heatmaps, stage funnel.

## Our figure slate (draft)

- **Fig 1 (teaser)**: same task side by side on matched EN and AR machines — two
  screenshots + paired verdict. Unique to us; no other paper can draw it.
- **Fig 2**: harness + evidence pipeline (VM, screenshot→action loop, recorder,
  capture-and-block proxy, evidence-based checker).
- **Fig 3**: validity/audit pipeline (frozen prompts → build → independent verify gate →
  watched cells → batch → adjudication; defect ledger) — Terminal-Bench Fig-3 style,
  with effort numbers.
- **Fig 4**: corpus composition donut (family × borrowed/native × platform stratum
  regional/global-arabic/global) + language-arms panel.
- **Table (matrix)**: comparison vs OSWorld / ClawBench / Terminal-Bench / WebArena /
  AndroidWorld: real env?, paired languages?, dialects?, consequential actions graded?,
  evidence-based deterministic checkers?, exclusion transparency.
- **Analysis**: (a) paired EN-vs-AR success by family — the money figure; (b) per-task
  scatter EN SR vs AR SR w/ divergent pairs marked; (c) failure taxonomy split by
  language; (d) exclusion/phone-wall breakdown (ecosystem finding); (e) optional: k=3
  adjudication outcomes on divergent pairs.

## Contributions (target 4; norm across anchors is 3–5, ClawBench lists 5)

1. **Benchmark**: first paired English/Arabic computer-use benchmark — 221 tasks
   (desktop/web/terminal; 171 borrowed from OSWorld, ClawBench, Terminal-Bench + 50
   native Arab-world tasks), human MSA translations, four dialect arms.
2. **Paired methodology + validity playbook**: matched-VM paired cells; per-task
   evidence-based deterministic checkers; capture-and-block for consequential actions;
   EVAL_ERROR-never-zero; k=3 adjudication of divergent pairs; frozen test-enforced
   instructions. (Our Specificity/Solvability/Integrity analog.)
3. **Measurement**: large-scale paired evaluation of frontier model(s); the EN–AR gap
   quantified with mechanism-level failure analysis.
4. **Ecosystem findings**: the Arab-facing web is largely machine-translated (genuinely
   Arabic sites are a small stratum); phone/CAPTCHA walls structurally exclude regional
   categories — reported as findings with an honest exclusion table.

User framing to keep: the human translations (+dialects) and the compute-heavy model
evaluation are the heart; methodology and ecosystem findings are what make it a paper
rather than a dataset drop.
