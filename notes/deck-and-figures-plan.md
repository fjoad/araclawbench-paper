# Fanar meeting deck (2026-09-03) + paper figures — working plan (written 2026-09-02)

## Deck: 9 slides, plain style (white, title + few bullets + one figure; no decoration)
1. Setup refresher — Figure 1 (overview with screenshots).
2. Upstream reality check — per-benchmark table of the benchmark authors' OWN per-task results on our
   borrowed tasks (notes/upstream-per-task-results.csv): ClawBench V1 GPT-5.4 3/39, Gemini 3 Flash 9/39,
   Sonnet 4.6 19/39; V2 GPT-5.5 0/11, Opus 4.7 0/8; OSWorld (equivalents) 27–55/71; TB 7/8.
3. August 17 result (audited): EN 43/78 55.1% · MSA 34/78 43.6% · EG 16/75 · SY 16/76 · QA 17/76 · SD 14/74.
4. Walkthrough A (Aug 17): OSWorld da922383 save-two-PDFs — EN PASS / MSA FAIL (Documents vs المستندات).
5. Walkthrough B (Aug 17): OSWorld 3a93cae4 Wednesday lecture slot — EN/MSA PASS, 4 dialects FAIL (precision).
6. Web gap (GPT-5.4 wave 1, PRE-AUDIT, hand-verified): flydubai N003 — EN PASS 33 steps / MSA FAIL 62 steps;
   Arabic arm added baggage + seat hold instead of skipping extras (PUT baggage, PUT seat/hold in trace).
   Cells: jobs/2026-08-31-main-experiment/release-01/wave-1/lane3/{en,msa}/001-acb-n003-flydubai-doh-dxb
   Backups: N023 DHL (EN PASS/MSA FAIL), N002 MyFitnessPal; reverse: N004 Qatar Airways, 413-v2, N049.
7. Account-setup flow: Todoist 413-v2 — MSA PASS (signup → PurelyMail inbox in Arabic → verify → 8 tasks),
   EN FAIL (tasks missing due dates/priorities). Cells: .../wave-1/lane3/{msa,en}/010-413-v2.
   Gemini web failure example: Qatar Museums N007 (ticket quantities left at zero) from the wave-2 audit.
8. Exclusions & replacements: phone/ID/CAPTCHA walls (11 held + phone-walled natives); ClawBench excludes
   phone-OTP/ID tasks by design too (paper §2.1) — cite; replaced categories (DHL quote, StoryGraph).
9. Status + plan: 221 tasks (171 borrowed + 50 native), 6 languages, 4 models minimum (GPT-5.4, Gemini
   3.7 Flash, Opus 4.8, Sonnet 5; GPT-5.5 offered as 5th); Gemini arm running; ICLR 2027 abstract Sept 18,
   paper Sept 25; asks: Standard gpt-5.4 Azure deployment (not Batch), Google service-account key.
Numbers rule: only the Aug-17 audited aggregates go on slides; wave-1/Gemini cells only as hand-verified
examples labeled pre-audit; Gemini wave 2 = "0 of 80 consequential, matching upstream's Gemini".

## Figures (built as slides in figures.pptx → PDF → pdfcrop; same asset for paper + deck)
- Fig 1 OVERVIEW (OSWorld-style, screenshots): top band = one task strip: instruction EN + AR (+1 dialect
  line small); two rows of real frames with cursor trails (EN desktop / AR RTL desktop) → paired verdict.
  Bottom band = pipeline icons: task sources → human translation (MSA+4 dialects) → matched VMs → agent
  (screenshot in, mouse/keyboard out) → recorder + blocking proxy → deterministic checker → paired verdict.
  Example task: da922383 (Aug 17 walkthrough A). Frames on box under
  jobs/borrowed-repair-supplement-{en,msa}-desktop-20260811-212020/da922383-*__openai__{en,ar__msa}__t0.
- Fig 2 HARNESS DETAIL (ClawBench Fig-4 style pastel panels, icons, few words): observation/action (7
  actions, budgets) · matched environments (identical image, locale differs; recorder; capture-and-block)
  · evaluation (deterministic checker → PASS/FAIL/EVAL_ERROR; k=3 on divergent pairs).
- Fig 3 AUDIT PROCESS (Terminal-Bench Fig-3 style cards): frozen prompts → build → independent verify
  gate → watched cells → batch → evidence adjudication; defect ledger. Becomes a table if pages bite.
