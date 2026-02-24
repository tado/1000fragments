uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i = floor(st); vec2 f = fract(st);
    float a = random(i), b = random(i + vec2(1,0)), c = random(i + vec2(0,1)), d = random(i + vec2(1,1));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float t = floor(time * 4.0000) / 4.0000;
    vec2 block = floor(st * 48.0000) / 48.0000;
    float offset = random(block + t) * 0.3;
    float v = random(vec2(st.x + offset, block.y + t));
    v = v * 0.8 + sin(st.x * 23.4000 + t * 10.0) * 0.1 + 0.1;
    vec3 rgb = clamp(hsb2rgb(vec3(v, 1.0, 1.0)), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}