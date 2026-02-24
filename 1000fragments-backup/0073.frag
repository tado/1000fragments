uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float scale = pow(2.0, mod(time * 0.3, 3.0));
    vec2 g = fract(uv * scale) - 0.5;
    float d = max(abs(g.x), abs(g.y));
    float v = step(d, 0.45);
    float border = step(0.4, d) * v;
    fragColor = TDOutputSwizzle(vec4(border * 2.0, v * 0.5, (1.0 - v) * 0.5, 1.0));
}
