#!/usr/bin/env python3
"""Algorithm-sorted shibui set -> 1000fragments_algo.

Extends the 18 archetypes of _synthesize_1000_shibui.py with two new ones:

  aurora : stacked noise-driven light curtains (gaussian / one-sided bands,
           optional second noise octave, ripple modulation, twinkling stars,
           additive or max blending)
  mosaic : animated quadtree mosaic (hash-driven recursive subdivision,
           per-cell fill = flat tone / pulse / gradient / disc, grout lines)

Every archetype gets exactly 50 files.  Within an archetype, candidates are
generated with sequential seeds and accepted only when their *algorithm
signature* (code markers + loop sizes) has not been used yet, so the 50
files favour distinct field/color/domain/sub-style combinations before any
combination repeats.

Files are written sorted by archetype name (alphabetical), 50 contiguous
files per archetype:

  0000-0049 aurora, 0050-0099 cells, ... 0950-0999 waveline

Output: 0000.frag .. 0999.frag in 1000fragments_algo/
        _1000fragments_algo_manifest.tsv (dst, archetype, seed)
"""
import os, re, sys, random
from collections import Counter

BASE = "/Users/tado/Documents/Claude-tmp/1000fragments"
DST = os.path.join(BASE, "1000fragments_algo")

sys.path.insert(0, BASE)
import _synthesize_1000_shibui as SH  # patches S in place (muted colors)
import _synthesize_10k_newnew as G
S = G.S
f = S.f

# --------------------------------------------------------------------------
# NEW ARCHETYPE: aurora (stacked light curtains)
# --------------------------------------------------------------------------
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
                 % (SH.m3(rng, 0.03, 0.10, 0.03), f(rng,0.3,0.7), f(rng,0.2,0.6)))
    if stars:
        k = f(rng,6.0,14.0)
        lines.append("\tvec2 sc2 = floor(p * %s); vec2 sf2 = fract(p * %s) - 0.5;" % (k, k))
        lines.append("\tfloat sh2 = hash21(sc2);")
        lines.append("\tcol += vec3(%s) * smoothstep(%s, 0.0, length(sf2))"
                     " * step(%s, sh2) * (%s + %s * sin(time * %s + sh2 * 40.0));"
                     % (f(rng,0.4,0.8), f(rng,0.04,0.09), f(rng,0.90,0.96),
                        f(rng,0.4,0.6), f(rng,0.2,0.4), f(rng,1.5,4.0)))
        helpers.add("hash21")
    lines.append("\tfor(int ai = 0; ai < %d; ai++){" % L)
    lines.append("\t\tfloat fa = float(ai);")
    lines.append("\t\tfloat xx = p.x * %s + fa * %s + time * %s%s;"
                 % (f(rng,0.8,2.2), f(rng,0.5,2.0), S.sgn(rng), f(rng,0.05,0.30)))
    lines.append("\t\tfloat wv = vnoise2(vec2(xx, time * %s + fa * 7.31));"
                 % f(rng,0.10,0.50))
    if octave2:
        lines.append("\t\twv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, time * %s + fa * 3.7));"
                     % f(rng,0.15,0.70))
        lines.append("\t\twv *= 0.667;")
    lines.append("\t\tfloat yc = %s%s + (wv - 0.5) * %s;"
                 % (S.sgn(rng), f(rng,0.0,0.35), f(rng,0.6,1.6)))
    lines.append("\t\tfloat dy = p.y - yc;")
    if gauss:
        lines.append("\t\tfloat bnd = exp(-dy * dy * %s);" % f(rng,6.0,30.0))
    else:
        lines.append("\t\tfloat bnd = exp(-abs(dy) * %s) * exp(-max(dy, 0.0) * %s);"
                     % (f(rng,3.0,8.0), f(rng,1.0,5.0)))
    if ripple:
        lines.append("\t\tbnd *= %s + %s * sin(xx * %s + time * %s + fa);"
                     % (f(rng,0.55,0.70), f(rng,0.30,0.45), f(rng,2.0,6.0), f(rng,0.5,2.0)))
    tone = ("(vec3(%s) + %s * cos(vec3(0.0, 2.094, 4.188) + fa * %s + time * %s))"
            % (f(rng,0.25,0.50), f(rng,0.12,0.30), f(rng,0.4,1.8), f(rng,0.1,0.8)))
    if blend_max:
        lines.append("\t\tcol = max(col, %s * bnd * %s);" % (tone, f(rng,0.55,0.95)))
    else:
        lines.append("\t\tcol += %s * bnd * %s;" % (tone, f(rng,0.55,1.20,2)))
    lines.append("\t}")
    if not blend_max:
        lines.append("\tcol = col / (1.0 + col * %s);" % f(rng,0.4,0.9))
    return S.finish(rng, helpers, "", lines, post_prob=0.40)

# --------------------------------------------------------------------------
# NEW ARCHETYPE: mosaic (animated quadtree subdivision)
# --------------------------------------------------------------------------
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
                 % (f(rng,1.4,3.4), f(rng,0.0,9.0), f(rng,0.0,9.0)))
    if rng.random() < 0.5:
        lines.append("\tq += time * vec2(%s%s, %s%s);"
                     % (S.sgn(rng), f(rng,0.02,0.12), S.sgn(rng), f(rng,0.02,0.12)))
    lines.append("\tfloat lv = 1.0;")
    lines.append("\tvec2 id = floor(q);")
    lines.append("\tfor(int mi = 0; mi < %d; mi++){" % depth)
    lines.append("\t\tif(hash21(id * 0.731 + %s) > %s) break;"
                 % (f(rng,0.0,9.0), f(rng,0.45,0.80)))
    lines.append("\t\tq *= 2.0; lv *= 2.0;")
    lines.append("\t\tid = floor(q);")
    lines.append("\t}")
    lines.append("\tvec2 gv = fract(q) - 0.5;")
    lines.append("\tfloat h = hash21(id * 1.171 + %s);" % f(rng,0.0,9.0))
    if fill == "tone":
        lines.append("\tfloat ftn = h;")
    elif fill == "pulse":
        lines.append("\tfloat ftn = 0.5 + 0.5 * sin(time * %s + h * 6.2831853);"
                     % f(rng,0.5,2.5))
    elif fill == "grad":
        lines.append("\tfloat ftn = clamp(0.5 + gv.x * %s%s + gv.y * %s%s, 0.0, 1.0)"
                     " * (0.35 + 0.65 * h);"
                     % (S.sgn(rng), f(rng,0.5,1.6), S.sgn(rng), f(rng,0.5,1.6)))
    else:
        lines.append("\tfloat rr = %s + %s * sin(time * %s + h * 6.2831853);"
                     % (f(rng,0.20,0.34), f(rng,0.04,0.12), f(rng,0.5,2.5)))
        lines.append("\tfloat ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv)))"
                     " * (0.3 + 0.7 * h);")
    cl, chh = S.colorize(rng, "(ftn * 2.0 - 1.0)")
    helpers |= chh
    lines.append(cl)
    bw = rng.uniform(0.025, 0.09)
    lines.append("\tfloat bd = max(abs(gv.x), abs(gv.y));")
    lines.append("\tfloat edge = smoothstep(%.3f, %.3f, bd);" % (0.5 - bw, 0.5 - bw + 0.015))
    grout = SH.m3(rng, 0.03, 0.14, 0.05) if rng.random() < 0.7 else SH.m3(rng, 0.55, 0.80, 0.08)
    lines.append("\tcol = mix(col, %s, edge * %s);" % (grout, f(rng,0.70,1.00)))
    return S.finish(rng, helpers, "", lines)

BUILDERS = dict(G.BUILDERS)
BUILDERS.update({"aurora": build_aurora, "mosaic": build_mosaic})

# --------------------------------------------------------------------------
# algorithm signature: code markers + loop sizes (variety enforcement)
# --------------------------------------------------------------------------
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
    # aurora sub-styles
    "a_vert": "p = p.yx;",
    "a_oct2": "wv += 0.5 * vnoise2",
    "a_ripple": "bnd *=",
    "a_stars": "vec2 sc2 =",
    "a_max": "col = max(col,",
    "a_gauss": "exp(-dy * dy",
    # mosaic sub-styles
    "m_tone": "float ftn = h;",
    "m_pulse": "float ftn = 0.5 + 0.5 * sin(",
    "m_grad": "float ftn = clamp(0.5 + gv.x",
    "m_disc": "float rr =",
    "m_drift": "q += time * vec2(",
}
LOOP_RE = re.compile(r"for\(int \w+ = 0; \w+ < (\d+)")

def signature(text, extra=frozenset()):
    sig = frozenset(k for k, m in MARKERS.items() if m in text)
    loops = frozenset(LOOP_RE.findall(text))
    return (sig, loops, extra)

# --------------------------------------------------------------------------
# generic structural variation: helper-free domain tweaks injected right
# after the coordinate setup line, so even archetypes with a fixed internal
# structure (facet, plexus, particles...) branch into distinct variants
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
    ("v_shear", lambda rng: "\tp.x += p.y * %s%s;" % (S.sgn(rng), f(rng, 0.2, 0.8))),
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

# --------------------------------------------------------------------------
def synth_label(label, count=50):
    out, seen = [], set()
    k = 0
    while len(out) < count:
        rng = random.Random("algo-%s-%d" % (label, k))
        raw = BUILDERS[label](rng)
        raw, opset = apply_variation(rng, raw)
        sig = signature(raw, opset)
        if sig not in seen or k > 1500:
            seen.add(sig)
            out.append((k, SH.shibui_wrap(rng, raw)))
        k += 1
    return out, len(seen)

def main():
    os.makedirs(DST, exist_ok=True)
    order = sorted(BUILDERS)
    assert len(order) == 20, order
    manifest = []
    n = 0
    for label in order:
        files, nsig = synth_label(label)
        print("%-10s -> %04d-%04d  (%d distinct signatures)"
              % (label, n, n + len(files) - 1, nsig))
        for seed, text in files:
            with open(os.path.join(DST, "%04d.frag" % n), "w") as fh:
                fh.write(text)
            manifest.append("%04d.frag\t%s\t%d" % (n, label, seed))
            n += 1
    with open(os.path.join(BASE, "_1000fragments_algo_manifest.tsv"), "w") as fh:
        fh.write("dst\tarchetype\tseed\n" + "\n".join(manifest) + "\n")
    print("done: %d files written to %s" % (n, DST))

if __name__ == "__main__":
    main()
