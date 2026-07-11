#!/usr/bin/env python3
"""Diverse compositional shader synthesizer -> 10000fragments_new.

Much wider variety than _synthesize_10k.py:

ARCHETYPES (distinct main() structures, interleaved through the numbering):
  classic   : domain transforms -> field -> color -> post   (expanded libraries)
  layer     : 2-3 independently-warped fields blended with ops
  glow      : additive neon glow from N moving SDF shapes
  tunnel    : classic polar tunnel fly-through with any field as wall texture
  raymarch  : mini 3D raymarcher (repeated spheres/boxes, gyroid, torus)
  particles : layered hash-grid particles (drift / rain / twinkle / swirl)
  cells     : per-cell randomized motifs (truchet arcs, stripes, pulses...)
  orbit     : escape-time orbit-trap fractals (julia / burning ship)

FIELDS: 31 algorithms (19 from previous set + hex grid, rose curves,
lissajous, mandelbrot, caustics, double domain-warp, phyllotaxis, glitch
rows, weave, IFS fold field, radial rays, diagonal maze).

Output: 00000.frag .. 09999.frag in 10000fragments_new/
"""
import os, random

DST = "/Users/tado/Documents/Claude-tmp/1000fragments/10000fragments_new"

HEADER = "uniform float time;\nuniform vec2 resolution;\nout vec4 fragColor;\n\n"

def f(rng, a, b, nd=2):
    return "%.*f" % (nd, rng.uniform(a, b))

def sgn(rng):
    return rng.choice(["", "-"])

# --------------------------------------------------------------------------
# GLSL helper definitions (included only when referenced)
# --------------------------------------------------------------------------
HELP = {
"rot2": "mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }\n",
"hash21": "float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }\n",
"hash22":
"""vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
""",
"noise2":
"""float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
""",
"noise3":
"""vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
float vnoise3(vec3 p){
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
ORDER = ["rot2", "hash21", "hash22", "noise2", "noise3", "palette", "hue"]

def expand(helpers):
    out = set(helpers)
    if "noise2" in out:
        out.add("hash21")
    return out

# --------------------------------------------------------------------------
# DOMAIN mechanisms -> (glsl_statement acting on variable V, helpers)
# --------------------------------------------------------------------------
def dom_rotate(rng, V):
    return ("\t%s = rot2(time * %s%s) * %s;" % (V, sgn(rng), f(rng,0.3,1.6), V), {"rot2"})
def dom_rotate_static(rng, V):
    return ("\t%s = rot2(%s) * %s;" % (V, f(rng,0.3,3.1), V), {"rot2"})
def dom_scale(rng, V):
    return ("\t%s *= %s;" % (V, f(rng,1.2,3.2)), set())
def dom_swirl(rng, V):
    return ("\t%s = rot2(length(%s) * %s%s + time * %s) * %s;"
            % (V, V, sgn(rng), f(rng,1.0,4.0), f(rng,0.3,1.5), V), {"rot2"})
def dom_mirror(rng, V):
    return ("\t%s = abs(%s)%s;" % (V, V, rng.choice([" - %s" % f(rng,0.2,0.8), ""])), set())
def dom_tile(rng, V):
    return ("\t%s = fract(%s * %s) - 0.5;" % (V, V, f(rng,1.0,3.0)), set())
def dom_twist(rng, V):
    return ("\t%s = rot2(%s.y * %s%s + time * %s) * %s;"
            % (V, V, sgn(rng), f(rng,1.0,4.0), f(rng,0.2,1.2), V), {"rot2"})
def dom_kaleido(rng, V):
    n = rng.randint(3, 9)
    return ("\t{ float ka = atan(%s.y, %s.x); float kr = length(%s); float kn = %d.0;"
            " ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn);"
            " %s = kr * vec2(cos(ka), sin(ka)); }" % (V, V, V, n, V), set())
def dom_warp(rng, V):
    k = rng.randint(2, 5)
    return ("\tfor(int wi = 0; wi < %d; wi++){ float wf = float(wi) + 1.0;"
            " %s.x += %s / wf * sin(wf * %s * %s.y + time * %s);"
            " %s.y += %s / wf * cos(wf * %s * %s.x + time * %s); }"
            % (k, V, f(rng,0.2,0.5), f(rng,1.5,4.0), V, f(rng,0.6,2.2),
               V, f(rng,0.2,0.5), f(rng,1.5,4.0), V, f(rng,0.6,2.2)), set())
def dom_ripple(rng, V):
    return ("\t%s += vec2(%s, %s) * sin(length(%s) * %s - time * %s) * %s;"
            % (V, f(rng,-1,1), f(rng,-1,1), V, f(rng,2.0,6.0), f(rng,0.8,2.5), f(rng,0.1,0.4)), set())
def dom_fold(rng, V):
    n = rng.randint(2, 5)
    return ("\tfor(int fo = 0; fo < %d; fo++){ %s = abs(%s) - %s; %s = rot2(%s) * %s; }"
            % (n, V, V, f(rng,0.1,0.6), V, f(rng,0.3,2.6), V), {"rot2"})
def dom_logpolar(rng, V):
    return ("\t{ float lr = log(length(%s) + 0.001); float la = atan(%s.y, %s.x);"
            " %s = vec2(la * %s, lr * %s + time * %s%s); }"
            % (V, V, V, V, f(rng,1.0,2.5), f(rng,1.0,3.0), sgn(rng), f(rng,0.2,1.0)), set())
def dom_polar(rng, V):
    return ("\t{ %s = vec2(atan(%s.y, %s.x) * %s, length(%s) * %s - time * %s); }"
            % (V, V, V, f(rng,1.0,3.0), V, f(rng,2.0,6.0), f(rng,0.2,1.0)), set())
def dom_fisheye(rng, V):
    return ("\t{ float fr = length(%s); %s *= 1.0 + %s%s * fr * fr; }"
            % (V, V, sgn(rng), f(rng,0.2,0.8)), set())
def dom_pixelate(rng, V):
    ff = f(rng,6.0,30.0,1)
    return ("\t%s = (floor(%s * %s) + 0.5) / %s;" % (V, V, ff, ff), set())
def dom_waveoff(rng, V):
    ax, ay = rng.choice([("x", "y"), ("y", "x")])
    return ("\t%s.%s += sin(%s.%s * %s + time * %s) * %s;"
            % (V, ax, V, ay, f(rng,2.0,8.0), f(rng,1.0,4.0), f(rng,0.1,0.4)), set())

DOMAINS = [dom_rotate, dom_rotate_static, dom_scale, dom_swirl, dom_kaleido,
           dom_mirror, dom_warp, dom_ripple, dom_tile, dom_twist,
           dom_fold, dom_logpolar, dom_polar, dom_fisheye, dom_pixelate, dom_waveoff]

# --------------------------------------------------------------------------
# FIELD mechanisms -> (body setting `float v` from p/t/ph, helpers)
# --------------------------------------------------------------------------
def fld_rings(rng):
    return ("v = 0.5 * sin(length(p) * %s - t * %s + ph);"
            % (f(rng,6,38), f(rng,1,9)), set())
def fld_waves(rng):
    return ("v = 0.5 * (sin(p.x * %s + t * %s + ph) + sin(p.y * %s - t * %s + ph));"
            % (f(rng,2,18), f(rng,0.5,6), f(rng,2,18), f(rng,0.5,6)), set())
def fld_spiral(rng):
    return ("float sa = atan(p.y, p.x); float sr = length(p);\n"
            "    v = sin(sa * %s + sr * %s - t * %s + ph);"
            % (f(rng,2,12), f(rng,4,24), f(rng,0.5,5)), set())
def fld_checker(rng):
    return ("vec2 cq = p * %s + vec2(t * %s, -t * %s) + ph;\n"
            "    v = sign(sin(cq.x) * sin(cq.y));"
            % (f(rng,3,16), f(rng,0.3,3), f(rng,0.3,3)), set())
def fld_stripes(rng):
    return ("v = sin(p.x * %s + sin(p.y * %s + t * %s) * %s + ph);"
            % (f(rng,4,26), f(rng,1,6), f(rng,0.5,6), f(rng,1,5)), set())
def fld_flow(rng):
    return ("v = vnoise3(vec3(p * %s, t * %s + ph)) * 2.0 - 1.0;"
            % (f(rng,1,8), f(rng,0.3,3)), {"noise3"})
def fld_fbm(rng):
    return ("float fs = 0.0; float famp = 0.5; vec2 fq = p * %s + ph;\n"
            "    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * %s); fq *= 2.0; famp *= 0.5; }\n"
            "    v = fs * 2.0 - 1.0;"
            % (f(rng,1,6), f(rng,0.2,1.5)), {"noise2"})
def fld_voronoi(rng):
    return ("vec2 vp = p * %s; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;\n"
            "    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){\n"
            "        vec2 nb = vec2(float(vx), float(vy));\n"
            "        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * %s + 6.2831853 * pt + ph);\n"
            "        md = min(md, length(nb + pt - vf)); }\n"
            "    v = md * 2.0 - 1.0;"
            % (f(rng,2,9), f(rng,0.5,5)), {"hash22"})
def fld_metaball(rng):
    return ("float ms = 0.0;\n"
            "    for(int mi = 0; mi < %d; mi++){ float mf = float(mi);\n"
            "        vec2 mm = vec2(sin(t * %s * sin(mf + 3.0) + ph), cos(t * %s * cos(mf + 3.0) + ph));\n"
            "        ms += %s / length(p - mm); }\n"
            "    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;"
            % (rng.randint(5,14), f(rng,0.3,2.5), f(rng,0.3,2.5), f(rng,0.02,0.10,3)), set())
def fld_interf(rng):
    return ("float xs = 0.0;\n"
            "    for(int xi = 1; xi < %d; xi++){ float jf = float(xi);\n"
            "        vec2 im = vec2(sin(t * %s + jf * 4.0), cos(t * %s * jf)) * %s;\n"
            "        xs += sin(length(p - im) * %s - t * %s + ph) * 0.5; }\n"
            "    v = xs / (1.0 + abs(xs));"
            % (rng.randint(4,9), f(rng,0.1,1.0), f(rng,0.1,0.6),
               f(rng,0.3,1.0), f(rng,60,220), f(rng,4,14)), set())
def fld_julia(rng):
    it = rng.randint(16, 40)
    return ("vec2 z = p * %s; vec2 jc = vec2(%s + 0.3 * sin(t * %s + ph), %s + 0.3 * cos(t * %s + ph));\n"
            "    float jit = 0.0;\n"
            "    for(int ji = 0; ji < %d; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }\n"
            "    v = jit / %d.0 * 2.0 - 1.0;"
            % (f(rng,0.6,1.6), f(rng,-0.8,0.4), f(rng,0.3,1.8), f(rng,-0.8,0.8), f(rng,0.3,1.8), it, it), set())
def fld_gyroid2(rng):
    return ("vec3 g = vec3(p * %s, t * %s + ph);\n"
            "    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;"
            % (f(rng,2,10), f(rng,0.4,2.5)), set())
def fld_truchet(rng):
    return ("vec2 tp = p * %s; vec2 ti = floor(tp); vec2 tf = fract(tp);\n"
            "    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;\n"
            "    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));\n"
            "    v = sin(dd * %s - t * %s + ph);"
            % (f(rng,3,10), f(rng,8,30), f(rng,0.5,4)), {"hash21"})
def fld_moire(rng):
    return ("float ma = sin(length(p - vec2(%s, 0.0)) * %s - t * %s + ph);\n"
            "    float mb = sin(length(p + vec2(%s, 0.0)) * %s - t * %s + ph);\n"
            "    v = ma * mb;"
            % ((lambda o: (o, f(rng,8,40), f(rng,1,8), o, f(rng,8,40), f(rng,1,8)))(f(rng,0.2,0.6))), set())
def fld_plasma(rng):
    s = f(rng,0.5,5)
    return ("v = 0.25 * (sin(p.x * %s + t * %s + ph) + sin(p.y * %s - t * %s + ph)\n"
            "        + sin((p.x + p.y) * %s + t * %s + ph) + sin(length(p) * %s - t * %s + ph));"
            % (f(rng,2,14), s, f(rng,2,14), s, f(rng,2,12), s, f(rng,3,18), s), set())
def fld_ridged(rng):
    return ("float rn = vnoise3(vec3(p * %s, t * %s + ph));\n"
            "    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;"
            % (f(rng,1,7), f(rng,0.3,2.5)), {"noise3"})
def fld_star(rng):
    return ("float sa = atan(p.y, p.x); float sr = length(p);\n"
            "    float petal = %s + %s * cos(sa * %d.0 + t * %s + ph);\n"
            "    v = sin((sr - petal) * %s);"
            % (f(rng,0.3,0.7), f(rng,0.1,0.3), rng.randint(3,9), f(rng,0.5,3), f(rng,6,20)), set())
def fld_dots(rng):
    return ("vec2 dp = fract(p * %s) - 0.5;\n"
            "    float rad = %s + 0.12 * sin(t * %s + ph);\n"
            "    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;"
            % (f(rng,2,9), f(rng,0.2,0.45), f(rng,0.5,4)), set())
def fld_voredges(rng):
    return ("vec2 vp = p * %s; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;\n"
            "    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){\n"
            "        vec2 nb = vec2(float(vx), float(vy));\n"
            "        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * %s + 6.2831853 * pt + ph);\n"
            "        float dl = length(nb + pt - vf);\n"
            "        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }\n"
            "    v = (m2 - m1) * 2.0 - 1.0;"
            % (f(rng,2,8), f(rng,0.5,4)), {"hash22"})
# ---- new fields -----------------------------------------------------------
def fld_hex(rng):
    return ("vec2 hx = p * %s;\n"
            "    vec2 r1 = vec2(1.0, 1.7320508);\n"
            "    vec2 h1 = r1 * 0.5;\n"
            "    vec2 a1 = mod(hx, r1) - h1;\n"
            "    vec2 b1 = mod(hx - h1, r1) - h1;\n"
            "    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;\n"
            "    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));\n"
            "    v = sin(hd * %s - t * %s + ph);"
            % (f(rng,2,7), f(rng,8,24), f(rng,1,6)), set())
def fld_rose(rng):
    return ("float ra = atan(p.y, p.x); float rr = length(p);\n"
            "    float pet = %s + %s * pow(abs(cos(ra * %d.0 + t * %s)), %s);\n"
            "    v = sin((rr - pet) * %s + ph);"
            % (f(rng,0.3,0.6), f(rng,0.15,0.35), rng.randint(2,7), f(rng,0.5,3),
               f(rng,0.5,3.0), f(rng,8,24)), set())
def fld_liss(rng):
    return ("float md = 10.0;\n"
            "    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;\n"
            "        vec2 lp = vec2(sin(lt * %d.0 + t * %s + ph), sin(lt * %d.0 + t * %s)) * %s;\n"
            "        md = min(md, length(p - lp)); }\n"
            "    v = exp(-md * %s) * 2.0 - 1.0;"
            % (rng.randint(1,5), f(rng,0.3,1.5), rng.randint(1,5), f(rng,0.3,1.5),
               f(rng,0.5,1.0), f(rng,3,10)), set())
def fld_mandel(rng):
    it = rng.randint(16, 32)
    return ("vec2 mc = p * (%s + %s * sin(t * %s)) + vec2(%s, %s) + 0.02 * vec2(sin(ph), cos(ph));\n"
            "    vec2 z = vec2(0.0);\n"
            "    float mit = 0.0;\n"
            "    for(int mi = 0; mi < %d; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }\n"
            "    v = mit / %d.0 * 2.0 - 1.0;"
            % (f(rng,0.8,2.0), f(rng,0.1,0.5), f(rng,0.4,1.6),
               f(rng,-0.9,-0.2), f(rng,-0.3,0.3), it, it), set())
def fld_caustic(rng):
    return ("vec2 cw = p * %s + ph;\n"
            "    float ca = 0.0;\n"
            "    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;\n"
            "        cw += sin(cw.yx * %s + t * %s * cf * 0.35) / cf;\n"
            "        ca += sin(cw.x + cw.y); }\n"
            "    v = ca * 0.3;"
            % (f(rng,1.5,5), f(rng,1.2,2.2), f(rng,1,4)), set())
def fld_warp2(rng):
    fr = f(rng,1.5,5)
    return ("vec2 wq = vec2(vnoise2(p * %s + ph), vnoise2(p * %s + vec2(5.2, 1.3) + ph));\n"
            "    vec2 wr = vec2(vnoise2(p * %s + %s * wq + vec2(1.7, 9.2) + t * %s),\n"
            "                   vnoise2(p * %s + %s * wq + vec2(8.3, 2.8) - t * %s));\n"
            "    v = vnoise2(p * %s + %s * wr) * 2.0 - 1.0;"
            % (fr, fr, fr, f(rng,1,4), f(rng,0.3,1.2), fr, f(rng,1,4), f(rng,0.3,1.2),
               fr, f(rng,1,4)), {"noise2"})
def fld_phyllo(rng):
    return ("float md = 10.0;\n"
            "    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;\n"
            "        float ang = ff * 2.3999632 + t * %s + ph * 0.2;\n"
            "        vec2 sp = sqrt(ff) * %s * vec2(cos(ang), sin(ang));\n"
            "        md = min(md, length(p - sp)); }\n"
            "    v = exp(-md * %s) * 2.0 - 1.0;"
            % (f(rng,0.2,1.0), f(rng,0.12,0.3), f(rng,4,12)), set())
def fld_glitch(rng):
    return ("float grow = floor(p.y * %s);\n"
            "    float gsh = hash21(vec2(grow, floor(t * %s))) - 0.5;\n"
            "    float gx = p.x + gsh * %s;\n"
            "    v = sin(gx * %s + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * %s));"
            % (f(rng,6,24), f(rng,2,10), f(rng,0.3,1.2), f(rng,6,20), f(rng,1,5)), {"hash21"})
def fld_weave(rng):
    return ("float wa = sin(p.x * %s + t * %s + ph) * 0.7;\n"
            "    float wb = sin(p.y * %s - t * %s + ph) * 0.7;\n"
            "    v = max(wa, wb) + min(wa, wb) * %s;"
            % (f(rng,4,20), f(rng,0.5,4), f(rng,4,20), f(rng,0.5,4), f(rng,0.2,0.8)), set())
def fld_kochfold(rng):
    return ("vec2 kp = p * %s;\n"
            "    for(int ki = 0; ki < %d; ki++){ kp = abs(kp) - %s; kp = rot2(%s) * kp; kp *= %s; }\n"
            "    v = sin(kp.%s * %s - t * %s + ph);"
            % (f(rng,1.0,2.5), rng.randint(3,6), f(rng,0.4,0.8), f(rng,0.3,2.8),
               f(rng,1.15,1.45), rng.choice(["x","y"]), f(rng,1,4), f(rng,1,5)), {"rot2"})
def fld_rays(rng):
    return ("float qa = atan(p.y, p.x);\n"
            "    float qr = length(p);\n"
            "    v = sin(qa * %d.0 + qr * %s * sin(t * %s) + t * %s + ph);"
            % (rng.randint(3,12), f(rng,2,8), f(rng,0.4,1.5), f(rng,1,6)), set())
def fld_diagmaze(rng):
    return ("vec2 zp = p * %s;\n"
            "    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;\n"
            "    if(hash21(zi + floor(t * %s)) < 0.5) zf.x = -zf.x;\n"
            "    float zd = abs(zf.x + zf.y) * 0.7071068;\n"
            "    v = sin(zd * %s - t * %s + ph);"
            % (f(rng,3,9), f(rng,0.5,3), f(rng,10,30), f(rng,2,8)), {"hash21"})

FIELDS = [fld_rings, fld_waves, fld_spiral, fld_checker, fld_stripes,
          fld_flow, fld_fbm, fld_voronoi, fld_metaball, fld_interf,
          fld_julia, fld_gyroid2, fld_truchet, fld_moire, fld_plasma,
          fld_ridged, fld_star, fld_dots, fld_voredges,
          fld_hex, fld_rose, fld_liss, fld_mandel, fld_caustic, fld_warp2,
          fld_phyllo, fld_glitch, fld_weave, fld_kochfold, fld_rays, fld_diagmaze]

def make_field(rng, name):
    body, helpers = rng.choice(FIELDS)(rng)
    return ("float %s(vec2 p, float t, float ph){\n    float v;\n    %s\n    return v;\n}\n"
            % (name, body), helpers)

# --------------------------------------------------------------------------
# generic scalar -> color  (used by layer/tunnel/cells/orbit)
# --------------------------------------------------------------------------
def _pal(rng):
    return ("vec3(%s, %s, %s), vec3(%s, %s, %s), vec3(%s, %s, %s), vec3(%s, %s, %s)" % (
        f(rng,0.4,0.6), f(rng,0.4,0.6), f(rng,0.4,0.6),
        f(rng,0.3,0.5), f(rng,0.3,0.5), f(rng,0.3,0.5),
        f(rng,0.7,1.4), f(rng,0.7,1.4), f(rng,0.7,1.4),
        f(rng,0.0,1.0), f(rng,0.0,1.0), f(rng,0.0,1.0)))

def colorize(rng, dv):
    mode = rng.choices(["pal", "cos", "hue", "duo", "gray", "neon"],
                       weights=[0.24, 0.20, 0.14, 0.16, 0.06, 0.20])[0]
    if mode == "pal":
        return ("\tvec3 col = palette(%s * %s + time * %s, %s);"
                % (dv, f(rng,0.4,1.5), f(rng,0.0,0.4), _pal(rng)), {"palette"})
    if mode == "cos":
        return ("\tvec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + %s * %s + time * %s);"
                % (dv, f(rng,1.5,5.0), f(rng,0.0,1.0)), set())
    if mode == "hue":
        return ("\tvec3 col = hue(%s * %s + time * %s);"
                % (dv, f(rng,0.4,1.5), f(rng,0.0,0.4)), {"hue"})
    if mode == "duo":
        return ("\tfloat cc = clamp(0.5 + 0.5 * %s, 0.0, 1.0);\n"
                "\tvec3 col = mix(vec3(%s, %s, %s), vec3(%s, %s, %s), cc);"
                % (dv, f(rng,0.0,0.4), f(rng,0.0,0.4), f(rng,0.0,0.55),
                   f(rng,0.55,1.0), f(rng,0.55,1.0), f(rng,0.4,1.0)), set())
    if mode == "gray":
        return ("\tvec3 col = vec3(0.5 + 0.5 * %s) * vec3(%s, %s, %s) + vec3(%s, %s, %s);"
                % (dv, f(rng,0.5,1.5), f(rng,0.5,1.5), f(rng,0.5,1.5),
                   f(rng,0.0,0.25), f(rng,0.0,0.25), f(rng,0.0,0.25)), set())
    return ("\tvec3 col = vec3(%s, %s, %s) * (%s / (abs(%s) + %s));\n"
            "\tcol = col / (1.0 + col);"
            % (f(rng,0.15,1.0), f(rng,0.15,1.0), f(rng,0.15,1.0),
               f(rng,0.05,0.25), dv, f(rng,0.02,0.10)), set())

# --------------------------------------------------------------------------
# POST processing -> (code_line(s), helpers)
# --------------------------------------------------------------------------
def post_mod(rng):       return ("\tcol = mod(col * %s, 1.0);" % f(rng,1.2,3.0), set())
def post_fract(rng):     return ("\tcol = fract(col * %s);" % f(rng,1.0,2.5), set())
def post_pow(rng):       return ("\tcol = pow(clamp(col, 0.0, 1.0), vec3(%s));" % f(rng,0.5,2.0), set())
def post_posterize(rng):
    L = rng.randint(3, 7)
    return ("\tcol = floor(clamp(col, 0.0, 1.0) * %d.0) / %d.0;" % (L, L), set())
def post_contrast(rng):  return ("\tcol = clamp((col - 0.5) * %s + 0.5, 0.0, 1.0);" % f(rng,1.2,2.2), set())
def post_vignette(rng):
    return ("\tvec2 vg = gl_FragCoord.xy / resolution - 0.5;\n"
            "\tcol *= 1.0 - %s * dot(vg, vg);" % f(rng,0.8,1.8), set())
def post_scanline(rng):
    return ("\tcol *= %s + %s * sin(gl_FragCoord.y * %s + time * %s);"
            % (f(rng,0.8,0.9), f(rng,0.1,0.2), f(rng,0.8,3.0), f(rng,4.0,18.0)), set())
def post_grain(rng):
    return ("\tcol += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * %s;"
            % f(rng,0.04,0.12), {"hash21"})

POSTS = [post_mod, post_fract, post_pow, post_posterize, post_contrast,
         post_vignette, post_scanline, post_grain]

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

def centered_coord():
    return "\tvec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);"

def finish(rng, helpers, funcs, body_lines, post_prob=0.55):
    helpers = set(helpers)
    if rng.random() < post_prob:
        pc, phh = rng.choice(POSTS)(rng)
        body_lines = body_lines + [pc]
        helpers |= phh
    helpers = expand(helpers)
    main = ["void main(){"] + body_lines
    main.append("\tfragColor = TDOutputSwizzle(vec4(col, 1.0));")
    main.append("}")
    helper_code = "".join(HELP[h] for h in ORDER if h in helpers)
    parts = [HEADER]
    if helper_code:
        parts.append(helper_code + "\n")
    if funcs:
        parts.append(funcs)
    parts.append("\n" + "\n".join(main) + "\n")
    return "".join(parts)

# --------------------------------------------------------------------------
# ARCHETYPE: classic (field-function color modes kept from previous set)
# --------------------------------------------------------------------------
def col_chromatic(rng):
    dph = rng.uniform(0.2, 1.4)
    return ("\tvec3 col = vec3(field(p, time, 0.0), field(p, time, %.2f), field(p, time, %.2f));\n"
            "\tcol = 0.5 + 0.5 * col;" % (dph, 2 * dph), set(), False)
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
def col_neon(rng):
    return ("\tfloat d = field(p, time, 0.0);\n"
            "\tvec3 col = vec3(%s, %s, %s) * (%s / (abs(d) + %s));\n"
            "\tcol = col / (1.0 + col);"
            % (f(rng,0.15,1.0), f(rng,0.15,1.0), f(rng,0.15,1.0),
               f(rng,0.05,0.25), f(rng,0.02,0.10)), set(), False)
def col_twofield(rng):
    op = rng.choice(["d1 + d2", "d1 * d2", "min(d1, d2)", "max(d1, d2)",
                     "abs(d1 - d2)", "mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7))"])
    return ("\tfloat d1 = field(p, time, 0.0);\n"
            "\tfloat d2 = field2(p, time, %s);\n"
            "\tfloat d = %s;\n"
            "\tvec3 col = palette(d * %s + time * %s, %s);"
            % (f(rng,0.0,2.0), op, f(rng,0.5,1.8), f(rng,0.0,0.3), _pal(rng)),
            {"palette"}, True)

CLASSIC_COLORS = [col_chromatic, col_palette, col_hsv, col_gray, col_duotone, col_neon, col_twofield]
CLASSIC_W      = [0.25,          0.16,        0.10,    0.05,     0.10,        0.14,     0.20]

def build_classic(rng):
    helpers = set()
    color_fn = rng.choices(CLASSIC_COLORS, weights=CLASSIC_W)[0]
    color_lines, ch, need2 = color_fn(rng)
    helpers |= ch
    funcs, fh = make_field(rng, "field")
    helpers |= fh
    if need2:
        f2, fh2 = make_field(rng, "field2")
        funcs += f2
        helpers |= fh2
    lines = [base_coord(rng)]
    for d in rng.sample(DOMAINS, rng.randint(0, 4)):
        stmt, dh = d(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append(color_lines)
    return finish(rng, helpers, funcs, lines)

# --------------------------------------------------------------------------
# ARCHETYPE: layer
# --------------------------------------------------------------------------
def build_layer(rng):
    helpers = set()
    fa, ha = make_field(rng, "fieldA"); helpers |= ha
    fb, hb = make_field(rng, "fieldB"); helpers |= hb
    funcs = fa + fb
    three = rng.random() < 0.3
    if three:
        fc, hc = make_field(rng, "fieldC")
        funcs += fc
        helpers |= hc
    lines = [base_coord(rng)]
    names = ["q1", "q2"] + (["q3"] if three else [])
    lines.append("\t" + " ".join("vec2 %s = p;" % nm for nm in names))
    for nm in names:
        for d in rng.sample(DOMAINS, rng.randint(0, 2)):
            stmt, dh = d(rng, nm)
            lines.append(stmt)
            helpers |= dh
    lines.append("\tfloat d1 = fieldA(q1, time, 0.0);")
    lines.append("\tfloat d2 = fieldB(q2, time, %s);" % f(rng,0.0,2.0))
    if three:
        lines.append("\tfloat d3 = fieldC(q3, time, %s);" % f(rng,0.0,2.0))
        lines.append("\td2 = %s;" % rng.choice(
            ["0.5 * (d2 + d3)", "d2 * d3", "min(d2, d3)", "max(d2, d3)", "abs(d2 - d3)"]))
    combined = rng.choice(
        ["0.5 * (d1 + d2)", "d1 * d2", "min(d1, d2)", "max(d1, d2)", "abs(d1 - d2)",
         "mix(d1, d2, 0.5 + 0.5 * sin(time * %s))" % f(rng,0.4,1.6)])
    lines.append("\tfloat d = %s;" % combined)
    cl, chh = colorize(rng, "d")
    helpers |= chh
    lines.append(cl)
    return finish(rng, helpers, funcs, lines)

# --------------------------------------------------------------------------
# ARCHETYPE: glow
# --------------------------------------------------------------------------
def build_glow(rng):
    helpers = set()
    n = rng.randint(4, 12)
    shape = rng.choice(["point", "ring", "box", "seg"])
    motion = rng.choice(["orbit", "liss", "hash"])
    lines = [base_coord(rng)]
    if rng.random() < 0.4:
        stmt, dh = dom_rotate(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append("\tvec3 col = vec3(%s, %s, %s);"
                 % (f(rng,0.0,0.06,3), f(rng,0.0,0.06,3), f(rng,0.0,0.08,3)))
    lines.append("\tfor(int gi = 0; gi < %d; gi++){" % n)
    lines.append("\t\tfloat fi = float(gi);")
    if motion == "orbit":
        lines.append("\t\tvec2 q = vec2(cos(fi * %s + time * %s), sin(fi * %s + time * %s))"
                     " * (%s + %s * sin(fi * 1.7 + time * %s));"
                     % ((lambda ga, gs: (ga, gs, ga, gs, f(rng,0.3,0.8), f(rng,0.1,0.4), f(rng,0.5,2.0)))
                        (f(rng,0.5,2.5), f(rng,0.5,2.5))))
    elif motion == "liss":
        lines.append("\t\tvec2 q = vec2(sin(time * %s * (0.3 + fi * %s) + fi * 2.4),"
                     " cos(time * %s * (0.4 + fi * %s) + fi * 1.7)) * %s;"
                     % (f(rng,0.4,1.6), f(rng,0.05,0.25), f(rng,0.4,1.6), f(rng,0.05,0.25),
                        f(rng,0.4,1.0)))
    else:
        helpers.add("hash22")
        lines.append("\t\tvec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));")
        lines.append("\t\tvec2 q = (hc - 0.5) * %s + %s * vec2(sin(time * %s + hc.x * 6.2831853),"
                     " cos(time * %s + hc.y * 6.2831853));"
                     % (f(rng,1.2,2.4), f(rng,0.1,0.35), f(rng,0.8,3.0), f(rng,0.8,3.0)))
    if shape == "point":
        lines.append("\t\tfloat gd = length(p - q);")
    elif shape == "ring":
        lines.append("\t\tfloat gd = abs(length(p - q) - %s);" % f(rng,0.08,0.3))
    elif shape == "box":
        lines.append("\t\tvec2 bq = abs(p - q) - vec2(%s, %s);" % (f(rng,0.05,0.25), f(rng,0.05,0.25)))
        lines.append("\t\tfloat gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));")
    else:
        lines.append("\t\tvec2 q2 = -q;")
        lines.append("\t\tvec2 pa = p - q; vec2 ba = q2 - q;")
        lines.append("\t\tfloat hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);")
        lines.append("\t\tfloat gd = length(pa - ba * hh);")
    lines.append("\t\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * %s + time * %s))"
                 " * (%s / (gd + %s));"
                 % (f(rng,0.4,2.0), f(rng,0.2,1.5), f(rng,0.008,0.04,3), f(rng,0.01,0.05,3)))
    lines.append("\t}")
    lines.append("\tcol = col / (1.0 + col);")
    return finish(rng, helpers, "", lines, post_prob=0.35)

# --------------------------------------------------------------------------
# ARCHETYPE: tunnel
# --------------------------------------------------------------------------
def build_tunnel(rng):
    helpers = set()
    funcs, fh = make_field(rng, "field")
    helpers |= fh
    lines = [centered_coord()]
    if rng.random() < 0.5:
        lines.append("\tp += vec2(sin(time * %s), cos(time * %s)) * %s;"
                     % (f(rng,0.4,1.5), f(rng,0.4,1.5), f(rng,0.05,0.3)))
    rot = rng.choice(["", " + time * %s%s" % (sgn(rng), f(rng,0.1,0.8))])
    lines.append("\tfloat an = atan(p.y, p.x)%s;" % rot)
    lines.append("\tfloat r = length(p) + 0.0001;")
    lines.append("\tvec2 tv = vec2(an * %s / 3.1415927, %s / r %s time * %s);"
                 % (f(rng,1.0,4.0), f(rng,0.3,1.5), rng.choice(["+", "-"]), f(rng,0.5,3.0)))
    if rng.random() < 0.35:
        lines.append("\ttv.x += tv.y * %s;" % f(rng,0.1,0.5))
    lines.append("\tfloat d = field(tv, time, 0.0);")
    cl, chh = colorize(rng, "d")
    helpers |= chh
    lines.append(cl)
    lines.append("\tcol *= clamp(r * %s, 0.0, 1.0);" % f(rng,1.0,3.0))
    return finish(rng, helpers, funcs, lines)

# --------------------------------------------------------------------------
# ARCHETYPE: raymarch
# --------------------------------------------------------------------------
def rm_spheres(rng):
    rep = rng.uniform(1.6, 2.6)
    code = ("float map(vec3 q){\n"
            "\tq.z += time * %s;\n"
            "\tvec3 mq = mod(q, %.2f) - %.2f;\n"
            "\treturn length(mq) - %s;\n}\n"
            % (f(rng,0.6,2.5), rep, rep * 0.5, f(rng,0.25,0.5)))
    return code, set(), rep
def rm_boxes(rng):
    rep = rng.uniform(1.8, 2.8)
    code = ("float map(vec3 q){\n"
            "\tq.z += time * %s;\n"
            "\tvec3 mq = mod(q, %.2f) - %.2f;\n"
            "\tmq.xy = rot2(time * %s%s) * mq.xy;\n"
            "\tvec3 b = abs(mq) - vec3(%s);\n"
            "\treturn length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);\n}\n"
            % (f(rng,0.6,2.2), rep, rep * 0.5, sgn(rng), f(rng,0.5,2.0), f(rng,0.2,0.42)))
    return code, {"rot2"}, rep
def rm_gyroid(rng):
    fr = f(rng,1.5,4.0)
    code = ("float map(vec3 q){\n"
            "\tq.z += time * %s;\n"
            "\tfloat g = dot(sin(q * %s), cos(q.zxy * %s));\n"
            "\treturn (abs(g) - %s) / (%s * 2.5);\n}\n"
            % (f(rng,0.5,2.0), fr, fr, f(rng,0.2,0.8), fr))
    return code, set(), None
def rm_torus(rng):
    code = ("float map(vec3 q){\n"
            "\tq.xz = rot2(time * %s) * q.xz;\n"
            "\tq.xy = rot2(time * %s) * q.xy;\n"
            "\tvec2 w = vec2(length(q.xz) - %s, q.y);\n"
            "\treturn length(w) - %s;\n}\n"
            % (f(rng,0.4,1.6), f(rng,0.3,1.2), f(rng,0.8,1.4), f(rng,0.15,0.45)))
    return code, {"rot2"}, None

RM_MAPS = [rm_spheres, rm_boxes, rm_gyroid, rm_torus]

def build_raymarch(rng):
    helpers = set()
    funcs, mh, rep = rng.choice(RM_MAPS)(rng)
    helpers |= mh
    lines = [centered_coord()]
    if rep is not None:
        lines.append("\tvec3 ro = vec3(%.2f, %.2f, -3.0);" % (rep * 0.5, rep * 0.5))
    else:
        lines.append("\tvec3 ro = vec3(0.0, 0.0, -%s);" % f(rng,2.5,3.5))
    lines.append("\tvec3 rd = normalize(vec3(p, %s));" % f(rng,0.9,1.8))
    if rng.random() < 0.5:
        helpers.add("rot2")
        lines.append("\trd.xy = rot2(time * %s%s) * rd.xy;" % (sgn(rng), f(rng,0.05,0.4)))
    iters = rng.randint(48, 72)
    lines.append("\tfloat tt = 0.0; float it = 0.0;")
    lines.append("\tfor(int i = 0; i < %d; i++){" % iters)
    lines.append("\t\tvec3 pos = ro + rd * tt;")
    lines.append("\t\tfloat dm = map(pos);")
    lines.append("\t\tif(dm < 0.002 || tt > 14.0) break;")
    lines.append("\t\ttt += dm * %s;" % f(rng,0.6,0.9))
    lines.append("\t\tit += 1.0;")
    lines.append("\t}")
    lines.append("\tfloat fog = exp(-tt * %s);" % f(rng,0.15,0.45))
    if rng.random() < 0.6:
        helpers.add("palette")
        lines.append("\tvec3 col = palette(tt * %s + time * %s, %s) * fog;"
                     % (f(rng,0.1,0.4), f(rng,0.0,0.4), _pal(rng)))
    else:
        helpers.add("hue")
        lines.append("\tvec3 col = hue(tt * %s + time * %s) * fog;"
                     % (f(rng,0.08,0.3), f(rng,0.0,0.3)))
    lines.append("\tcol += vec3(%s, %s, %s) * (it / %d.0) * %s;"
                 % (f(rng,0.2,1.0), f(rng,0.2,1.0), f(rng,0.2,1.0), iters, f(rng,0.3,1.0)))
    return finish(rng, helpers, funcs, lines, post_prob=0.4)

# --------------------------------------------------------------------------
# ARCHETYPE: particles
# --------------------------------------------------------------------------
def build_particles(rng):
    helpers = {"hash21", "hash22"}
    layers = rng.randint(2, 4)
    style = rng.choice(["drift", "rain", "twinkle", "swirl"])
    lines = [base_coord(rng)]
    lines.append("\tvec3 col = vec3(%s, %s, %s);"
                 % (f(rng,0.0,0.05,3), f(rng,0.0,0.05,3), f(rng,0.0,0.08,3)))
    lines.append("\tfor(int pl = 0; pl < %d; pl++){" % layers)
    lines.append("\t\tfloat fl = float(pl) + 1.0;")
    if style == "drift":
        lines.append("\t\tvec2 q = p * (fl * %s + %s) + vec2(time * %s%s, time * %s%s) * fl + fl * 3.7;"
                     % (f(rng,0.8,2.0), f(rng,1.5,4.0), sgn(rng), f(rng,0.1,0.6),
                        sgn(rng), f(rng,0.1,0.6)))
    elif style == "rain":
        lines.append("\t\tvec2 q = p * (fl * %s + %s) + vec2(fl * 7.31, -time * %s * fl);"
                     % (f(rng,0.8,2.0), f(rng,2.0,5.0), f(rng,1.0,4.0)))
    elif style == "twinkle":
        lines.append("\t\tvec2 q = p * (fl * %s + %s) + fl * 7.31;"
                     % (f(rng,0.8,2.5), f(rng,2.0,6.0)))
    else:
        helpers.add("rot2")
        lines.append("\t\tvec2 q = rot2(time * %s%s * fl) * p * (fl * %s + %s) + fl * 3.7;"
                     % (sgn(rng), f(rng,0.05,0.3), f(rng,0.8,2.0), f(rng,1.5,4.0)))
    lines.append("\t\tvec2 id = floor(q); vec2 gv = fract(q) - 0.5;")
    lines.append("\t\tvec2 off = (hash22(id) - 0.5) * %s;" % f(rng,0.5,0.9))
    if style == "rain":
        lines.append("\t\tfloat pd = length((gv - off) * vec2(%s, 1.0));" % f(rng,4.0,9.0))
    else:
        lines.append("\t\tfloat pd = length(gv - off);")
    if style == "twinkle":
        lines.append("\t\tfloat tw = 0.5 + 0.5 * sin(time * %s + hash21(id) * 6.2831853);"
                     % f(rng,3.0,9.0))
    else:
        lines.append("\t\tfloat tw = %s + %s * sin(time * %s + hash21(id) * 6.2831853);"
                     % (f(rng,0.6,0.85), f(rng,0.15,0.4), f(rng,1.5,6.0)))
    lines.append("\t\tvec3 tint = mix(vec3(%s, %s, %s), vec3(%s, %s, %s), hash21(id + 7.0));"
                 % (f(rng,0.2,1.0), f(rng,0.2,1.0), f(rng,0.2,1.0),
                    f(rng,0.2,1.0), f(rng,0.2,1.0), f(rng,0.2,1.0)))
    lines.append("\t\tcol += tint * smoothstep(%s, 0.0, pd) * tw / fl;" % f(rng,0.05,0.18))
    lines.append("\t}")
    return finish(rng, helpers, "", lines, post_prob=0.4)

# --------------------------------------------------------------------------
# ARCHETYPE: cells
# --------------------------------------------------------------------------
def build_cells(rng):
    helpers = {"hash21"}
    motif = rng.choice(["arc", "stripe", "circle", "square", "diag"])
    lines = [base_coord(rng)]
    if rng.random() < 0.35:
        stmt, dh = dom_rotate(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append("\tvec2 gp = p * %s;" % f(rng,2.0,8.0))
    lines.append("\tvec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;")
    lines.append("\tfloat rnd = hash21(id);")
    if motif == "arc":
        lines.append("\tif(rnd < 0.5) gv.x = -gv.x;")
        lines.append("\tfloat ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));")
        lines.append("\tfloat v = sin(ad * %s - time * %s + rnd * 6.2831853);"
                     % (f(rng,12.0,30.0), f(rng,2.0,8.0)))
    elif motif == "stripe":
        helpers.add("rot2")
        lines.append("\tvec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * %s"
                     " * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;"
                     % f(rng,0.5,2.5))
        lines.append("\tfloat v = sin(sv.x * %s + rnd * 6.2831853 + time * %s);"
                     % (f(rng,8.0,24.0), f(rng,1.0,4.0)))
    elif motif == "circle":
        lines.append("\tfloat v = sin((length(gv) - %s - %s * sin(time * %s + rnd * 6.2831853)) * %s);"
                     % (f(rng,0.15,0.3), f(rng,0.08,0.2), f(rng,1.5,6.0), f(rng,10.0,26.0)))
    elif motif == "square":
        lines.append("\tfloat sq = max(abs(gv.x), abs(gv.y));")
        lines.append("\tfloat v = sin(sq * %s - time * %s + rnd * 6.2831853);"
                     % (f(rng,10.0,28.0), f(rng,2.0,8.0)))
    else:
        lines.append("\tif(rnd < 0.5) gv.x = -gv.x;")
        lines.append("\tfloat v = sin((gv.x + gv.y) * %s + rnd * 6.2831853 + time * %s);"
                     % (f(rng,8.0,24.0), f(rng,2.0,7.0)))
    cl, chh = colorize(rng, "v")
    helpers |= chh
    lines.append(cl)
    if rng.random() < 0.4:
        lines.append("\tcol *= %s + %s * hash21(id + 11.0);" % (f(rng,0.5,0.7), f(rng,0.3,0.5)))
    return finish(rng, helpers, "", lines)

# --------------------------------------------------------------------------
# ARCHETYPE: orbit trap fractal
# --------------------------------------------------------------------------
def build_orbit(rng):
    helpers = set()
    it = rng.randint(8, 24)
    variant = rng.choice(["julia", "ship"])
    trap = rng.choice(["length(z)", "abs(z.y)", "abs(z.x)",
                       "length(z - vec2(%s, %s))" % (f(rng,-0.5,0.5), f(rng,-0.5,0.5)),
                       "min(abs(z.x), abs(z.y))"])
    lines = [centered_coord()]
    lines.append("\tp *= %s;" % f(rng,1.0,2.2))
    if rng.random() < 0.4:
        stmt, dh = dom_rotate(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append("\tvec2 z = p;")
    lines.append("\tvec2 c = vec2(%s + %s * sin(time * %s), %s + %s * cos(time * %s));"
                 % (f(rng,-0.9,0.3), f(rng,0.05,0.3), f(rng,0.5,2.0),
                    f(rng,-0.6,0.6), f(rng,0.05,0.3), f(rng,0.4,1.6)))
    lines.append("\tfloat trap = 10.0;")
    lines.append("\tfor(int oi = 0; oi < %d; oi++){" % it)
    if variant == "ship":
        lines.append("\t\tz = abs(z);")
    lines.append("\t\tz = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;")
    lines.append("\t\ttrap = min(trap, %s);" % trap)
    lines.append("\t}")
    lines.append("\tfloat v = exp(-trap * %s);" % f(rng,1.5,6.0))
    cl, chh = colorize(rng, "v * %s" % f(rng,1.5,4.0))
    helpers |= chh
    lines.append(cl)
    return finish(rng, helpers, "", lines)

# --------------------------------------------------------------------------
BUILDERS = {
    "classic":   build_classic,
    "layer":     build_layer,
    "glow":      build_glow,
    "tunnel":    build_tunnel,
    "raymarch":  build_raymarch,
    "particles": build_particles,
    "cells":     build_cells,
    "orbit":     build_orbit,
}
COUNTS = [("classic", 2600), ("layer", 1700), ("glow", 1200), ("tunnel", 900),
          ("raymarch", 900), ("particles", 1000), ("cells", 1000), ("orbit", 700)]

def main():
    os.makedirs(DST, exist_ok=True)
    labels = []
    for name, cnt in COUNTS:
        labels += [name] * cnt
    random.Random(20260704).shuffle(labels)
    assert len(labels) == 10000
    for n, label in enumerate(labels):
        rng = random.Random(n * 2654435761 + 424242)
        text = BUILDERS[label](rng)
        with open(os.path.join(DST, "%05d.frag" % n), "w") as fh:
            fh.write(text)
    print("done: 00000.frag .. 09999.frag written to", DST)
    from collections import Counter
    print(Counter(labels))

if __name__ == "__main__":
    main()
