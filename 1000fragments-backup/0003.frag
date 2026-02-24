uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time * 2.0;
    float v = 0.0;
    for(float i = 1.0; i <= 10.0; i++) {
        vec2 p = vec2(0.5 + sin(t * 0.13 * i) * 0.35, 0.5 + cos(t * 0.17 * i) * 0.35);
        float d = length(uv - p);
        v += sin(d * 60.0 - t * 3.0) * (1.0 / (i * 0.5));
    }
    v = v * 0.3 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v, v * 0.3, 1.0 - v, 1.0));
}
