#!/usr/bin/env python3
"""Extract 1000 maximally-diverse shaders from 10000fragments_newnew.

Strategy:
  1. Reproduce the archetype-label layout of _synthesize_10k_newnew.py
     (same BASE_COUNTS, same shuffle seed, same thinning conversion).
  2. Build an "algorithm signature" per file: archetype label + the set of
     code markers found in it (field algorithms, color modes, sub-styles,
     raymarch maps, domain transforms, post effects).
  3. Give every archetype a near-equal quota (~55) and fill it by
     round-robin over distinct-signature groups, so duplicated algorithm
     combinations are only used once other combinations are exhausted.

Output: 1000fragments_new/0000.frag .. 0999.frag (copied in source order)
        _extract_1000_manifest.tsv (dst, src, label)
"""
import os, sys, random, shutil
from collections import defaultdict

BASE = "/Users/tado/Documents/Claude-tmp/1000fragments"
SRC = os.path.join(BASE, "10000fragments_newnew")
DST = os.path.join(BASE, "1000fragments_new")

sys.path.insert(0, BASE)
import _synthesize_10k_newnew as G

# ---- 1. reproduce label layout -------------------------------------------
labels = []
for name, cnt in G.BASE_COUNTS:
    labels += [name] * cnt
random.Random(77002026).shuffle(labels)
conv = []
for tgt in ("waveline", "facet"):
    idxs = [i for i, lb in enumerate(labels) if lb == tgt]
    conv += [i for k, i in enumerate(idxs) if k % 4 != 0]
conv.sort()
for k, i in enumerate(conv):
    labels[i] = "contour" if k % 2 == 0 else "plexus"

# ---- 2. algorithm-signature markers ---------------------------------------
MARKERS = {
    # field algorithms
    "f_rings": "v = 0.5 * sin(length(p) *",
    "f_waves": "0.5 * (sin(p.x",
    "f_spiral": "v = sin(sa *",
    "f_checker": "sign(sin(cq.x)",
    "f_stripes": "v = sin(p.x *",
    "f_flow": "vnoise3(vec3(p *",
    "f_fbm": "famp",
    "f_voronoi": "md = min(md, length(nb + pt - vf))",
    "f_metaball": "ms +=",
    "f_interf": "xs +=",
    "f_julia": "jit",
    "f_gyroid": "sin(g.z) * cos(g.x)",
    "f_truchet": "tf.x = 1.0 - tf.x",
    "f_moire": "float mb = sin(length(p +",
    "f_plasma": "v = 0.25 * (sin(p.x",
    "f_ridged": "float rn = vnoise3",
    "f_star": "float petal",
    "f_dots": "vec2 dp = fract(p *",
    "f_voredges": "if(dl < m1){ m2 = m1; m1 = dl; } else",
    "f_hex": "1.7320508",
    "f_rose": "float pet =",
    "f_liss": "0.2617994",
    "f_mandel": "vec2 mc =",
    "f_caustic": "vec2 cw =",
    "f_warp2": "vec2 wq =",
    "f_phyllo": "2.3999632",
    "f_glitch": "float grow =",
    "f_weave": "float wa =",
    "f_koch": "vec2 kp =",
    "f_rays": "float qa =",
    "f_diagmaze": "0.7071068",
    "f_chladni": "vec2 cp = p *",
    "f_xorsier": "float xv =",
    "f_wood": "float wr =",
    "f_zigzag": "float zx =",
    "f_galaxy": "float arm =",
    "f_polka": "vec2 pk =",
    "f_rdspot": "float rv =",
    "f_terrace": "floor(lv *",
    "f_polyrings": "float pk =",
    "f_bolt": "float bx =",
    # color modes
    "c_pal": "palette(",
    "c_hue": "hue(",
    "c_duo": "mix(vec3(",
    "c_cos": "0.5 + 0.5 * cos(vec3(0.0, 2.094",
    "c_neon": "col / (1.0 + col)",
    "c_chroma": "vec3 col = vec3(field(",
    # raymarch maps
    "r_rep": "mod(q, ",
    "r_gyroid": "dot(sin(q * ",
    "r_torus": "vec2(length(q.xz)",
    "r_kifs": "float sc = 1.0;",
    "r_tubes": "mod(vec2(q.x, q.z)",
    # archetype sub-styles
    "s_ship": "z = abs(z);",
    "s_gpoint": "float gd = length(p - q);",
    "s_gring": "abs(length(p - q) -",
    "s_gbox": "vec2 bq = abs(p - q)",
    "s_gseg": "vec2 q2 = -q;",
    "s_ghash": "hash22(vec2(fi * 1.3",
    "s_prain": "vec2(fl * 7.31, -time",
    "s_ptwinkle": "+ fl * 7.31;",
    "s_arc": "abs(length(gv - vec2(0.5)) - 0.5)",
    "s_stripe": "rot2(floor(rnd",
    "s_circle": "sin((length(gv) -",
    "s_square": "max(abs(gv.x), abs(gv.y))",
    "s_diag": "(gv.x + gv.y)",
    "s_wjoy": "exp(-p.x * p.x",
    "s_wnoise": "vnoise2(vec2(p.x",
    "s_srings": "float v = sin(d *",
    "s_sneon": "float v = d;",
    "s_sfill": "1.0 - smoothstep(0.0,",
    "s_zgrid": "vec2 gq",
    "s_zspiral": "atan(q.y, q.x)",
    "s_racc": "float acc",
    "s_tliss": "vec2 cp = vec2(sin(ft",
    "s_trose": "cos(ft * ",
    "s_twobble": "vec2 cp = vec2(cos(ft), sin(ft)) * (",
    "s_cridge": "1.0 - abs(h * 2.0 - 1.0)",
    "s_cwarp": "h += ",
    "s_cband": "floor(lv)",
    # domain transforms
    "d_kaleido": "ka = mod(ka",
    "d_warp": "for(int wi",
    "d_fold": "for(int fo",
    "d_logpolar": "float lr = log(",
    "d_fisheye": "float fr = length(",
    "d_pixelate": "+ 0.5) /",
    "d_invert": "float iv = dot(",
    "d_conform": "2.0 * ",
    "d_diagswap": ".yx,",
    # posts
    "p_poster": "floor(clamp(col",
    "p_mod": "mod(col *",
    "p_fract": "fract(col *",
    "p_pow": "pow(clamp(col",
    "p_contrast": "(col - 0.5) *",
    "p_vign": "dot(vg, vg)",
    "p_scan": "gl_FragCoord.y *",
    "p_grain": "fract(time) * 100.0",
}

def signature(idx):
    with open(os.path.join(SRC, "%05d.frag" % idx)) as fh:
        text = fh.read()
    hits = frozenset(k for k, m in MARKERS.items() if m in text)
    return (labels[idx], hits)

# ---- 3. water-filling quotas: zero signature duplication -------------------
by_label = defaultdict(list)
for i, lb in enumerate(labels):
    by_label[lb].append(i)

label_groups = {}
for lb in sorted(by_label):
    groups = defaultdict(list)
    for i in by_label[lb]:
        groups[signature(i)[1]].append(i)
    label_groups[lb] = groups

# find cap C so that sum(min(#groups, C)) <= 1000, then hand the remainder
# one-by-one to the labels with the most spare distinct groups
ngroups = {lb: len(g) for lb, g in label_groups.items()}
cap = 1
while sum(min(n, cap + 1) for n in ngroups.values()) <= 1000:
    cap += 1
quota = {lb: min(n, cap) for lb, n in ngroups.items()}
rest = 1000 - sum(quota.values())
for lb in sorted(ngroups, key=lambda x: -ngroups[x]):
    if rest <= 0:
        break
    if ngroups[lb] > quota[lb]:
        quota[lb] += 1
        rest -= 1
assert sum(quota.values()) == 1000

selected = []
stats = []
for lb in sorted(by_label):
    glist = sorted(label_groups[lb].values(), key=lambda g: (-len(g), min(g)))
    for g in glist:
        g.sort()
    picked = [g[len(g) // 2] for g in glist[:quota[lb]]]  # one per group
    distinct = len({signature(i)[1] for i in picked})
    assert distinct == len(picked)
    stats.append((lb, len(by_label[lb]), ngroups[lb], quota[lb], len(picked), distinct))
    selected += picked

assert len(selected) == 1000, len(selected)
selected.sort()
assert len(set(selected)) == 1000

# ---- write output ----------------------------------------------------------
os.makedirs(DST, exist_ok=True)
for old in os.listdir(DST):
    if old.endswith(".frag"):
        os.remove(os.path.join(DST, old))
manifest = []
for n, src_idx in enumerate(selected):
    src = os.path.join(SRC, "%05d.frag" % src_idx)
    dst = os.path.join(DST, "%04d.frag" % n)
    shutil.copyfile(src, dst)
    manifest.append("%04d.frag\t%05d.frag\t%s" % (n, src_idx, labels[src_idx]))
with open(os.path.join(BASE, "_extract_1000_manifest.tsv"), "w") as fh:
    fh.write("dst\tsrc\tarchetype\n" + "\n".join(manifest) + "\n")

print("%-10s %6s %7s %6s %7s %9s" % ("archetype", "avail", "groups", "quota", "picked", "distinct"))
for lb, avail, ngroups, quota, npicked, ndistinct in stats:
    print("%-10s %6d %7d %6d %7d %9d" % (lb, avail, ngroups, quota, npicked, ndistinct))
print("total:", len(selected), "->", DST)
