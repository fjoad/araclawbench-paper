.PHONY: all check clean

all:
	latexmk -pdf -interaction=nonstopmode main.tex

# Fails while any extrapolated number or TODO is still in the sources.
# Run before any "final" build or Overleaf upload.
check:
	@if grep -rn --include='*.tex' -e '\\extrap{' -e '\\todo{' sections/ main.tex; then \
		echo 'FAIL: \\extrap/\\todo still present (see lines above)'; exit 1; \
	else echo 'OK: no extrapolated numbers or TODOs remain'; fi

clean:
	latexmk -C
	rm -f sections/*.aux
