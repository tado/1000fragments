uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float v = 0.0;
    for(float i = 0.0; i < 3.0; i++) {
        vec2 c = vec2(sin(time * (0.3 + i * 0.1)) * 0.5, cos(time * (0.4 - i * 0.1)) * 0.5);
        float d = length(uv - c);
        v += step(0.0, sin(d * 50.0 - time * 10.0));
    }
    v = mod(v, 2.0);
    fragColor = TDOutputSwizzle(vec4(v, 1.0 - v, v * 0.5, 1.0));
}
