uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float r = sin(uv.x * 50.0 + time * 3.0) * sin(uv.y * 51.0 + time * 2.9) * 0.5 + 0.5;
    float g = sin(uv.x * 52.0 + time * 3.1) * sin(uv.y * 49.0 + time * 3.2) * 0.5 + 0.5;
    float b = sin(uv.x * 48.0 + time * 2.8) * sin(uv.y * 53.0 + time * 3.0) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}
