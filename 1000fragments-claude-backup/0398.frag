uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 pos = (gl_FragCoord.xy / resolution.xy) - 0.5;
    vec3 p = vec3(pos.x, 0.6000, pos.y);
    vec2 s = vec2(p.x/p.z, p.y/p.z) * 0.1300 + time * 1.1000;
    float col = sign((mod(s.x, 0.1400) - 0.0700) * (mod(s.y, 0.1400) - 0.0700));
    col *= p.z * p.z * 34.0000;
    col = clamp(col, 0.0, 1.0);
    vec3 rgb = vec3(col*2.0, col, col*0.5);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}