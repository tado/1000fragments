uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float a = atan(uv.y, uv.x);
    float r = length(uv);
    float n = 5.0;
    float star = cos(floor(0.5 + a / (6.28318 / n)) * (6.28318 / n) - a) * r;
    float v = sin(star * 20.0 - time * 4.0) * 0.5 + 0.5;
    float hue = time * 0.2 + r;
    fragColor = TDOutputSwizzle(vec4(
        v * (sin(hue * 6.28) * 0.5 + 0.5),
        v * (sin(hue * 6.28 + 2.094) * 0.5 + 0.5),
        v, 1.0));
}
