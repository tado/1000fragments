uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float t = time * 0.3;
    float lines_h = step(0.5, fract(uv.y * 20.0 + t));
    float lines_v = step(0.5, fract(uv.x * 20.0 - t));
    float v = lines_h * lines_v;
    fragColor = TDOutputSwizzle(vec4(lines_h, v, lines_v, 1.0));
}
