uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float r = 0.0, g = 0.0, b = 0.0;
    for(float i = 0.0; i < 12.0; i++) {
        float phase = i * 6.28318 / 12.0;
        float orbit = 0.5 + sin(time * 0.5 + i * 0.3) * 0.3;
        vec2 m1 = vec2(cos(time * 0.4 + phase) * orbit, sin(time * 0.4 + phase) * orbit);
        vec2 m2 = vec2(cos(time * 0.7 + phase + 3.14) * 0.3, sin(time * 0.7 + phase + 3.14) * 0.3);
        float d1 = length(m1 - pos), d2 = length(m2 - pos);
        r += 0.01 / (d1 + 0.01);
        g += 0.01 / (d2 + 0.01);
        b += 0.005 / (abs(d1 - d2) + 0.01);
    }
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}
