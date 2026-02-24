uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float acc = 0.0;
    for(float i = 0.0; i < 40.0; i++) {
        float seed = i * 7.3 + 1.0;
        vec2 m = vec2(sin(seed + time * (0.1 + fract(seed * 0.1) * 0.2)) * 0.9,
                      cos(seed * 1.3 + time * (0.15 + fract(seed * 0.13) * 0.15)) * 0.9);
        acc += 0.006 / (length(m - pos) + 0.003);
    }
    float v = min(acc, 2.0);
    fragColor = TDOutputSwizzle(vec4(v * 0.2, v * 0.8, v * 1.5, 1.0));
}
