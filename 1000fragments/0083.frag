uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float r = length(uv - 0.5);
    float v = sin(angle * 30.0 + time * 10.0) * sin(r * 80.0 - time * 5.0);
    v = v * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v, v * 0.4, 1.0 - v * 0.7, 1.0));
}
