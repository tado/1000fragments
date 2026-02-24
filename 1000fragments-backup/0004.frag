uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float s = 0.0;
    for(float i = 0.0; i < 4.0; i++) {
        float angle = time * 0.5 + i * 1.5708;
        vec2 c = vec2(cos(angle) * 0.5, sin(angle) * 0.5);
        float d = length(uv - c);
        s += abs(sin(d * 25.0 - time * 15.0));
    }
    s /= 4.0;
    fragColor = TDOutputSwizzle(vec4(s * 2.0, s * 0.5, s * 0.1, 1.0));
}
