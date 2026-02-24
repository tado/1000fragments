import os
OUTPUT_DIR = "C:/Users/tadok/Documents/GitHub/1000fragments/1000fragments"
H = "uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
"
FBM = """float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for(int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
}
"""
V = """vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
"""
def w(name, pre, body):
    with open(os.path.join(OUTPUT_DIR, name + ".frag"), "w") as f:
        f.write(H + pre + body)
