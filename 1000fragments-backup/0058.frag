uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float depth = 0.25 / (length(uv) + 0.001);
    float rings = mod(depth - time * 0.6, 0.3);
    float ringMask = step(0.25, rings);
    float angle = atan(uv.y, uv.x) / 6.28318;
    float segments = step(0.5, fract(angle * 6.0 + time * 0.1));
    float v = ringMask * segments;
    float fog = min(depth * 0.08, 1.0);
    fragColor = TDOutputSwizzle(vec4(v * fog * 2.0, v * fog, v * fog * 0.3, 1.0));
}
