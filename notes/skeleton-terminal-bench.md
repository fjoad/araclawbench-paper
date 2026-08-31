# Structural skeleton — Terminal-Bench 2.0 (arXiv 2601.11868, Jan 2026)

Read directly, main body pp. 1–11, 2026-08-31. Our terminal-family upstream. Notably: the
paper itself uses the ICLR style — a live example of our exact format budget in action.

## Section structure and what each section does

1. **Abstract** (short, ~9 lines): premise → gap ("current benchmarks either do not
   measure real-world tasks, or are not sufficiently difficult") → the benchmark (89
   curated hard tasks, unique environments, human-written solutions, comprehensive tests)
   → headline (frontier <65%) → error analysis exists → availability.
2. **§1 Introduction** (1 page — the shortest of the three anchors): agents-are-coming
   framing (3 sentences with citations) → why the terminal is the right environment
   (ubiquity, text-native, real products use it, revenue factoid) → what the framework is
   (task = container + instruction + tests + reference solution) → the dataset (89 tasks,
   3 human reviewers each) → paper roadmap paragraph.
3. **§2 Terminal-Bench**:
   - 2.1 Task formulation: components; tests verify final container state only, not the
     path — "**outcome-driven**" principle stated and justified; harness compatibility.
   - 2.2 Dataset construction: crowd-sourced (93 contributors, 229 tasks → 89 selected);
     difficulty estimates assigned by authors.
   - 2.3 **Verification** — the standout section. Three named criteria as bolded
     paragraphs: **Specificity** (tests pass iff acceptable end state), **Solvability**
     (oracle solution passes), **Integrity** (no shortcut/cheat path). Then a 7-step
     audit-process figure (pre-merge: CI + LLM checks + expert review; post-merge: model
     runs, manual trajectory audit, **adversarial exploit audit**, final decision) with
     person-hours quantified (~3 reviewer-hours/task). Ends with an honest "may still
     have flaws" sentence.
   - 2.4 Composition: example tasks in prose, difficulty-time table, category histogram.
4. **§3 Experimental setup**: scale statement (6 agents × 16 models, ≥5 runs each,
   32,155 trials); 3.1 their neutral reference agent (Terminus 2) and why it exists
   (decouple model from scaffold); 3.2 agents; 3.3 models (+ reasoning-effort defaults);
   3.4 harness/infrastructure.
5. **§4 Results**: headline ranking figure with 95% CIs; agent-vs-model attribution
   ("model selection matters more than scaffold"); 4.1 cost (Pareto frontier, log-scale
   cost axis; no correlation between turns and success); 4.2 performance over release
   date (saturation forecast + commitment to keep evaluating); 4.3 predicted vs
   empirical difficulty (defined from pass rates; confusion matrix; correlation with
   significance); 4.4 trajectory-level error analysis (taxonomy derived from prior work
   [MAST], LLM-judge with quantified human agreement: 93% Cohen's κ calibration, 90%
   alignment; failure-mode prevalence by model); 4.5 command-level error analysis
   (second LLM-judge, 82% agreement; 3,800 failures sampled; donut taxonomy figure).
6. **§5 Limitations** (its own section, 1 page, specific and honest: cheating vectors,
   training contamination + canary string, reproducibility pins vs internet drift,
   verification residual risk).
7. **§6 Related work**: two bolded named paragraphs (Related Benchmarks / LMs and the
   Terminal) — compact, taxonomy-by-category with distinctness claim at the end.
8. **§7 Conclusion**: short; ends by urging future curators to invest in manual
   verification — a norms statement.

## Moves worth stealing

- **Named verification principles** (Specificity / Solvability / Integrity) — we have a
  direct analog and better war stories: frozen instruction text (test-enforced),
  evidence-based checkers, EVAL_ERROR-never-zero, capture-and-block, provenance-cited
  matchers, pending-derivation honesty. Naming our principles like this is the cleanest
  way to compress the project's hard-won validity discipline into a page.
- **The audit-process figure with person-hours** — our merge-gate pipeline (Codex builds
  → independent verification → owner decision, defect ledger, watched cells) deserves
  the same figure treatment. It doubles as our AI-use story.
- **Empirical difficulty from pass rates** vs predicted — cheap, objective, and we can
  do it per language arm (does difficulty rank the same in Arabic? — a novel twist).
- **Quantified LLM-judge agreement** wherever a judge is used (their κ and % numbers) —
  applies to our LLM failure-analysis layer; the primary metric stays deterministic.
- **Limitations as a real section** with specific attack surfaces, not boilerplate.
- **95% CIs on the headline figure**; ≥5 runs per combination. Our k=3 on divergent
  pairs is our version — state the replication policy explicitly.
- Error bars + "no correlation between turns and success" — check the same in our data.

## What we do differently (noted while reading)

- Their tests run inside the container with full observability; our desktop/web families
  grade from **recorded evidence outside the VM** — one paragraph on why (the agent may
  not carry graders; the environment is adversarial to instrumentation).
- Their agent is tool-using (any tools in container); ours is deliberately
  screenshots + mouse/keyboard only, one interface for all families — a controlled-
  measurement decision, not a capability ceiling. State it in the harness section.
- They aggregate over 5 runs per (agent, model); we pair over languages with matched
  seeds/VMs — the paired design is the paper's core and needs its own subsection with
  the k=3 adjudication rule.
