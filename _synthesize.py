#!/usr/bin/env python3
"""Compositional shader synthesizer for 1000fragments.

Instead of tweaking constants on fixed copies, this decomposes the original
100 shaders into their underlying *mechanisms* and recombines them:

  DOMAIN   - how screen coords are transformed into pattern space
             (rotate / swirl / kaleidoscope / domain-warp / mirror / tile / ripple)
  FIELD    - the scalar generator that turns space + time into a value
             (rings / waves / spiral / checker / stripes / flow-noise / fbm /
              voronoi / metaballs / interference)
  MOTION   - time injected as phase, rotation, flow z, or moving seeds
  COLOR    - how the field becomes RGB
             (chromatic phase split / cosine palette / gray-tint / 2-field cross)

A random, reproducible composition of these stages produces a NEW shape/motion
mechanism per file. Every building block is lifted from a working original, so
the emitted TouchDesigner GLSL is structurally valid.

0000.frag .. 0100.frag  -> exact copies of the originals (kept as requested)
0101.frag .. 1000.frag  -> synthesized compositions (overwritten)
"""
import os, shutil, random
from string import Template

DST = "/Users/tado/Documents/Claude-tmp/1000fragments/1000fragments"
SRC = os.path.join(DST, "100fragments")

HEADER = "uniform float time;\nuniform vec2 resolution;\nout vec4 fragColor;\n\n"

# --------------------------------------------------------------------------
# numeric helpers
# --------------------------------------------------------------------------
def f(rng, a, b, nd=2):
    return f"{rng.uniform(a, b):.{nd}f}"

def sgn(rng):
    return rng.choice(["", "-"])

# --------------------------------------------------------------------------
# reusable GLSL helper definitions (included only when referenced)
# --------------------------------------------------------------------------
HELP = {
"rot2": "mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }\n",
"noise2":
"""float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
""",
"noise3":
"""vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
float noise3(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));
    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
}
""",
"hash22":
"""vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
""",
"palette":
"""vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}
""",
}

# --------------------------------------------------------------------------
# DOMAIN mechanisms: each returns (glsl_statement, helpers_needed)
# All operate on `vec2 p` and may read `time`. Locals are block-scoped.
# --------------------------------------------------------------------------
def dom_rotate(rng):
    return ("\tp = rot2(time * %s%s) * p;" % (sgn(rng), f(rng, 0.2, 1.4)), {"rot2"})

def dom_rotate_static(rng):
    return ("\tp = rot2(%s) * p;" % f(rng, 0.3, 3.1), {"rot2"})

def dom_scale(rng):
    return ("\tp *= %s;" % f(rng, 1.2, 3.5), set())

def dom_swirl(rng):
    return ("\tp = rot2(length(p) * %s%s + time * %s) * p;"
            % (sgn(rng), f(rng, 1.0, 4.0), f(rng, 0.2, 1.2)), {"rot2"})

def dom_kaleido(rng):
    n = rng.randint(3, 8)
    s = ("\t{ float ka = atan(p.y, p.x); float kr = length(p); float kn = %d.0;"
         " ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn);"
         " p = kr * vec2(cos(ka), sin(ka)); }" % n)
    return (s, set())

def dom_mirror(rng):
    return ("\tp = abs(p)%s;"
            % (rng.choice([" - %s" % f(rng, 0.2, 0.8), ""])), set())

def dom_warp(rng):
    k = rng.randint(2, 6)
    s = ("\tfor(int wi = 0; wi < %d; wi++){ float wf = float(wi) + 1.0;"
         " p.x += %s / wf * sin(wf * %s * p.y + time * %s);"
         " p.y += %s / wf * cos(wf * %s * p.x + time * %s); }"
         % (k, f(rng, 0.2, 0.5), f(rng, 1.5, 4.0), f(rng, 0.6, 2.0),
            f(rng, 0.2, 0.5), f(rng, 1.5, 4.0), f(rng, 0.6, 2.0)))
    return (s, set())

def dom_ripple(rng):
    return ("\tp += vec2(%s, %s) * sin(length(p) * %s - time * %s) * %s;"
            % (f(rng, -1, 1), f(rng, -1, 1), f(rng, 2.0, 6.0),
               f(rng, 0.5, 2.0), f(rng, 0.1, 0.4)), set())

def dom_tile(rng):
    return ("\tp = fract(p * %s) - 0.5;" % f(rng, 1.0, 3.0), set())

DOMAINS = [dom_rotate, dom_rotate_static, dom_scale, dom_swirl,
           dom_kaleido, dom_mirror, dom_warp, dom_ripple, dom_tile]

# --------------------------------------------------------------------------
# FIELD mechanisms: produce a body that sets `float v` from (p, t, ph).
# Each returns (body_glsl, helpers_needed). Output normalized ~[-1, 1].
# --------------------------------------------------------------------------
def fld_rings(rng):
    return (Template("v = 0.5 * sin(length(p) * $F - t * $S + ph);")
            .substitute(F=f(rng, 6, 38), S=f(rng, 1, 9)), set())

def fld_waves(rng):
    return (Template("v = 0.5 * (sin(p.x * $FX + t * $S + ph) + sin(p.y * $FY - t * $S2 + ph));")
            .substitute(FX=f(rng, 2, 18), FY=f(rng, 2, 18),
                        S=f(rng, 0.5, 6), S2=f(rng, 0.5, 6)), set())

def fld_spiral(rng):
    return (Template("float sa = atan(p.y, p.x); float sr = length(p);\n"
                     "    v = sin(sa * $K + sr * $M - t * $S + ph);")
            .substitute(K=f(rng, 2, 12), M=f(rng, 4, 24), S=f(rng, 0.5, 5)), set())

def fld_checker(rng):
    return (Template("vec2 cq = p * $F + vec2(t * $S, -t * $S) + ph;\n"
                     "    v = sign(sin(cq.x) * sin(cq.y));")
            .substitute(F=f(rng, 3, 16), S=f(rng, 0.3, 3)), set())

def fld_stripes(rng):
    return (Template("v = sin(p.x * $F + sin(p.y * $FY + t * $S) * $W + ph);")
            .substitute(F=f(rng, 4, 26), FY=f(rng, 1, 6),
                        S=f(rng, 0.5, 6), W=f(rng, 1, 5)), set())

def fld_flow(rng):
    return (Template("v = noise3(vec3(p * $F, t * $S + ph)) * 2.0 - 1.0;")
            .substitute(F=f(rng, 1, 8), S=f(rng, 0.2, 3)), {"noise3"})

def fld_fbm(rng):
    return (Template("float fs = 0.0, famp = 0.5; vec2 fq = p * $F + ph;\n"
                     "    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * $S); fq *= 2.0; famp *= 0.5; }\n"
                     "    v = fs * 2.0 - 1.0;")
            .substitute(F=f(rng, 1, 6), S=f(rng, 0.1, 1.5)), {"noise2"})

def fld_voronoi(rng):
    return (Template(
        "vec2 vp = p * $F; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;\n"
        "    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){\n"
        "        vec2 nb = vec2(float(vx), float(vy));\n"
        "        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * $S + 6.2831853 * pt + ph);\n"
        "        md = min(md, length(nb + pt - vf)); }\n"
        "    v = md * 2.0 - 1.0;")
        .substitute(F=f(rng, 2, 9), S=f(rng, 0.5, 5)), {"hash22"})

def fld_metaball(rng):
    return (Template(
        "float ms = 0.0;\n"
        "    for(int mi = 0; mi < $N; mi++){ float mf = float(mi);\n"
        "        vec2 mm = vec2(sin(t * $S * sin(mf + 3.0) + ph), cos(t * $S * cos(mf + 3.0) + ph));\n"
        "        ms += $A / length(p - mm); }\n"
        "    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;")
        .substitute(N=rng.randint(5, 16), S=f(rng, 0.3, 2.5), A=f(rng, 0.02, 0.10, 3)), set())

def fld_interf(rng):
    return (Template(
        "float xs = 0.0;\n"
        "    for(int xi = 1; xi < $N; xi++){ float jf = float(xi);\n"
        "        vec2 im = vec2(sin(t * $S1 + jf * 4.0), cos(t * $S2 * jf)) * $SPR;\n"
        "        xs += sin(length(p - im) * $F - t * $S + ph) * 0.5; }\n"
        "    v = xs / (1.0 + abs(xs));")
        .substitute(N=rng.randint(4, 9), S1=f(rng, 0.1, 1.0), S2=f(rng, 0.1, 0.6),
                    SPR=f(rng, 0.3, 1.0), F=f(rng, 60, 220), S=f(rng, 4, 14)), set())

FIELDS = [fld_rings, fld_waves, fld_spiral, fld_checker, fld_stripes,
          fld_flow, fld_fbm, fld_voronoi, fld_metaball, fld_interf]

def make_field(rng, name):
    body, helpers = rng.choice(FIELDS)(rng)
    code = "float %s(vec2 p, float t, float ph){\n    float v;\n    %s\n    return v;\n}\n" % (name, body)
    return code, helpers

# --------------------------------------------------------------------------
# COLOR mechanisms (emit lines that produce `vec3 col`)
# --------------------------------------------------------------------------
def col_chromatic(rng):
    dph = rng.uniform(0.2, 1.4)
    lines = ("\tvec3 col = vec3(field(p, time, 0.0), field(p, time, %.2f), field(p, time, %.2f));\n"
             "\tcol = 0.5 + 0.5 * col;" % (dph, 2 * dph))
    return lines, set(), False

def _pal_args(rng):
    return ("vec3(%s, %s, %s), vec3(%s, %s, %s), vec3(%s, %s, %s), vec3(%s, %s, %s)" % (
        f(rng, 0.4, 0.6), f(rng, 0.4, 0.6), f(rng, 0.4, 0.6),
        f(rng, 0.3, 0.5), f(rng, 0.3, 0.5), f(rng, 0.3, 0.5),
        f(rng, 0.7, 1.4), f(rng, 0.7, 1.4), f(rng, 0.7, 1.4),
        f(rng, 0.0, 1.0), f(rng, 0.0, 1.0), f(rng, 0.0, 1.0)))

def col_palette(rng):
    lines = ("\tfloat d = field(p, time, 0.0);\n"
             "\tvec3 col = palette(d * %s + time * %s, %s);"
             % (f(rng, 0.5, 2.0), f(rng, 0.0, 0.3), _pal_args(rng)))
    return lines, {"palette"}, True

def col_gray(rng):
    lines = ("\tfloat d = field(p, time, 0.0);\n"
             "\tvec3 col = vec3(0.5 + 0.5 * d) * vec3(%s, %s, %s) + vec3(%s, %s, %s);"
             % (f(rng, 0.5, 1.6), f(rng, 0.5, 1.6), f(rng, 0.5, 1.6),
                f(rng, 0.0, 0.3), f(rng, 0.0, 0.3), f(rng, 0.0, 0.3)))
    return lines, set(), False

def col_twofield(rng):
    op = rng.choice(["d1 + d2", "d1 * d2", "min(d1, d2)", "max(d1, d2)",
                     "abs(d1 - d2)", "mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5))"])
    lines = ("\tfloat d1 = field(p, time, 0.0);\n"
             "\tfloat d2 = field2(p, time, %s);\n"
             "\tfloat d = %s;\n"
             "\tvec3 col = palette(d * %s + time * %s, %s);"
             % (f(rng, 0.0, 2.0), op, f(rng, 0.5, 1.8), f(rng, 0.0, 0.3), _pal_args(rng)))
    return lines, {"palette"}, True  # needs field2

# post-process options (operate on existing vec3 col)
def post_none(rng):
    return ""
def post_mod(rng):
    return "\n\tcol = mod(col * %s, 1.0);" % f(rng, 1.2, 3.0)
def post_fract(rng):
    return "\n\tcol = fract(col * %s);" % f(rng, 1.0, 2.5)
def post_pow(rng):
    return "\n\tcol = pow(clamp(col, 0.0, 1.0), vec3(%s));" % f(rng, 0.5, 2.0)

POSTS = [post_none, post_none, post_mod, post_fract, post_pow]

# base coordinate frames
def base_coord(rng):
    kind = rng.choice(["centered", "uv", "yy"])
    if kind == "centered":
        b = "\tvec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);"
    elif kind == "uv":
        b = ("\tvec2 p = gl_FragCoord.xy / resolution.xy - 0.5;\n"
             "\tp.x *= resolution.x / resolution.y;")
    else:
        b = "\tvec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);"
    if rng.random() < 0.6:
        b += "\n\tp *= %s;" % f(rng, 0.8, 2.8)
    return b

# --------------------------------------------------------------------------
# compose one shader
# --------------------------------------------------------------------------
def synthesize(seed):
    rng = random.Random(seed)
    helpers = set()

    # COLOR decides whether a second field is needed
    color_fn = rng.choices(
        [col_chromatic, col_palette, col_gray, col_twofield],
        weights=[0.40, 0.28, 0.10, 0.22])[0]
    color_lines, color_help, _ = color_fn(rng)
    helpers |= color_help

    # FIELD(s)
    field_code, fh = make_field(rng, "field")
    helpers |= fh
    field2_code = ""
    if color_fn is col_twofield:
        field2_code, fh2 = make_field(rng, "field2")
        helpers |= fh2

    # DOMAIN chain (0..3 distinct transforms, random order)
    k = rng.randint(0, 3)
    chosen = rng.sample(DOMAINS, k)
    dom_lines = []
    for d in chosen:
        stmt, dh = d(rng)
        dom_lines.append(stmt)
        helpers |= dh

    post = rng.choice(POSTS)(rng)

    # assemble main
    main = ["void main(){", base_coord(rng)]
    main += dom_lines
    main.append(color_lines + post)
    main.append("\tfragColor = TDOutputSwizzle(vec4(col, 1.0));")
    main.append("}")
    main_code = "\n".join(main) + "\n"

    # assemble helpers (stable order)
    order = ["rot2", "noise2", "noise3", "hash22", "palette"]
    helper_code = "".join(HELP[h] for h in order if h in helpers)

    parts = [HEADER]
    if helper_code:
        parts.append(helper_code + "\n")
    parts.append(field_code)
    if field2_code:
        parts.append(field2_code)
    parts.append("\n" + main_code)
    return "".join(parts)

# --------------------------------------------------------------------------
# write everything
# --------------------------------------------------------------------------
# 1) keep originals 0000..0100
for n in range(0, 101):
    shutil.copyfile(os.path.join(SRC, f"{n:02d}.frag"),
                    os.path.join(DST, f"{n:04d}.frag"))

# 2) synthesize 0101..1000 (overwrite)
for n in range(101, 1001):
    text = synthesize(n * 2654435761 + 12345)
    with open(os.path.join(DST, f"{n:04d}.frag"), "w") as fh:
        fh.write(text)

print("done: synthesized 0101.frag .. 1000.frag (0000..0100 kept as originals)")
