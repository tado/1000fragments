uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    angle += sin(radius * 8.0 - time * 3.0) * 0.5;
    radius += cos(angle * 6.0 + time * 2.0) * 0.1;
    float v = sin(radius * 20.0 - time * 5.0) * 0.5 + 0.5;
    float hue = angle / 6.28318 + time * 0.1;
    fragColor = TDOutputSwizzle(vec4(
        v * (sin(hue * 6.28) * 0.5 + 0.5),
        v * (sin(hue * 6.28 + 2.094) * 0.5 + 0.5),
        v * (sin(hue * 6.28 + 4.189) * 0.5 + 0.5), 1.0));
}
