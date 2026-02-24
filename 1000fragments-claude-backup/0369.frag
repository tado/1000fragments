uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 pos = (gl_FragCoord.xy / resolution.xy) - 0.5;
    vec3 p = vec3(pos.x, 0.5000, pos.y);
    vec2 s = vec2(p.x/p.z, p.y/p.z) * 0.1700 + time * 0.3500;
    float col = sign((mod(s.x, 0.1700) - 0.0850) * (mod(s.y, 0.1700) - 0.0850));
    col *= p.z * p.z * 19.5000;
    col = clamp(col, 0.0, 1.0);
    vec3 rgb = vec3(abs(sin(col*3.14)), abs(cos(col*3.14)), col);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}