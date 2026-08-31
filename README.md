# AraClawBench — ICLR 2027 paper

The paper for the AraClawBench benchmark: paired English/Arabic evaluation of
computer-use agents. This repo is the **local writing environment**; the
benchmark itself lives in its own repository.

## Deadlines and format (ICLR 2027, verified 2026-08-31)

- **Abstract deadline: September 18, 2026 (AOE).** Paper: **September 25, 2026 (AOE)**.
- Main text: **9 pages** at submission (10 at camera-ready). References and
  appendix: unlimited. We draft to ~11–12 pages, then cut to 9.
- Double-blind. **Never cite or link this repo in the submitted PDF** — code
  links in the submission go through an anonymous mirror.
- Mandatory **AI-use statement** (does not count toward the page limit).
- Style files: `iclr2027_conference.{sty,bst}` (already vendored here).

## Workflow

1. Draft locally in this repo (Claude + Faaiz). Build with `make`.
2. When the draft is good → upload to Overleaf; the team edits there.
3. Faaiz copies corrections back here; iterate; copy back up.

## Rules

- **No hand-typed result numbers.** Real numbers enter via generated tables in
  `tables/` (produced from the benchmark repo's audit ledgers).
- Numbers extrapolated from the partial 83-task web run are wrapped in
  `\extrap{...}` (purple, marked EXT). `\todo{...}` marks open writing.
  **`make check` fails while either macro is still in use** — run it before
  any submission or Overleaf upload of a "final" version.
- `refs/pdfs/` (collected papers) and the proposal PDF stay **untracked** —
  they are other people's copyrighted PDFs / internal documents.
- Writing style: plain, short, clear sentences. No jargon, no analogies, no
  filler. Structure mirrors the best benchmark papers; the sentences are ours.

## Layout

- `main.tex` — root; includes `sections/*.tex`
- `sections/` — one file per section (provisional until the lit review)
- `notes/` — lit-review artifacts: per-paper structural skeletons, the chosen
  structure, decisions
- `tables/` — generated result tables (`.tex`), never hand-edited
- `figures/` — figures
- `references.bib` — the bibliography (target ~20 entries, flexible; last ~2
  years; A* venues or genuinely influential — quality over count)
- `refs/pdfs/` — collected reference papers (gitignored)
