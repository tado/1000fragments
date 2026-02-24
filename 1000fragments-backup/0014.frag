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
    float f1 = fbm(st * 3.0 + time * 0.1);
    float f2 = fbm(st * 5.0 - time * 0.2);
    float v = abs(f1 - f2) * 3.0;
    vec3 col = vec3(v * 0.2, v, v * 0.5);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
