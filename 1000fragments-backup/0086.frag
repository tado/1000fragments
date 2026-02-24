uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float r_dist = length(uv);
    float v = sin(r_dist * 100.0 - time * 8.0);
    v *= sin(atan(uv.y, uv.x) * 20.0 + time * 5.0);
    v = v * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v * 1.5, v * 0.3, 1.0 - v, 1.0));
}
