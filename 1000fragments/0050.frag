uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 pos = (gl_FragCoord.xy / resolution.xy) - vec2(0.5, 0.5);
    float fov = 0.5, scaling = 0.2;
    vec3 p = vec3(pos.x, fov, pos.y);
    vec2 s = vec2(p.x/p.z, p.y/p.z) * scaling + time * 0.6;
    float color = sign((mod(s.x, 0.1) - 0.05) * (mod(s.y, 0.1) - 0.05));
    color *= p.z * p.z * 15.0;
    fragColor = TDOutputSwizzle(vec4(vec3(color), 1.0));
}
