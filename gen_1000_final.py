#!/usr/bin/env python3
"""
1000 GLSL Fragment Shader Generator for 1000fragments-claude
Generates 0000.frag through 0999.frag
25 categories x 40 variations = 1000 shaders
TouchDesigner compatible format
"""
import os
import math

OUTPUT_DIR = "C:/Users/tadok/Documents/GitHub/1000fragments/1000fragments-claude"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def ff(v):
    """Format float for GLSL."""
    return f"{v:.4f}"

def write_shader(idx, code):
    path = os.path.join(OUTPUT_DIR, f"{idx:04d}.frag")
    with open(path, "w") as f:
        f.write(code)

HEADER = "uniform float time;\nuniform vec2 resolution;\nout vec4 fragColor;\n\n"

NOISE_FUNC = """float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i = floor(st); vec2 f = fract(st);
    float a = random(i), b = random(i + vec2(1,0)), c = random(i + vec2(0,1)), d = random(i + vec2(1,1));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
"""

FBM_FUNC = NOISE_FUNC + """float fbm(vec2 st, int oct) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 8; i++) { if (i >= oct) break; v += a * noise(st); st *= 2.0; a *= 0.5; }
    return v;
}
"""

HSB_FUNC = """vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
"""

RANDOM2_FUNC = """vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)))) * 43758.5453);
}
"""

def col(mode, v):
    """Return GLSL vec3 color from value v (string expression)."""
    m = mode % 10
    if m == 0: return f"vec3({v})"
    elif m == 1: return f"vec3({v}, {v}*0.5, 0.15)"
    elif m == 2: return f"vec3(0.1, {v}*0.6, {v})"
    elif m == 3: return f"vec3(abs(sin({v}*3.14159)), abs(sin({v}*3.14159+2.094)), abs(sin({v}*3.14159+4.189)))"
    elif m == 4: return f"vec3({v}*2.5, {v}*0.4, {v}*3.0)"
    elif m == 5: return f"vec3(1.0-{v}*0.9, {v}*0.2, {v})"
    elif m == 6: return f"vec3({v}*1.8, {v}*0.7, 0.1)"
    elif m == 7: return f"vec3(0.05, {v}*1.5, {v}*0.3)"
    elif m == 8: return f"vec3({v}*0.3, {v}*1.2, {v}*0.8)"
    elif m == 9: return f"vec3({v}, {v}*0.1, 1.0-{v})"

# ============================================================
# CAT 0 (0000-0039): PULSING CIRCLES
# ============================================================
def cat0(vi):
    num = (vi % 5) + 1
    freq = 6.0 + vi * 0.8
    speed = 2.5 + (vi % 8) * 1.8
    cmode = vi % 10

    pos_list = []
    for i in range(num):
        if num == 1:
            px, py = 0.5, 0.5
        else:
            angle = 2.0 * math.pi * i / num + vi * 0.15
            r = 0.25 + (vi % 4) * 0.05
            px = 0.5 + r * math.cos(angle)
            py = 0.5 + r * math.sin(angle)
        pos_list.append((px, py))

    circle_code = "\n".join(
        f"    val += sin(length(st - vec2({ff(px)},{ff(py)}))*{ff(freq)} - time*{ff(speed+i*0.5)} + {ff(i*1.047)});"
        for i,(px,py) in enumerate(pos_list)
    )

    color_expr = col(cmode, "v")

    return f"""{HEADER}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
{circle_code}
    val /= {ff(float(num))};
    float v = val * 0.5 + 0.5;
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 1 (0040-0079): FBM NOISE
# ============================================================
def cat1(vi):
    oct = 2 + (vi % 6)
    sx = 1.8 + vi * 0.08
    sy = 1.8 + (39-vi) * 0.08
    spx = 0.04 + (vi % 7) * 0.03
    spy = 0.04 + ((vi+3) % 7) * 0.03
    mult = 6.0 + (vi % 5) * 3.0
    cmode = vi % 10
    color_expr = col(cmode, "c")

    modtype = vi % 5
    if modtype == 0:
        comp = f"float c = fbm(st*{ff(sx)} + vec2(time*{ff(spx)}, time*{ff(spy)}), {oct});"
    elif modtype == 1:
        comp = f"float c = mod(fbm(st*{ff(sx)} + vec2(time*{ff(spx)}, time*{ff(spy)}), {oct})*{ff(mult)}, 1.0);"
    elif modtype == 2:
        comp = f"float c = abs(fbm(st*{ff(sx)} + vec2(time*{ff(spx)}, time*{ff(spy)}), {oct})*2.0-1.0);"
    elif modtype == 3:
        comp = f"float c = sin(fbm(st*{ff(sx)} + vec2(time*{ff(spx)}, time*{ff(spy)}), {oct})*{ff(mult)})*0.5+0.5;"
    else:
        comp = f"float c = step(0.5, fbm(st*{ff(sx)} + vec2(time*{ff(spx)}, time*{ff(spy)}), {oct}));"

    return f"""{HEADER}{FBM_FUNC}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    {comp}
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 2 (0080-0119): ROTATING LINES
# ============================================================
def cat2(vi):
    num = (vi % 6) + 1
    rot_speed = 0.3 + vi * 0.15
    lw = 0.002 + (vi % 8) * 0.003
    cmode = vi % 10

    lines_code = []
    for i in range(num):
        phase = i * math.pi / num
        spd = rot_speed * (1.0 + i * 0.2)
        lines_code.append(
            f"    ang = atan(uv.y, uv.x) + time*{ff(spd)} + {ff(phase)};"
            f" v += smoothstep({ff(lw)}, 0.0, abs(sin(ang*{1+i})));"
        )

    color_expr = col(cmode, "clamp(v,0.0,1.0)")

    return f"""{HEADER}void main() {{
    vec2 uv = (gl_FragCoord.xy - resolution.xy * 0.5) / min(resolution.x, resolution.y);
    float ang, v = 0.0;
{''.join(lines_code)}
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 3 (0120-0159): WAVE DISTORTION
# ============================================================
def cat3(vi):
    fx = 4.0 + (vi % 8) * 1.5
    fy = 4.0 + ((vi+3) % 8) * 1.5
    ax = 0.05 + (vi % 6) * 0.04
    ay = 0.05 + ((vi+2) % 6) * 0.04
    speed = 1.5 + (vi % 5) * 0.8
    cmode = vi % 10
    layers = (vi % 3) + 1

    warp_code = []
    for l in range(layers):
        ph = l * 1.57
        warp_code.append(
            f"    st.x += sin(st.y*{ff(fy+l*2)} + time*{ff(speed+l*0.3)} + {ff(ph)}) * {ff(ax)};"
            f" st.y += cos(st.x*{ff(fx+l*2)} + time*{ff(speed*1.1+l*0.2)}) * {ff(ay)};"
        )

    color_expr = col(cmode, "v")

    return f"""{HEADER}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
{''.join(warp_code)}
    float v = abs(sin(st.x*{ff(fx)} + st.y*{ff(fy)} + time*{ff(speed)}));
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 4 (0160-0199): RADIAL WAVES
# ============================================================
def cat4(vi):
    freq = 8.0 + vi * 0.7
    speed = 3.0 + (vi % 8) * 1.5
    rgb_split = 0.05 + (vi % 6) * 0.08
    cmode = vi % 5

    if cmode == 0:
        color = f"vec3(sin(d*{ff(freq)}-time*{ff(speed)})*0.5+0.5)"
    elif cmode == 1:
        color = (f"vec3(sin(d*{ff(freq)}-time*{ff(speed)})*0.5+0.5,"
                 f"sin(d*{ff(freq+rgb_split*freq)}-time*{ff(speed*1.1)})*0.5+0.5,"
                 f"sin(d*{ff(freq+rgb_split*freq*2)}-time*{ff(speed*1.2)})*0.5+0.5)")
    elif cmode == 2:
        color = f"vec3(mod(d*{ff(freq)}-time*{ff(speed)}, 1.0))"
    elif cmode == 3:
        color = f"vec3(abs(sin(d*{ff(freq)}-time*{ff(speed)})), abs(cos(d*{ff(freq*1.3)}-time*{ff(speed*0.7)})), 0.5)"
    else:
        color = f"hsb2rgb(vec3(d*{ff(freq*0.1)}-time*{ff(speed*0.05)}, 1.0, abs(sin(d*{ff(freq)}-time*{ff(speed)}))))"

    uses_hsb = (cmode == 4)
    hsb_inc = HSB_FUNC if uses_hsb else ""

    return f"""{HEADER}{hsb_inc}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st -= 0.5;
    st.x *= resolution.x / resolution.y;
    float d = length(st);
    vec3 rgb = {color};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 5 (0200-0239): HSB COLOR WHEEL
# ============================================================
def cat5(vi):
    hue_speed = 0.05 + (vi % 8) * 0.15
    sat = 0.7 + (vi % 5) * 0.15
    bri = 0.8 + (vi % 4) * 0.1
    pattern = vi % 6

    if pattern == 0:
        hue = f"(angle / 6.28318) + mod(time*{ff(hue_speed)}, 1.0)"
        rad_expr = "radius"
    elif pattern == 1:
        hue = f"(angle / 6.28318) + mod(time*{ff(hue_speed)}, 1.0)"
        rad_expr = f"sin(radius*{ff(8+vi%5)} - time*{ff(hue_speed*3)})*0.5+0.5"
    elif pattern == 2:
        hue = f"mod((angle / 6.28318)*{2+vi%4} + mod(time*{ff(hue_speed)}, 1.0), 1.0)"
        rad_expr = "radius"
    elif pattern == 3:
        hue = f"(angle / 6.28318) + radius*{ff(0.3+vi%3*0.2)} + mod(time*{ff(hue_speed)}, 1.0)"
        rad_expr = "radius"
    elif pattern == 4:
        hue = f"mod(radius*{ff(3+vi%4)} + mod(time*{ff(hue_speed*2)}, 1.0), 1.0)"
        rad_expr = "1.0 - radius"
    else:
        hue = f"(angle / 6.28318) + mod(time*{ff(hue_speed)}, 1.0)"
        rad_expr = f"mod(radius*{ff(5+vi%4)}, 1.0)"

    return f"""{HEADER}{HSB_FUNC}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    vec2 toCenter = vec2(0.5) - st;
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter) * 2.0;
    vec3 rgb = hsb2rgb(vec3({hue}, {ff(sat)}, {ff(bri)} * {rad_expr}));
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 6 (0240-0279): SCAN LINES
# ============================================================
def cat6(vi):
    num = 2 + (vi % 7)
    speed = 1.5 + vi * 0.4
    cmode = vi % 10
    direction = vi % 4

    if direction == 0:  # horizontal
        coord = "st.y"
        scan = f"abs(sin({coord}*{ff(float(num)*3.14159)} + time*{ff(speed)}))"
    elif direction == 1:  # vertical
        coord = "st.x"
        scan = f"abs(sin({coord}*{ff(float(num)*3.14159)} + time*{ff(speed)}))"
    elif direction == 2:  # diagonal
        scan = f"abs(sin((st.x+st.y)*{ff(float(num)*2.22)} + time*{ff(speed)}))"
    else:  # crossing
        scan = f"abs(sin(st.x*{ff(float(num)*3.0)} + time*{ff(speed)}))*abs(sin(st.y*{ff(float(num)*3.0)} - time*{ff(speed*0.7)}))"

    color_expr = col(cmode, "v")

    return f"""{HEADER}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = {scan};
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 7 (0280-0319): MOVING POINTS / PARTICLE GLOW
# ============================================================
def cat7(vi):
    num = 3 + (vi % 8)
    speed = 0.8 + (vi % 6) * 0.4
    amp = 0.3 + (vi % 5) * 0.12
    glow = 0.02 + (vi % 6) * 0.008
    cmode = vi % 10

    pt_code = []
    for i in range(num):
        freq_x = 0.8 + i * 0.3
        freq_y = 0.7 + i * 0.25
        phase = i * 0.628
        pt_code.append(
            f"    pos = vec2(sin(time*{ff(speed*freq_x)}+{ff(phase)})*{ff(amp)}, "
            f"cos(time*{ff(speed*freq_y)})*{ff(amp+i*0.02)});"
            f" t += {ff(glow)} / length(pos - uv);"
        )

    if cmode % 3 == 0:
        color_expr = f"1.0 - mod(vec3(t)*vec3(0.2,0.2,0.2)*0.2, 1.0)"
    elif cmode % 3 == 1:
        color_expr = f"vec3(t*0.08, t*0.03, t*0.12)"
    else:
        color_expr = f"vec3(abs(sin(t*0.3)), abs(sin(t*0.2+1.0)), abs(sin(t*0.25+2.0)))"

    return f"""{HEADER}void main() {{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 pos;
    float t = 0.0;
{''.join(pt_code)}
    vec3 rgb = clamp({color_expr}, 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 8 (0320-0359): GRID MODULO
# ============================================================
def cat8(vi):
    gsize = 2.0 + (vi % 8) * 2.5
    rspeed_r = 5.0 + vi * 0.8
    rspeed_g = 1.5 + vi * 0.4
    rspeed_b = -8.0 - vi * 0.6
    div = 1.0 + (vi % 4) * 0.5

    return f"""{HEADER}vec2 rot2d(vec2 v, float a) {{
    return vec2(v.x*cos(a)-v.y*sin(a), v.x*sin(a)+v.y*cos(a));
}}
void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;
    float d = {ff(div)};
    float spd = {ff(1.0 / div)};
    vec2 rr = rot2d(uv, radians(time*{ff(rspeed_r)}));
    vec2 rg = rot2d(uv, radians(time*{ff(rspeed_g)}));
    vec2 rb = rot2d(uv, radians(time*{ff(rspeed_b)}));
    float r = mod(rr.x + mod(time/d*spd, 1.0), 1.0/d)*d;
    float g = mod(rg.y + mod(time/d*spd, 1.0), 1.0/d)*d;
    float b = mod(rb.x - mod(time/d*spd, 1.0), 1.0/d)*d;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}}"""

# ============================================================
# CAT 9 (0360-0399): TUNNEL / PERSPECTIVE EFFECT
# ============================================================
def cat9(vi):
    fov = 0.3 + (vi % 7) * 0.1
    sc = 0.05 + (vi % 6) * 0.04
    spd = 0.2 + (vi % 8) * 0.15
    grid = 0.05 + (vi % 5) * 0.03
    cmode = vi % 6

    if cmode == 0:
        color_expr = "vec3(col)"
    elif cmode == 1:
        color_expr = "vec3(col, col*0.5, col*2.0)"
    elif cmode == 2:
        color_expr = "vec3(col*2.0, col, col*0.5)"
    elif cmode == 3:
        color_expr = "vec3(abs(sin(col*3.14)), abs(cos(col*3.14)), col)"
    elif cmode == 4:
        color_expr = "vec3(col*0.3, col*1.5, col*0.8)"
    else:
        color_expr = "vec3(1.0-col, col*0.8, col*col)"

    return f"""{HEADER}void main() {{
    vec2 pos = (gl_FragCoord.xy / resolution.xy) - 0.5;
    vec3 p = vec3(pos.x, {ff(fov)}, pos.y);
    vec2 s = vec2(p.x/p.z, p.y/p.z) * {ff(sc)} + time * {ff(spd)};
    float col = sign((mod(s.x, {ff(grid)}) - {ff(grid*0.5)}) * (mod(s.y, {ff(grid)}) - {ff(grid*0.5)}));
    col *= p.z * p.z * {ff(15.0 + vi * 0.5)};
    col = clamp(col, 0.0, 1.0);
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 10 (0400-0439): VORONOI / CELLULAR
# ============================================================
def cat10(vi):
    scale = 2.5 + (vi % 7) * 0.8
    speed = 4.0 + vi * 0.5
    edge = 0.02 + (vi % 6) * 0.02
    cmode = vi % 5

    if cmode == 0:
        color = "vec3(m_dist)"
    elif cmode == 1:
        color = f"vec3(m_dist) + (1.0 - step({ff(edge)}, m_dist)) * vec3(0.0, 1.0, 4.0) * 0.5"
    elif cmode == 2:
        color = f"vec3(m_dist, m_dist*0.5, 1.0-m_dist)"
    elif cmode == 3:
        color = f"vec3(abs(sin(m_dist*{ff(8+vi%4)}))*2.0, abs(cos(m_dist*{ff(6+vi%3)}))*1.5, m_dist)"
    else:
        color = f"vec3(1.0-m_dist) * (1.0-step({ff(edge)}, m_dist))"

    return f"""{HEADER}{RANDOM2_FUNC}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    st *= {ff(scale)};
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    float m_dist = 1.0;
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {{
        vec2 nb = vec2(float(x), float(y));
        vec2 pt = random2(i_st + nb);
        pt = 0.5 + 0.5 * sin(time * {ff(speed * 0.1)} + 6.28318 * pt);
        float dist = length(nb + pt - f_st);
        m_dist = min(m_dist, dist);
    }}
    vec3 rgb = clamp({color}, 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 11 (0440-0479): ANIMATED RECTANGLES
# ============================================================
def cat11(vi):
    num = 1 + (vi % 5)
    speed = 2.0 + vi * 0.5
    scale = 0.5 + (vi % 6) * 0.15
    cmode = vi % 10

    rect_code = []
    for i in range(num):
        s = scale - i * 0.08
        rect_code.append(
            f"    sz = {ff(s)} + sin(time*{ff(speed+i*0.3)}+{ff(i*0.5)})*{ff(0.1+i*0.04)};"
            f" v += step(-sz, uv.x)*step(-sz, uv.y)*step(uv.x, sz)*step(uv.y, sz);"
        )

    color_expr = col(cmode, "mod(v*0.4, 1.0)")

    return f"""{HEADER}void main() {{
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0, sz;
{''.join(rect_code)}
    v = mod(v, 2.0) < 1.0 ? v : 2.0 - v;
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 12 (0480-0519): NOISE GRID (blocky flickering)
# ============================================================
def cat12(vi):
    cell = 4.0 + (vi % 8) * 4.0
    speed = 0.5 + vi * 0.3
    cmode = vi % 10
    threshold = 0.3 + (vi % 7) * 0.1

    color_expr = col(cmode, "v")

    return f"""{HEADER}{NOISE_FUNC}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    vec2 cell = floor(st * {ff(cell)}) / {ff(cell)};
    float v = random(cell + floor(time * {ff(speed)}) / {ff(speed)});
    v = smoothstep({ff(threshold-0.1)}, {ff(threshold+0.1)}, v);
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 13 (0520-0559): HIGH FREQUENCY SINE
# ============================================================
def cat13(vi):
    fx = 10.0 + vi * 1.2
    fy = 10.0 + (39-vi) * 1.0
    spd_x = 20.0 + (vi % 8) * 10.0
    spd_y = 15.0 + (vi % 6) * 8.0
    spd_z = 12.0 + (vi % 5) * 7.0
    mult = 1.0 + (vi % 4) * 0.5

    return f"""{HEADER}void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col;
    col.r = sin(uv.x*{ff(fx)} + time*{ff(spd_x)} + cos(uv.y*{ff(fy*0.7)}+time*{ff(spd_y*0.4)})*0.5);
    col.g = sin(uv.x*{ff(fx*0.9)} - time*{ff(spd_x*0.8)} + cos(uv.y*{ff(fy*0.9)}+time*{ff(spd_y*0.5)})*0.75);
    col.b = sin(uv.x*{ff(fx*0.8)} + time*{ff(spd_z)} + cos(uv.y*{ff(fy*1.1)}+time*{ff(spd_y*0.6)}));
    vec4 color = vec4(col * {ff(mult)}, 1.0);
    fragColor = TDOutputSwizzle(color);
}}"""

# ============================================================
# CAT 14 (0560-0599): PLASMA WAVES
# ============================================================
def cat14(vi):
    f1 = 2.0 + (vi % 6) * 0.8
    f2 = 3.0 + (vi % 5) * 0.7
    f3 = 1.5 + (vi % 4) * 0.9
    spd = 1.0 + (vi % 7) * 0.3
    pal = vi % 5

    if pal == 0:
        c_expr = "vec3(abs(sin(v*3.14159)), abs(sin(v*3.14159+2.094)), abs(sin(v*3.14159+4.189)))"
    elif pal == 1:
        c_expr = "vec3(v*1.5, v*0.5, 1.0-v*0.8)"
    elif pal == 2:
        c_expr = "hsb2rgb(vec3(v, 0.9, 1.0))"
    elif pal == 3:
        c_expr = "vec3(sin(v*6.28)*0.5+0.5, cos(v*6.28*1.3)*0.5+0.5, sin(v*6.28*0.7+2.0)*0.5+0.5)"
    else:
        c_expr = "vec3(v*v*2.0, v*1.2, (1.0-v)*1.5)"

    uses_hsb = (pal == 2)
    hsb_inc = HSB_FUNC if uses_hsb else ""

    return f"""{HEADER}{hsb_inc}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float t = time * {ff(spd)};
    float v = sin(st.x * {ff(f1*10)} + t);
    v += sin(st.y * {ff(f2*10)} + t * 1.3);
    v += sin((st.x + st.y) * {ff(f3*7)} + t * 0.7);
    v += sin(length(st - 0.5) * {ff(f1*15)} - t * 2.0);
    v = v * 0.25 + 0.5;
    vec3 rgb = clamp({c_expr}, 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 15 (0600-0639): LISSAJOUS CURVES
# ============================================================
def cat15(vi):
    fx = 1.0 + (vi % 8)
    fy = 1.0 + ((vi + 2) % 8)
    phase = (vi % 6) * 0.523
    thick = 0.003 + (vi % 5) * 0.003
    num = 1 + (vi % 4)
    cmode = vi % 10

    curve_code = []
    for i in range(num):
        ph = phase + i * 0.785
        spd = 0.5 + i * 0.2
        curve_code.append(
            f"    cx = sin(time*{ff(spd)}*{ff(fx)}+{ff(ph)}); cy = cos(time*{ff(spd)}*{ff(fy)});"
            f" d = min(d, length(uv - vec2(cx,cy)*{ff(0.7-i*0.1)}));"
        )

    color_expr = col(cmode, f"smoothstep({ff(thick)}, 0.0, d)")

    return f"""{HEADER}void main() {{
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float cx, cy, d = 10.0;
{''.join(curve_code)}
    float v = smoothstep({ff(thick)}, 0.0, d);
    vec3 rgb = {col(cmode, "v")};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 16 (0640-0679): JULIA SET APPROXIMATION
# ============================================================
def cat16(vi):
    # Animate parameter c along a circle in complex plane
    cr = 0.3 + (vi % 5) * 0.1
    cr_speed = 0.2 + (vi % 6) * 0.05
    ci_speed = 0.15 + (vi % 4) * 0.05
    zoom = 1.5 + (vi % 6) * 0.3
    iterations = 20 + (vi % 5) * 4
    cmode = vi % 6

    if cmode == 0:
        col_expr = "vec3(float(iter)/float(MAX_ITER))"
    elif cmode == 1:
        col_expr = "vec3(sin(float(iter)*0.2)*0.5+0.5, cos(float(iter)*0.15)*0.5+0.5, sin(float(iter)*0.1+1.0)*0.5+0.5)"
    elif cmode == 2:
        col_expr = "hsb2rgb(vec3(float(iter)/float(MAX_ITER), 0.8, float(iter)/float(MAX_ITER)))"
    elif cmode == 3:
        col_expr = "vec3(float(iter)/float(MAX_ITER), 0.0, 1.0-float(iter)/float(MAX_ITER))"
    elif cmode == 4:
        col_expr = "vec3(pow(float(iter)/float(MAX_ITER), 0.5))"
    else:
        col_expr = "vec3(float(iter)/float(MAX_ITER)*2.0, float(iter)/float(MAX_ITER)*0.5, float(iter)/float(MAX_ITER)*3.0)"

    uses_hsb = (cmode == 2)
    hsb_inc = HSB_FUNC if uses_hsb else ""

    return f"""{HEADER}{hsb_inc}#define MAX_ITER {iterations}
void main() {{
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    uv *= {ff(zoom)};
    float cr_val = {ff(cr)} * cos(time * {ff(cr_speed)});
    float ci_val = {ff(cr)} * sin(time * {ff(ci_speed)});
    vec2 z = uv;
    int iter = 0;
    for (int i = 0; i < MAX_ITER; i++) {{
        if (dot(z, z) > 4.0) break;
        z = vec2(z.x*z.x - z.y*z.y + cr_val, 2.0*z.x*z.y + ci_val);
        iter++;
    }}
    vec3 rgb = {col_expr};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 17 (0680-0719): KALEIDOSCOPE
# ============================================================
def cat17(vi):
    segs = 3 + (vi % 8)
    speed = 0.3 + vi * 0.05
    base = vi % 4  # 0=fbm, 1=sin, 2=voronoi-like, 3=rings
    cmode = vi % 10

    fold_code = f"""    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    float seg = 6.28318 / {ff(float(segs))};
    angle = mod(angle + time * {ff(speed)}, seg);
    if (angle > seg * 0.5) angle = seg - angle;
    uv = vec2(cos(angle), sin(angle)) * radius;"""

    if base == 0:
        pattern = f"""    float v = fbm(uv * 2.5 + vec2(time * 0.1), 4);"""
        funcs = FBM_FUNC
    elif base == 1:
        pattern = f"""    float v = sin(uv.x*8.0+time)*sin(uv.y*8.0+time)*0.5+0.5;"""
        funcs = ""
    elif base == 2:
        pattern = f"""    float v = sin(length(uv)*{ff(6+vi%5)}-time*2.0)*0.5+0.5;"""
        funcs = ""
    else:
        pattern = f"""    float v = noise(uv*{ff(3+vi%4)}+time*0.2);"""
        funcs = NOISE_FUNC

    color_expr = col(cmode, "v")

    return f"""{HEADER}{funcs}void main() {{
{fold_code}
{pattern}
    vec3 rgb = clamp({color_expr}, 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 18 (0720-0759): STARFIELD
# ============================================================
def cat18(vi):
    num_layers = 2 + (vi % 4)
    speed = 0.3 + (vi % 6) * 0.15
    star_size = 0.002 + (vi % 5) * 0.002
    cmode = vi % 6

    layer_code = []
    for l in range(num_layers):
        z_spd = speed * (l + 1) * 0.5
        cell_sz = 20.0 + l * 15.0
        layer_code.append(f"""    {{
        vec2 lv = fract(uv * {ff(cell_sz + vi * 0.3)} + vec2(0.0, time * {ff(z_spd)})) - 0.5;
        float star = {ff(star_size * (l+1))} / length(lv);
        stars += star * {ff(0.5 + l * 0.3)};
    }}""")

    if cmode == 0:
        color = "vec3(stars)"
    elif cmode == 1:
        color = "vec3(stars, stars*0.7, stars*0.3)"
    elif cmode == 2:
        color = "vec3(stars*0.3, stars*0.7, stars)"
    elif cmode == 3:
        color = "vec3(stars*1.5, stars*0.5, stars*2.0)"
    elif cmode == 4:
        color = "hsb2rgb(vec3(stars*0.3, 0.7, stars))"
    else:
        color = "vec3(stars*0.4, stars*1.2, stars*0.6)"

    uses_hsb = (cmode == 4)
    hsb_inc = HSB_FUNC if uses_hsb else ""

    return f"""{HEADER}{hsb_inc}void main() {{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float stars = 0.0;
{''.join(layer_code)}
    stars = clamp(stars, 0.0, 1.0);
    vec3 rgb = clamp({color}, 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 19 (0760-0799): INTERFERENCE PATTERNS
# ============================================================
def cat19(vi):
    num_src = 2 + (vi % 5)
    freq = 8.0 + vi * 0.5
    speed = 1.0 + (vi % 7) * 0.4
    cmode = vi % 10

    src_code = []
    for i in range(num_src):
        angle = 2.0 * math.pi * i / num_src
        r = 0.3 + (i % 3) * 0.1
        sx = 0.5 + r * math.cos(angle + vi * 0.1)
        sy = 0.5 + r * math.sin(angle + vi * 0.1)
        src_code.append(
            f"    v += sin(length(st - vec2({ff(sx)},{ff(sy)})) * {ff(freq+i)} - time*{ff(speed+i*0.2)});"
        )

    color_expr = col(cmode, f"float(n) / {ff(float(num_src))}")

    return f"""{HEADER}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
{''.join(src_code)}
    float n = v / {ff(float(num_src))};
    n = n * 0.5 + 0.5;
    vec3 rgb = {col(cmode, "n")};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 20 (0800-0839): SPIRAL PATTERNS
# ============================================================
def cat20(vi):
    arms = 1 + (vi % 7)
    tightness = 3.0 + vi * 0.4
    speed = 0.3 + (vi % 6) * 0.2
    width = 0.05 + (vi % 5) * 0.04
    cmode = vi % 10

    color_expr = col(cmode, "v")

    return f"""{HEADER}void main() {{
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float radius = length(uv);
    float angle = atan(uv.y, uv.x) + time * {ff(speed)};
    float spiral = mod(angle * {ff(float(arms))} / 6.28318 + radius * {ff(tightness)}, 1.0);
    float v = smoothstep({ff(width)}, 0.0, abs(spiral - 0.5) - {ff(width*0.3)});
    v *= smoothstep(1.0, 0.5, radius);
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 21 (0840-0879): MOIRE PATTERNS
# ============================================================
def cat21(vi):
    freq1 = 10.0 + vi * 0.5
    freq2 = 10.5 + vi * 0.5
    angle = vi * 0.08
    speed = 0.5 + (vi % 6) * 0.2
    cmode = vi % 10

    color_expr = col(cmode, "v")

    return f"""{HEADER}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float a = {ff(angle)};
    vec2 s1 = st * {ff(freq1)};
    vec2 s2 = vec2(st.x*cos(a)-st.y*sin(a), st.x*sin(a)+st.y*cos(a)) * {ff(freq2)};
    float g1 = sin(s1.x + time * {ff(speed)}) * sin(s1.y + time * {ff(speed * 0.7)});
    float g2 = sin(s2.x - time * {ff(speed * 0.9)}) * sin(s2.y - time * {ff(speed * 0.8)});
    float v = (g1 + g2) * 0.5 + 0.5;
    vec3 rgb = {color_expr};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

# ============================================================
# CAT 22 (0880-0919): MANDALA / GEOMETRIC SYMMETRY
# ============================================================
def cat22(vi):
    sym = 3 + (vi % 8)  # symmetry count
    layers = 1 + (vi % 4)
    speed = 0.2 + (vi % 6) * 0.1
    cmode = vi % 10
    pattern = vi % 5

    layer_code = []
    for l in range(layers):
        seg = f"6.28318 / {ff(float(sym * (l+1)))}"
        layer_code.append(f"""    {{
        float seg{l} = {seg};
        float a{l} = mod(atan(uv.y, uv.x) + time * {ff(speed * (l+1))}, seg{l});
        if (a{l} > seg{l} * 0.5) a{l} = seg{l} - a{l};
        float r{l} = length(uv);
        vec2 p{l} = vec2(cos(a{l}), sin(a{l})) * r{l};
        v += {["sin(length(p"+str(l)+")*8.0)*0.5+0.5", "mod(length(p"+str(l)+")*6.0, 1.0)", "step(0.5, sin(p"+str(l)+".x*8.0)*sin(p"+str(l)+".y*8.0)*0.5+0.5)", "noise(p"+str(l)+"*4.0)", "abs(sin(p"+str(l)+".x*10.0+p"+str(l)+".y*8.0))"][pattern]};
    }}""")

    uses_noise = (pattern == 3)
    noise_inc = NOISE_FUNC if uses_noise else ""

    color_expr = col(cmode, f"clamp(v/{ff(float(layers))}, 0.0, 1.0)")

    return f"""{HEADER}{noise_inc}void main() {{
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
{''.join(layer_code)}
    vec3 rgb = clamp({color_expr}, 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 23 (0920-0959): GLITCH ART
# ============================================================
def cat23(vi):
    glitch_freq = 5.0 + vi * 0.8
    block_sz = 8.0 + (vi % 6) * 8.0
    speed = 2.0 + (vi % 7) * 1.0
    cmode = vi % 6

    if cmode == 0:
        color = "vec3(v, v*0.8, v*1.2)"
    elif cmode == 1:
        color = "vec3(v*1.5, v*0.3, v)"
    elif cmode == 2:
        color = "vec3(v, v*1.5, v*0.3)"
    elif cmode == 3:
        color = "vec3(fract(v*3.0), fract(v*5.0+0.3), fract(v*7.0+0.6))"
    elif cmode == 4:
        color = "vec3(step(0.5,v)*1.5, step(0.4,v*1.1), step(0.6,v)*2.0)"
    else:
        color = "hsb2rgb(vec3(v, 1.0, 1.0))"

    uses_hsb = (cmode == 5)
    hsb_inc = HSB_FUNC if uses_hsb else ""

    return f"""{HEADER}{hsb_inc}{NOISE_FUNC}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float t = floor(time * {ff(speed)}) / {ff(speed)};
    vec2 block = floor(st * {ff(block_sz)}) / {ff(block_sz)};
    float offset = random(block + t) * 0.3;
    float v = random(vec2(st.x + offset, block.y + t));
    v = v * 0.8 + sin(st.x * {ff(glitch_freq)} + t * 10.0) * 0.1 + 0.1;
    vec3 rgb = clamp({color}, 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

# ============================================================
# CAT 24 (0960-0999): HYBRID COMBINATIONS
# ============================================================
def cat24(vi):
    """Mix two techniques per shader."""
    combo = vi % 10
    speed = 0.5 + (vi % 6) * 0.3
    cmode = vi % 10

    if combo == 0:
        # FBM + Circles
        freq = 6.0 + vi * 0.5
        return f"""{HEADER}{FBM_FUNC}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float n = fbm(st * 2.5 + vec2(time * 0.1), 4);
    vec2 warped = st + n * 0.3;
    float d = length(warped - 0.5);
    float v = sin(d * {ff(freq)} - time * {ff(speed * 4)}) * 0.5 + 0.5;
    v = mix(v, n, 0.4);
    vec3 rgb = {col(cmode, "v")};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}}"""

    elif combo == 1:
        # Voronoi + Radial
        scale = 3.0 + vi * 0.2
        freq2 = 5.0 + vi * 0.3
        return f"""{HEADER}{RANDOM2_FUNC}void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    vec2 is = floor(st * {ff(scale)}); vec2 fs = fract(st * {ff(scale)});
    float m = 1.0;
    for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){{
        vec2 nb=vec2(x,y); vec2 pt=random2(is+nb);
        pt=0.5+0.5*sin(time*{ff(speed)}+6.28318*pt);
        m=min(m,length(nb+pt-fs));
    }}
    float d = length(st - 0.5);
    float v = m * 0.6 + sin(d * {ff(freq2)} - time * 3.0) * 0.2 + 0.2;
    vec3 rgb = {col(cmode, "clamp(v,0.0,1.0)")};
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}}"""

    elif combo == 2:
        # Julia + Plasma
        cr = 0.25 + (vi % 5) * 0.08
        return f"""{HEADER}void main() {{
    vec2 uv = (gl_FragCoord.xy/resolution.xy)*2.0-1.0;
    uv.x *= resolution.x/resolution.y;
    float plasma = sin(uv.x*8.0+time)*cos(uv.y*6.0+time*0.7)*0.5+0.5;
    vec2 z = uv * 1.5;
    float cr_v = {ff(cr)}*cos(time*0.2), ci_v = {ff(cr)}*sin(time*0.15);
    int iter=0;
    for(int i=0;i<25;i++){{if(dot(z,z)>4.0)break;z=vec2(z.x*z.x-z.y*z.y+cr_v,2.0*z.x*z.y+ci_v);iter++;}}
    float jv = float(iter)/25.0;
    float v = mix(plasma, jv, 0.5);
    vec3 rgb = vec3(abs(sin(v*3.14)),abs(sin(v*3.14+2.094)),abs(sin(v*3.14+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

    elif combo == 3:
        # Kaleidoscope + Noise
        segs = 4 + (vi % 6)
        return f"""{HEADER}{NOISE_FUNC}void main() {{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0;
    uv.x*=resolution.x/resolution.y;
    float ang=atan(uv.y,uv.x), r=length(uv);
    float seg=6.28318/{ff(float(segs))};
    ang=mod(ang+time*{ff(speed)},seg);
    if(ang>seg*0.5) ang=seg-ang;
    vec2 p=vec2(cos(ang),sin(ang))*r;
    float v=noise(p*{ff(3+vi%4)}+time*0.15);
    vec3 rgb={col(cmode,"v")};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

    elif combo == 4:
        # Spiral + FBM
        arms = 2 + (vi % 5)
        return f"""{HEADER}{FBM_FUNC}void main() {{
    vec2 uv=(gl_FragCoord.xy/resolution.xy)*2.0-1.0;
    uv.x*=resolution.x/resolution.y;
    float r=length(uv), ang=atan(uv.y,uv.x)+time*{ff(speed)};
    float spiral=mod(ang*{ff(float(arms))}/6.28318+r*{ff(3+vi%4)},1.0);
    float n=fbm(uv*2.0+time*0.1,4);
    float v=mix(spiral,n,0.35)*smoothstep(1.2,0.2,r);
    vec3 rgb={col(cmode,"v")};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

    elif combo == 5:
        # High-freq + Grid
        fx = 12.0 + vi * 0.8
        return f"""{HEADER}vec2 rot2d(vec2 v, float a){{return vec2(v.x*cos(a)-v.y*sin(a),v.x*sin(a)+v.y*cos(a));}}
void main() {{
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec2 r2=rot2d(uv*2.0-1.0,time*{ff(speed)});
    float g=mod(r2.x*6.0+time,1.0)*mod(r2.y*6.0-time,1.0);
    float s=sin(uv.x*{ff(fx)}+time*20.0)*sin(uv.y*{ff(fx*0.9)}+time*15.0)*0.5+0.5;
    float v=g*0.4+s*0.6;
    vec3 rgb={col(cmode,"v")};
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

    elif combo == 6:
        # Interference + HSB
        num_s = 3 + (vi % 4)
        freq = 10.0 + vi * 0.4
        return f"""{HEADER}{HSB_FUNC}void main() {{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    for(int i=0;i<{num_s};i++){{
        float a=6.28318*float(i)/{ff(float(num_s))};
        vec2 src=vec2(0.5+cos(a)*0.3, 0.5+sin(a)*0.3);
        v+=sin(length(st-src)*{ff(freq)}-time*{ff(speed*3)});
    }}
    v=v/{ff(float(num_s))};
    vec3 rgb=hsb2rgb(vec3(v*0.5+0.5+time*0.1, 0.85, 0.9));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

    elif combo == 7:
        # Starfield + Plasma
        return f"""{HEADER}void main() {{
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    uv.x*=resolution.x/resolution.y;
    float stars=0.0;
    for(int l=0;l<3;l++){{
        float flt=float(l);
        vec2 lv=fract(uv*({ff(15.0+vi*0.4)}+flt*10.0)+vec2(0.0,time*{ff(0.2+vi%5*0.1)}*(flt+1.0)))-0.5;
        stars+=0.003/(length(lv)+0.001);
    }}
    float t=time*{ff(speed)};
    float plasma=sin(uv.x*8.0+t)*sin(uv.y*6.0+t*1.2)*0.25+0.25;
    float v=clamp(stars,0.0,1.0)+plasma;
    vec3 rgb={col(cmode,"clamp(v,0.0,1.0)")};
    fragColor = TDOutputSwizzle(vec4(rgb,1.0));
}}"""

    elif combo == 8:
        # Moving points + Wave distortion
        n_pts = 4 + (vi % 6)
        return f"""{HEADER}void main() {{
    vec2 uv=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
    uv.x+=sin(uv.y*{ff(3+vi%5)}+time*{ff(speed*2)})*0.15;
    uv.y+=cos(uv.x*{ff(2+vi%4)}+time*{ff(speed*1.5)})*0.12;
    vec2 pos; float t=0.0;
    for(int i=0;i<{n_pts};i++){{
        float fi=float(i);
        pos=vec2(sin(time*{ff(0.7+vi%4*0.1)}*(fi+1.0))*1.5, cos(time*{ff(0.6+vi%3*0.15)}+fi)*1.8);
        t+=0.025/length(pos-uv);
    }}
    vec3 rgb=1.0-mod(vec3(t)*0.15,1.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}}"""

    else:  # combo == 9
        # Moire + Scan
        freq1 = 12.0 + vi * 0.4
        freq2 = 12.5 + vi * 0.4
        return f"""{HEADER}void main() {{
    vec2 st=gl_FragCoord.xy/resolution.xy;
    st.x*=resolution.x/resolution.y;
    float g1=sin(st.x*{ff(freq1)}+time*{ff(speed)})*sin(st.y*{ff(freq1*0.8)}+time*{ff(speed*0.7)});
    float a={ff(vi*0.1)};
    vec2 s2=vec2(st.x*cos(a)-st.y*sin(a),st.x*sin(a)+st.y*cos(a));
    float g2=sin(s2.x*{ff(freq2)}-time*{ff(speed*0.9)})*sin(s2.y*{ff(freq2*0.9)});
    float scan=abs(sin(st.y*{ff(4+vi%5)}+time*{ff(speed*2)}))*0.3;
    float v=(g1+g2)*0.25+0.5+scan;
    vec3 rgb={col(cmode,"clamp(v,0.0,1.0)")};
    fragColor = TDOutputSwizzle(vec4(rgb,1.0));
}}"""

# ============================================================
# MAIN GENERATION
# ============================================================
GENERATORS = [
    cat0,   # 0000-0039: Pulsing Circles
    cat1,   # 0040-0079: FBM Noise
    cat2,   # 0080-0119: Rotating Lines
    cat3,   # 0120-0159: Wave Distortion
    cat4,   # 0160-0199: Radial Waves
    cat5,   # 0200-0239: HSB Color Wheel
    cat6,   # 0240-0279: Scan Lines
    cat7,   # 0280-0319: Moving Points
    cat8,   # 0320-0359: Grid Modulo
    cat9,   # 0360-0399: Tunnel Effect
    cat10,  # 0400-0439: Voronoi
    cat11,  # 0440-0479: Animated Rectangles
    cat12,  # 0480-0519: Noise Grid
    cat13,  # 0520-0559: High-Freq Sine
    cat14,  # 0560-0599: Plasma
    cat15,  # 0600-0639: Lissajous
    cat16,  # 0640-0679: Julia Set
    cat17,  # 0680-0719: Kaleidoscope
    cat18,  # 0720-0759: Starfield
    cat19,  # 0760-0799: Interference
    cat20,  # 0800-0839: Spiral
    cat21,  # 0840-0879: Moire
    cat22,  # 0880-0919: Mandala
    cat23,  # 0920-0959: Glitch Art
    cat24,  # 0960-0999: Hybrid
]

count = 0
for cat_idx, gen_fn in enumerate(GENERATORS):
    for vi in range(40):
        shader_idx = cat_idx * 40 + vi
        code = gen_fn(vi)
        write_shader(shader_idx, code)
        count += 1

print(f"Generated {count} shaders in {OUTPUT_DIR}")

# Verify
files = [f for f in os.listdir(OUTPUT_DIR) if f.endswith(".frag")]
files.sort()
print(f"Total files: {len(files)}")
print(f"First: {files[0]}, Last: {files[-1]}")
