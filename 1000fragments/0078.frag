uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 id = floor(uv * 15.0);
    vec2 f = fract(uv * 15.0);
    float alive = step(0.5, fract(sin(dot(id, vec2(12.9898, 78.233)) + floor(time * 2.0)) * 43758.5453));
    float sq = step(0.1, f.x) * step(0.1, f.y) * step(f.x, 0.9) * step(f.y, 0.9);
    fragColor = TDOutputSwizzle(vec4(alive * sq, alive * sq * 0.5, (1.0 - alive) * sq * 0.3, 1.0));
}
