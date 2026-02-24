uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float val = 0.0;
    for(float i = 1.0; i <= 6.0; i++) {
        vec2 ctr = vec2(sin(time * 0.7 / i) * 0.4, cos(time * 0.5 / i) * 0.4);
        val += sin(length(uv - ctr) * (10.0 * i) - time * 5.0 * i) / i;
    }
    val = val * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(val, val * val, 1.0 - val, 1.0));
}
