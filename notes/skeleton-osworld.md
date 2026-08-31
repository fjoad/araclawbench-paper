# Structural skeleton — OSWorld (arXiv 2404.07972, NeurIPS 2024 D&B)

Read directly, main body pp. 1–16 (preprint v2), 2026-08-31. Our desktop-family upstream.

## Section structure and what each section does

1. **Abstract**: motivation (1 sentence) → gap in existing benchmarks → "first-of-its-kind"
   environment claim → benchmark stats (369 tasks, real apps) → evaluation approach
   (execution-based, per-task scripts) → headline number (human 72.36% vs best model 12.24%)
   → cause of failure (GUI grounding) → availability.
2. **§1 Introduction** (~2 pp): human-computer framing → why agents → the missing piece
   (no real interactive env covering diverse OS/apps) → prior envs too narrow → introduce
   environment → introduce benchmark built on it (construction effort: 9 authors, man-hours)
   → evaluation summary with the headline gap → 4–5 takeaway findings compressed into one
   paragraph → open-source statement + future-work sentence.
3. **§2 Environment**: 2.1 formal task definition (POMDP (S,O,A,T,R); reward function);
   2.2 infrastructure (VM isolation, config-driven setup, coordinator; execution-based eval
   as a subsubsection); 2.3 observation space; 2.4 action space (table of actions + special
   WAIT/FAIL/DONE).
4. **§3 Benchmark**: 3.1 OS + software chosen and why; 3.2 tasks — collection sources
   (forums, tutorials, guidelines), cross-checking protocol, deliberate infeasible tasks,
   initial-state setup configs, execution-based eval (134 unique eval functions), quality
   control (fresh-eyes attempts by non-authors, rounds of fixes with man-hour counts);
   3.3 data statistics (stats table + category donut) + **comparison-with-prior-benchmarks
   matrix** (✓/✗ columns: executable env? multimodal? cross-app? intermediate init state?
   # eval functions); 3.4 human performance (who, protocol, time distribution vs prior
   benchmark, accuracy).
5. **§4 Benchmarking baselines**: 4.1 models + input settings (a11y tree / screenshot /
   both / Set-of-Marks) with implementation detail (context, temperature, max steps);
   4.2 results — one big grouped table; findings delivered as **bolded topic-sentence
   paragraph headers**.
6. **§5 Analysis**: success rate sliced by difficulty / feasibility / #apps; observation
   ablations (resolution, history length); robustness perturbations (window position/size/
   clutter); cross-OS correlation; qualitative — success and failure cases with screenshot
   figures, **common-error taxonomy with percentages** (75% mouse-click inaccuracy →
   repetitive clicks, noise dilemma), human-vs-agent difficulty discrepancy, model-vs-model
   comparative analysis.
7. Related work → Conclusion (short), then large appendix carrying env details, task
   examples, prompts, extended results.

## Moves worth stealing

- **Example-tasks table early** (initial-state screenshot + instruction + simplified eval
  script side by side) — makes the grading mechanism concrete before any formalism.
- **Comparison matrix vs prior benchmarks** with checkmark columns — instantly positions
  the contribution. We should have one (rows: OSWorld, ClawBench, Terminal-Bench, WebArena,
  AraClawBench; columns: real env?, paired languages?, consequential actions graded?,
  evidence-based checkers?, dialects?).
- **Bolded finding-sentences as paragraph headers** in results/analysis — scannable, and
  each is a quotable claim.
- **Credibility through construction effort numbers**: man-hours, annotator counts,
  cross-check protocol, rounds of quality control. We have real equivalents (audit gates,
  frozen prompts, adjudication rounds, defect ledger).
- **Human performance as its own subsection** with a time-distribution figure. (Out of
  scope for us by decision — but we must say so explicitly and justify.)
- **Deliberate infeasible tasks** as a design feature. Our analog: exclusion table with
  documented reasons (phone walls, CAPTCHAs, dead sites) as a *finding about the Arab web*.
- **Error taxonomy with percentages** from sampled failures — our audit will produce
  exactly this; reserve an analysis subsection for it.
- POMDP formalization is standard boilerplate — one compact paragraph, no more.

## What we do differently (noted while reading)

- OSWorld's unit is a task; ours is a **paired cell** (same task, two languages, matched
  VMs). The experimental unit needs its own crisp definition early — no prior anchor
  paper has this; closest analog is controlled-comparison papers.
- Their eval scripts read final state; ours grade **recorded evidence** (network captures,
  files, screenshots) with capture-and-block for consequential actions — one level more
  auditable; worth a design-principles paragraph.
- Their agent gets a11y trees/SoM options; ours is **screenshots + mouse/keyboard only**
  (by design, to measure the real off-the-shelf Arabic experience). State it as a
  deliberate stance with the rationale, in §2's observation-space slot.
