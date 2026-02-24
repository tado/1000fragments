uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 grid = fract(uv * 10.0 + time * 0.2) - 0.5;
    float d = length(grid);
    float v = step(d, 0.3 + sin(time * 2.0) * 0.1);
    fragColor = TDOutputSwizzle(vec4(v, v * 0.3, 1.0 - v, 1.0));
}
