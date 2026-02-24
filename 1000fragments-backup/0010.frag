uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for(int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    vec3 c = vec3(0.0);
    c += fbm(st * 2.3 + vec2(time * 0.1, time * 0.3)) * vec3(2.0, 0.5, 0.5);
    c += fbm(st * 2.2 + vec2(time * 0.2, time * 0.2)) * vec3(0.5, 0.5, 2.5);
    c += fbm(st * 2.1 + vec2(time * 0.3, time * 0.1)) * vec3(0.5, 1.5, 0.5);
    c = mod(c * 12.0, 1.0) * 1.5;
    fragColor = TDOutputSwizzle(vec4(c, 1.0));
}
