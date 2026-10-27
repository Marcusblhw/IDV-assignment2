const SVG_NS = "http://www.w3.org/2000/svg";

// Create an SVG element with attributes (and optional text) and append it.
function add(parent, tag, attrs, text) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const name in attrs) el.setAttribute(name, attrs[name]);
  if (text !== undefined) el.textContent = text;
  parent.appendChild(el);
  return el;
}

// ---------- 002 Binary heap: position each index by its level and slot within the level ----------
const heap = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1];
const heapEdges = document.getElementById("heap-edges");
const heapNodes = document.getElementById("heap-nodes");

function heapPos(i) {
  const level = Math.floor(Math.log2(i + 1));
  const slot = 560 / 2 ** level;
  return { x: 20 + (i + 1 - 2 ** level + 0.5) * slot, y: 50 + level * 90 };
}

function highlightHeap(i, on) {
  [i, 2 * i + 1, 2 * i + 2].forEach(j => {
    const edge = document.getElementById("heap-edge-" + j);
    if (edge) edge.classList.toggle("hl", on);
  });
}

heap.forEach((value, i) => {
  const p = heapPos(i);
  if (i > 0) {
    const q = heapPos(Math.floor((i - 1) / 2));
    add(heapEdges, "line", { id: "heap-edge-" + i, x1: q.x, y1: q.y, x2: p.x, y2: p.y });
  }
  const node = add(heapNodes, "g", { class: "node" });
  add(node, "title", {}, `index ${i}, value ${value}`);
  add(node, "circle", { cx: p.x, cy: p.y, r: 27 });
  add(node, "text", { x: p.x, y: p.y, dy: "0.35em" }, value);
  add(node, "text", { class: "index", x: p.x - 26, y: p.y - 22 }, i);
  node.addEventListener("mouseenter", () => highlightHeap(i, true));
  node.addEventListener("mouseleave", () => highlightHeap(i, false));
});

// ---------- 007 Merge sort: once the web font loads, centre each pointer under its target number ----------
document.fonts.ready.then(() => {
  document.querySelectorAll("#merge [data-target]").forEach(arrow => {
    const box = document.getElementById(arrow.dataset.target).getBBox();
    const x = Math.round(box.x + box.width / 2);
    arrow.setAttribute("x1", x);
    arrow.setAttribute("x2", x);
  });
});

// ---------- 010 Directed graph: trim each edge to the circle boundaries, label it off its midpoint ----------
const R = 56;
const vertices = { V1: [387, 100], V2: [144, 250], V3: [256, 530], V4: [538, 418], V5: [781, 250] };
const edges = [
  // [label, from, to, directed, which side of the line the label sits on]
  ["E1", "V1", "V2", false, 1],
  ["E2", "V1", "V5", true, -1],
  ["E3", "V5", "V4", true, -1],
  ["E4", "V4", "V1", true, 1],
  ["E5", "V4", "V3", true, -1],
  ["E6", "V2", "V3", false, 1],
  ["E7", "V2", "V4", true, -1]
];
const edgeLayer = document.getElementById("graph-edges");
const vertexLayer = document.getElementById("graph-vertices");
const edgeGroups = [];
let selected = null;

edges.forEach(([label, from, to, directed, side]) => {
  const [ax, ay] = vertices[from];
  const [bx, by] = vertices[to];
  const len = Math.hypot(bx - ax, by - ay);
  const ux = (bx - ax) / len;
  const uy = (by - ay) / len;
  const g = add(edgeLayer, "g", { class: "edge" });
  const line = add(g, "line", {
    x1: Math.round(ax + ux * R), y1: Math.round(ay + uy * R),
    x2: Math.round(bx - ux * R), y2: Math.round(by - uy * R)
  });
  if (directed) line.classList.add("directed");
  add(g, "text", {
    x: Math.round((ax + bx) / 2 - uy * side * 32),
    y: Math.round((ay + by) / 2 + ux * side * 32),
    dy: "0.35em"
  }, label);
  edgeGroups.push({ g, from, to });
});

const vertexGroups = Object.entries(vertices).map(([name, [x, y]]) => {
  const g = add(vertexLayer, "g", { class: "vertex" });
  add(g, "title", {}, `Click to show the edges of ${name}`);
  add(g, "circle", { cx: x, cy: y, r: R });
  add(g, "text", { x, y, dy: "0.35em" }, name);
  g.addEventListener("click", () => selectVertex(name));
  return { g, name };
});

function selectVertex(name) {
  selected = selected === name ? null : name;
  edgeGroups.forEach(e => e.g.classList.toggle("dim", Boolean(selected) && e.from !== selected && e.to !== selected));
  vertexGroups.forEach(v => v.g.classList.toggle("selected", v.name === selected));
}

// ---------- 014 Seaborn hierarchy: one column per figure-level function ----------
const families = [
  { colour: "blue", x: 10, name: "relplot", kind: "(relational)", plots: ["scatterplot", "lineplot"] },
  { colour: "orange", x: 215, name: "displot", kind: "(distributions)", plots: ["histplot", "kdeplot", "ecdfplot", "rugplot"] },
  { colour: "green", x: 420, name: "catplot", kind: "(categorical)", plots: ["stripplot", "swarmplot", "boxplot", "violinplot", "pointplot", "barplot"] }
];
const seaborn = document.getElementById("seaborn");

families.forEach(f => {
  const cx = f.x + 98;
  const col = add(seaborn, "g", { id: f.name, class: `item ${f.colour}` });
  add(col, "line", { x1: cx, y1: 166, x2: cx, y2: 183 + 44 * (f.plots.length - 1) });

  const header = add(col, "g", { class: "box header" });
  add(header, "rect", { x: f.x, y: 48, width: 196, height: 118, rx: 22 });
  const title = add(header, "text", { x: cx, y: 100 }, f.name);
  add(title, "tspan", { x: cx, dy: 28 }, f.kind);

  f.plots.forEach((plot, k) => {
    const y = 183 + 44 * k;
    const box = add(col, "g", { class: "box" });
    add(box, "rect", { x: cx - 74, y, width: 148, height: 33, rx: 8 });
    add(box, "text", { x: cx, y: y + 23 }, plot);
  });
});
