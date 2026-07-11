#!/usr/bin/env python3
"""Second-generation diverse shader synthesizer -> 10000fragments_newnew.

Builds on _synthesize_10k_new.py (imports its libraries) and adds:

NEW ARCHETYPES:
  waveline   : stacked oscilloscope / joy-division glow lines
  super      : morphing superformula shapes
  fzoom      : recursive zoom-rotate feedback stacks
  halftone   : halftone dot-screen shading of any field
  ripple     : raindrop wavefronts expanding on water
  trail      : comet trails along parametric curves
  facet      : voronoi stained-glass facets
  flowlines  : iteratively warped glowing web lines
  contour    : flowing topographic contour lines of animated noise
  plexus     : constellation network of glowing nodes and links

waveline and facet are thinned to 1/4 of their original counts; the freed
slots are converted in place to gridscape/plexus so every other file in the
set stays byte-identical across regenerations.

NEW FIELDS  : chladni plates, sierpinski xor, wood grain, zigzag chevrons,
              spiral galaxy, polka rows, reaction-diffusion spots,
              terraced rings, polygon rings, lightning bolt
NEW DOMAINS : conformal square, circle inversion, sine bend, zoom pulse,
              animated diagonal swap
NEW RM MAPS : KIFS fold fractal, wavy pillar grid

Output: 00000.frag .. 09999.frag in 10000fragments_newnew/
"""
import os, sys, random

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import _synthesize_10k_new as S

DST = "/Users/tado/Documents/Claude-tmp/1000fragments/10000fragments_newnew"
f, sgn = S.f, S.sgn

# --------------------------------------------------------------------------
# NEW FIELDS (appended to the shared library: classic/layer/tunnel/halftone
# all pick these up automatically)
# --------------------------------------------------------------------------
def fld_chladni(rng):
    return ("vec2 cp = p * %s;\n"
            "    v = 0.5 * (sin(%d.0 * cp.x + t * %s) * sin(%d.0 * cp.y + ph)\n"
            "             + sin(%d.0 * cp.x - t * %s) * sin(%d.0 * cp.y + ph));"
            % ((lambda a, b: (f(rng,1.0,4.0), a, f(rng,0.5,3.0), b, b, f(rng,0.5,3.0), a))
               (rng.randint(1,6), rng.randint(2,7))), set())
def fld_xorsier(rng):
    return ("float xv = 0.0; float xw = 0.5; vec2 xp = p * %s + vec2(t * %s, -t * %s);\n"
            "    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }\n"
            "    v = sin(xv * 6.2831853 + ph);"
            % (f(rng,1.0,4.0), f(rng,0.2,1.5), f(rng,0.2,1.5)), set())
def fld_wood(rng):
    return ("float wr = length(p) + %s * vnoise2(p * %s + t * %s);\n"
            "    v = sin(wr * %s - t * %s + ph);"
            % (f(rng,0.1,0.4), f(rng,2.0,6.0), f(rng,0.3,1.5), f(rng,10,30), f(rng,0.5,4)), {"noise2"})
def fld_zigzag(rng):
    return ("float zx = abs(fract(p.x * %s + t * %s) - 0.5) * 2.0;\n"
            "    v = sin((p.y * %s + zx * %s + t * %s) * 3.1415927 + ph);"
            % (f(rng,1.0,5.0), f(rng,0.2,1.5), f(rng,2.0,8.0), f(rng,0.5,2.0), f(rng,0.5,3.0)), set())
def fld_galaxy(rng):
    return ("float ga = atan(p.y, p.x); float gr = length(p) + 0.001;\n"
            "    float arm = sin(log(gr) * %s + ga * %d.0 - t * %s + ph);\n"
            "    v = arm * exp(-gr * %s);"
            % (f(rng,3.0,8.0), rng.randint(2,5), f(rng,0.5,3.0), f(rng,0.5,1.5)), set())
def fld_polka(rng):
    return ("vec2 pk = p * %s;\n"
            "    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;\n"
            "    vec2 pf = fract(pk) - 0.5;\n"
            "    float rad = %s + %s * sin(t * %s + floor(pk.y) * 1.7 + ph);\n"
            "    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;"
            % (f(rng,2.0,8.0), f(rng,0.2,0.35), f(rng,0.05,0.15), f(rng,1.0,5.0)), set())
def fld_rdspot(rng):
    return ("float rv = 0.0; float ra = 0.5; vec2 rq = p * %s;\n"
            "    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * %s); rq = rq * 2.1 + 3.7; ra *= 0.55; }\n"
            "    v = smoothstep(%s, %s, rv + %s * sin(t * %s + ph)) * 2.0 - 1.0;"
            % (f(rng,1.5,5.0), f(rng,0.2,1.2), f(rng,0.38,0.46), f(rng,0.5,0.6),
               f(rng,0.03,0.1), f(rng,0.5,3.0)), {"noise2"})
def fld_terrace(rng):
    return ("float lv = length(p) * %s - t * %s;\n"
            "    v = sin(floor(lv * %s) / %s * 6.2831853 + ph);"
            % ((lambda q: (f(rng,2.0,6.0), f(rng,0.3,2.0), q, q))(f(rng,2.0,6.0,1))), set())
def fld_polyrings(rng):
    n = rng.randint(3, 8)
    return ("float pa = atan(p.y, p.x) + t * %s;\n"
            "    float pk = 6.2831853 / %d.0;\n"
            "    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);\n"
            "    v = sin(pd * %s - t * %s + ph);"
            % (f(rng,0.1,0.8), n, f(rng,8,24), f(rng,1,6)), set())
def fld_bolt(rng):
    return ("float bx = p.x + (vnoise2(vec2(p.y * %s, t * %s)) - 0.5) * %s;\n"
            "    v = exp(-abs(bx) * %s) * 2.0 - 1.0 + 0.0 * ph;"
            % (f(rng,1.0,4.0), f(rng,0.5,3.0), f(rng,0.5,1.5), f(rng,4,12)), {"noise2"})

S.FIELDS += [fld_chladni, fld_xorsier, fld_wood, fld_zigzag, fld_galaxy,
             fld_polka, fld_rdspot, fld_terrace, fld_polyrings, fld_bolt]

# --------------------------------------------------------------------------
# NEW DOMAINS
# --------------------------------------------------------------------------
def dom_conform(rng, V):
    return ("\t%s = vec2(%s.x * %s.x - %s.y * %s.y, 2.0 * %s.x * %s.y) * %s;"
            % (V, V, V, V, V, V, V, f(rng,0.5,1.2)), set())
def dom_invert(rng, V):
    return ("\t{ float iv = dot(%s, %s) + 0.05; %s = %s / iv * %s; }"
            % (V, V, V, V, f(rng,0.3,1.0)), set())
def dom_sinbend(rng, V):
    return ("\t%s = sin(%s * %s + time * %s) * %s;"
            % (V, V, f(rng,1.0,3.0), f(rng,0.5,2.5), f(rng,0.6,1.5)), set())
def dom_zoompulse(rng, V):
    return ("\t%s *= 1.0 + %s * sin(time * %s);"
            % (V, f(rng,0.1,0.4), f(rng,1.0,5.0)), set())
def dom_diagswap(rng, V):
    return ("\t%s = mix(%s, %s.yx, 0.5 + 0.5 * sin(time * %s));"
            % (V, V, V, f(rng,0.5,2.5)), set())

S.DOMAINS += [dom_conform, dom_invert, dom_sinbend, dom_zoompulse, dom_diagswap]

# --------------------------------------------------------------------------
# NEW RAYMARCH MAPS
# --------------------------------------------------------------------------
def rm_kifs(rng):
    sc = f(rng,1.3,1.7)
    code = ("float map(vec3 q){\n"
            "\tfloat sc = 1.0;\n"
            "\tfor(int ki = 0; ki < 4; ki++){\n"
            "\t\tq = abs(q) - vec3(%s, %s, %s);\n"
            "\t\tq.xy = rot2(%s + time * %s) * q.xy;\n"
            "\t\tq.xz = rot2(%s) * q.xz;\n"
            "\t\tq *= %s; sc *= %s;\n"
            "\t}\n"
            "\tvec3 b = abs(q) - vec3(%s);\n"
            "\treturn (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;\n}\n"
            % (f(rng,0.3,0.8), f(rng,0.3,0.8), f(rng,0.3,0.8),
               f(rng,0.2,1.5), f(rng,0.1,0.5), f(rng,0.2,1.5), sc, sc, f(rng,0.3,0.6)))
    return code, {"rot2"}, None
def rm_tubes(rng):
    rep = rng.uniform(1.8, 2.6)
    code = ("float map(vec3 q){\n"
            "\tq.z += time * %s;\n"
            "\tvec2 g = mod(vec2(q.x, q.z), %.2f) - %.2f;\n"
            "\tfloat d = length(g) - (%s + %s * sin(q.y * %s + time * %s));\n"
            "\treturn d * 0.7;\n}\n"
            % (f(rng,0.6,2.2), rep, rep * 0.5, f(rng,0.15,0.32), f(rng,0.05,0.14),
               f(rng,1.0,4.0), f(rng,1.0,4.0)))
    return code, set(), rep

S.RM_MAPS += [rm_kifs, rm_tubes]

# --------------------------------------------------------------------------
# ARCHETYPE: waveline (stacked oscilloscope glow lines)
# --------------------------------------------------------------------------
def build_waveline(rng):
    helpers = set()
    m = rng.randint(8, 22)
    lines = [S.centered_coord()]
    if rng.random() < 0.3:
        stmt, dh = S.dom_rotate(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append("\tvec3 col = vec3(%s, %s, %s);"
                 % (f(rng,0.0,0.04,3), f(rng,0.0,0.04,3), f(rng,0.0,0.06,3)))
    lines.append("\tfor(int li = 0; li < %d; li++){" % m)
    lines.append("\t\tfloat fl = float(li);")
    lines.append("\t\tfloat fy = (fl / %d.0 - 0.5) * %s;" % (m, f(rng,1.4,2.2)))
    wv = rng.choice(["sine", "noise", "joy"])
    if wv == "sine":
        lines.append("\t\tfloat w = %s * sin(p.x * %s + time * %s + fl * %s);"
                     % (f(rng,0.05,0.18), f(rng,2.0,9.0), f(rng,1.0,5.0), f(rng,0.3,1.5)))
    elif wv == "noise":
        helpers.add("noise2")
        lines.append("\t\tfloat w = (vnoise2(vec2(p.x * %s + fl * 7.3, time * %s + fl)) - 0.5) * %s;"
                     % (f(rng,1.5,5.0), f(rng,0.5,2.5), f(rng,0.15,0.45)))
    else:
        lines.append("\t\tfloat w = %s * sin(p.x * %s + time * %s + fl * %s) * exp(-p.x * p.x * %s);"
                     % (f(rng,0.1,0.3), f(rng,3.0,10.0), f(rng,1.0,5.0), f(rng,0.4,1.6),
                        f(rng,1.0,4.0)))
    lines.append("\t\tfloat ld = abs(p.y - fy - w);")
    lines.append("\t\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * %s + time * %s))"
                 " * (%s / (ld + %s));"
                 % (f(rng,0.2,1.2), f(rng,0.2,1.2), f(rng,0.002,0.008,4), f(rng,0.004,0.015,4)))
    lines.append("\t}")
    lines.append("\tcol = col / (1.0 + col);")
    return S.finish(rng, helpers, "", lines, post_prob=0.35)

# --------------------------------------------------------------------------
# ARCHETYPE: super (morphing superformula shapes)
# --------------------------------------------------------------------------
def build_super(rng):
    helpers = set()
    lines = [S.centered_coord()]
    lines.append("\tp *= %s;" % f(rng,0.8,1.5))
    if rng.random() < 0.5:
        stmt, dh = S.dom_rotate(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append("\tfloat sa = atan(p.y, p.x);")
    lines.append("\tfloat sr = length(p);")
    lines.append("\tfloat m = %d.0;" % rng.randint(3, 9))
    lines.append("\tfloat n1 = %s + %s * sin(time * %s);"
                 % (f(rng,0.5,2.0), f(rng,0.1,0.8), f(rng,0.5,2.0)))
    lines.append("\tfloat n2 = %s + %s * cos(time * %s);"
                 % (f(rng,0.5,2.5), f(rng,0.2,1.0), f(rng,0.4,1.8)))
    lines.append("\tfloat t1 = pow(abs(cos(m * sa * 0.25)), n2);")
    lines.append("\tfloat t2 = pow(abs(sin(m * sa * 0.25)), n2);")
    lines.append("\tfloat rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * %s;" % f(rng,0.4,0.9))
    lines.append("\tfloat d = sr - rr;")
    style = rng.choice(["rings", "neon", "fill"])
    if style == "rings":
        lines.append("\tfloat v = sin(d * %s - time * %s);" % (f(rng,10,30), f(rng,1,6)))
        cl, chh = S.colorize(rng, "v")
    elif style == "neon":
        lines.append("\tfloat v = d;")
        cl, chh = S.colorize(rng, "v")
    else:
        lines.append("\tfloat v = 1.0 - smoothstep(0.0, %s, d);" % f(rng,0.02,0.15))
        cl, chh = S.colorize(rng, "v * %s + sr * %s" % (f(rng,1.0,2.5), f(rng,0.5,2.0)))
        lines.append("")
    helpers |= chh
    lines.append(cl)
    if style == "fill":
        lines.append("\tcol *= 1.0 - smoothstep(0.0, %s, d) * %s;"
                     % (f(rng,0.02,0.15), f(rng,0.6,0.95)))
    return S.finish(rng, helpers, "", lines)

# --------------------------------------------------------------------------
# ARCHETYPE: fzoom (recursive zoom-rotate feedback stack)
# --------------------------------------------------------------------------
def build_fzoom(rng):
    helpers = {"rot2"}
    steps = rng.randint(5, 8)
    lines = [S.base_coord(rng)]
    lines.append("\tvec3 col = vec3(0.0);")
    lines.append("\tfloat fw = 1.0;")
    lines.append("\tvec2 q = p;")
    lines.append("\tfor(int zi = 0; zi < %d; zi++){" % steps)
    pat = rng.choice(["rings", "grid", "spiral"])
    if pat == "rings":
        lines.append("\t\tfloat pv = sin(length(q) * %s - time * %s);"
                     % (f(rng,6,18), f(rng,1,6)))
    elif pat == "grid":
        lines.append("\t\tvec2 gq = q * %s;" % f(rng,3,10))
        lines.append("\t\tfloat pv = sin(gq.x + time * %s) * sin(gq.y - time * %s);"
                     % (f(rng,0.5,3), f(rng,0.5,3)))
    else:
        lines.append("\t\tfloat pv = sin(atan(q.y, q.x) * %d.0 + length(q) * %s - time * %s);"
                     % (rng.randint(3,9), f(rng,4,14), f(rng,1,5)))
    lines.append("\t\tcol += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188)"
                 " + pv * %s + float(zi) * %s + time * %s));"
                 % (f(rng,1.5,4.0), f(rng,0.3,1.5), f(rng,0.0,0.8)))
    zoom = rng.choice([f(rng,0.55,0.85), f(rng,1.2,1.8)])
    lines.append("\t\tq = rot2(%s) * q * %s + vec2(%s, %s);"
                 % (f(rng,0.3,1.2), zoom, f(rng,-0.3,0.3), f(rng,-0.3,0.3)))
    lines.append("\t\tfw *= %s;" % f(rng,0.55,0.75))
    lines.append("\t}")
    lines.append("\tcol *= %s;" % f(rng,0.3,0.45))
    return S.finish(rng, helpers, "", lines, post_prob=0.5)

# --------------------------------------------------------------------------
# ARCHETYPE: halftone (dot-screen shading of any field)
# --------------------------------------------------------------------------
def build_halftone(rng):
    funcs, fh = S.make_field(rng, "field")
    helpers = set(fh) | {"rot2"}
    lines = [S.base_coord(rng)]
    lines.append("\tfloat d = 0.5 + 0.5 * field(p, time, 0.0);")
    lines.append("\tvec2 hq = rot2(%s) * p * %s;" % (f(rng,0.2,1.3), f(rng,8,24)))
    lines.append("\tvec2 hf = fract(hq) - 0.5;")
    lines.append("\tfloat rad = clamp(d, 0.0, 1.0) * %s;" % f(rng,0.5,0.75))
    lines.append("\tfloat v = smoothstep(rad, rad - %s, length(hf));" % f(rng,0.08,0.2))
    if rng.random() < 0.55:
        a1, a2, a3 = f(rng,0.0,0.15), f(rng,0.0,0.15), f(rng,0.0,0.2)
        b1, b2, b3 = f(rng,0.7,1.0), f(rng,0.7,1.0), f(rng,0.6,1.0)
        if rng.random() < 0.5:
            a1, b1 = b1, a1; a2, b2 = b2, a2; a3, b3 = b3, a3
        lines.append("\tvec3 col = mix(vec3(%s, %s, %s), vec3(%s, %s, %s), v);"
                     % (a1, a2, a3, b1, b2, b3))
    else:
        helpers.add("palette")
        lines.append("\tvec3 col = palette(d * %s + time * %s, %s) * v;"
                     % (f(rng,0.5,1.5), f(rng,0.0,0.3), S._pal(rng)))
    return S.finish(rng, helpers, funcs, lines)

# --------------------------------------------------------------------------
# ARCHETYPE: ripple (raindrops spawning expanding wavefronts on water)
# --------------------------------------------------------------------------
def build_ripple(rng):
    helpers = {"hash21", "hash22"}
    n = rng.randint(6, 14)
    style = rng.choice(["glow", "wave"])
    rate = f(rng,0.25,0.9)
    spread = f(rng,1.6,2.8)
    maxr = f(rng,0.8,2.0)
    lines = [S.base_coord(rng)]
    if style == "glow":
        lines.append("\tvec3 col = vec3(%s, %s, %s);"
                     % (f(rng,0.0,0.05,3), f(rng,0.0,0.05,3), f(rng,0.0,0.08,3)))
        lines.append("\tfor(int ri = 0; ri < %d; ri++){" % n)
        lines.append("\t\tfloat fi = float(ri);")
        lines.append("\t\tfloat cyc = time * %s + hash21(vec2(fi, 1.7));" % rate)
        lines.append("\t\tfloat age = fract(cyc);")
        lines.append("\t\tvec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * %s;" % spread)
        lines.append("\t\tfloat dist = length(p - dp);")
        lines.append("\t\tfloat ring = exp(-abs(dist - age * %s) * %s) * (1.0 - age);"
                     % (maxr, f(rng,6.0,20.0)))
        lines.append("\t\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * %s + time * %s))"
                     " * ring * %s;"
                     % (f(rng,0.3,1.5), f(rng,0.1,0.8), f(rng,0.4,0.9)))
        lines.append("\t}")
        lines.append("\tcol = col / (1.0 + col);")
        return S.finish(rng, helpers, "", lines, post_prob=0.35)
    lines.append("\tfloat acc = 0.0;")
    lines.append("\tfor(int ri = 0; ri < %d; ri++){" % n)
    lines.append("\t\tfloat fi = float(ri);")
    lines.append("\t\tfloat cyc = time * %s + hash21(vec2(fi, 1.7));" % rate)
    lines.append("\t\tfloat age = fract(cyc);")
    lines.append("\t\tvec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * %s;" % spread)
    lines.append("\t\tfloat dist = length(p - dp);")
    lines.append("\t\tacc += sin((dist - age * %s) * %s) * (1.0 - age) * exp(-dist * %s);"
                 % (maxr, f(rng,8.0,24.0), f(rng,0.5,1.5)))
    lines.append("\t}")
    cl, chh = S.colorize(rng, "acc")
    helpers |= chh
    lines.append(cl)
    return S.finish(rng, helpers, "", lines)

# --------------------------------------------------------------------------
# ARCHETYPE: trail (comet trails along parametric curves)
# --------------------------------------------------------------------------
def build_trail(rng):
    helpers = set()
    tn = rng.randint(16, 30)
    lines = [S.centered_coord()]
    if rng.random() < 0.4:
        lines.append("\tp *= %s;" % f(rng,0.8,1.6))
    lines.append("\tvec3 col = vec3(%s, %s, %s);"
                 % (f(rng,0.0,0.04,3), f(rng,0.0,0.04,3), f(rng,0.0,0.06,3)))
    curve = rng.choice(["liss", "rose", "wobble"])
    lines.append("\tfor(int ci = 0; ci < %d; ci++){" % tn)
    lines.append("\t\tfloat ft = time * %s - float(ci) * %s;"
                 % (f(rng,0.6,2.2), f(rng,0.04,0.12)))
    if curve == "liss":
        lines.append("\t\tvec2 cp = vec2(sin(ft * %d.0 + %s), sin(ft * %d.0)) * %s;"
                     % (rng.randint(1,5), f(rng,0.0,3.0), rng.randint(1,5), f(rng,0.5,0.9)))
    elif curve == "rose":
        lines.append("\t\tvec2 cp = cos(ft * %d.0) * %s * vec2(cos(ft), sin(ft));"
                     % (rng.randint(2,6), f(rng,0.5,0.9)))
    else:
        lines.append("\t\tvec2 cp = vec2(cos(ft), sin(ft)) * (%s + %s * sin(ft * %d.0));"
                     % (f(rng,0.4,0.7), f(rng,0.1,0.3), rng.randint(3,8)))
    lines.append("\t\tfloat fade = 1.0 - float(ci) / %d.0;" % tn)
    lines.append("\t\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * %s))"
                 " * (%s / (length(p - cp) + %s)) * fade;"
                 % (f(rng,0.5,2.0), f(rng,0.004,0.012,4), f(rng,0.01,0.03,3)))
    lines.append("\t}")
    lines.append("\tcol = col / (1.0 + col);")
    return S.finish(rng, helpers, "", lines, post_prob=0.35)

# --------------------------------------------------------------------------
# ARCHETYPE: facet (voronoi stained glass)
# --------------------------------------------------------------------------
def build_facet(rng):
    helpers = {"hash21", "hash22", "palette"}
    lines = [S.base_coord(rng)]
    lines.append("\tvec2 vp = p * %s;" % f(rng,2.0,6.0))
    lines.append("\tvec2 vi = floor(vp); vec2 vf = fract(vp);")
    lines.append("\tfloat m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);")
    lines.append("\tfor(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){")
    lines.append("\t\tvec2 nb = vec2(float(vx), float(vy));")
    lines.append("\t\tvec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(time * %s + 6.2831853 * pt);"
                 % f(rng,0.5,3.0))
    lines.append("\t\tfloat dl = length(nb + pt - vf);")
    lines.append("\t\tif(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }")
    lines.append("\t}")
    lines.append("\tfloat edge = smoothstep(0.0, %s, m2 - m1);" % f(rng,0.05,0.15))
    lines.append("\tvec3 col = palette(hash21(mid) * %s + time * %s, %s)"
                 " * (%s + %s * sin(time * %s + hash21(mid + 5.0) * 6.2831853));"
                 % (f(rng,0.6,2.0), f(rng,0.0,0.3), S._pal(rng),
                    f(rng,0.6,0.8), f(rng,0.2,0.4), f(rng,1.0,5.0)))
    lines.append("\tcol *= edge;")
    return S.finish(rng, helpers, "", lines, post_prob=0.45)

# --------------------------------------------------------------------------
# ARCHETYPE: flowlines (iteratively warped glowing web)
# --------------------------------------------------------------------------
def build_flowlines(rng):
    helpers = set()
    steps = rng.randint(8, 16)
    lines = [S.base_coord(rng)]
    lines.append("\tvec3 col = vec3(0.0);")
    lines.append("\tvec2 q = p;")
    lines.append("\tfor(int si = 0; si < %d; si++){" % steps)
    lines.append("\t\tq += %s * vec2(sin(q.y * %s + time * %s), cos(q.x * %s - time * %s));"
                 % (f(rng,0.04,0.1), f(rng,1.5,4.0), f(rng,0.5,2.5),
                    f(rng,1.5,4.0), f(rng,0.5,2.5)))
    lines.append("\t\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + float(si) * %s + time * %s))"
                 " * (%s / (abs(sin(q.x * %s) + sin(q.y * %s)) + %s));"
                 % (f(rng,0.3,1.2), f(rng,0.2,1.0), f(rng,0.003,0.01,4),
                    f(rng,2.0,6.0), f(rng,2.0,6.0), f(rng,0.05,0.15)))
    lines.append("\t}")
    lines.append("\tcol = col / (1.0 + col);")
    return S.finish(rng, helpers, "", lines, post_prob=0.35)

# --------------------------------------------------------------------------
# ARCHETYPE: contour (flowing topographic contour lines of animated noise)
# --------------------------------------------------------------------------
def build_contour(rng):
    helpers = {"noise2"}
    oct_ = rng.randint(3, 5)
    nlev = f(rng,6.0,18.0,1)
    lines = [S.base_coord(rng)]
    if rng.random() < 0.3:
        d = rng.choice([S.dom_rotate, S.dom_swirl])
        stmt, dh = d(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append("\tfloat h = 0.0; float ha = 0.5; vec2 hq = p * %s;" % f(rng,1.5,4.0))
    lines.append("\tfor(int hi = 0; hi < %d; hi++){"
                 " h += ha * vnoise2(hq + vec2(time * %s%s, time * %s%s));"
                 " hq = hq * 2.03 + 1.7; ha *= 0.5; }"
                 % (oct_, sgn(rng), f(rng,0.1,0.5), sgn(rng), f(rng,0.1,0.5)))
    variant = rng.choice(["plain", "ridge", "warp"])
    if variant == "ridge":
        lines.append("\th = 1.0 - abs(h * 2.0 - 1.0);")
    elif variant == "warp":
        lines.append("\th += %s * sin(p.x * %s + time * %s) * sin(p.y * %s - time * %s);"
                     % (f(rng,0.1,0.3), f(rng,1.0,4.0), f(rng,0.5,2.0),
                        f(rng,1.0,4.0), f(rng,0.5,2.0)))
    rise = rng.choice(["", " + time * %s%s" % (sgn(rng), f(rng,0.05,0.25))])
    lines.append("\tfloat lv = (h%s) * %s;" % (rise, nlev))
    lines.append("\tfloat fc = fract(lv);")
    lines.append("\tfloat line = smoothstep(%s, 0.0, min(fc, 1.0 - fc));" % f(rng,0.06,0.15))
    style = rng.choice(["band", "neon", "shade"])
    if style == "band":
        helpers.add("palette")
        lines.append("\tvec3 col = palette(floor(lv) / %s + time * %s, %s) * (1.0 - line * %s);"
                     % (nlev, f(rng,0.0,0.3), S._pal(rng), f(rng,0.6,0.9)))
    elif style == "neon":
        lines.append("\tvec3 col = vec3(%s, %s, %s) * %s;"
                     % (f(rng,0.0,0.1,3), f(rng,0.0,0.1,3), f(rng,0.0,0.15,3), "(1.0 - line)"))
        lines.append("\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * %s + time * %s)) * line;"
                     % (f(rng,0.5,2.0), f(rng,0.2,1.2)))
    else:
        cl, chh = S.colorize(rng, "(h * 2.0 - 1.0)")
        helpers |= chh
        lines.append(cl)
        lines.append("\tcol *= 1.0 - line * %s;" % f(rng,0.5,0.9))
    return S.finish(rng, helpers, "", lines)

# --------------------------------------------------------------------------
# ARCHETYPE: plexus (constellation network of nodes and links)
# --------------------------------------------------------------------------
def build_plexus(rng):
    helpers = set()
    n = rng.randint(6, 10)
    link = f(rng,0.7,1.1)
    funcs = ("vec2 nodePos(float fi){\n"
             "    float h1 = fract(sin(fi * 12.9898) * 43758.5453);\n"
             "    float h2 = fract(sin(fi * 78.2330) * 43758.5453);\n"
             "    return vec2(sin(time * (%s + %s * h1) + fi * 2.39),"
             " cos(time * (%s + %s * h2) + fi * 1.73)) * %s;\n"
             "}\n" % (f(rng,0.3,0.8), f(rng,0.3,1.2), f(rng,0.3,0.8), f(rng,0.3,1.2),
                      f(rng,0.55,0.95)))
    lines = [S.centered_coord()]
    if rng.random() < 0.4:
        lines.append("\tp *= %s;" % f(rng,0.9,1.4))
    if rng.random() < 0.3:
        stmt, dh = S.dom_rotate(rng, "p")
        lines.append(stmt)
        helpers |= dh
    lines.append("\tvec3 col = vec3(%s, %s, %s);"
                 % (f(rng,0.0,0.04,3), f(rng,0.0,0.04,3), f(rng,0.0,0.07,3)))
    lines.append("\tfor(int i = 0; i < %d; i++){" % n)
    lines.append("\t\tfloat fi = float(i);")
    lines.append("\t\tvec2 na = nodePos(fi);")
    lines.append("\t\tcol += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * %s + time * %s))"
                 " * (%s / (length(p - na) + %s));"
                 % (f(rng,0.3,1.5), f(rng,0.1,0.9), f(rng,0.004,0.012,4), f(rng,0.01,0.03,3)))
    lines.append("\t\tfor(int j = i + 1; j < %d; j++){" % n)
    lines.append("\t\t\tvec2 nb = nodePos(float(j));")
    lines.append("\t\t\tfloat ll = length(na - nb);")
    lines.append("\t\t\tif(ll < %s){" % link)
    lines.append("\t\t\t\tvec2 pa = p - na; vec2 ba = nb - na;")
    lines.append("\t\t\t\tfloat hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);")
    lines.append("\t\t\t\tfloat sd = length(pa - ba * hh);")
    if rng.random() < 0.5:
        lc = "vec3(%s, %s, %s)" % (f(rng,0.2,1.0), f(rng,0.2,1.0), f(rng,0.2,1.0))
    else:
        lc = ("(0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ll * %s + time * %s))"
              % (f(rng,1.0,4.0), f(rng,0.2,1.0)))
    lines.append("\t\t\t\tcol += %s * (%s / (sd + %s)) * (1.0 - ll / %s);"
                 % (lc, f(rng,0.001,0.003,4), f(rng,0.008,0.02,3), link))
    lines.append("\t\t\t}")
    lines.append("\t\t}")
    lines.append("\t}")
    lines.append("\tcol = col / (1.0 + col);")
    return S.finish(rng, helpers, funcs, lines, post_prob=0.35)

# --------------------------------------------------------------------------
BUILDERS = dict(S.BUILDERS)
BUILDERS.update({
    "waveline":  build_waveline,
    "super":     build_super,
    "fzoom":     build_fzoom,
    "halftone":  build_halftone,
    "ripple":    build_ripple,
    "trail":     build_trail,
    "facet":     build_facet,
    "flowlines": build_flowlines,
    "contour":   build_contour,
    "plexus":    build_plexus,
})
# Original layout (before thinning) — do not reorder: the shuffle below must
# reproduce the historical label placement so untouched files stay identical.
BASE_COUNTS = [("classic", 1200), ("layer", 900), ("glow", 600), ("tunnel", 550),
               ("raymarch", 700), ("particles", 600), ("cells", 600), ("orbit", 450),
               ("waveline", 650), ("super", 550), ("fzoom", 650), ("halftone", 550),
               ("ripple", 500), ("trail", 550), ("facet", 550), ("flowlines", 400)]

def main():
    os.makedirs(DST, exist_ok=True)
    labels = []
    for name, cnt in BASE_COUNTS:
        labels += [name] * cnt
    assert len(labels) == 10000, len(labels)
    random.Random(77002026).shuffle(labels)
    # thin waveline/facet to 1/4: keep every 4th slot, convert the rest
    conv = []
    for tgt in ("waveline", "facet"):
        idxs = [i for i, lb in enumerate(labels) if lb == tgt]
        conv += [i for k, i in enumerate(idxs) if k % 4 != 0]
    conv.sort()
    for k, i in enumerate(conv):
        labels[i] = "contour" if k % 2 == 0 else "plexus"
    for n, label in enumerate(labels):
        rng = random.Random(n * 2654435761 + 777001)
        text = BUILDERS[label](rng)
        with open(os.path.join(DST, "%05d.frag" % n), "w") as fh:
            fh.write(text)
    print("done: 00000.frag .. 09999.frag written to", DST)
    from collections import Counter
    print(Counter(labels))

if __name__ == "__main__":
    main()
