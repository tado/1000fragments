uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 pos = (gl_FragCoord.xy / resolution.xy) - 0.5;
    vec3 p = vec3(pos.x, 0.5000, pos.y);
    vec2 s = vec2(p.x/p.z, p.y/p.z) * 0.2500 + time * 1.2500;
    float col = sign((mod(s.x, 0.1400) - 0.0700) * (mod(s.y, 0.1400) - 0.0700));
    col *= p.z * p.z * 26.5000;
    col = clamp(col, 0.0, 1.0);
    vec3 rgb = vec3(1.0-col, col*0.8, col*col);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}