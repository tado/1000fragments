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
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    float seg = 6.28318 / 6.0000;
    angle = mod(angle + time * 1.6500, seg);
    if (angle > seg * 0.5) angle = seg - angle;
    uv = vec2(cos(angle), sin(angle)) * radius;
    float v = noise(uv*6.0000+time*0.2);
    vec3 rgb = clamp(vec3(0.05, v*1.5, v*0.3), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}