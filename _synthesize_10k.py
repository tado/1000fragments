#!/usr/bin/env python3
"""Enhanced compositional shader synthesizer -> 10000 variations.

Extends _synthesize.py with many NEW pattern-generation algorithms while
keeping the same compose-from-mechanisms approach.

New DOMAIN mechanisms : IFS fold, log-polar (Droste), polar-unwrap, twist, fisheye
New FIELD  mechanisms : Julia fractal, gyroid, truchet tiles, moire, plasma,
                        ridged noise, polygon/star SDF, dot grid, voronoi edges
New COLOR  mechanisms : HSV hue ramp, duotone mix
New POSTs             : posterize, contrast

Layout:
  00000.frag .. 00100.frag  -> exact copies of the original 100 shaders
  00101.frag .. 10000.frag  -> synthesized compositions
"""
import os, shutil, random
from string import Template

DST = "/Users/tado/Documents/Claude-tmp/1000fragments/10000fragments"
SRC = "/Users/tado/Documents/Claude-tmp/1000fragments/1000fragments/100fragments"

HEADER = "uniform float time;\nuniform vec2 resolution;\nout vec4 fragColor;\n\n"

def f(rng, a, b, nd=2):
    return f"{rng.uniform(a, b):.{nd}f}"

def sgn(rng):
    return rng.choice(["", "-"])

# --------------------------------------------------------------------------
# GLSL helper definitions (included only when referenced)
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
"hue":
"""vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}
""",
}

# --------------------------------------------------------------------------
# DOMAIN mechanisms -> (glsl_statement, helpers)
# --------------------------------------------------------------------------
def dom_rotate(rng):       return ("\tp = rot2(time * %s%s) * p;" % (sgn(rng), f(rng,0.2,1.4)), {"rot2"})
def dom_rotate_static(rng):return ("\tp = rot2(%s) * p;" % f(rng,0.3,3.1), {"rot2"})
def dom_scale(rng):        return ("\tp *= %s;" % f(rng,1.2,3.5), set())
def dom_swirl(rng):        return ("\tp = rot2(length(p) * %s%s + time * %s) * p;" % (sgn(rng), f(rng,1.0,4.0), f(rng,0.2,1.2)), {"rot2"})
def dom_mirror(rng):       return ("\tp = abs(p)%s;" % rng.choice([" - %s"%f(rng,0.2,0.8), ""]), set())
def dom_tile(rng):         return ("\tp = fract(p * %s) - 0.5;" % f(rng,1.0,3.0), set())
def dom_twist(rng):        return ("\tp = rot2(p.y * %s%s + time * %s) * p;" % (sgn(rng), f(rng,1.0,4.0), f(rng,0.1,1.0)), {"rot2"})

def dom_kaleido(rng):
    n = rng.randint(3, 8)
    return ("\t{ float ka = atan(p.y, p.x); float kr = length(p); float kn = %d.0;"
            " ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn);"
            " p = kr * vec2(cos(ka), sin(ka)); }" % n, set())

def dom_warp(rng):
    k = rng.randint(2, 6)
    return ("\tfor(int wi = 0; wi < %d; wi++){ float wf = float(wi) + 1.0;"
            " p.x += %s / wf * sin(wf * %s * p.y + time * %s);"
            " p.y += %s / wf * cos(wf * %s * p.x + time * %s); }"
            % (k, f(rng,0.2,0.5), f(rng,1.5,4.0), f(rng,0.6,2.0),
               f(rng,0.2,0.5), f(rng,1.5,4.0), f(rng,0.6,2.0)), set())

def dom_ripple(rng):
    return ("\tp += vec2(%s, %s) * sin(length(p) * %s - time * %s) * %s;"
            % (f(rng,-1,1), f(rng,-1,1), f(rng,2.0,6.0), f(rng,0.5,2.0), f(rng,0.1,0.4)), set())

def dom_fold(rng):  # IFS / kaleidoscopic fractal fold
    n = rng.randint(2, 5)
    return ("\tfor(int fo = 0; fo < %d; fo++){ p = abs(p) - %s; p = rot2(%s) * p; }"
            % (n, f(rng,0.1,0.6), f(rng, sgn_val(rng)*0.0+0.3, 2.6)), {"rot2"})

def sgn_val(rng):
    return 1.0

def dom_logpolar(rng):  # Droste / log-polar
    return ("\t{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x);"
            " p = vec2(la * %s, lr * %s + time * %s%s); }"
            % (f(rng,1.0,2.5), f(rng,1.0,3.0), sgn(rng), f(rng,0.1,0.8)), set())

def dom_polar(rng):  # polar coords used as a plane (rays + rings)
    return ("\t{ p = vec2(atan(p.y, p.x) * %s, length(p) * %s - time * %s); }"
            % (f(rng,1.0,3.0), f(rng,2.0,6.0), f(rng,0.1,0.8)), set())

def dom_fisheye(rng):
    return ("\t{ float fr = length(p); p *= 1.0 + %s%s * fr * fr; }"
            % (sgn(rng), f(rng,0.2,0.8)), set())

DOMAINS = [dom_rotate, dom_rotate_static, dom_scale, dom_swirl, dom_kaleido,
           dom_mirror, dom_warp, dom_ripple, dom_tile, dom_twist,
           dom_fold, dom_logpolar, dom_polar, dom_fisheye]

# --------------------------------------------------------------------------
# FIELD mechanisms -> (body setting `float v`, helpers). Output ~[-1, 1].
# --------------------------------------------------------------------------
def fld_rings(rng):
    return (Template("v = 0.5 * sin(length(p) * $F - t * $S + ph);")
            .substitute(F=f(rng,6,38), S=f(rng,1,9)), set())
def fld_waves(rng):
    return (Template("v = 0.5 * (sin(p.x * $FX + t * $S + ph) + sin(p.y * $FY - t * $S2 + ph));")
            .substitute(FX=f(rng,2,18), FY=f(rng,2,18), S=f(rng,0.5,6), S2=f(rng,0.5,6)), set())
def fld_spiral(rng):
    return (Template("float sa = atan(p.y, p.x); float sr = length(p);\n"
                     "    v = sin(sa * $K + sr * $M - t * $S + ph);")
            .substitute(K=f(rng,2,12), M=f(rng,4,24), S=f(rng,0.5,5)), set())
def fld_checker(rng):
    return (Template("vec2 cq = p * $F + vec2(t * $S, -t * $S) + ph;\n"
                     "    v = sign(sin(cq.x) * sin(cq.y));")
            .substitute(F=f(rng,3,16), S=f(rng,0.3,3)), set())
def fld_stripes(rng):
    return (Template("v = sin(p.x * $F + sin(p.y * $FY + t * $S) * $W + ph);")
            .substitute(F=f(rng,4,26), FY=f(rng,1,6), S=f(rng,0.5,6), W=f(rng,1,5)), set())
def fld_flow(rng):
    return (Template("v = noise3(vec3(p * $F, t * $S + ph)) * 2.0 - 1.0;")
            .substitute(F=f(rng,1,8), S=f(rng,0.2,3)), {"noise3"})
def fld_fbm(rng):
    return (Template("float fs = 0.0, famp = 0.5; vec2 fq = p * $F + ph;\n"
                     "    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * $S); fq *= 2.0; famp *= 0.5; }\n"
                     "    v = fs * 2.0 - 1.0;")
            .substitute(F=f(rng,1,6), S=f(rng,0.1,1.5)), {"noise2"})
def fld_voronoi(rng):
    return (Template(
        "vec2 vp = p * $F; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;\n"
        "    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){\n"
        "        vec2 nb = vec2(float(vx), float(vy));\n"
        "        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * $S + 6.2831853 * pt + ph);\n"
        "        md = min(md, length(nb + pt - vf)); }\n"
        "    v = md * 2.0 - 1.0;")
        .substitute(F=f(rng,2,9), S=f(rng,0.5,5)), {"hash22"})
def fld_metaball(rng):
    return (Template(
        "float ms = 0.0;\n"
        "    for(int mi = 0; mi < $N; mi++){ float mf = float(mi);\n"
        "        vec2 mm = vec2(sin(t * $S * sin(mf + 3.0) + ph), cos(t * $S * cos(mf + 3.0) + ph));\n"
        "        ms += $A / length(p - mm); }\n"
        "    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;")
        .substitute(N=rng.randint(5,16), S=f(rng,0.3,2.5), A=f(rng,0.02,0.10,3)), set())
def fld_interf(rng):
    return (Template(
        "float xs = 0.0;\n"
        "    for(int xi = 1; xi < $N; xi++){ float jf = float(xi);\n"
        "        vec2 im = vec2(sin(t * $S1 + jf * 4.0), cos(t * $S2 * jf)) * $SPR;\n"
        "        xs += sin(length(p - im) * $F - t * $S + ph) * 0.5; }\n"
        "    v = xs / (1.0 + abs(xs));")
        .substitute(N=rng.randint(4,9), S1=f(rng,0.1,1.0), S2=f(rng,0.1,0.6),
                    SPR=f(rng,0.3,1.0), F=f(rng,60,220), S=f(rng,4,14)), set())

# ---- NEW field algorithms -------------------------------------------------
def fld_julia(rng):
    it = rng.randint(16, 40)
    return (Template(
        "vec2 z = p * $Z; vec2 jc = vec2($CX + 0.3 * sin(t * $S + ph), $CY + 0.3 * cos(t * $S + ph));\n"
        "    float jit = 0.0;\n"
        "    for(int ji = 0; ji < $IT; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }\n"
        "    v = jit / float($IT) * 2.0 - 1.0;")
        .substitute(Z=f(rng,0.6,1.6), CX=f(rng,-0.8,0.4), CY=f(rng,-0.8,0.8),
                    S=f(rng,0.2,1.5), IT=it), set())
def fld_gyroid(rng):
    return (Template(
        "vec3 g = vec3(p * $F, t * $S + ph);\n"
        "    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;")
        .substitute(F=f(rng,2,10), S=f(rng,0.3,2.5)), set())
def fld_truchet(rng):
    return (Template(
        "vec2 tp = p * $F; vec2 ti = floor(tp); vec2 tf = fract(tp);\n"
        "    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;\n"
        "    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));\n"
        "    v = sin(dd * $F2 - t * $S + ph);")
        .substitute(F=f(rng,3,10), F2=f(rng,8,30), S=f(rng,0.5,4)), {"noise2"})
def fld_moire(rng):
    o = f(rng,0.2,0.6)
    return (Template(
        "float ma = sin(length(p - vec2($O, 0.0)) * $F1 - t * $S + ph);\n"
        "    float mb = sin(length(p + vec2($O, 0.0)) * $F2 - t * $S + ph);\n"
        "    v = ma * mb;")
        .substitute(O=o, F1=f(rng,8,40), F2=f(rng,8,40), S=f(rng,1,8)), set())
def fld_plasma(rng):
    return (Template(
        "v = 0.25 * (sin(p.x * $F1 + t * $S + ph) + sin(p.y * $F2 - t * $S + ph)\n"
        "        + sin((p.x + p.y) * $F3 + t * $S + ph) + sin(length(p) * $F4 - t * $S + ph));")
        .substitute(F1=f(rng,2,14), F2=f(rng,2,14), F3=f(rng,2,12), F4=f(rng,3,18),
                    S=f(rng,0.5,5)), set())
def fld_ridged(rng):
    return (Template(
        "float rn = noise3(vec3(p * $F, t * $S + ph));\n"
        "    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;")
        .substitute(F=f(rng,1,7), S=f(rng,0.2,2.5)), {"noise3"})
def fld_star(rng):
    return (Template(
        "float sa = atan(p.y, p.x); float sr = length(p);\n"
        "    float petal = $BASE + $AMP * cos(sa * $N + t * $S + ph);\n"
        "    v = sin((sr - petal) * $F);")
        .substitute(BASE=f(rng,0.3,0.7), AMP=f(rng,0.1,0.3), N=rng.randint(3,9),
                    S=f(rng,0.3,3), F=f(rng,6,20)), set())
def fld_dots(rng):
    return (Template(
        "vec2 dp = fract(p * $F) - 0.5;\n"
        "    float rad = $R + 0.12 * sin(t * $S + ph);\n"
        "    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;")
        .substitute(F=f(rng,2,9), R=f(rng,0.2,0.45), S=f(rng,0.5,4)), set())
def fld_voredges(rng):
    return (Template(
        "vec2 vp = p * $F; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;\n"
        "    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){\n"
        "        vec2 nb = vec2(float(vx), float(vy));\n"
        "        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * $S + 6.2831853 * pt + ph);\n"
        "        float dl = length(nb + pt - vf);\n"
        "        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }\n"
        "    v = (m2 - m1) * 2.0 - 1.0;")
        .substitute(F=f(rng,2,8), S=f(rng,0.5,4)), {"hash22"})

FIELDS = [fld_rings, fld_waves, fld_spiral, fld_checker, fld_stripes,
          fld_flow, fld_fbm, fld_voronoi, fld_metaball, fld_interf,
          fld_julia, fld_gyroid, fld_truchet, fld_moire, fld_plasma,
          fld_ridged, fld_star, fld_dots, fld_voredges]

def make_field(rng, name):
    body, helpers = rng.choice(FIELDS)(rng)
    return ("float %s(vec2 p, float t, float ph){\n    float v;\n    %s\n    return v;\n}\n"
            % (name, body), helpers)

# --------------------------------------------------------------------------
# COLOR mechanisms -> (lines producing `vec3 col`, helpers, needs_field2)
# --------------------------------------------------------------------------
def col_chromatic(rng):
    dph = rng.uniform(0.2, 1.4)
    return ("\tvec3 col = vec3(field(p, time, 0.0), field(p, time, %.2f), field(p, time, %.2f));\n"
            "\tcol = 0.5 + 0.5 * col;" % (dph, 2*dph), set(), False)

def _pal(rng):
    return ("vec3(%s, %s, %s), vec3(%s, %s, %s), vec3(%s, %s, %s), vec3(%s, %s, %s)" % (
        f(rng,0.4,0.6), f(rng,0.4,0.6), f(rng,0.4,0.6),
        f(rng,0.3,0.5), f(rng,0.3,0.5), f(rng,0.3,0.5),
        f(rng,0.7,1.4), f(rng,0.7,1.4), f(rng,0.7,1.4),
        f(rng,0.0,1.0), f(rng,0.0,1.0), f(rng,0.0,1.0)))

def col_palette(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = palette(d * %s + time * %s, %s);"
            % (f(rng,0.5,2.0), f(rng,0.0,0.3), _pal(rng)), {"palette"}, False)

def col_gray(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = vec3(0.5 + 0.5 * d) * vec3(%s, %s, %s) + vec3(%s, %s, %s);"
            % (f(rng,0.5,1.6), f(rng,0.5,1.6), f(rng,0.5,1.6),
               f(rng,0.0,0.3), f(rng,0.0,0.3), f(rng,0.0,0.3)), set(), False)

def col_hsv(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = hue(d * %s + time * %s);"
            % (f(rng,0.5,2.0), f(rng,0.0,0.3)), {"hue"}, False)

def col_duotone(rng):
    return ("\tfloat d = 0.5 + 0.5 * field(p, time, 0.0);\n"
            "\tvec3 col = mix(vec3(%s, %s, %s), vec3(%s, %s, %s), d);"
            % (f(rng,0.0,0.5), f(rng,0.0,0.5), f(rng,0.0,0.6),
               f(rng,0.5,1.0), f(rng,0.5,1.0), f(rng,0.4,1.0)), set(), False)

def col_twofield(rng):
    op = rng.choice(["d1 + d2", "d1 * d2", "min(d1, d2)", "max(d1, d2)",
                     "abs(d1 - d2)", "mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5))"])
    return ("\tfloat d1 = field(p, time, 0.0);\n"
            "\tfloat d2 = field2(p, time, %s);\n"
            "\tfloat d = %s;\n"
            "\tvec3 col = palette(d * %s + time * %s, %s);"
            % (f(rng,0.0,2.0), op, f(rng,0.5,1.8), f(rng,0.0,0.3), _pal(rng)),
            {"palette"}, True)

COLOR_FNS = [col_chromatic, col_palette, col_hsv, col_gray, col_duotone, col_twofield]
COLOR_W   = [0.30,          0.20,        0.12,    0.06,     0.10,         0.22]

# --------------------------------------------------------------------------
# POST processing
# --------------------------------------------------------------------------
def post_none(rng):      return ""
def post_mod(rng):       return "\n\tcol = mod(col * %s, 1.0);" % f(rng,1.2,3.0)
def post_fract(rng):     return "\n\tcol = fract(col * %s);" % f(rng,1.0,2.5)
def post_pow(rng):       return "\n\tcol = pow(clamp(col, 0.0, 1.0), vec3(%s));" % f(rng,0.5,2.0)
def post_posterize(rng): return "\n\tcol = floor(clamp(col, 0.0, 1.0) * %d.0) / %d.0;" % ((lambda L:(L,L))(rng.randint(3,7)))
def post_contrast(rng):  return "\n\tcol = clamp((col - 0.5) * %s + 0.5, 0.0, 1.0);" % f(rng,1.2,2.2)

POSTS = [post_none, post_none, post_mod, post_fract, post_pow, post_posterize, post_contrast]

# --------------------------------------------------------------------------
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
        b += "\n\tp *= %s;" % f(rng,0.8,2.8)
    return b

def synthesize(seed):
    rng = random.Random(seed)
    helpers = set()

    color_fn = rng.choices(COLOR_FNS, weights=COLOR_W)[0]
    color_lines, ch, need2 = color_fn(rng)
    helpers |= ch

    field_code, fh = make_field(rng, "field")
    helpers |= fh
    field2_code = ""
    if need2:
        field2_code, fh2 = make_field(rng, "field2")
        helpers |= fh2

    k = rng.randint(0, 4)
    dom_lines = []
    for d in rng.sample(DOMAINS, k):
        stmt, dh = d(rng)
        dom_lines.append(stmt)
        helpers |= dh

    post = rng.choice(POSTS)(rng)

    main = ["void main(){", base_coord(rng)] + dom_lines
    main.append(color_lines + post)
    main.append("\tfragColor = TDOutputSwizzle(vec4(col, 1.0));")
    main.append("}")
    main_code = "\n".join(main) + "\n"

    order = ["rot2", "noise2", "noise3", "hash22", "palette", "hue"]
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
os.makedirs(DST, exist_ok=True)

# 1) originals 00000..00100
for n in range(0, 101):
    shutil.copyfile(os.path.join(SRC, f"{n:02d}.frag"),
                    os.path.join(DST, f"{n:05d}.frag"))

# 2) synthesized 00101..10000
for n in range(101, 10001):
    text = synthesize(n * 2654435761 + 98765)
    with open(os.path.join(DST, f"{n:05d}.frag"), "w") as fh:
        fh.write(text)

print("done: 00000.frag .. 10000.frag written to", DST)
