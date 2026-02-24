uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
    vec2 i = floor(st); vec2 f = fract(st);
    float a = random(i), b = random(i + vec2(1,0)), c = random(i + vec2(0,1)), d = random(i + vec2(1,1));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 st, int oct) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 8; i++) { if (i >= oct) break; v += a * noise(st); st *= 2.0; a *= 0.5; }
    return v;
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float c = sin(fbm(st*4.4400 + vec2(time*0.1900, time*0.0700), 5)*15.0000)*0.5+0.5;
    vec3 rgb = vec3(abs(sin(c*3.14159)), abs(sin(c*3.14159+2.094)), abs(sin(c*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}