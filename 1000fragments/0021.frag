uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    for(int i = 0; i < 4; i++) {
        float fi = float(i);
        uv.x += sin(uv.y * (3.0 + fi) + time * (1.0 + fi * 0.3)) * 0.08;
        uv.y += cos(uv.x * (3.0 + fi) + time * (0.8 + fi * 0.2)) * 0.08;
    }
    float c = fract(uv.x * 5.0) * fract(uv.y * 5.0);
    fragColor = TDOutputSwizzle(vec4(c, c * 0.3, 1.0 - c, 1.0));
}
