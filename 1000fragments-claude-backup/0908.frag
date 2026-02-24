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
void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    {
        float seg0 = 6.28318 / 7.0000;
        float a0 = mod(atan(uv.y, uv.x) + time * 0.6000, seg0);
        if (a0 > seg0 * 0.5) a0 = seg0 - a0;
        float r0 = length(uv);
        vec2 p0 = vec2(cos(a0), sin(a0)) * r0;
        v += noise(p0*4.0);
    }
    vec3 rgb = clamp(vec3(clamp(v/1.0000, 0.0, 1.0)*0.3, clamp(v/1.0000, 0.0, 1.0)*1.2, clamp(v/1.0000, 0.0, 1.0)*0.8), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}