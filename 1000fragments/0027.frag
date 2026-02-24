uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float px = uv.x, py = uv.y;
    for(int i = 0; i < 8; i++) {
        float fi = float(i);
        px += sin(py * 3.7 + time * 0.3 + fi) * 0.07;
        py += cos(px * 3.7 + time * 0.4 + fi) * 0.07;
    }
    float v = sin(px * 15.0) * sin(py * 15.0);
    float r = step(0.0, v) * abs(v);
    float b = step(v, 0.0) * abs(v);
    fragColor = TDOutputSwizzle(vec4(r, r * b, b, 1.0));
}
