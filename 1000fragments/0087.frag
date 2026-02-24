uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float f1 = sin(uv.x * 70.0 + time * 6.0) * 0.5 + 0.5;
    float f2 = sin(uv.y * 73.0 - time * 5.0) * 0.5 + 0.5;
    float f3 = sin(uv.x * 69.0 - uv.y * 71.0 + time * 7.0) * 0.5 + 0.5;
    float r = f1 * f2;
    float g = f2 * f3;
    float b = f1 * f3;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}
