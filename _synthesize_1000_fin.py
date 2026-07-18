#!/usr/bin/env python3
"""Refined final set -> 1000fragments_fin.

Builds on the full variation machinery of the ratio pipeline
(_synthesize_10k_new / _synthesize_10k_newnew archetypes, fields, domains)
and refines it in five directions:

1. FIVE NEW ARCHETYPES (25 total, 40 files each, alphabetical blocks):
     bloom   : layered translucent rotating petals (painterly polar flowers)
     crystal : 2D KIFS fold line-art with dual orbit-trap glow
     marble  : ink-marbling via iterated rotational domain warp + dark veins
     nebula  : domain-warped fbm clouds with embedded twinkling stars
     silk    : overlapping translucent silk ribbons with sheen shading
   (aurora and mosaic from the algo set are carried over as well)

2. CURATED COLOR SYSTEM: random RGB soup is replaced everywhere by
   hand-picked cosine palettes (sunset / ocean / magma / ice / sakura /
   teal-orange ...), duotone pairs (navy+gold, charcoal+coral, cream+indigo,
   ink+cyan ...) and tritone ramps, each slightly jittered per file.

3. FILMIC GRADE appended per file: soft S-curve contrast, saturation boost,
   warm/cool tint, black lift, gentle vignette, optional fine grain.
   Per-file base-hue rotation harmonizes all inline cosine tones.

4. WIDE-SCREEN SAFETY baked in at generation time using the per-archetype
   strategies measured for 1000fragments_ratio (rot / zoom / zoomex /
   zoomex2). At 16:9 and narrower every strategy is a no-op.

5. BACKGROUND UPGRADE: flat near-black backgrounds of additive archetypes
   are replaced by subtle two-tone gradients.

Variety is enforced per archetype with algorithm signatures (code markers +
loop sizes + structural variation ops), like the algo set.

Output: 0000.frag .. 0999.frag in 1000fragments_fin/
        _1000fragments_fin_manifest.tsv (dst, archetype, seed, strategy)

CLI:  python3 _synthesize_1000_fin.py            # full generation
      python3 _synthesize_1000_fin.py regen 12 707 ...   # redo listed files
"""
import os, re, sys, random
from collections import Counter

BASE = "/Users/tado/Documents/Claude-tmp/1000fragments"
DST = os.path.join(BASE, "1000fragments_fin")
MANIFEST = os.path.join(BASE, "_1000fragments_fin_manifest.tsv")

sys.path.insert(0, BASE)
import _synthesize_10k_newnew as G
S = G.S
f = S.f
sgn = S.sgn

# ==========================================================================
# curated color system
# ==========================================================================
def _clamp01(x):
    return max(0.0, min(1.0, x))

def v3(rng, t, jit=0.025):
    return "vec3(%.3f, %.3f, %.3f)" % tuple(
        _clamp01(c + rng.uniform(-jit, jit)) for c in t)

def m3(rng, lo, hi, jit):
    g = rng.uniform(lo, hi)
    return "vec3(%.2f, %.2f, %.2f)" % tuple(
        _clamp01(g + rng.uniform(-jit, jit)) for _ in range(3))

# cosine palette coefficient sets: (a, b, c, d)
PALS = [
    ((0.50, 0.42, 0.36), (0.45, 0.36, 0.30), (1.0, 1.0, 1.0), (0.00, 0.12, 0.28)),  # sunset
    ((0.16, 0.34, 0.44), (0.16, 0.26, 0.30), (1.0, 1.0, 1.0), (0.55, 0.45, 0.35)),  # ocean
    ((0.46, 0.26, 0.16), (0.44, 0.30, 0.20), (1.0, 1.0, 1.0), (0.00, 0.10, 0.20)),  # magma
    ((0.62, 0.70, 0.80), (0.24, 0.20, 0.18), (1.0, 1.0, 1.0), (0.50, 0.56, 0.66)),  # ice
    ((0.30, 0.38, 0.26), (0.24, 0.28, 0.16), (1.0, 1.0, 1.0), (0.10, 0.20, 0.06)),  # moss
    ((0.74, 0.60, 0.64), (0.24, 0.24, 0.20), (1.0, 1.0, 1.0), (0.90, 0.05, 0.10)),  # sakura
    ((0.42, 0.36, 0.50), (0.38, 0.30, 0.38), (1.0, 1.0, 1.0), (0.10, 0.16, 0.55)),  # gold-indigo
    ((0.50, 0.42, 0.36), (0.40, 0.36, 0.34), (1.0, 1.0, 1.0), (0.05, 0.35, 0.55)),  # teal-orange
    ((0.50, 0.50, 0.50), (0.50, 0.50, 0.50), (1.0, 1.0, 1.0), (0.00, 0.33, 0.67)),  # spectrum
    ((0.44, 0.40, 0.36), (0.30, 0.29, 0.26), (1.0, 1.0, 0.7), (0.00, 0.25, 0.40)),  # patina
    ((0.30, 0.26, 0.40), (0.42, 0.38, 0.48), (1.0, 1.0, 1.0), (0.60, 0.80, 0.10)),  # neon dusk
    ((0.55, 0.46, 0.36), (0.28, 0.24, 0.20), (1.0, 1.0, 1.0), (0.00, 0.10, 0.25)),  # desert
    ((0.36, 0.44, 0.50), (0.30, 0.30, 0.28), (1.0, 0.9, 0.8), (0.35, 0.45, 0.60)),  # harbor
    ((0.48, 0.38, 0.46), (0.36, 0.30, 0.34), (1.0, 1.0, 1.0), (0.80, 0.95, 0.15)),  # orchid
]

# duotone (dark, light) pairs
DUOS = [
    ((0.03, 0.05, 0.10), (0.98, 0.82, 0.47)),   # navy / gold
    ((0.06, 0.06, 0.07), (0.96, 0.48, 0.42)),   # charcoal / coral
    ((0.93, 0.89, 0.80), (0.22, 0.24, 0.46)),   # cream / indigo
    ((0.04, 0.05, 0.07), (0.50, 0.88, 0.92)),   # ink / cyan
    ((0.16, 0.05, 0.09), (0.97, 0.76, 0.72)),   # wine / blush
    ((0.04, 0.10, 0.07), (0.86, 0.93, 0.66)),   # forest / lime cream
    ((0.10, 0.12, 0.14), (1.00, 0.67, 0.26)),   # slate / amber
    ((0.04, 0.05, 0.11), (0.77, 0.72, 0.97)),   # midnight / lavender
    ((0.03, 0.13, 0.15), (1.00, 0.76, 0.56)),   # teal / peach
    ((0.13, 0.07, 0.16), (0.68, 0.96, 0.81)),   # plum / mint
    ((0.05, 0.07, 0.09), (0.92, 0.90, 0.86)),   # ink / paper
    ((0.15, 0.10, 0.06), (0.62, 0.85, 0.99)),   # umber / sky
    ((0.02, 0.08, 0.13), (0.99, 0.55, 0.28)),   # deep sea / tangerine
    ((0.88, 0.91, 0.94), (0.85, 0.29, 0.24)),   # porcelain / vermilion
    ((0.05, 0.06, 0.05), (0.80, 0.97, 0.90)),   # moss black / seafoam
]

# tritone (bg, mid, fg) ramps
TRIS = [
    ((0.03, 0.06, 0.12), (0.09, 0.45, 0.50), (1.00, 0.83, 0.45)),  # navy-teal-gold
    ((0.12, 0.05, 0.14), (0.75, 0.33, 0.46), (0.99, 0.93, 0.83)),  # plum-rose-cream
    ((0.02, 0.03, 0.06), (0.25, 0.30, 0.75), (0.62, 0.95, 1.00)),  # ink-indigo-cyan
    ((0.03, 0.08, 0.05), (0.36, 0.48, 0.20), (1.00, 0.90, 0.55)),  # forest-olive-sun
    ((0.07, 0.06, 0.06), (0.70, 0.30, 0.16), (1.00, 0.83, 0.64)),  # char-rust-peach
    ((0.04, 0.03, 0.09), (0.45, 0.20, 0.65), (1.00, 0.70, 0.85)),  # night-violet-pink
    ((0.02, 0.09, 0.10), (0.16, 0.60, 0.48), (0.97, 0.96, 0.89)),  # teal-jade-ivory
    ((0.02, 0.05, 0.12), (0.12, 0.42, 0.75), (0.85, 0.96, 1.00)),  # ocean-azure-foam
]

# neutral-leaning dark tones for background gradients
DARKS = [
    (0.03, 0.04, 0.08), (0.05, 0.05, 0.06), (0.02, 0.06, 0.08),
    (0.06, 0.04, 0.07), (0.03, 0.06, 0.05), (0.07, 0.05, 0.04),
    (0.04, 0.04, 0.09), (0.02, 0.03, 0.05),
]

def pal_curated(rng):
    a, b, c, d = rng.choice(PALS)
    ja = tuple(_clamp01(x + rng.uniform(-0.03, 0.03)) for x in a)
    jb = tuple(max(0.02, x + rng.uniform(-0.03, 0.03)) for x in b)
    jc = tuple(max(0.2, x + rng.uniform(-0.05, 0.05)) for x in c)
    jd = tuple(x + rng.uniform(-0.04, 0.04) for x in d)
    return ("vec3(%.2f, %.2f, %.2f), vec3(%.2f, %.2f, %.2f), "
            "vec3(%.2f, %.2f, %.2f), vec3(%.2f, %.2f, %.2f)") % (ja + jb + jc + jd)

def duo_pair(rng):
    d, l = rng.choice(DUOS)
    if rng.random() < 0.12:
        d, l = l, d
    return v3(rng, d), v3(rng, l)

def tri_ramp(rng):
    a, b, c = rng.choice(TRIS)
    return v3(rng, a), v3(rng, b), v3(rng, c)

def accent(rng):
    return v3(rng, rng.choice(DUOS)[1], 0.04)

def colorize_fin(rng, dv):
    dvp = "(%s)" % dv
    mode = rng.choices(["duo", "tri", "pal", "glow", "graphite"],
                       weights=[0.26, 0.20, 0.30, 0.14, 0.10])[0]
    if mode == "duo":
        d1, d2 = duo_pair(rng)
        curve = rng.choice(["cc", "smoothstep(0.0, 1.0, cc)"])
        return ("\tfloat cc = clamp(0.5 + 0.5 * %s, 0.0, 1.0);\n"
                "\tvec3 col = mix(%s, %s, %s);" % (dvp, d1, d2, curve), set())
    if mode == "tri":
        c1, c2, c3 = tri_ramp(rng)
        mid = rng.uniform(0.40, 0.62)
        return ("\tfloat cc = clamp(0.5 + 0.5 * %s, 0.0, 1.0);\n"
                "\tvec3 col = mix(mix(%s, %s, smoothstep(0.0, %.2f, cc)), %s,"
                " smoothstep(%.2f, 1.0, cc));"
                % (dvp, c1, c2, mid, c3, mid), set())
    if mode == "pal":
        return ("\tvec3 col = palette(%s * %s + time * %s, %s);"
                % (dvp, f(rng, 0.4, 1.2), f(rng, 0.0, 0.25), pal_curated(rng)),
                {"palette"})
    if mode == "glow":
        return ("\tvec3 col = %s * (%s / (abs(%s) + %s));\n"
                "\tcol = col / (1.0 + col);"
                % (accent(rng), f(rng, 0.05, 0.14), dvp, f(rng, 0.03, 0.10)), set())
    return ("\tvec3 col = vec3(0.5 + 0.5 * %s) * %s + %s;"
            % (dvp, m3(rng, 0.45, 0.72, 0.09), m3(rng, 0.02, 0.10, 0.04)), set())

# classic color modes (contract: -> (lines, helpers, need_field2))
def cc_pal(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = palette(d * %s + time * %s, %s);"
            % (f(rng, 0.4, 1.4), f(rng, 0.0, 0.25), pal_curated(rng)),
            {"palette"}, False)

def cc_duo(rng):
    d1, d2 = duo_pair(rng)
    return ("\tfloat d = 0.5 + 0.5 * field(p, time, 0.0);\n"
            "\tvec3 col = mix(%s, %s, d);" % (d1, d2), set(), False)

def cc_tri(rng):
    c1, c2, c3 = tri_ramp(rng)
    mid = rng.uniform(0.40, 0.62)
    return ("\tfloat d = clamp(0.5 + 0.5 * field(p, time, 0.0), 0.0, 1.0);\n"
            "\tvec3 col = mix(mix(%s, %s, smoothstep(0.0, %.2f, d)), %s,"
            " smoothstep(%.2f, 1.0, d));"
            % (c1, c2, mid, c3, mid), set(), False)

def cc_glow(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = %s * (%s / (abs(d) + %s));\n"
            "\tcol = col / (1.0 + col);"
            % (accent(rng), f(rng, 0.05, 0.14), f(rng, 0.03, 0.10)), set(), False)

def cc_two(rng):
    op = rng.choice(["d1 + d2", "d1 * d2", "min(d1, d2)", "max(d1, d2)",
                     "abs(d1 - d2)", "mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7))"])
    return ("\tfloat d1 = field(p, time, 0.0);\n"
            "\tfloat d2 = field2(p, time, %s);\n"
            "\tfloat d = %s;\n"
            "\tvec3 col = palette(d * %s + time * %s, %s);"
            % (f(rng, 0.0, 2.0), op, f(rng, 0.4, 1.4), f(rng, 0.0, 0.25),
               pal_curated(rng)), {"palette"}, True)

# --------------------------------------------------------------------------
# patch the shared library in place
# --------------------------------------------------------------------------
S._pal = pal_curated
S.colorize = colorize_fin
S.CLASSIC_COLORS = [cc_pal, cc_duo, cc_tri, cc_glow, cc_two]
S.CLASSIC_W      = [0.24,   0.26,   0.18,   0.12,    0.20]
S.POSTS = [S.post_pow, S.post_pow, S.post_contrast, S.post_contrast,
           S.post_posterize, S.post_scanline]
S.HELP["palette"] = (
"""vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}
""")
S.HELP["hue"] = (
"""vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.75) * 0.92;
}
""")

# ==========================================================================
# archetypes carried over from the algo set (adapted to the fin colors)
# ==========================================================================
def build_aurora(rng):
    helpers = {"noise2"}
    L = rng.randint(3, 7)
    vertical = rng.random() < 0.3
    octave2 = rng.random() < 0.5
    ripple = rng.random() < 0.6
    stars = rng.random() < 0.45
    blend_max = rng.random() < 0.25
    gauss = rng.random() < 0.55
    lines = [S.centered_coord()]
    if vertical:
        lines.append("\tp = p.yx;")
    lines.append("\tvec3 col = %s * clamp(%s - p.y * %s, 0.0, 1.0);"
                 % (m3(rng, 0.03, 0.10, 0.03), f(rng, 0.3, 0.7), f(rng, 0.2, 0.6)))
    if stars:
        k = f(rng, 6.0, 14.0)
        lines.append("\tvec2 sc2 = floor(p * %s); vec2 sf2 = fract(p * %s) - 0.5;" % (k, k))
        lines.append("\tfloat sh2 = hash21(sc2);")
        lines.append("\tcol += vec3(%s) * smoothstep(%s, 0.0, length(sf2))"
                     " * step(%s, sh2) * (%s + %s * sin(time * %s + sh2 * 40.0));"
                     % (f(rng, 0.4, 0.8), f(rng, 0.04, 0.09), f(rng, 0.90, 0.96),
                        f(rng, 0.4, 0.6), f(rng, 0.2, 0.4), f(rng, 1.5, 4.0)))
        helpers.add("hash21")
    lines.append("\tfor(int ai = 0; ai < %d; ai++){" % L)
    lines.append("\t\tfloat fa = float(ai);")
    lines.append("\t\tfloat xx = p.x * %s + fa * %s + time * %s%s;"
                 % (f(rng, 0.8, 2.2), f(rng, 0.5, 2.0), sgn(rng), f(rng, 0.05, 0.30)))
    lines.append("\t\tfloat wv = vnoise2(vec2(xx, time * %s + fa * 7.31));"
                 % f(rng, 0.10, 0.50))
    if octave2:
        lines.append("\t\twv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, time * %s + fa * 3.7));"
                     % f(rng, 0.15, 0.70))
        lines.append("\t\twv *= 0.667;")
    lines.append("\t\tfloat yc = %s%s + (wv - 0.5) * %s;"
                 % (sgn(rng), f(rng, 0.0, 0.35), f(rng, 0.6, 1.6)))
    lines.append("\t\tfloat dy = p.y - yc;")
    if gauss:
        lines.append("\t\tfloat bnd = exp(-dy * dy * %s);" % f(rng, 6.0, 30.0))
    else:
        lines.append("\t\tfloat bnd = exp(-abs(dy) * %s) * exp(-max(dy, 0.0) * %s);"
                     % (f(rng, 3.0, 8.0), f(rng, 1.0, 5.0)))
    if ripple:
        lines.append("\t\tbnd *= %s + %s * sin(xx * %s + time * %s + fa);"
                     % (f(rng, 0.55, 0.70), f(rng, 0.30, 0.45), f(rng, 2.0, 6.0),
                        f(rng, 0.5, 2.0)))
    tone = ("(vec3(%s) + %s * cos(vec3(0.0, 2.094, 4.188) + fa * %s + time * %s))"
            % (f(rng, 0.25, 0.50), f(rng, 0.12, 0.30), f(rng, 0.4, 1.8), f(rng, 0.1, 0.8)))
    if blend_max:
        lines.append("\t\tcol = max(col, %s * bnd * %s);" % (tone, f(rng, 0.55, 0.95)))
    else:
        lines.append("\t\tcol += %s * bnd * %s;" % (tone, f(rng, 0.55, 1.20, 2)))
    lines.append("\t}")
    if not blend_max:
        lines.append("\tcol = col / (1.0 + col * %s);" % f(rng, 0.4, 0.9))
    return S.finish(rng, helpers, "", lines, post_prob=0.40)

def build_mosaic(rng):
    helpers = {"hash21"}
    depth = rng.randint(2, 4)
    fill = rng.choices(["tone", "pulse", "grad", "disc"],
                       weights=[0.22, 0.30, 0.22, 0.26])[0]
    lines = [S.base_coord(rng)]
    if rng.random() < 0.35:
        stmt, dh = S.dom_rotate_static(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append("\tvec2 q = p * %s + vec2(%s, %s);"
                 % (f(rng, 1.4, 3.4), f(rng, 0.0, 9.0), f(rng, 0.0, 9.0)))
    if rng.random() < 0.5:
        lines.append("\tq += time * vec2(%s%s, %s%s);"
                     % (sgn(rng), f(rng, 0.02, 0.12), sgn(rng), f(rng, 0.02, 0.12)))
    lines.append("\tfloat lv = 1.0;")
    lines.append("\tvec2 id = floor(q);")
    lines.append("\tfor(int mi = 0; mi < %d; mi++){" % depth)
    lines.append("\t\tif(hash21(id * 0.731 + %s) > %s) break;"
                 % (f(rng, 0.0, 9.0), f(rng, 0.45, 0.80)))
    lines.append("\t\tq *= 2.0; lv *= 2.0;")
    lines.append("\t\tid = floor(q);")
    lines.append("\t}")
    lines.append("\tvec2 gv = fract(q) - 0.5;")
    lines.append("\tfloat h = hash21(id * 1.171 + %s);" % f(rng, 0.0, 9.0))
    if fill == "tone":
        lines.append("\tfloat ftn = h;")
    elif fill == "pulse":
        lines.append("\tfloat ftn = 0.5 + 0.5 * sin(time * %s + h * 6.2831853);"
                     % f(rng, 0.5, 2.5))
    elif fill == "grad":
        lines.append("\tfloat ftn = clamp(0.5 + gv.x * %s%s + gv.y * %s%s, 0.0, 1.0)"
                     " * (0.35 + 0.65 * h);"
                     % (sgn(rng), f(rng, 0.5, 1.6), sgn(rng), f(rng, 0.5, 1.6)))
    else:
        lines.append("\tfloat rr = %s + %s * sin(time * %s + h * 6.2831853);"
                     % (f(rng, 0.20, 0.34), f(rng, 0.04, 0.12), f(rng, 0.5, 2.5)))
        lines.append("\tfloat ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv)))"
                     " * (0.3 + 0.7 * h);")
    cl, chh = S.colorize(rng, "(ftn * 2.0 - 1.0)")
    helpers |= chh
    lines.append(cl)
    bw = rng.uniform(0.025, 0.09)
    lines.append("\tfloat bd = max(abs(gv.x), abs(gv.y));")
    lines.append("\tfloat edge = smoothstep(%.3f, %.3f, bd);" % (0.5 - bw, 0.5 - bw + 0.015))
    grout = m3(rng, 0.03, 0.14, 0.05) if rng.random() < 0.7 else m3(rng, 0.55, 0.80, 0.08)
    lines.append("\tcol = mix(col, %s, edge * %s);" % (grout, f(rng, 0.70, 1.00)))
    return S.finish(rng, helpers, "", lines)

# ==========================================================================
# NEW ARCHETYPE: silk (overlapping translucent ribbons with sheen)
# ==========================================================================
def build_silk(rng):
    helpers = set()
    n = rng.randint(5, 9)
    sheen = rng.random() < 0.7
    bend = rng.random() < 0.45
    screenb = rng.random() < 0.3
    lines = [S.centered_coord()]
    if bend:
        lines.append("\tp.y += sin(p.x * %s + time * %s) * %s;"
                     % (f(rng, 0.6, 1.6), f(rng, 0.2, 0.6), f(rng, 0.06, 0.16)))
    lines.append("\tvec3 col = %s;" % m3(rng, 0.02, 0.08, 0.03))
    lines.append("\tfor(int si = 0; si < %d; si++){" % n)
    lines.append("\t\tfloat fs = float(si);")
    lines.append("\t\tfloat sp = fs * %s + time * %s%s;"
                 % (f(rng, 0.7, 2.0), sgn(rng), f(rng, 0.15, 0.50)))
    lines.append("\t\tfloat yc = (fs / %d.0 - 0.5) * %s + %s * sin(p.x * %s + sp)"
                 " + %s * sin(p.x * %s - sp * 0.63);"
                 % (n, f(rng, 0.8, 1.6), f(rng, 0.08, 0.22), f(rng, 0.8, 2.2),
                    f(rng, 0.05, 0.15), f(rng, 1.8, 4.2)))
    lines.append("\t\tfloat wd = %s + %s * sin(p.x * %s + sp * 1.7);"
                 % (f(rng, 0.05, 0.14), f(rng, 0.02, 0.06), f(rng, 0.6, 2.0)))
    lines.append("\t\tfloat dd = (p.y - yc) / wd;")
    lines.append("\t\tfloat band = exp(-dd * dd * %s);" % f(rng, 1.5, 4.0))
    if sheen:
        lines.append("\t\tband *= %s + %s * sin(dd * %s + sp * 2.3);"
                     % (f(rng, 0.60, 0.75), f(rng, 0.25, 0.40), f(rng, 2.0, 5.0)))
    lines.append("\t\tvec3 tone = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188)"
                 " + fs * %s + time * %s);"
                 % (f(rng, 0.25, 0.90), f(rng, 0.10, 0.50)))
    if screenb:
        lines.append("\t\tcol = 1.0 - (1.0 - col) * (1.0 - tone * band * %s);"
                     % f(rng, 0.35, 0.60))
    else:
        lines.append("\t\tcol += tone * band * %s;" % f(rng, 0.28, 0.55))
    lines.append("\t}")
    if not screenb:
        lines.append("\tcol = col / (1.0 + col * %s);" % f(rng, 0.30, 0.70))
    return S.finish(rng, helpers, "", lines, post_prob=0.35)

# ==========================================================================
# NEW ARCHETYPE: nebula (warped fbm clouds + stars)
# ==========================================================================
def build_nebula(rng):
    helpers = {"noise2"}
    oct1 = rng.randint(3, 5)
    warp = rng.random() < 0.7
    ridge = rng.random() < 0.35
    stars = rng.random() < 0.75
    c1, c2, c3 = tri_ramp(rng)
    lines = [S.centered_coord()]
    lines.append("\tvec2 q = p * %s + vec2(%s, %s);"
                 % (f(rng, 1.2, 2.6), f(rng, 0.0, 19.0), f(rng, 0.0, 19.0)))
    lines.append("\tfloat nt = time * %s;" % f(rng, 0.10, 0.40))
    lines.append("\tfloat n1 = 0.0; float na = 0.5; vec2 nq = q;")
    lines.append("\tfor(int ni = 0; ni < %d; ni++){"
                 " n1 += na * vnoise2(nq + nt * %s);"
                 " nq = nq * 2.03 + 17.0; na *= 0.55; }"
                 % (oct1, f(rng, 0.3, 1.0)))
    if warp:
        oct2 = rng.randint(2, 4)
        lines.append("\tfloat n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * %s + 31.0;"
                     % f(rng, 1.0, 3.0))
        lines.append("\tfor(int mi = 0; mi < %d; mi++){"
                     " n2 += na * vnoise2(nq - nt * %s);"
                     " nq = nq * 2.03 + 9.0; na *= 0.55; }"
                     % (oct2, f(rng, 0.3, 1.0)))
        lines.append("\tfloat den = n1 * 0.60 + n2 * 0.55;")
    else:
        lines.append("\tfloat den = n1 * 1.05;")
    if ridge:
        lines.append("\tden = 1.0 - abs(den * 2.0 - 1.0); den *= den;")
    lines.append("\tvec3 col = mix(%s, %s, smoothstep(%s, %s, den));"
                 % (c1, c2, f(rng, 0.10, 0.25), f(rng, 0.60, 0.80)))
    lines.append("\tcol = mix(col, %s, smoothstep(%s, %s, den));"
                 % (c3, f(rng, 0.60, 0.75), f(rng, 0.95, 1.10)))
    lines.append("\tcol += %s * pow(clamp(den, 0.0, 1.0), 4.0) * %s;"
                 % (accent(rng), f(rng, 0.25, 0.70)))
    if stars:
        helpers.add("hash21")
        k = f(rng, 8.0, 18.0)
        lines.append("\tvec2 sc9 = floor(p * %s); vec2 sf9 = fract(p * %s) - 0.5;" % (k, k))
        lines.append("\tfloat sh9 = hash21(sc9);")
        lines.append("\tfloat st9 = smoothstep(%s, 0.0, length(sf9 +"
                     " (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6))"
                     " * step(%s, sh9);"
                     % (f(rng, 0.05, 0.10), f(rng, 0.90, 0.96)))
        lines.append("\tcol += vec3(0.90, 0.95, 1.00) * st9 * (%s + %s"
                     " * sin(time * %s + sh9 * 40.0));"
                     % (f(rng, 0.35, 0.55), f(rng, 0.25, 0.45), f(rng, 1.5, 5.0)))
    return S.finish(rng, helpers, "", lines, post_prob=0.35)

# ==========================================================================
# NEW ARCHETYPE: crystal (KIFS fold line-art, dual orbit-trap glow)
# ==========================================================================
def build_crystal(rng):
    helpers = {"rot2"}
    it = rng.randint(5, 9)
    wob = rng.random() < 0.6
    second = rng.random() < 0.55
    trap1 = rng.choice(["abs(q.x)", "abs(q.y)", "abs(length(q) - %s)" % f(rng, 0.3, 0.7)])
    lines = [S.centered_coord()]
    if rng.random() < 0.5:
        lines.append("\tp *= %s;" % f(rng, 0.9, 1.5))
    lines.append("\tvec2 q = p;")
    lines.append("\tfloat d1 = 1000.0; float d2 = 1000.0;")
    lines.append("\tfor(int ci = 0; ci < %d; ci++){" % it)
    lines.append("\t\tq = abs(q) - %s;" % f(rng, 0.25, 0.70))
    if wob:
        lines.append("\t\tq = rot2(%s + sin(time * %s) * %s) * q;"
                     % (f(rng, 0.3, 2.8), f(rng, 0.3, 1.0), f(rng, 0.05, 0.25)))
    else:
        lines.append("\t\tq = rot2(%s + time * %s%s) * q;"
                     % (f(rng, 0.3, 2.8), sgn(rng), f(rng, 0.02, 0.10)))
    lines.append("\t\tq *= %s;" % f(rng, 1.04, 1.22))
    lines.append("\t\td1 = min(d1, %s);" % trap1)
    if second:
        lines.append("\t\td2 = min(d2, length(q - vec2(%s, %s)));"
                     % (f(rng, -0.5, 0.5), f(rng, -0.5, 0.5)))
    lines.append("\t}")
    lines.append("\tvec3 col = %s;" % m3(rng, 0.01, 0.06, 0.02))
    lines.append("\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + %s + time * %s))"
                 " * (%s / (d1 + %s));"
                 % (f(rng, 0.0, 6.3), f(rng, 0.1, 0.6),
                    f(rng, 0.004, 0.015, 4), f(rng, 0.006, 0.020, 3)))
    if second:
        lines.append("\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + %s + time * %s))"
                     " * (%s / (d2 + %s));"
                     % (f(rng, 1.5, 5.0), f(rng, 0.1, 0.6),
                        f(rng, 0.006, 0.020, 4), f(rng, 0.02, 0.06, 3)))
    lines.append("\tcol = col / (1.0 + col);")
    return S.finish(rng, helpers, "", lines, post_prob=0.35)

# ==========================================================================
# NEW ARCHETYPE: bloom (layered translucent rotating petals)
# ==========================================================================
def build_bloom(rng):
    helpers = set()
    L = rng.randint(3, 6)
    fill = rng.random() < 0.62
    lines = [S.centered_coord()]
    if rng.random() < 0.4:
        lines.append("\tp *= %s;" % f(rng, 0.8, 1.3))
    lines.append("\tfloat r = length(p);")
    lines.append("\tfloat an = atan(p.y, p.x);")
    lines.append("\tvec3 col = %s;" % m3(rng, 0.02, 0.07, 0.03))
    lines.append("\tfor(int bi = 0; bi < %d; bi++){" % L)
    lines.append("\t\tfloat fb = float(bi);")
    lines.append("\t\tfloat pn = floor(%s + fb * %s);"
                 % (f(rng, 3.0, 6.0), f(rng, 0.5, 1.5)))
    lines.append("\t\tfloat aa = an * pn + fb * %s + time * %s%s * (1.0 + fb * %s);"
                 % (f(rng, 0.5, 2.0), sgn(rng), f(rng, 0.10, 0.35), f(rng, 0.15, 0.45)))
    lines.append("\t\tfloat pr = (%s + fb * %s) * (1.0 + %s * cos(aa));"
                 % (f(rng, 0.14, 0.30), f(rng, 0.09, 0.18), f(rng, 0.25, 0.55)))
    lines.append("\t\tfloat dd = r - pr;")
    lines.append("\t\tvec3 tone = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188)"
                 " + fb * %s + time * %s);"
                 % (f(rng, 0.35, 1.10), f(rng, 0.10, 0.45)))
    if fill:
        lines.append("\t\tfloat pet = smoothstep(%s, -%s, dd);"
                     % (f(rng, 0.010, 0.045, 3), f(rng, 0.010, 0.045, 3)))
        lines.append("\t\tpet *= %s + %s * cos(aa);"
                     % (f(rng, 0.65, 0.80), f(rng, 0.15, 0.30)))
        lines.append("\t\tcol = mix(col, tone, pet * %s);" % f(rng, 0.45, 0.80))
    else:
        lines.append("\t\tcol += tone * (%s / (abs(dd) + %s));"
                     % (f(rng, 0.004, 0.012, 4), f(rng, 0.008, 0.025, 3)))
    lines.append("\t}")
    if not fill:
        lines.append("\tcol = col / (1.0 + col);")
    return S.finish(rng, helpers, "", lines, post_prob=0.40)

# ==========================================================================
# NEW ARCHETYPE: marble (iterated rotational warp + veins)
# ==========================================================================
def build_marble(rng):
    helpers = set()
    K = rng.randint(3, 6)
    rot = rng.random() < 0.5
    veins = rng.random() < 0.75
    lines = [S.base_coord(rng)]
    lines.append("\tvec2 q = p * %s;" % f(rng, 1.2, 2.8))
    lines.append("\tfloat am = %s;" % f(rng, 0.25, 0.50))
    lines.append("\tfor(int wi = 0; wi < %d; wi++){" % K)
    lines.append("\t\tq += am * vec2(sin(q.y * %s + time * %s), sin(q.x * %s - time * %s));"
                 % (f(rng, 1.2, 3.2), f(rng, 0.2, 0.8), f(rng, 1.2, 3.2), f(rng, 0.2, 0.8)))
    if rot:
        helpers.add("rot2")
        lines.append("\t\tq = rot2(%s) * q;" % f(rng, 0.3, 1.2))
    lines.append("\t\tam *= %s;" % f(rng, 0.60, 0.85))
    lines.append("\t}")
    lines.append("\tfloat v = sin(q.x * %s + q.y * %s);"
                 % (f(rng, 1.5, 4.0), f(rng, 0.5, 2.5)))
    cl, chh = S.colorize(rng, "v")
    helpers |= chh
    lines.append(cl)
    if veins:
        lines.append("\tcol = mix(col, %s, smoothstep(%s, 1.0, abs(v)) * %s);"
                     % (m3(rng, 0.02, 0.12, 0.04), f(rng, 0.75, 0.90), f(rng, 0.50, 0.90)))
    return S.finish(rng, helpers, "", lines)

# ==========================================================================
BUILDERS = dict(G.BUILDERS)
BUILDERS.update({
    "aurora": build_aurora, "mosaic": build_mosaic,
    "silk": build_silk, "nebula": build_nebula, "crystal": build_crystal,
    "bloom": build_bloom, "marble": build_marble,
})

# ==========================================================================
# algorithm signature (variety enforcement) - markers + loop sizes
# ==========================================================================
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
    "c_duo": "float cc = clamp(0.5",
    "c_tri": "smoothstep(0.0,",
    "c_cos": "0.5 + 0.5 * cos(vec3(0.0, 2.094",
    "c_glow": "col / (1.0 + col)",
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
    # aurora sub-styles
    "a_vert": "p = p.yx;",
    "a_oct2": "wv += 0.5 * vnoise2",
    "a_ripple": "bnd *= ",
    "a_stars": "vec2 sc2 =",
    "a_max": "col = max(col,",
    "a_gauss": "exp(-dy * dy",
    # mosaic sub-styles
    "m_tone": "float ftn = h;",
    "m_pulse": "float ftn = 0.5 + 0.5 * sin(",
    "m_grad": "float ftn = clamp(0.5 + gv.x",
    "m_disc": "float rr =",
    "m_drift": "q += time * vec2(",
    # silk sub-styles
    "si_screen": "col = 1.0 - (1.0 - col)",
    "si_sheen": "band *= ",
    "si_bend": "\tp.y += sin(p.x * ",
    # nebula sub-styles
    "n_warp": "nq = q * 1.7",
    "n_ridge": "den = 1.0 - abs(den",
    "n_stars": "vec2 sc9",
    # crystal sub-styles
    "cr_trapx": "d1 = min(d1, abs(q.x))",
    "cr_trapy": "d1 = min(d1, abs(q.y))",
    "cr_trapr": "d1 = min(d1, abs(length(q)",
    "cr_two": "float d2 = ",
    "cr_wob": "+ sin(time * ",
    # bloom sub-styles
    "bl_fill": "col = mix(col, tone, pet",
    "bl_line": "col += tone * (",
    # marble sub-styles
    "ma_rot": "\t\tq = rot2(",
    "ma_vein": ", 1.0, abs(v))",
}
LOOP_RE = re.compile(r"for\(int \w+ = 0; \w+ < (\d+)")

def signature(text, extra=frozenset()):
    sig = frozenset(k for k, m in MARKERS.items() if m in text)
    loops = frozenset(LOOP_RE.findall(text))
    return (sig, loops, extra)

# --------------------------------------------------------------------------
# structural variation ops injected after the coordinate setup line
# --------------------------------------------------------------------------
VAR_OPS = [
    ("v_mirx",  lambda rng: "\tp.x = abs(p.x)%s;"
                % rng.choice(["", " - %s" % f(rng, 0.2, 0.6)])),
    ("v_miry",  lambda rng: "\tp.y = abs(p.y)%s;"
                % rng.choice(["", " - %s" % f(rng, 0.2, 0.6)])),
    ("v_swap",  lambda rng: "\tp = p.yx;"),
    ("v_zoom",  lambda rng: "\tp *= %s;" % f(rng, 0.7, 1.6)),
    ("v_drift", lambda rng: "\tp += vec2(sin(time * %s), cos(time * %s)) * %s;"
                % (f(rng, 0.3, 1.2), f(rng, 0.3, 1.2), f(rng, 0.05, 0.25))),
    ("v_shear", lambda rng: "\tp.x += p.y * %s%s;" % (sgn(rng), f(rng, 0.2, 0.8))),
    ("v_bend",  lambda rng: "\tp.y += sin(p.x * %s + time * %s) * %s;"
                % (f(rng, 1.0, 3.0), f(rng, 0.4, 1.5), f(rng, 0.05, 0.20))),
]
COORD_RE = re.compile(r"\n\tvec2 p = [^\n]*;")

def apply_variation(rng, text):
    n_ops = rng.choices([0, 1, 2], weights=[0.30, 0.45, 0.25])[0]
    if n_ops == 0:
        return text, frozenset()
    m = COORD_RE.search(text)
    if not m:
        return text, frozenset()
    ops = rng.sample(VAR_OPS, n_ops)
    ins = "".join("\n" + code(rng) for _, code in ops)
    return text[:m.end()] + ins + text[m.end():], frozenset(nm for nm, _ in ops)

# ==========================================================================
# wide-screen strategies (identical no-ops at 16:9 and narrower)
# ==========================================================================
A_C  = "\tvec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);"
A_YY = "\tvec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);"
A_UV = "\tp.x *= resolution.x / resolution.y;"

ROT = "\tif(resolution.x > resolution.y * 1.9) p = p.yx;"
ZC  = "\tp *= min(1.0, 1.8 * resolution.y / resolution.x);"
ZU  = "\tp *= min(1.0, 1.778 * resolution.y / resolution.x);"
SHY = "\tp.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;"
EX  = "\tif(resolution.x > resolution.y * 1.9) p *= 0.6;"
EX2 = "\tif(resolution.x > resolution.y * 1.9) p *= 0.3;"

def strategy_lines(strategy, Z):
    return {
        "none":    [],
        "rot":     [ROT],
        "zoom":    [Z],
        "zoomex":  [Z, EX],
        "zoomex2": [Z, EX2],
    }[strategy]

def pick_strategy(label, text, rng):
    if label == "aurora":
        return "rot" if "\tp = p.yx;\n\tvec3 col" in text else "none"
    if label in ("plexus", "trail"):
        return rng.choice(["zoom", "zoomex", "zoomex2"])
    if label == "glow":
        if "hash22(vec2(fi * 1.3" in text:
            return "none"
        return rng.choice(["zoom", "zoomex", "zoomex2"])
    if label == "ripple":
        return "zoom"
    if label == "raymarch":
        if "float sc = 1.0;" in text or "vec2(length(q.xz)" in text:
            return "zoomex"
        return "none"
    if label == "super":
        return "zoomex2" if "1.0 - smoothstep(0.0," in text else "none"
    if label == "crystal":
        return "zoomex"
    if label == "bloom":
        return rng.choice(["zoomex", "zoomex2"])
    return "none"

def apply_strategy(text, strategy):
    if strategy == "none":
        return text
    if A_C in text:
        anchor, pre, Z = A_C, [], ZC
    elif A_YY in text:
        anchor, pre, Z = A_YY, [SHY], ZC
    else:
        assert A_UV in text
        anchor, pre, Z = A_UV, [], ZU
    block = pre + strategy_lines(strategy, Z)
    return text.replace(anchor, anchor + "\n" + "\n".join(block), 1)

# ==========================================================================
# fin wrap: slowdown, hue harmonization, background upgrade, filmic grade
# ==========================================================================
BG_RE = re.compile(r"\tvec3 col = vec3\(0\.0\d+, 0\.0\d+, 0\.0\d+\);")
TINTS = [(1.000, 1.000, 1.000), (1.040, 1.000, 0.930), (0.935, 0.985, 1.045),
         (1.020, 0.985, 0.950), (0.975, 1.010, 0.945), (1.015, 0.960, 1.010)]

def bg_pair(rng):
    d = rng.choice(DARKS)
    d1 = tuple(_clamp01(c + rng.uniform(-0.012, 0.012)) for c in d)
    d2 = tuple(_clamp01(c * rng.uniform(0.55, 1.65) + rng.uniform(-0.008, 0.008))
               for c in d)
    return ("vec3(%.3f, %.3f, %.3f)" % d1, "vec3(%.3f, %.3f, %.3f)" % d2)

def fin_wrap(rng, text):
    head, rest = text.split("\n\n", 1)
    slow = rng.uniform(0.55, 0.92)
    rest = re.sub(r"\btime\b", "(time * %.2f)" % slow, rest)
    h0 = rng.uniform(0.0, 6.283)
    dph = rng.uniform(0.7, 2.094)
    rest = rest.replace("vec3(0.0, 2.094, 4.188)",
                        "vec3(%.3f, %.3f, %.3f)" % (h0, h0 + dph, h0 + 2.0 * dph))
    m = BG_RE.search(rest)
    if m and rng.random() < 0.85:
        d1, d2 = bg_pair(rng)
        grad = ("\tvec3 col = mix(%s, %s, clamp(0.5 + p.y * %.2f + p.x * %.2f,"
                " 0.0, 1.0));"
                % (d1, d2, rng.uniform(-0.65, 0.65), rng.uniform(-0.30, 0.30)))
        rest = rest[:m.start()] + grad + rest[m.end():]
    parts = ["\tcol = clamp(col, 0.0, 1.0);"]
    parts.append("\tcol = mix(col, col * col * (3.0 - 2.0 * col), %.2f);"
                 % rng.uniform(0.15, 0.55))
    parts.append("\tcol = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, %.2f);"
                 % rng.uniform(1.04, 1.32))
    tint = rng.choice(TINTS)
    tint = tuple(t + rng.uniform(-0.015, 0.015) for t in tint)
    parts.append("\tcol *= vec3(%.3f, %.3f, %.3f);" % tint)
    parts.append("\tcol += %.3f;" % rng.uniform(0.004, 0.026))
    parts.append("\tvec2 fq = gl_FragCoord.xy / resolution - 0.5;")
    parts.append("\tcol *= 1.0 - %.2f * dot(fq, fq);" % rng.uniform(0.22, 0.60))
    if "float hash21" in text and rng.random() < 0.6:
        parts.append("\tcol += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5)"
                     " * %.3f;" % rng.uniform(0.012, 0.040))
    grade = "\n".join(parts) + "\n"
    rest = rest.replace("\tfragColor = TDOutputSwizzle", grade + "\tfragColor = TDOutputSwizzle")
    return head + "\n\n" + rest

# ==========================================================================
def build_one(label, k):
    """Fully deterministic: seed string -> final shader text + strategy."""
    rng = random.Random("fin-%s-%d" % (label, k))
    raw = BUILDERS[label](rng)
    raw, opset = apply_variation(rng, raw)
    strategy = pick_strategy(label, raw, rng)
    text = apply_strategy(raw, strategy)
    text = fin_wrap(rng, text)
    return text, strategy, signature(raw, opset)

def synth_label(label, count=40):
    out, seen = [], set()
    k = 0
    while len(out) < count:
        text, strategy, sig = build_one(label, k)
        if sig not in seen or k > 1500:
            seen.add(sig)
            out.append((k, strategy, text))
        k += 1
    return out

def read_manifest():
    rows = {}
    with open(MANIFEST) as fh:
        next(fh)
        for line in fh:
            dst, label, seed, strategy = line.rstrip("\n").split("\t")
            rows[int(dst[:4])] = [dst, label, int(seed), strategy]
    return rows

def write_manifest(rows):
    with open(MANIFEST, "w") as fh:
        fh.write("dst\tarchetype\tseed\tstrategy\n")
        for n in sorted(rows):
            dst, label, seed, strategy = rows[n]
            fh.write("%s\t%s\t%d\t%s\n" % (dst, label, seed, strategy))

def main():
    os.makedirs(DST, exist_ok=True)
    order = sorted(BUILDERS)
    assert len(order) == 25, order
    rows = {}
    n = 0
    for label in order:
        files = synth_label(label)
        print("%-10s -> %04d-%04d" % (label, n, n + len(files) - 1))
        for seed, strategy, text in files:
            with open(os.path.join(DST, "%04d.frag" % n), "w") as fh:
                fh.write(text)
            rows[n] = ["%04d.frag" % n, label, seed, strategy]
            n += 1
    write_manifest(rows)
    print("done: %d files written to %s" % (n, DST))

def regen(indices):
    """Replace listed files with the next deterministic candidate."""
    rows = read_manifest()
    for n in indices:
        dst, label, seed, _ = rows[n]
        k = seed + 10000
        while True:
            text, strategy, _sig = build_one(label, k)
            break
        with open(os.path.join(DST, dst), "w") as fh:
            fh.write(text)
        rows[n] = [dst, label, k, strategy]
        print("regen %s (%s) seed %d -> %d" % (dst, label, seed, k))
    write_manifest(rows)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "regen":
        regen([int(x) for x in sys.argv[2:]])
    else:
        main()
