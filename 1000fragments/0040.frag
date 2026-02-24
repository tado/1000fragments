uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
mat2 rot2(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    uv = rot2(time * 0.5) * uv;
    float lines = sin(uv.x * 30.0) * 0.5 + 0.5;
    lines *= sin(uv.y * 30.0) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(lines, lines * 0.5, 1.0 - lines, 1.0));
}
