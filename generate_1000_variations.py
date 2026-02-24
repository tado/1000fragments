import os
import random
import math

OUTPUT_DIR = "1000fragments-gemini"
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADER = """uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
"""

UTILS = """
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x), 
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x), u.y);
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}
"""

def get_random_palette():
    a = [random.uniform(0.2, 0.8) for _ in range(3)]
    b = [random.uniform(0.2, 0.5) for _ in range(3)]
    c = [random.uniform(0.5, 2.0) for _ in range(3)]
    d = [random.uniform(0.0, 1.0) for _ in range(3)]
    return f"vec3({a[0]:.2f}, {a[1]:.2f}, {a[2]:.2f}), vec3({b[0]:.2f}, {b[1]:.2f}, {b[2]:.2f}), vec3({c[0]:.2f}, {c[1]:.2f}, {c[2]:.2f}), vec3({d[0]:.2f}, {d[1]:.2f}, {d[2]:.2f})"

# --- Archetypes as strings to be injected ---

def arch_plasma(seed):
    scale = random.uniform(2.0, 15.0)
    speed = random.uniform(0.5, 3.0)
    return f"""
    float v1 = sin(st.x * {scale:.2f} + time * {speed:.2f});
    float v2 = sin((st.y * {scale:.2f} + time * {speed:.2f}) * 0.5);
    float v3 = sin((st.x * {scale:.2f} + st.y * {scale:.2f} + time * {speed:.2f}) * 0.5);
    float val = (v1 + v2 + v3) / 3.0;
    """

def arch_voronoi(seed):
    scale = random.uniform(2.0, 10.0)
    speed = random.uniform(1.0, 5.0)
    return f"""
    vec2 v_st = st * {scale:.2f};
    vec2 i_st = floor(v_st);
    vec2 f_st = fract(v_st);
    float m_dist = 1.0;
    for(int y = -1; y <= 1; y++) {{
        for(int x = -1; x <= 1; x++) {{
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5 * sin(time * {speed:.2f} + 6.2831 * point);
            vec2 diff = neighbor + point - f_st;
            m_dist = min(m_dist, length(diff));
        }}
    }}
    float val = m_dist;
    """

def arch_shapes(seed):
    count = random.randint(2, 6)
    return f"""
    float val = 0.0;
    for(int i = 0; i < {count}; i++) {{
        vec2 pos = vec2(random(vec2(float(i), 0.1)), random(vec2(float(i), 0.2)));
        pos = 0.5 + 0.4 * sin(time * (0.5 + random(pos)) + pos * 6.28);
        float d = length(st - pos);
        val += smoothstep(0.1 + 0.05 * sin(time), 0.0, d);
    }}
    val = clamp(val, 0.0, 1.0);
    """

def arch_grid(seed):
    scale = random.uniform(5.0, 30.0)
    return f"""
    vec2 g_st = st * {scale:.2f};
    vec2 ipos = floor(g_st);
    float val = random(ipos + floor(time * {random.uniform(2.0, 10.0):.2f}));
    """

def arch_tunnel(seed):
    speed = random.uniform(1.0, 4.0)
    return f"""
    vec2 p = st - 0.5;
    float a = atan(p.y, p.x);
    float r = length(p);
    float val = sin(10.0 / r + time * {speed:.2f} + a * {random.choice([2, 4, 8])}.0);
    val = smoothstep(-0.2, 0.2, val) * r;
    """

def arch_fbm_approx(seed):
    return f"""
    float val = 0.0;
    float amp = 0.5;
    vec2 f_st = st * 3.0;
    for(int i = 0; i < 4; i++) {{
        val += amp * noise(f_st + time * 0.2);
        f_st *= 2.1;
        amp *= 0.5;
    }}
    """

def arch_stripes(seed):
    angle = random.uniform(0, 3.14)
    freq = random.uniform(10.0, 40.0)
    return f"""
    vec2 s_st = rotate2d({angle:.2f}) * st;
    float val = sin(s_st.x * {freq:.2f} + time * {random.uniform(5.0, 15.0):.2f});
    val = smoothstep(-0.1, 0.1, val);
    """

ARCHETYPES = [arch_plasma, arch_voronoi, arch_shapes, arch_grid, arch_tunnel, arch_fbm_approx, arch_stripes]

def generate_shader(index):
    seed = index / 1000.0
    
    # Randomly pick 1 or 2 archetypes to combine
    use_composition = random.random() > 0.4
    arch1_func = random.choice(ARCHETYPES)
    arch1_code = arch1_func(seed)
    
    if use_composition:
        arch2_func = random.choice(ARCHETYPES)
        arch2_code = arch2_func(seed + 0.5)
        blend_mode = random.choice(["+", "*", "max", "abs(arch1 - arch2)"])
        if blend_mode == "abs(arch1 - arch2)":
            combine_logic = "float final_val = abs(val - val2);"
        else:
            combine_logic = f"float final_val = val {blend_mode} val2;"
        
        # Rename 'val' in arch2 to 'val2'
        arch2_code = arch2_code.replace("float val =", "float val2 =").replace("val =", "val2 =")
        main_logic = arch1_code + arch2_code + combine_logic
    else:
        main_logic = arch1_code + "float final_val = val;"

    # Coordinate Warp
    warp_type = random.choice(["none", "rotate", "zoom", "distort"])
    warp_code = ""
    if warp_type == "rotate":
        warp_code = f"st = rotate2d(time * {random.uniform(-1.0, 1.0):.2f}) * (st - 0.5) + 0.5;"
    elif warp_type == "zoom":
        warp_code = f"st = (st - 0.5) * (1.0 + 0.5 * sin(time * {random.uniform(0.5, 2.0):.2f})) + 0.5;"
    elif warp_type == "distort":
        warp_code = f"st += 0.1 * vec2(sin(st.y * 10.0 + time), cos(st.x * 10.0 + time));"

    palette_code = get_random_palette()
    
    body = f"""
void main() {{
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    {warp_code}
    {main_logic}
    vec3 col = palette(final_val + time * 0.1, {palette_code});
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}}
"""
    return body

# --- Main loop ---

for i in range(1000):
    filename = f"{i:04d}.frag"
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    content = HEADER + UTILS + generate_shader(i)
    
    with open(filepath, "w") as f:
        f.write(content)

print("Generated 1000 unique shaders with composition and warping.")
