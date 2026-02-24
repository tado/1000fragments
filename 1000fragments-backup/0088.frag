uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    float freq = 40.0;
    for(float k = 0.0; k < 5.0; k++) {
        float phase = k * 1.2566;
        v += sin(uv.x * freq * cos(phase) + uv.y * freq * sin(phase) + time * (3.0 + k));
    }
    v = v / 5.0 * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v, v * v * 2.0, (1.0 - v) * 1.5, 1.0));
}
