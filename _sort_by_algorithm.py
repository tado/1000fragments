#!/usr/bin/env python3
"""Classify every shader in 10000fragments by its generation algorithm,
sort so same-algorithm shaders are contiguous, and renumber sequentially.

- Synthesized files contain `float field(` -> classified by field signature.
- Original hand-authored files -> classified by technique heuristics.
Within each algorithm group, files keep their prior numeric order.
"""
import os, glob, tempfile, shutil

DST = "/Users/tado/Documents/Claude-tmp/1000fragments/10000fragments"

# algorithm groups in thematic sort order
ORDER = ["waves", "stripes", "plasma", "rings", "spiral", "star", "checker",
         "dots", "truchet", "moire", "flow", "fbm", "ridged", "gyroid",
         "voronoi", "voredges", "metaball", "interf", "julia", "misc"]
RANK = {name: i for i, name in enumerate(ORDER)}

# signatures for synthesized fields (specific first)
SYNTH_SIG = [
 ("ridged",   "1.0 - abs(rn"),
 ("flow",     "v = noise3(vec3(p *"),
 ("fbm",      "famp"),
 ("voredges", "m1 = 8.0, m2"),
 ("voronoi",  "md = min(md, length(nb"),
 ("metaball", "float ms = 0.0;"),
 ("interf",   "for(int xi = 1;"),
 ("julia",    "vec2 z = p *"),
 ("gyroid",   "sin(g.x) * cos(g.y)"),
 ("truchet",  "if(hash21(ti)"),
 ("moire",    "float ma = sin(length(p"),
 ("plasma",   "0.25 * (sin(p.x"),
 ("star",     "float petal"),
 ("dots",     "vec2 dp = fract(p *"),
 ("checker",  "sign(sin(cq.x)"),
 ("spiral",   "v = sin(sa *"),
 ("waves",    "0.5 * (sin(p.x *"),
 ("stripes",  "v = sin(p.x *"),
 ("rings",    "0.5 * sin(length(p) *"),
]

def classify_synth(s):
    for name, sig in SYNTH_SIG:
        if sig in s:
            return name
    return "misc"

def classify_orig(s):
    h = lambda x: x in s
    if h("random2("): return "voronoi"
    if h("mod289("): return "flow"
    if h("fbm("): return "fbm"
    if h("float lines(") or h("lines(in vec2"): return "stripes"
    if h("length(uv)") and ("c[i]" in s or "c [ i ]" in s): return "metaball"   # tunnel
    if h("length(abs(mod(uv"): return "metaball"
    if h("/ length(pp - pos)") or h("/length(pp - pos)"): return "metaball"
    if ("length(m - pos)" in s) and ("/" in s) and ("sin(length" not in s): return "metaball"
    if h("sin(length(m - p)"): return "interf"
    if ("p.x +=" in s and "p.y +=" in s): return "plasma"
    if ("st.x +=" in s or "st.y +=" in s) and h("pow(abs"): return "plasma"
    if h("abs(mod(") and ("- uv." in s or "- uv;" in s): return "stripes"     # light streaks
    if h("mod(st.x +") or h("mod(st.y +"): return "stripes"
    if h("smoothstep(radius"): return "dots"
    if h("sign((mod("): return "checker"
    if h("hsb2rgb("): return "spiral"
    if h("sqrt(sin("): return "waves"
    if h("rotate(") and h("radians("): return "waves"
    if h("floor(sin(st") or h("mod(sin(st") or h("mod(cos(st"): return "stripes"
    if h("length(uv)") and h("sin(len"): return "rings"
    if h("length(abs(st)"): return "rings"
    if h("random(ipos") or h("random(rand"): return "dots"
    if "sin(uv.x" in s and "cos(uv.y" in s: return "waves"
    if h("abs(sin(st") or h("abs(cos(st") or h("abs(pow(sin(time"): return "waves"
    if h("sin(p.x *"): return "stripes"
    return "misc"

def classify(s):
    if "float field(" in s:          # synthesized
        return classify_synth(s)
    return classify_orig(s)           # original hand-authored

# ---- load, classify, sort -------------------------------------------------
items = []
for path in glob.glob(os.path.join(DST, "*.frag")):
    name = os.path.basename(path)
    num = int(name[:5])
    content = open(path).read()
    cat = classify(content)
    items.append((RANK[cat], num, cat, content))

items.sort(key=lambda t: (t[0], t[1]))   # by algorithm group, then prior number

# ---- write renumbered into a temp dir, then swap in -----------------------
tmp = tempfile.mkdtemp(prefix="frag_sort_")
ranges = {}
for idx, (_, _, cat, content) in enumerate(items):
    with open(os.path.join(tmp, f"{idx:05d}.frag"), "w") as fh:
        fh.write(content)
    r = ranges.setdefault(cat, [idx, idx])
    r[1] = idx

# remove old top-level .frag, move new ones in
for path in glob.glob(os.path.join(DST, "*.frag")):
    os.remove(path)
for fn in os.listdir(tmp):
    shutil.move(os.path.join(tmp, fn), os.path.join(DST, fn))
os.rmdir(tmp)

# ---- report ---------------------------------------------------------------
print(f"sorted & renumbered {len(items)} files -> 00000.frag .. {len(items)-1:05d}.frag\n")
print(f"{'algorithm':12s} {'count':>6s}   range")
for cat in ORDER:
    if cat in ranges:
        a, b = ranges[cat]
        print(f"{cat:12s} {b-a+1:6d}   {a:05d}.frag - {b:05d}.frag")
