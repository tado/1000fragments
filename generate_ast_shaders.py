import os
import random
import math

OUTPUT_DIR = "1000fragments-gemini"
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADER = """uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

#define TAU 6.28318530718
"""

UTILS = """
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x), 
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(TAU * (c * t + d));
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float voronoi(vec2 x) {
    vec2 n = floor(x);
    vec2 f = fract(x);
    float m_dist = 1.0;
    for(int j=-1; j<=1; j++)
    for(int i=-1; i<=1; i++) {
        vec2 g = vec2(float(i),float(j));
        vec2 o = random2(n + g);
        o = 0.5 + 0.5*sin( time + 6.2831*o );
        vec2 r = g + o - f;
        float d = dot(r,r);
        m_dist = min(m_dist, d);
    }
    return sqrt(m_dist);
}
"""

def generate_space_transform():
    t_types = [
        "vec2 p = st;", # Normal
        f"vec2 p = (st - 0.5) * {random.uniform(1.0, 10.0):.2f};", # Zoomed
        f"vec2 p = rotate2d(time * {random.uniform(-1.0, 1.0):.2f}) * (st - 0.5) * {random.uniform(2.0, 8.0):.2f};", # Rotate & Zoom
        f"vec2 p = st * {random.uniform(3.0, 15.0):.2f}; p = fract(p) - 0.5;", # Tiled Grid
        f"vec2 p = st - 0.5; float a = atan(p.y, p.x); float r = length(p); p = vec2(a/{random.choice([1.0, 3.14, 6.28])}, r * {random.uniform(2.0, 10.0):.2f});", # Polar
        f"vec2 p = st - 0.5; p += vec2(sin(time + p.y * {random.uniform(5.0, 20.0):.2f}), cos(time + p.x * {random.uniform(5.0, 20.0):.2f})) * {random.uniform(0.05, 0.2):.3f};", # Domain Warp
        f"vec2 p = st - 0.5; float angle = atan(p.y, p.x); float radius = length(p); float sides = {random.choice([3,4,5,6,8,12])}.0; angle = mod(angle, TAU/sides) - TAU/(sides*2.0); p = radius * vec2(cos(angle), sin(angle)); p *= {random.uniform(1.0, 5.0):.2f};" # Kaleidoscope
    ]
    return random.choice(t_types)

def generate_shape(var_name="v", speed_mult=1.0):
    s_types = [
        # SDF Circle
        f"float {var_name} = length(p) - {random.uniform(0.1, 0.8):.2f};",
        # SDF Box
        f"vec2 d = abs(p) - {random.uniform(0.1, 0.5):.2f}; float {var_name} = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);",
        # Waves
        f"float {var_name} = sin(p.x * {random.uniform(5.0, 20.0):.2f} + time * {speed_mult:.2f}) * cos(p.y * {random.uniform(5.0, 20.0):.2f} - time * {speed_mult*0.8:.2f});",
        # Voronoi
        f"float {var_name} = voronoi(p * {random.uniform(1.0, 5.0):.2f});",
        # FBM Noise
        f"float {var_name} = fbm(p * {random.uniform(2.0, 8.0):.2f} + time * {speed_mult * 0.5:.2f});",
        # Spiral
        f"float {var_name} = sin(length(p) * {random.uniform(10.0, 30.0):.2f} - atan(p.y, p.x) * {random.choice([2, 3, 5, 8])}.0 + time * {speed_mult * 2.0:.2f});",
        # Grid lines
        f"float {var_name} = smoothstep(0.0, {random.uniform(0.02, 0.1):.3f}, abs(fract(p.x * {random.uniform(2.0, 10.0):.2f}) - 0.5)) * smoothstep(0.0, {random.uniform(0.02, 0.1):.3f}, abs(fract(p.y * {random.uniform(2.0, 10.0):.2f}) - 0.5));"
    ]
    return random.choice(s_types)

def generate_colorizer(val_var):
    def rand_vec(): return f"vec3({random.random():.2f}, {random.random():.2f}, {random.random():.2f})"
    
    pal_a = rand_vec()
    pal_b = rand_vec()
    pal_c = f"vec3({random.uniform(0.5, 2.0):.2f}, {random.uniform(0.5, 2.0):.2f}, {random.uniform(0.5, 2.0):.2f})"
    pal_d = rand_vec()
    
    c_types = [
        # Palette mapping
        f"vec3 col = palette({val_var} + time * {random.uniform(0.1, 0.5):.2f}, {pal_a}, {pal_b}, {pal_c}, {pal_d});",
        # HSV mapping
        f"vec3 col = hsv2rgb(vec3({val_var} * {random.uniform(0.5, 2.0):.2f} + time * {random.uniform(0.1, 0.5):.2f}, {random.uniform(0.6, 1.0):.2f}, {random.uniform(0.6, 1.0):.2f}));",
        # Threshold / Binary mapping with random colors
        f"vec3 col = {val_var} > {random.uniform(-0.5, 0.5):.2f} ? {rand_vec()} : {rand_vec()};",
        # Smooth mapping between two colors
        f"vec3 col = mix({rand_vec()}, {rand_vec()}, smoothstep(-1.0, 1.0, {val_var}));",
        # Modulo bands
        f"vec3 col = mod({val_var} * {random.uniform(5.0, 20.0):.2f}, 1.0) * {rand_vec()};"
    ]
    return random.choice(c_types)

def generate_shader(index):
    # 1. Coordinate Space
    space_code = generate_space_transform()
    
    # 2. Shape / Logic Generation (1 or 2 layers composed)
    num_layers = random.choice([1, 2, 2]) # Bias towards 2 layers
    
    if num_layers == 1:
        shape_code = generate_shape("val", random.uniform(1.0, 3.0))
        final_val = "val"
    else:
        shape_code1 = generate_shape("val1", random.uniform(1.0, 3.0))
        shape_code2 = generate_shape("val2", random.uniform(1.0, 3.0))
        
        # Modify p slightly for the second layer for more organic feel
        shape_code2 = f"p += {random.uniform(0.1, 1.0):.2f};\n    " + shape_code2
        
        compose_ops = [
            "val1 + val2",
            "val1 * val2",
            "min(val1, val2)",
            "max(val1, val2)",
            "abs(val1 - val2)",
            "mix(val1, val2, 0.5 + 0.5 * sin(time))",
            "val1 - val2"
        ]
        compose = random.choice(compose_ops)
        shape_code = f"{shape_code1}\n    {shape_code2}\n    float val = {compose};"
        final_val = "val"

    # Optional shaping
    if random.random() > 0.5:
        shape_funcs = ["abs", "sin", "cos", "fract", "smoothstep(-0.5, 0.5, ", "step(0.0, "]
        sf = random.choice(shape_funcs)
        if "(" in sf:
            shape_code += f"\n    val = {sf}val);"
        else:
            shape_code += f"\n    val = {sf}(val * {random.uniform(1.0, 10.0):.2f});"

    # 3. Color mapping
    color_code = generate_colorizer("val")
    
    body = f"void main() {{\n"
    body += "    vec2 st = gl_FragCoord.xy / resolution.xy;\n"
    body += "    st.x *= resolution.x / resolution.y;\n"
    body += "    " + space_code + "\n"
    body += "    " + shape_code + "\n"
    body += "    " + color_code + "\n"
    body += "    fragColor = TDOutputSwizzle(vec4(col, 1.0));\n"
    body += "}\n"
    
    return body

# Generate 1000 Unique Shaders
for i in range(1000):
    filename = f"{i:04d}.frag"
    filepath = os.path.join(OUTPUT_DIR, filename)
    content = HEADER + UTILS + generate_shader(i)
    
    with open(filepath, "w") as f:
        f.write(content)

print("Successfully generated 1000 highly diverse combinatorial shaders based on mathematical primitives.")
