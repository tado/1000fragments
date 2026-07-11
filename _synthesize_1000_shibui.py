#!/usr/bin/env python3
"""Shibui (subdued / inorganic) variant -> 1000fragments_newnew.

Inherits the full variation machinery of the previous generation
(18 archetypes x 41 fields x 21 domain transforms x raymarch maps) via
_synthesize_10k_newnew, but replaces everything color-related with a
restrained, desaturated system:

  * muted palette parameters (near-gray bases, small cosine amplitudes)
  * desaturating palette()/hue() helper implementations
  * classic color modes swapped for ink duotones / graphite ramps /
    dim ash glow (rainbow chromatic splits and neon removed)
  * shared colorize() swapped for the same muted modes
  * psychedelic posts (mod/fract wrap) removed from the post pool
  * rainbow phase vectors vec3(0.0, 2.094, 4.188) in inline builders
    shrunk to a narrow phase spread (subtle tonal shimmer, not rainbow)
  * global time slowdown per file (x0.50 .. x0.85) for calmer motion
  * a final per-file color grade appended before output:
      desaturate (keep 35%..65% chroma), clamp, gray tint (unity gain), lift

Archetype quotas mirror the diversity profile of 1000fragments_new.

Output: 0000.frag .. 0999.frag in 1000fragments_newnew/
"""
import os, sys, random, re

BASE = "/Users/tado/Documents/Claude-tmp/1000fragments"
DST = os.path.join(BASE, "1000fragments_newnew")

sys.path.insert(0, BASE)
import _synthesize_10k_newnew as G
S = G.S
f = S.f

# --------------------------------------------------------------------------
# muted color literals
# --------------------------------------------------------------------------
def m3(rng, lo, hi, jit):
    g = rng.uniform(lo, hi)
    return "vec3(%.2f, %.2f, %.2f)" % tuple(
        min(1.0, max(0.0, g + rng.uniform(-jit, jit))) for _ in range(3))

def pal_muted(rng):
    base = rng.uniform(0.25, 0.5)
    amp = rng.uniform(0.12, 0.30)
    a = tuple(base + rng.uniform(-0.07, 0.07) for _ in range(3))
    b = tuple(max(0.02, amp + rng.uniform(-0.05, 0.05)) for _ in range(3))
    c = tuple(rng.uniform(0.4, 0.9) for _ in range(3))
    d = tuple(rng.uniform(0.0, 1.0) for _ in range(3))
    return ("vec3(%.2f, %.2f, %.2f), vec3(%.2f, %.2f, %.2f), "
            "vec3(%.2f, %.2f, %.2f), vec3(%.2f, %.2f, %.2f)") % (a + b + c + d)

def colorize_muted(rng, dv):
    dvp = "(%s)" % dv
    mode = rng.choices(["ink", "graphite", "pal", "duo2", "ash"],
                       weights=[0.26, 0.20, 0.20, 0.16, 0.18])[0]
    if mode == "ink":
        d1, d2 = m3(rng, 0.04, 0.14, 0.06), m3(rng, 0.55, 0.80, 0.10)
        if rng.random() < 0.3:
            d1, d2 = d2, d1
        return ("\tfloat cc = clamp(0.5 + 0.5 * %s, 0.0, 1.0);\n"
                "\tvec3 col = mix(%s, %s, cc);" % (dvp, d1, d2), set())
    if mode == "graphite":
        return ("\tvec3 col = vec3(0.5 + 0.5 * %s) * %s + %s;"
                % (dvp, m3(rng, 0.45, 0.70, 0.09), m3(rng, 0.02, 0.10, 0.04)), set())
    if mode == "pal":
        return ("\tvec3 col = palette(%s * %s + time * %s, %s);"
                % (dvp, f(rng,0.4,1.2), f(rng,0.0,0.25), pal_muted(rng)), {"palette"})
    if mode == "duo2":
        return ("\tfloat cc = clamp(0.5 + 0.5 * %s, 0.0, 1.0);\n"
                "\tvec3 col = mix(%s, %s, smoothstep(0.0, 1.0, cc));"
                % (dvp, m3(rng, 0.15, 0.35, 0.13), m3(rng, 0.45, 0.70, 0.13)), set())
    return ("\tvec3 col = %s * (%s / (abs(%s) + %s));\n"
            "\tcol = col / (1.0 + col);"
            % (m3(rng, 0.40, 0.75, 0.10), f(rng,0.04,0.12), dvp, f(rng,0.03,0.10)), set())

# --------------------------------------------------------------------------
# muted classic color modes (same contract: -> (lines, helpers, need_field2))
# --------------------------------------------------------------------------
def cc_graphite(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = vec3(0.5 + 0.5 * d) * %s + %s;"
            % (m3(rng, 0.45, 0.70, 0.09), m3(rng, 0.02, 0.10, 0.04)), set(), False)
def cc_pal(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = palette(d * %s + time * %s, %s);"
            % (f(rng,0.4,1.4), f(rng,0.0,0.25), pal_muted(rng)), {"palette"}, False)
def cc_ink(rng):
    d1, d2 = m3(rng, 0.04, 0.14, 0.06), m3(rng, 0.55, 0.80, 0.10)
    if rng.random() < 0.3:
        d1, d2 = d2, d1
    return ("\tfloat d = 0.5 + 0.5 * field(p, time, 0.0);\n"
            "\tvec3 col = mix(%s, %s, d);" % (d1, d2), set(), False)
def cc_ash(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = %s * (%s / (abs(d) + %s));\n"
            "\tcol = col / (1.0 + col);"
            % (m3(rng, 0.40, 0.75, 0.10), f(rng,0.04,0.12), f(rng,0.03,0.10)), set(), False)
def cc_two(rng):
    op = rng.choice(["d1 + d2", "d1 * d2", "min(d1, d2)", "max(d1, d2)",
                     "abs(d1 - d2)", "mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7))"])
    return ("\tfloat d1 = field(p, time, 0.0);\n"
            "\tfloat d2 = field2(p, time, %s);\n"
            "\tfloat d = %s;\n"
            "\tvec3 col = palette(d * %s + time * %s, %s);"
            % (f(rng,0.0,2.0), op, f(rng,0.4,1.4), f(rng,0.0,0.25), pal_muted(rng)),
            {"palette"}, True)
def cc_chroma(rng):
    dph = rng.uniform(0.05, 0.25)
    return ("\tvec3 col = vec3(field(p, time, 0.0), field(p, time, %.2f), field(p, time, %.2f));\n"
            "\tcol = 0.5 + 0.5 * col;" % (dph, 2 * dph), set(), False)

# --------------------------------------------------------------------------
# patch the shared library in place
# --------------------------------------------------------------------------
S._pal = pal_muted
S.colorize = colorize_muted
S.CLASSIC_COLORS = [cc_graphite, cc_pal, cc_ink, cc_ash, cc_two, cc_chroma]
S.CLASSIC_W      = [0.20,        0.20,   0.24,   0.12,   0.16,   0.08]
S.POSTS = [S.post_pow, S.post_posterize, S.post_contrast,
           S.post_vignette, S.post_scanline, S.post_grain]
S.HELP["palette"] = (
"""vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}
""")
S.HELP["hue"] = (
"""vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;
}
""")

# --------------------------------------------------------------------------
# per-file text transforms: slowdown, phase shrink, final grade
# --------------------------------------------------------------------------
TINTS = [(1.00, 1.00, 1.00), (0.93, 0.98, 1.04), (1.04, 0.99, 0.93),
         (0.97, 1.01, 0.94), (1.01, 0.96, 1.01)]

def shibui_wrap(rng, text):
    head, rest = text.split("\n\n", 1)
    slow = rng.uniform(0.50, 0.85)
    rest = re.sub(r"\btime\b", "(time * %.2f)" % slow, rest)
    dph = rng.uniform(0.40, 1.10)
    rest = rest.replace("vec3(0.0, 2.094, 4.188)", "vec3(0.0, %.2f, %.2f)" % (dph, 2 * dph))
    sat = rng.uniform(0.35, 0.65)
    rng.uniform(0.55, 0.85)  # rng-stream placeholder (gain used to be random)
    gain = 1.0
    lift = rng.uniform(0.01, 0.05)
    tint = rng.choice(TINTS)
    tint = tuple(t + rng.uniform(-0.02, 0.02) for t in tint)
    grade = ("\tcol = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, %.2f);\n"
             "\tcol = clamp(col, 0.0, 1.0) * vec3(%.3f, %.3f, %.3f) * %.2f + %.3f;\n"
             % ((sat,) + tint + (gain, lift)))
    rest = rest.replace("\tfragColor = TDOutputSwizzle", grade + "\tfragColor = TDOutputSwizzle")
    return head + "\n\n" + rest

# --------------------------------------------------------------------------
# archetype quotas: mirror the diversity profile of 1000fragments_new
# --------------------------------------------------------------------------
QUOTAS = {"cells": 82, "classic": 83, "contour": 82, "facet": 9, "flowlines": 9,
          "fzoom": 27, "glow": 69, "halftone": 82, "layer": 83, "orbit": 82,
          "particles": 27, "plexus": 9, "raymarch": 82, "ripple": 57,
          "super": 82, "trail": 27, "tunnel": 82, "waveline": 26}

def main():
    os.makedirs(DST, exist_ok=True)
    labels = []
    for name in sorted(QUOTAS):
        labels += [name] * QUOTAS[name]
    assert len(labels) == 1000, len(labels)
    random.Random(424213).shuffle(labels)
    for n, label in enumerate(labels):
        rng = random.Random(n * 2654435761 + 555333)
        text = G.BUILDERS[label](rng)
        text = shibui_wrap(rng, text)
        with open(os.path.join(DST, "%04d.frag" % n), "w") as fh:
            fh.write(text)
    print("done: 0000.frag .. 0999.frag written to", DST)
    from collections import Counter
    print(Counter(labels))

if __name__ == "__main__":
    main()
