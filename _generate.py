#!/usr/bin/env python3
"""Generate 1000fragments: TouchDesigner GLSL fragment-shader variations.

0000.frag .. 0100.frag  -> exact copies of 100fragments/00.frag .. 100.frag
0101.frag .. 1000.frag  -> parametric variations across the same technique
                            families found in the original 100 shaders.
"""
import os, shutil, random

SRC = os.path.join(os.path.dirname(__file__), "100fragments")
DST = os.path.dirname(__file__)

HEADER = "uniform float time;\nuniform vec2 resolution;\nout vec4 fragColor;\n\n"

# ---- small helpers for randomised constants -------------------------------
def f(rng, a, b, nd=2):
    return f"{rng.uniform(a, b):.{nd}f}"

def i(rng, a, b):
    return rng.randint(a, b)

def sgn(rng):
    return rng.choice(["", "-"])

def perm3(rng):
    c = ["r", "g", "b"]
    rng.shuffle(c)
    return c

# ---------------------------------------------------------------------------
# Each family() returns a complete shader body (header added later).
# All are derived directly from the originals to guarantee valid TD GLSL.
# ---------------------------------------------------------------------------

def fam_rings(rng):
    # from 01 / 02 : summed interference rings
    n = i(rng, 4, 8)
    base = rng.uniform(120, 320)
    spd = f(rng, 6, 16)
    off = f(rng, 0.2, 1.2)
    amp = f(rng, 0.2, 0.6)
    s = sgn(rng)
    return f"""void main() {{
\tfloat r = 0.0, g = 0.0, b = 0.0;
\tfor (float i = 1.0; i < {n}.0; i += 1.0) {{
\t\tvec2 m = vec2(sin(time * {f(rng,0.05,0.3)} + i * {f(rng,2.0,5.0)}) * {f(rng,0.2,0.5)} + {off}, (cos(time * {f(rng,0.1,0.3)} * i) * {f(rng,0.2,0.5)} + {off}) * (resolution.y / resolution.x));
\t\tvec2 p = gl_FragCoord.xy / resolution.yy;
\t\tr += sin(length(m - p) * {base:.1f} - time * {spd}) * {amp};
\t\tg += sin(length(m - p) * {base+rng.uniform(0.3,2.0):.1f} - time * {spd}) * {s}{amp};
\t\tb += sin(length(m - p) * {base+rng.uniform(1.0,3.0):.1f} - time * {spd}) * {amp};
\t}}
\tvec4 color = vec4(r, g, b, 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""

def fam_warp(rng):
    # from 05 / 25 : domain-warp plasma
    n = i(rng, 2, 10)
    sx = f(rng, 0.2, 0.4)
    sy = f(rng, 0.2, 0.4)
    fx = f(rng, 1.5, 4.5)
    fy = f(rng, 2.0, 4.5)
    scale = f(rng, 0.5, 3.0)
    m = f(rng, 3.0, 14.0)
    c = perm3(rng)
    return f"""void main() {{
\tvec2 p = gl_FragCoord.xy / resolution.xy * {scale};
\tfor (float i = 1.0; i < {n}.0; i += 1.0) {{
\t\tp.x += {sx} / i * sin(i * {fx} * p.y + time * {f(rng,0.8,2.0)} + cos((time / (100. * i)) * i));
\t\tp.y += {sy} / i * cos(i * {fy} * p.x + time * {f(rng,0.8,2.0)} + sin((time / (200. * i)) * i));
\t}}
\tfloat {c[0]} = mod(cos(p.x + p.y + 2.) * {m}, 1.0);
\tfloat {c[1]} = mod(sin(p.x + p.y + 1.) * {f(rng,3.0,14.0)}, 1.0);
\tfloat {c[2]} = mod((sin(p.x + p.y + 1.) + cos(p.x + p.y + 1.)) * {f(rng,2.0,7.0)}, 1.0);
\tvec4 color = vec4(r, g, b, 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""

NOISE2D = """float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x), mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x), u.y);
}
mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}
float lines(in vec2 pos, float b) {
    float scale = SCALE;
    pos *= scale;
    return smoothstep(0.0, .5 + b * .5, abs((sin(pos.x * 3.1415) + b * 2.0)) * .5);
}
"""

def fam_lines(rng):
    # from 10 / 15 : noise-rotated lines, mono or rgb
    helpers = NOISE2D.replace("SCALE", f(rng, 6.0, 14.0))
    ax = f(rng, 2.0, 10.0)
    ay = f(rng, 2.0, 4.0)
    swiz = rng.choice(["st.xy", "st.yx"])
    spd = f(rng, 0.5, 1.5)
    if rng.random() < 0.5:
        body = f"""void main() {{
\tvec2 st = gl_FragCoord.xy / resolution.xy;
\tst.x *= resolution.x / resolution.y;
\tvec2 pos = {swiz} * vec2({ax}, {ay});
\tpos = rotate2d(noise(pos + time * {spd})) * pos;
\tfloat pattern = lines(pos, {f(rng,0.2,0.7)});
\tvec4 color = vec4(vec3(pattern), 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""
    else:
        body = f"""void main() {{
\tvec2 st = gl_FragCoord.xy / resolution.xy;
\tst.x *= resolution.x / resolution.y;
\tvec2 pos = {swiz} * vec2({ax}, {ay});
\tpos = rotate2d(noise(pos + time * {spd})) * pos;
\tfloat p1 = lines(pos, {f(rng,0.2,0.6)});
\tvec2 pos2 = {swiz} * vec2({ax}, {ay});
\tpos2 = rotate2d(noise(pos2 + time + 500.0)) * pos2;
\tfloat p2 = lines(pos2, {f(rng,0.2,0.5)});
\tvec2 pos3 = {swiz} * vec2({ax}, {ay});
\tpos3 = rotate2d(noise(pos3 + time + 1000.0)) * pos3;
\tfloat p3 = lines(pos3, {f(rng,0.2,0.5)});
\tvec4 color = vec4(vec3(p1, p2, p3), 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""
    return helpers + "\n" + body

def fam_radial(rng):
    # from 30 : radial rings
    freq = f(rng, 40.0, 160.0)
    spd = f(rng, 20.0, 100.0)
    return f"""void main() {{
\tvec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / vec2(resolution.x, resolution.x);
\tfloat len = length(uv);
\tfloat r = sin(len * {freq} - time * {spd});
\tfloat g = sin(len * {freq} - time * {spd} - {f(rng,0.5,1.5)});
\tfloat b = sin(len * {freq} - time * {spd} - {f(rng,1.5,2.5)});
\tvec4 color = vec4(r, g, b, 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""

def fam_circles(rng):
    # from 35 / 40 : pulsing smoothstep circles
    nb = i(rng, 1, 3)
    rad = f(rng, 0.1, 0.25)
    cols = (f(rng,0.3,2.0), f(rng,0.3,1.0), f(rng,0.2,1.0))
    centers = []
    for k in range(nb):
        cx = f(rng, 0.2, 0.8)
        centers.append(cx)
    lines_code = ""
    for k, cx in enumerate(centers):
        lines_code += (f"\tvec2 uv{k} = vec2({cx}, 0.5 * (resolution.y / resolution.x)) - gl_FragCoord.xy / resolution.x;\n"
                       f"\tt += smoothstep(radius + border, radius - border, sqrt(dot(uv{k}, uv{k})));\n")
    return f"""void main(void) {{
\tfloat radius = cos(time * {f(rng,4.0,12.0)}) * 0.1 + {rad};
\tfloat border = sin(time * {f(rng,4.0,12.0)}) * 0.2 + 0.05;
\tfloat t = 0.0;
{lines_code}\tfragColor = TDOutputSwizzle(vec4(t * {cols[0]}, t * {cols[1]}, t * {cols[2]}, 1.0));
}}
"""

NOISE3D = """vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
float noise(vec3 p) {
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
"""

def fam_noise3d(rng):
    # from 45 : scrolling 3D noise
    px = f(rng, 6.0, 24.0)
    py = f(rng, 0.4, 3.0)
    spd = f(rng, 10.0, 60.0)
    br = f(rng, 1.0, 2.0)
    return NOISE3D + f"""
void main(void) {{
\tvec2 st = gl_FragCoord.xy / resolution.xy;
\tvec2 pos = st * vec2({px}, {py});
\tfloat speed = {spd};
\tfloat brightness = {br};
\tfloat r = noise(vec3(pos.x, pos.y, time * speed)) * brightness;
\tfloat g = noise(vec3(pos.x, pos.y + {f(rng,0.1,0.4)}, time * speed + 200.0)) * brightness;
\tfloat b = noise(vec3(pos.x, pos.y + {f(rng,0.3,0.6)}, time * speed + 800.0)) * brightness;
\tvec4 color = vec4(vec3(r, g, b), 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""

def fam_bands(rng):
    # from 50 / 70 : moving color bands via mod / floor
    freq = f(rng, 8.0, 60.0)
    use_floor = rng.random() < 0.5
    axis = lambda: rng.choice(["st.x", "st.y"])
    trig = lambda: rng.choice(["sin", "cos"])
    if use_floor:
        add = (f(rng,0.0,0.5), f(rng,0.0,1.0), f(rng,0.5,2.0))
        return f"""void main(void) {{
\tvec2 st = gl_FragCoord.xy / resolution.xy;
\tfloat r = floor({trig()}({axis()} * {freq} + time * {sgn(rng)}{f(rng,30.0,90.0)}) * 1.0 + 0.25);
\tfloat g = floor({trig()}({axis()} * {freq} + time * {sgn(rng)}{f(rng,30.0,90.0)}) * 1.0 + 0.25);
\tfloat b = floor({trig()}({axis()} * {freq} + time * {sgn(rng)}{f(rng,30.0,90.0)}) * 1.0 + 0.25);
\tvec3 col = vec3(r, g, b) + vec3({add[0]}, {add[1]}, {add[2]});
\tfragColor = TDOutputSwizzle(vec4(col, 1.0));
}}
"""
    else:
        return f"""void main(void) {{
\tvec2 st = gl_FragCoord.xy / resolution.xy;
\tfloat r = mod({trig()}({axis()} * {freq} + time * {sgn(rng)}{f(rng,60.0,130.0)}) * 1.0, {f(rng,1.0,1.9)});
\tfloat g = mod({trig()}({axis()} * {freq} + time * {sgn(rng)}{f(rng,60.0,130.0)}) * 1.0, {f(rng,1.0,1.5)});
\tfloat b = mod({trig()}({axis()} * {freq} + time * {sgn(rng)}{f(rng,60.0,130.0)}) * 1.0, {f(rng,1.0,1.5)});
\tvec4 color = vec4(r, g, b, 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""

def fam_sqrtsin(rng):
    # from 55 : sqrt(sin()) modulated fields
    base = rng.uniform(18.0, 30.0)
    spd = rng.uniform(80.0, 120.0)
    return f"""void main() {{
\tvec2 uv = gl_FragCoord.xy / resolution.xy;
\tvec3 col;
\tcol.r = sqrt(sin(uv.x * {base:.1f} + time * {spd:.1f} + cos(uv.y * {f(rng,1.5,3.0)} + time * {f(rng,3.0,8.0)}) * {f(rng,3.0,6.0)}));
\tcol.g = sqrt(sin(uv.x * {base+1.0:.1f} + time * {-spd:.1f} + sin(uv.y * {f(rng,1.5,3.0)} + time * {f(rng,3.0,8.0)}) * {f(rng,3.0,6.0)}));
\tcol.b = sqrt(sin(uv.x * {base+2.0:.1f} + time * {spd+2.0:.1f} + cos(uv.y * {f(rng,1.5,3.0)} + time * {f(rng,3.0,8.0)}) * {f(rng,3.0,7.0)}));
\tfragColor = TDOutputSwizzle(vec4(col, 1.0));
}}
"""

ROT = """vec2 rotate(vec2 matrix, float angle) {
    return vec2(matrix.x * cos(radians(angle)), matrix.x * sin(radians(angle))) + vec2(matrix.y * -sin(radians(angle)), matrix.y * cos(radians(angle)));
}
"""

def fam_rotfield(rng):
    # from 60 / 65 : per-channel rotated trig fields
    return ROT + f"""
void main(void) {{
\tvec2 st = gl_FragCoord.xy / resolution.xy;
\tvec2 uv = -1. + 2. * st;
\tvec2 rr = rotate(uv, time * {sgn(rng)}{f(rng,15.0,45.0)});
\tvec2 rg = rotate(uv, time * {sgn(rng)}{f(rng,15.0,45.0)});
\tvec2 rb = rotate(uv, time * {sgn(rng)}{f(rng,15.0,45.0)});
\tfloat r = mod(sin(rr.x * {f(rng,8.0,16.0)} + cos(rr.y + time) * {f(rng,2.0,6.0)}), 1.0);
\tfloat g = mod(sin(rg.x * {f(rng,8.0,16.0)} + sin(rg.y + time) * {f(rng,2.0,6.0)}), 1.0);
\tfloat b = mod(sin(rb.y * {f(rng,8.0,16.0)} + sin(rb.x + time) * {f(rng,2.0,6.0)}), 1.0);
\tfragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}}
"""

def fam_metaballs(rng):
    # from 75 / 17 : summed inverse-distance metaballs
    n = i(rng, 20, 70)
    return f"""void main(void) {{
\tvec2 m;
\tvec3 t = vec3(0.0);
\tfor (float i = 0.0; i < {n}.0; i += 1.0) {{
\t\tm = vec2(sin(time * sin(i + 3.0) * {f(rng,2.0,5.0)}) * 1.0, cos(time * cos(i + 3.0) * {f(rng,2.0,5.0)}) * 1.0);
\t\tvec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
\t\tt += vec3(sin(i * {f(rng,1.0,3.0)}) / length(m - pos)) * vec3({f(rng,0.3,1.0)}, {f(rng,0.3,1.0)}, {f(rng,0.3,1.0)});
\t}}
\tvec4 color = vec4(t * {f(rng,0.01,0.05,3)}, 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""

def fam_blocks(rng):
    # from 80 : random value blocks
    g = f(rng, 12.0, 60.0)
    tinted = rng.random() < 0.5
    col = "vec3(random(ipos + floor(time * %s)))" % f(rng,1.0,6.0)
    if tinted:
        col = "vec3(random(ipos + floor(time * %s))) * vec3(%s, %s, %s)" % (
            f(rng,1.0,6.0), f(rng,0.4,1.5), f(rng,0.4,1.5), f(rng,0.4,1.5))
    return """float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 st = vec2(gl_FragCoord.x / resolution.x, gl_FragCoord.y / resolution.x);
    st *= %s;
    vec2 ipos = floor(st);
    vec3 col = %s;
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
""" % (g, col)

def fam_grid(rng):
    # from 85 : perspective checker grid
    fov = f(rng, 0.3, 0.8)
    sc = f(rng, 0.05, 0.2)
    cell = f(rng, 0.06, 0.14)
    half = f"{float(cell)/2.0:.3f}"
    return f"""void main(void) {{
\tvec2 pos = (gl_FragCoord.xy / resolution.xy) - vec2(0.5, 0.5);
\tfloat fov = {fov};
\tfloat scaling = {sc};
\tvec3 p = vec3(pos.x, fov, pos.y);
\tvec2 sr = vec2(p.x / p.z, p.y / p.z) * scaling + time * {sgn(rng)}{f(rng,0.3,0.8)};
\tvec2 sg = vec2(p.x / p.z, p.y / p.z) * scaling * {f(rng,1.1,1.4)} + time * {sgn(rng)}{f(rng,0.3,0.8)};
\tvec2 sb = vec2(p.x / p.z, p.y / p.z) * scaling * {f(rng,1.3,1.7)} + time * {sgn(rng)}{f(rng,0.3,0.8)};
\tvec3 color;
\tcolor.r = sign((mod(sr.x, {cell}) - {half}) * (mod(sr.y, {cell}) - {half}));
\tcolor.g = sign((mod(sg.x, {cell}) - {half}) * (mod(sg.y, {cell}) - {half}));
\tcolor.b = sign((mod(sb.x, {cell}) - {half}) * (mod(sb.y, {cell}) - {half}));
\tfragColor = TDOutputSwizzle(vec4(color, 1.0));
}}
"""

def fam_tunnel(rng):
    # from 90 : layered tunnel
    spd = f(rng, 0.6, 1.6)
    md = f(rng, 1.0, 2.0)
    return f"""void main(void) {{
\tvec3 c = vec3(0.0);
\tfloat l, z = time * {spd};
\tfor (int i = 0; i < 3; i++) {{
\t\tvec2 uv, p = gl_FragCoord.xy / resolution;
\t\tuv = p;
\t\tp -= .5;
\t\tp.x *= resolution.x / resolution.y;
\t\tz += {f(rng,0.04,0.12)};
\t\tl = length(p);
\t\tuv += p / l * (sin(z) + {f(rng,10.0,40.0)}) * abs(sin(l * {f(rng,0.8,2.0)} - z * {f(rng,1.0,2.0)}));
\t\tc[i] = {f(rng,0.04,0.12,3)} / length(abs(mod(uv, {md}) - .5));
\t}}
\tvec4 color = vec4(c / l, 1.0);
\tfragColor = TDOutputSwizzle(color);
}}
"""

def fam_concentric(rng):
    # from 95 : breathing concentric distance
    sc = f(rng, 0.8, 1.5)
    md = f(rng, 1.5, 3.0)
    return f"""void main() {{
\tvec2 st = gl_FragCoord.xy / resolution.xy;
\tst = st * 1. - 0.5;
\tst.y *= resolution.y / resolution.x;
\tvec3 col = vec3(0.0);
\tcol.r = length(abs(st) - sin(time * {f(rng,0.8,1.4)}) * {f(rng,1.0,1.5)});
\tcol.g = length(abs(st) - sin(time * {f(rng,0.8,1.4)}) * {f(rng,1.0,1.5)});
\tcol.b = length(abs(st) - sin(time * {f(rng,0.8,1.4)}) * {f(rng,1.0,1.5)});
\tcol = mod(col * {sc}, {md});
\tfragColor = TDOutputSwizzle(vec4(col, 1.0));
}}
"""

def fam_voronoi(rng):
    # from 99 / 100 : animated Voronoi
    sc = f(rng, 4.0, 12.0)
    spd = f(rng, 2.0, 8.0)
    jit = f(rng, 8.0, 80.0)
    edge = f(rng, 0.02, 0.06)
    tint = (f(rng,0.0,2.0), f(rng,0.0,2.0), f(rng,0.0,4.0))
    return """vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    vec3 color = vec3(.0);
    st *= %s;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    float m_dist = 1.;
    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5 * sin(time * %s + %s * point);
            vec2 diff = neighbor + point - f_st;
            m_dist = min(m_dist, length(diff));
        }
    }
    color += m_dist;
    color += 1.0 - step(%s, m_dist) * vec3(%s, %s, %s);
    color += mod(m_dist * 3.0, 0.5);
    fragColor = TDOutputSwizzle(vec4(color, 1.0));
}
""" % (sc, spd, jit, edge, tint[0], tint[1], tint[2])

def fam_fractalwarp(rng):
    # from 20 : iterative additive warp stripes
    n = i(rng, 6, 16)
    tint = (f(rng,0.1,1.5), f(rng,0.3,1.5), f(rng,0.3,1.8))
    return f"""void main(void) {{
\tvec2 st = gl_FragCoord.xy / resolution.xy;
\tst -= 0.5;
\tvec3 color = vec3(0.0);
\tfor (float i = 0.0; i < {n}.0; i++) {{
\t\tst.x += sin(st.y * {f(rng,2.0,6.0)} + time * {f(rng,1.0,3.0)} + i * {f(rng,20.0,50.0)}) * 0.2 * cos(time + (i + 2.0) * {f(rng,100.0,400.0)});
\t\tcolor += (1.0 - vec3(pow(abs(st.x), 0.03)));
\t}}
\tcolor = vec3(color.r * {tint[0]}, color.g * {tint[1]}, color.b * {tint[2]});
\tfragColor = TDOutputSwizzle(vec4(color, 1.0));
}}
"""

FAMILIES = [
    fam_rings, fam_warp, fam_lines, fam_radial, fam_circles, fam_noise3d,
    fam_bands, fam_sqrtsin, fam_rotfield, fam_metaballs, fam_blocks,
    fam_grid, fam_tunnel, fam_concentric, fam_voronoi, fam_fractalwarp,
]

# ---- 1) copy originals 0000..0100 -----------------------------------------
for n in range(0, 101):
    src = os.path.join(SRC, f"{n:02d}.frag")
    dst = os.path.join(DST, f"{n:04d}.frag")
    shutil.copyfile(src, dst)

# ---- 2) generate variations 0101..1000 -----------------------------------
for n in range(101, 1001):
    rng = random.Random(n * 7919 + 17)          # deterministic per file
    fam = FAMILIES[(n - 101) % len(FAMILIES)]    # even spread across families
    body = fam(rng)
    text = HEADER + body
    with open(os.path.join(DST, f"{n:04d}.frag"), "w") as fh:
        fh.write(text)

print("done: wrote 0000.frag .. 1000.frag")
