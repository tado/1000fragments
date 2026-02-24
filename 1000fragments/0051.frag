uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) - 0.5;
    uv.x *= resolution.x / resolution.y;
    float z = 1.0 / (length(uv) + 0.01);
    vec2 tunnel = uv * z;
    float t = time * 0.5;
    float grid = step(0.45, fract(tunnel.x * 2.0 + t)) + step(0.45, fract(tunnel.y * 2.0 + t));
    float fade = min(z * 0.1, 1.0);
    float hue = length(tunnel) * 0.1 + t * 0.3;
    fragColor = TDOutputSwizzle(vec4(
        grid * fade * (sin(hue) * 0.5 + 0.5),
        grid * fade * (sin(hue + 2.094) * 0.5 + 0.5),
        grid * fade * (sin(hue + 4.189) * 0.5 + 0.5), 1.0));
}
