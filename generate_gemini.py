import os
import random

OUTPUT_DIR = "100fragments-gemini"
os.makedirs(OUTPUT_DIR, exist_ok=True)

header = """uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
"""

helpers = """
#define PI 3.14159265359

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), f.x),
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x), f.y);
}

float sdBox( vec2 p, vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
"""

color_palettes = [
    "vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));",
    "vec3 col = mix(vec3(0.1, 0.5, 0.8), vec3(0.9, 0.2, 0.3), d);",
    "vec3 col = vec3(fract(d * 10.0 - time), fract(d * 5.0 + time), fract(d * 2.0));",
    "vec3 col = vec3(step(0.5, fract(d * 20.0)));",
    "vec3 col = vec3(sin(d*10.0+time)*0.5+0.5, sin(d*12.0-time)*0.5+0.5, sin(d*8.0+time*0.5)*0.5+0.5);",
    "vec3 col = mix(vec3(1.0, 0.8, 0.2), vec3(0.2, 0.1, 0.6), clamp(d, 0.0, 1.0));"
]

patterns = [
    # 0: Basic distance field
    "float d = length(uv); d = sin(d * 20.0 - time * {speed}) * 0.5 + 0.5;",
    # 1: Grid
    "vec2 g = fract(uv * {scale}) - 0.5; float d = length(g); d = step({thresh}, d);",
    # 2: Box distance
    "float d = sdBox(uv * rot(time * {speed}), vec2({size})); d = smoothstep(0.0, 0.05, abs(d) - {thresh});",
    # 3: Angle pattern
    "float a = atan(uv.y, uv.x); float d = sin(a * {freq} + time * {speed}) * 0.5 + 0.5;",
    # 4: Noise displacement
    "uv += noise(uv * {scale} + time * {speed}) * {thresh}; float d = length(uv); d = fract(d * 10.0);",
    # 5: Modulo repeating space
    "vec2 g = mod(uv, {scale}) - {scale}/2.0; float d = length(g); d = smoothstep(0.1, 0.12, d);",
    # 6: Wave interference
    "float d = sin(uv.x * {freq} + time) + sin(uv.y * {freq} - time) + sin((uv.x+uv.y) * {freq} + time * {speed}); d = d * 0.33 + 0.5;",
    # 7: Rings
    "float d = abs(length(uv) - {size}); d = 0.02 / d;",
    # 8: Glitch rects
    "float r = random(floor(uv * {scale} + time * {speed})); float d = step(0.5, r);",
]

transforms = [
    "",
    "uv *= rot(time * 0.5);",
    "uv *= rot(length(uv) + time);",
    "uv.x += sin(uv.y * 10.0 + time) * 0.1;",
    "uv = abs(uv);",
    "uv = abs(uv) - 0.5;",
]

def generate_shader(idx):
    pattern = random.choice(patterns).format(
        speed=round(random.uniform(0.5, 5.0), 2),
        scale=round(random.uniform(2.0, 20.0), 2),
        thresh=round(random.uniform(0.01, 0.5), 2),
        size=round(random.uniform(0.1, 0.8), 2),
        freq=round(random.uniform(2.0, 15.0), 2)
    )
    
    transform = random.choice(transforms)
    color = random.choice(color_palettes)
    
    # 10% chance to have a feedback-like zoom or offset
    pre_transform = ""
    if random.random() < 0.2:
        pre_transform = f"uv *= {round(random.uniform(0.5, 3.0), 2)} + sin(time) * {round(random.uniform(0.1, 0.5), 2)};"
    
    main_body = f"""void main() {{
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    {pre_transform}
    {transform}
    
    {pattern}
    
    {color}
    
    vec4 finalColor = vec4(col, 1.0);
    fragColor = TDOutputSwizzle(finalColor);
}}
"""
    return header + helpers + main_body

for i in range(100):
    shader_code = generate_shader(i)
    filename = os.path.join(OUTPUT_DIR, f"{i:04d}.frag")
    with open(filename, "w") as f:
        f.write(shader_code)

print("Generated 100 shaders in", OUTPUT_DIR)
