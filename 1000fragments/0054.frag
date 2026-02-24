uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float z = length(uv), a = atan(uv.y, uv.x) + time * 0.3;
    float tunnel_z = 0.5 / (z + 0.001);
    float s = mod(a / 6.28318 * 8.0, 1.0);
    float t = mod(tunnel_z - time * 0.5, 1.0);
    float v = step(0.5, s) * step(0.5, t) + step(s, 0.5) * step(t, 0.5);
    float fog = min(tunnel_z * 0.05, 1.0);
    fragColor = TDOutputSwizzle(vec4(v * fog, v * fog * 0.5, v * fog * 1.5, 1.0));
}
