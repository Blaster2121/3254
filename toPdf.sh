#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-.}"

OUT_DIR="pdf_output"
mkdir -p "$OUT_DIR"

compile_file() {
  local tex_file="$1"
  echo "Processing: $tex_file"
  pdflatex -interaction=nonstopmode -halt-on-error -output-directory "$OUT_DIR" "$tex_file" >/dev/null 2>&1 || {
    echo "pdflatex failed for $tex_file" >&2
    exit 1
  }
  
  pdflatex -interaction=nonstopmode -halt-on-error -output-directory "$OUT_DIR" "$tex_file" >/dev/null 2>&1 || {
    echo "pdflatex failed (2nd pass) for $tex_file" >&2
    exit 1
  }
}

if [[ -f "$TARGET" && "$TARGET" == *.tex ]]; then
  compile_file "$TARGET"
elif [[ -d "$TARGET" ]]; then
  shopt -s nullglob
  TEX_FILES=("$TARGET"/*.tex)
  if [[ ${#TEX_FILES[@]} -eq 0 ]]; then
    echo "No .tex files found in $TARGET" >&2
    exit 1
  fi
  if command -v parallel >/dev/null 2>&1; then
    echo "Using parallel processing..."
    export -f compile_file
    parallel -j+0 compile_file ::: "${TEX_FILES[@]}"
  else
    echo "Using sequential processing..."
    for f in "${TEX_FILES[@]}"; do
      compile_file "$f"
    done
  fi
else
  echo "Target not found: $TARGET" >&2
  exit 1
fi

rm -f "$OUT_DIR"/*.aux "$OUT_DIR"/*.log "$OUT_DIR"/*.out "$OUT_DIR"/*.toc 2>/dev/null || true
