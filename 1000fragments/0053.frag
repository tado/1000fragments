uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = gl_FragCoord.xy / resolution.xy - vec2(0.5, 0.5);
    vec3 p = vec3(pos.x, 0.4, pos.y);
    vec2 s = vec2(p.x / p.z, p.y / p.z) * 0.15 + time * 0.4;
    float hex = sin(s.x * 10.0) * sin(s.y * 10.0 + s.x * 5.0);
    hex *= p.z * p.z * 10.0;
    float hue = hex * 0.2 + time * 0.1;
    fragColor = TDOutputSwizzle(vec4(
        sin(hue * 6.28) * 0.5 + 0.5,
        sin(hue * 6.28 + 2.094) * 0.5 + 0.5,
        sin(hue * 6.28 + 4.189) * 0.5 + 0.5, 1.0));
}
