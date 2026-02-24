uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float acc = 0.0;
    for(float i = 0.0; i < 35.0; i++) {
        float t = time * 0.15 + i * 0.18;
        float x = sin(t * 1.3) * sin(t * 0.7) * 0.9;
        float y = cos(t * 1.1) * cos(t * 0.5) * 0.9;
        float d = length(vec2(x, y) - pos);
        acc += 0.007 / (d + 0.003);
    }
    float v = min(acc, 3.0);
    fragColor = TDOutputSwizzle(vec4(v * 0.6, v * 0.2, v * 1.2, 1.0));
}
