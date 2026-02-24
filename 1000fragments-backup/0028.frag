uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float T = time;
    uv.x += sin(uv.y * 2.0 + T) * sin(uv.y * 3.0 + T * 1.3) * 0.3;
    uv.y += cos(uv.x * 2.0 + T * 0.7) * cos(uv.x * 5.0 + T) * 0.3;
    float s = sin(uv.x * 8.0 + T) * cos(uv.y * 8.0 - T * 1.2);
    s = s * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(s, s * 0.4, 1.0 - s * 0.8, 1.0));
}
