uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time;
    float v = sin(uv.x * 80.0 + t * 4.0) + sin(uv.y * 80.0 + t * 3.0)
            + sin((uv.x + uv.y) * 60.0 + t * 5.0)
            + sin(length(uv - 0.5) * 120.0 - t * 6.0);
    v = v * 0.25 + 0.5;
    float r = sin(v * 6.28) * 0.5 + 0.5;
    float g = sin(v * 6.28 + 2.094) * 0.5 + 0.5;
    float b = sin(v * 6.28 + 4.189) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}
