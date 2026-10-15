# GEOL 105 mock course: Brightspace homepage + weekly pages

- `index.html`: the course landing page (served by GitHub Pages).
- `weeks/course-overview.html`: the course overview, for a "Start Here" module at the top of Content.
- `weeks/week-01.html` … `week-08.html`: one page per week, to upload into each Brightspace Content module.
- `src/weeks-content.js`: all course text. Edit it, then run `./build.sh` to regenerate every page.
- `src/build.js`: the page templates, styles and diagrams.

Each term, replace every `href="#"` in `index.html` with the full URL of the matching Brightspace Content module.
