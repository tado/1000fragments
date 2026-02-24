uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float glow = 0.0;
    for(float i = 0.0; i < 30.0; i++) {
        float a = i / 30.0 * 6.28318 + time * 0.5;
        float r = 0.3 + sin(time * 0.7 + i * 0.4) * 0.5;
        vec2 m = vec2(cos(a) * r, sin(a) * r);
        glow += 0.008 / (length(m - pos) + 0.005);
    }
    fragColor = TDOutputSwizzle(vec4(glow * 1.5, glow * 0.5, glow * 0.1, 1.0));
}
