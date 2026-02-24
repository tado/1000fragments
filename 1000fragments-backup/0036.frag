uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float v = 0.0;
    for(float i = 0.0; i < 20.0; i++) {
        float a1 = time * 0.3 + i * 0.5;
        float a2 = time * 0.2 + i * 0.7;
        vec2 m = vec2(sin(a1) * cos(a2), sin(a2) * cos(a1)) * 0.7;
        v += sin(length(m - pos) * 20.0 - time * 5.0) / (length(m - pos) * 5.0 + 1.0);
    }
    v = v * 0.1 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v * v * 2.0, v, v * (1.0 - v) * 4.0, 1.0));
}
