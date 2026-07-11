#!/usr/bin/env python3
"""Ultra-wide-safe variant of 1000fragments_algovivid -> 1000fragments_ratio.

v2 -- no mirror tiling.  Each shader keeps a single pattern instance and is
adapted to wide aspect ratios (e.g. 1920x240) with one of these strategies,
chosen per file by measuring actual 8:1 renders in WebGL (fill of the
left/right edges relative to the shader's own 16:9 baseline):

  none        pattern already extends horizontally (fields, tilings, noise)
  rot         vertically-running pattern: rotate 90 deg on wide screens
  zoom        uniform zoom so the designed width spans the full screen
              (shows the central horizontal band of the design, enlarged)
  rotzoom     rotate, then zoom
  zoomex      zoom plus an extra 0.6x crop on wide screens
  zoomex2     zoom plus an extra 0.3x crop (strongly centered designs)
  rotzoomex2  rotate + zoom + 0.3x crop
  stretch     horizontal stretch of the full 16:9 view (keeps the whole
              design visible; used where cropping would go near-black)

Every inserted statement is conditional on the actual aspect ratio
(min(1.0, ...) factors / if(resolution.x > resolution.y * 1.9) guards), so
at 16:9 and anything narrower all 1000 shaders are pixel-identical to
1000fragments_algovivid.

Strategy map: _ratio_strategy.json (files not listed use "none").
Output: 0000.frag .. 0999.frag overwriting 1000fragments_ratio/, plus
_1000fragments_ratio_strategy.tsv.
"""
import os, glob, json

BASE = "/Users/tado/Documents/Claude-tmp/1000fragments"
SRC = os.path.join(BASE, "1000fragments_algovivid")
DST = os.path.join(BASE, "1000fragments_ratio")

A_C  = "\tvec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);"
A_YY = "\tvec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);"
A_UV = "\tp.x *= resolution.x / resolution.y;"

ROT = "\tif(resolution.x > resolution.y * 1.9) p = p.yx;"
ZC  = "\tp *= min(1.0, 1.8 * resolution.y / resolution.x);"
ZU  = "\tp *= min(1.0, 1.778 * resolution.y / resolution.x);"
XC  = "\tp.x *= min(1.0, 1.8 * resolution.y / resolution.x);"
XU  = "\tp.x *= min(1.0, 1.778 * resolution.y / resolution.x);"
SHY = "\tp.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;"
EX  = "\tif(resolution.x > resolution.y * 1.9) p *= 0.6;"
EX2 = "\tif(resolution.x > resolution.y * 1.9) p *= 0.3;"

def lines_for(strategy, Z, X):
    return {
        "none":       [],
        "rot":        [ROT],
        "zoom":       [Z],
        "rotzoom":    [ROT, Z],
        "zoomex":     [Z, EX],
        "zoomex2":    [Z, EX2],
        "rotzoomex2": [ROT, Z, EX2],
        "stretch":    [X],
    }[strategy]

def main():
    strat = json.load(open(os.path.join(BASE, "_ratio_strategy.json")))
    os.makedirs(DST, exist_ok=True)
    files = sorted(glob.glob(os.path.join(SRC, "*.frag")))
    assert len(files) == 1000, len(files)
    manifest = []
    counts = {}
    for fp in files:
        name = os.path.basename(fp)
        st = strat.get(name[:4], "none")
        counts[st] = counts.get(st, 0) + 1
        text = open(fp).read()
        if A_C in text:
            anchor, pre, Z, X = A_C, [], ZC, XC
        elif A_YY in text:
            anchor, pre, Z, X = A_YY, [SHY], ZC, XC
        else:
            assert A_UV in text, name
            anchor, pre, Z, X = A_UV, [], ZU, XU
        ins = lines_for(st, Z, X)
        if ins:
            block = pre + ins
            text = text.replace(anchor, anchor + "\n" + "\n".join(block), 1)
        with open(os.path.join(DST, name), "w") as fh:
            fh.write(text)
        manifest.append("%s\t%s" % (name, st))
    with open(os.path.join(BASE, "_1000fragments_ratio_strategy.tsv"), "w") as fh:
        fh.write("dst\tstrategy\n" + "\n".join(manifest) + "\n")
    print("done: 1000 files ->", DST)
    print(counts)

if __name__ == "__main__":
    main()
