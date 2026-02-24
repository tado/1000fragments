uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float v = sin(uv.x * 100.0 + time * 5.0) * sin(uv.y * 100.0 + time * 3.0);
    v = v * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v, v * v, 1.0 - v, 1.0));
}
