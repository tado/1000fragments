#!/usr/bin/env python3
"""Vivid color variant of 1000fragments_algo -> 1000fragments_algovivid.

Keeps every shader byte-identical except for the color knobs, so file NNNN
is the same algorithm / structure / motion as its 1000fragments_algo
sibling, only more saturated:

  * final grade saturation 0.35..0.65 -> +0.75 (1.10..1.40, extrapolation
    past 1.0 pushes colors away from gray = chroma boost before the clamp)
  * palette() helper desaturation mix 0.55 -> 0.85
  * hue() helper desaturation mix 0.50 -> 0.80, gain 0.85 -> 0.95
  * cosine hue phase vectors vec3(0.0, a, 2a) widened x1.6 (capped at the
    full-rainbow 2.094 spread) for a larger hue range between elements
"""
import os, re, glob

BASE = "/Users/tado/Documents/Claude-tmp/1000fragments"
SRC = os.path.join(BASE, "1000fragments_algo")
DST = os.path.join(BASE, "1000fragments_algovivid")

GRADE_RE = re.compile(
    r"(col = mix\(vec3\(dot\(col, vec3\(0\.299, 0\.587, 0\.114\)\)\), col, )"
    r"(\d+\.\d+)(\);)")
PHASE_RE = re.compile(r"vec3\(0\.0, (\d+\.\d+), (\d+\.\d+)\)")

def boost_grade(m):
    return "%s%.2f%s" % (m.group(1), float(m.group(2)) + 0.75, m.group(3))

def widen_phase(m):
    a, b = float(m.group(1)), float(m.group(2))
    if abs(b - 2.0 * a) > 0.02:          # not a hue phase vector
        return m.group(0)
    a2 = min(a * 1.6, 2.094)
    return "vec3(0.0, %.2f, %.2f)" % (a2, 2.0 * a2)

def main():
    os.makedirs(DST, exist_ok=True)
    files = sorted(glob.glob(os.path.join(SRC, "*.frag")))
    assert len(files) == 1000, len(files)
    graded = 0
    for fp in files:
        text = open(fp).read()
        text, ng = GRADE_RE.subn(boost_grade, text)
        graded += ng
        text = PHASE_RE.sub(widen_phase, text)
        text = text.replace(
            "return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);",
            "return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);")
        text = text.replace(
            "return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;",
            "return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.80) * 0.95;")
        with open(os.path.join(DST, os.path.basename(fp)), "w") as fh:
            fh.write(text)
    print("done: %d files -> %s (grade lines boosted: %d)"
          % (len(files), DST, graded))

if __name__ == "__main__":
    main()
