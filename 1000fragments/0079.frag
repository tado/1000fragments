uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    for(float i = 1.0; i <= 5.0; i++) {
        float n = pow(2.0, i);
        v += mod(uv.x * n + time * 0.1 * i, 1.0) > 0.5 ? 1.0 / i : 0.0;
        v += mod(uv.y * n + time * 0.07 * i, 1.0) > 0.5 ? 1.0 / i : 0.0;
    }
    v = mod(v, 2.0);
    fragColor = TDOutputSwizzle(vec4(v * 0.5, v, 1.0 - v * 0.5, 1.0));
}
