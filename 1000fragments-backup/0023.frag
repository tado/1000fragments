uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 p = uv;
    for(int i = 0; i < 5; i++) {
        float fi = float(i) + 1.0;
        p.x += sin(p.y * fi * 2.5 + time * fi * 0.4) / (fi * 3.0);
        p.y += cos(p.x * fi * 2.5 + time * fi * 0.3) / (fi * 3.0);
    }
    float r = sin(p.x * 10.0 + time) * 0.5 + 0.5;
    float g = sin(p.y * 10.0 + time * 1.3) * 0.5 + 0.5;
    float b = sin((p.x + p.y) * 7.0 + time * 0.7) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}
