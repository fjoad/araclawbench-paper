# Structural skeleton — ClawBench (arXiv 2604.08523v2, Jul 2026)

Read directly, full main body (9 pp + refs), 2026-08-31. Our web-family upstream and the
source of our capture-and-block mechanism. Compact 4-section shape — the closest model for
our own page budget.

## Section structure and what each section does

1. **Abstract**: capability question as opener ("can agents reliably complete everyday
   online workflows?") → benchmark stats (153 tasks / 144 platforms / 15 categories) →
   what the tasks demand → the live-web-vs-sandbox contrast → one sentence on the safety
   mechanism (interception captures and blocks the final submission) → headline result
   (best model 33.3%) → one-sentence mission close.
2. **§1 Introduction** (~2.5 pp): gap analysis organized by *benchmark families* with
   citations inline (static-trace / sandboxed self-hosted / live-web read-only) → "the
   missing target" paragraph naming exactly what nobody measures → the evaluation problem
   it creates (must preserve 144 live sites while preventing side effects) → three named
   design properties → safety-mechanism paragraph → evaluation protocol paragraph
   (five-layer trace recording + Agent-as-Judge + human-agreement numbers) → results
   summary paragraph → trace-diagnosis summary paragraph → **numbered contributions (5)**.
3. **§2 Benchmark**: opening design-choices paragraph + "Positioning" paragraph (design-
   space location vs named alternatives; Table 1 = comparison matrix: environment, #tasks,
   #sites, task type, verification, recording, human trajectories).
   - **2.1 Task design and collection**: what "write-heavy" means and why it's harder to
     evaluate; sourcing from real users; formalization into task cards (instruction, start
     URL, required user files, expected final state, terminal submission target);
     **filtering rules listed explicitly** (excluded: read-only, geo-restricted, paid
     subscriptions, real payment without safe interception, mandatory phone OTP /
     government-ID checks, uncontrollable irreversible effects); human reference
     trajectory recorded per task; breadth-first rationale (144 sites ≫ repeated tasks on
     few sites — anti-overfitting argument).
   - **2.2 Safe live-web execution**: final-request interception mechanism (annotator
     identifies terminal HTTP request: URL pattern + method + payload fields; runtime
     captures, blocks, records; all other traffic proceeds); the honest scoping paragraph
     — "**task-scoped safety envelope**, not a general guarantee"; excluded workflow
     classes; **validation study: 100% of human reference runs blocked, zero false
     positives on navigation traffic**.
   - **2.3 Trace-based evaluation**: five-layer recording; Agent-as-Judge with a small
     formalization (Score(t) ∈ {0,1}, SR = mean) — two display equations, no more;
     outcome-oriented rubric in prose; judge-vs-human agreement table (84.97–93.46%).
4. **§3 Experiments**: 3.1 setup (Models / Harness / Metrics as bolded lead-in
   paragraphs); 3.2 main results — one ranked table (overall + per-category + cost +
   tokens), findings as **bolded topic-sentence paragraphs** (overall rate; task-level
   saturation — "68 of 153 solved by no model"; ranking not explained by one capability;
   cost-performance frontier with 3-panel figure); 3.3 trace-level diagnosis — four named
   non-overlapping signals (interaction volume on failures; action-type composition;
   deepest-workflow-stage funnel → "**last-mile hesitation**" at the final confirm;
   termination-reason-by-model heatmap).
5. **§4 Conclusion** (short) — no separate related-work section; positioning lives in the
   intro's family taxonomy + §2's Positioning paragraph. Appendix carries per-category
   tables, judge calibration, failure cases.

## Facts we will cite (verified in the PDF)

- 153 tasks, 144 live platforms, 15 categories; write-heavy focus.
- Final-request interception; annotators pre-identify terminal request (URL pattern,
  method, payload fields); 100%-blocked validation study.
- Excludes mandatory phone OTP and government-ID tasks BY DESIGN — our Arab-web phone-wall
  finding extends exactly this filter and shows its regional cost.
- Agent-as-Judge (Claude Sonnet 4.6), 84.97–93.46% agreement with humans.
- Results: Sonnet 4.6 33.3%, Qwen 3.5 26.1%, GLM-5 24.2%, **GPT-5.4 6.5%** (our evaluated
  model — its low ClawBench score is important context for our absolute numbers).
- 30-minute wall clock, no step cap (GLM-5 hits the wall on 69/153).
- "Last-mile hesitation": agents reach the final confirmation step and stop before the
  state-changing request — expect and look for this in our own trace audit.

## Moves worth stealing

- The **"missing target" paragraph**: one paragraph that names precisely what no prior
  benchmark measures. Ours: "no benchmark measures whether the same agent serves an
  Arabic-speaking user as well as an English-speaking one, on the same tasks, on real
  systems."
- **Named design properties** (three, italicized, numbered) early in the intro; everything
  later refers back to them.
- The **honest safety-scoping paragraph** ("task-scoped safety envelope, not a general
  guarantee") — exactly the register for our blocking addon + EVAL_ERROR discipline.
- **A validation study for the safety/grading mechanism** (their 100%-block study). Ours:
  the live block-proof gates (807 Embark), preflight, recorder-liveness — reportable as a
  protocol, not an anecdote.
- Judge-vs-human **agreement table** to justify the grader. Ours is deterministic
  evidence checking, not judge-based — argue that as a *stronger* property (auditable,
  reproducible), and cite our adjudication/audit protocol in its place.
- **Task-level saturation** framing ("solved by no model") — for us: per-cell honesty
  (genuine PASS/FAIL vs EVAL_ERROR excluded).
- Minimal formalism: two display equations total. Follow that restraint.

## What we do differently (noted while reading)

- Their unit: task verdict from an LLM judge against a human reference trajectory. Ours:
  **paired language cells graded by deterministic checkers over recorded evidence** —
  no judge in the loop for the primary metric (selection conditions recorded as judge
  metadata are secondary). Say this contrast explicitly in our evaluation section.
- They report one language (English, implicitly). We are the controlled-comparison layer
  on top of exactly this class of benchmark — the intro should present AraClawBench as
  the language-controlled counterpart to this family.
