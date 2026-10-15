#!/bin/sh
# Wraps src/homepage.html (preview source) into index.html, the page GitHub Pages serves.
cd "$(dirname "$0")"
{
  printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n'
  sed -n '1,/^<\/style>$/p' src/homepage.html | grep -v 'claude:viewport'
  printf '</head>\n<body>\n'
  sed -n '/^<\/style>$/,$p' src/homepage.html | tail -n +2
  printf '</body>\n</html>\n'
} > index.html
