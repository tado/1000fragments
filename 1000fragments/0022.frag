uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float t = time * 2.0;
    uv += vec2(sin(uv.y * 4.0 + t) * 0.3, cos(uv.x * 3.0 + t * 0.7) * 0.3);
    float d = length(uv);
    float v = sin(d * 15.0 - t * 3.0) * 0.5 + 0.5;
    float hue = d * 2.0 + t * 0.2;
    fragColor = TDOutputSwizzle(vec4(
        sin(hue) * v * 0.5 + 0.5,
        sin(hue + 2.094) * v * 0.5 + 0.5,
        sin(hue + 4.189) * v * 0.5 + 0.5, 1.0));
}
