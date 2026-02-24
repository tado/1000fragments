uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 pos = (gl_FragCoord.xy / resolution.xy) - 0.5;
    vec3 p = vec3(pos.x, 0.4000, pos.y);
    vec2 s = vec2(p.x/p.z, p.y/p.z) * 0.0900 + time * 0.3500;
    float col = sign((mod(s.x, 0.0800) - 0.0400) * (mod(s.y, 0.0800) - 0.0400));
    col *= p.z * p.z * 15.5000;
    col = clamp(col, 0.0, 1.0);
    vec3 rgb = vec3(col, col*0.5, col*2.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}