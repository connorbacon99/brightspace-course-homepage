#!/bin/sh
# Rebuilds index.html, weeks/*.html and the preview files from src/weeks-content.js.
cd "$(dirname "$0")" && node src/build.js
