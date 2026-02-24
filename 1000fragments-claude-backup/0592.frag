uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float t = time * 2.2000;
    float v = sin(st.x * 36.0000 + t);
    v += sin(st.y * 44.0000 + t * 1.3);
    v += sin((st.x + st.y) * 10.5000 + t * 0.7);
    v += sin(length(st - 0.5) * 54.0000 - t * 2.0);
    v = v * 0.25 + 0.5;
    vec3 rgb = clamp(hsb2rgb(vec3(v, 0.9, 1.0)), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}