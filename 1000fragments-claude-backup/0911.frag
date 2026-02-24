uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    {
        float seg0 = 6.28318 / 10.0000;
        float a0 = mod(atan(uv.y, uv.x) + time * 0.3000, seg0);
        if (a0 > seg0 * 0.5) a0 = seg0 - a0;
        float r0 = length(uv);
        vec2 p0 = vec2(cos(a0), sin(a0)) * r0;
        v += mod(length(p0)*6.0, 1.0);
    }    {
        float seg1 = 6.28318 / 20.0000;
        float a1 = mod(atan(uv.y, uv.x) + time * 0.6000, seg1);
        if (a1 > seg1 * 0.5) a1 = seg1 - a1;
        float r1 = length(uv);
        vec2 p1 = vec2(cos(a1), sin(a1)) * r1;
        v += mod(length(p1)*6.0, 1.0);
    }    {
        float seg2 = 6.28318 / 30.0000;
        float a2 = mod(atan(uv.y, uv.x) + time * 0.9000, seg2);
        if (a2 > seg2 * 0.5) a2 = seg2 - a2;
        float r2 = length(uv);
        vec2 p2 = vec2(cos(a2), sin(a2)) * r2;
        v += mod(length(p2)*6.0, 1.0);
    }    {
        float seg3 = 6.28318 / 40.0000;
        float a3 = mod(atan(uv.y, uv.x) + time * 1.2000, seg3);
        if (a3 > seg3 * 0.5) a3 = seg3 - a3;
        float r3 = length(uv);
        vec2 p3 = vec2(cos(a3), sin(a3)) * r3;
        v += mod(length(p3)*6.0, 1.0);
    }
    vec3 rgb = clamp(vec3(clamp(v/4.0000, 0.0, 1.0), clamp(v/4.0000, 0.0, 1.0)*0.5, 0.15), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}