uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float r = 0.0, g = 0.0, b = 0.0;
    for(float i = 0.0; i < 15.0; i++) {
        vec2 m = vec2(cos(time * 0.4 + i * 1.3) * 0.7, sin(time * 0.3 + i * 0.9) * 0.7);
        float d = length(m - pos);
        r += 0.02 / (d + 0.01) * (sin(i * 1.7) * 0.5 + 0.5);
        g += 0.02 / (d + 0.01) * (sin(i * 1.7 + 2.1) * 0.5 + 0.5);
        b += 0.02 / (d + 0.01) * (sin(i * 1.7 + 4.2) * 0.5 + 0.5);
    }
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}
