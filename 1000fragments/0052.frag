uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) - 0.5;
    uv.x *= resolution.x / resolution.y;
    float r = length(uv), a = atan(uv.y, uv.x);
    float depth = 1.0 / (r + 0.001);
    float rings = mod(depth * 0.2 - time * 0.5, 1.0);
    float spokes = mod(a / 6.28318 * 12.0 + time * 0.2, 1.0);
    float v = step(0.4, rings) * step(0.1, spokes);
    float hue = depth * 0.05 + time * 0.1;
    fragColor = TDOutputSwizzle(vec4(
        v*(sin(hue*6.28)*0.5+0.5), v*(sin(hue*6.28+2.094)*0.5+0.5), v*(sin(hue*6.28+4.189)*0.5+0.5), 1.0));
}
