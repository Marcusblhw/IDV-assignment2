# SVG Coding Assignment

**Duration:** 2 weeks | **Pass:** accumulate ≥ 10 marks | **Total available:** 46 marks

## Submission

- One file named `index.html` containing one `<svg>` per diagram, each inside a `<section>` with a heading (e.g. `<h2>Image 002 — Binary Heap Tree</h2>`)
- Each SVG has its own `width`, `height`, and `viewBox` — no shared coordinate spaces
- Plain, readable code. No minification, no build tools, no npm

## Rules

- **Allowed:** all native SVG elements, inline `<style>`, vanilla JS `<script>` at bottom, `<animate>` / `<animateTransform>`
- **Not allowed:** external libraries, `<canvas>`, raster `<image>` embeds of the original, any framework

## Rubric (per diagram)

| Criterion       | Weight | Description                                                                        |
| --------------- | -----: | ---------------------------------------------------------------------------------- |
| Visual accuracy |   40 % | Shapes, proportions, colours, and text match the reference                         |
| Code clarity    |   20 % | Logical `<g>` grouping, readable attributes, one comment per section               |
| Minimal & plain |   20 % | No bloat, no unnecessary attributes, no external dependencies                      |
| Interactivity   |   10 % | Hover/click behaviour in vanilla JS or CSS (skipping costs this 10 %, no further penalty) |
| Correctness     |   10 % | Valid SVG, renders without errors, no overflow clipping                            |
