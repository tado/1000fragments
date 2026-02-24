uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    float rings = sin(r * 30.0 - time * 5.0) * 0.5 + 0.5;
    float spokes = sin(a * 8.0 + time * 2.0) * 0.5 + 0.5;
    float v = rings * spokes;
    fragColor = TDOutputSwizzle(vec4(v, v * 0.3, v * 1.5, 1.0));
}
