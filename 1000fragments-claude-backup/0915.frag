uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    {
        float seg0 = 6.28318 / 6.0000;
        float a0 = mod(atan(uv.y, uv.x) + time * 0.7000, seg0);
        if (a0 > seg0 * 0.5) a0 = seg0 - a0;
        float r0 = length(uv);
        vec2 p0 = vec2(cos(a0), sin(a0)) * r0;
        v += sin(length(p0)*8.0)*0.5+0.5;
    }    {
        float seg1 = 6.28318 / 12.0000;
        float a1 = mod(atan(uv.y, uv.x) + time * 1.4000, seg1);
        if (a1 > seg1 * 0.5) a1 = seg1 - a1;
        float r1 = length(uv);
        vec2 p1 = vec2(cos(a1), sin(a1)) * r1;
        v += sin(length(p1)*8.0)*0.5+0.5;
    }    {
        float seg2 = 6.28318 / 18.0000;
        float a2 = mod(atan(uv.y, uv.x) + time * 2.1000, seg2);
        if (a2 > seg2 * 0.5) a2 = seg2 - a2;
        float r2 = length(uv);
        vec2 p2 = vec2(cos(a2), sin(a2)) * r2;
        v += sin(length(p2)*8.0)*0.5+0.5;
    }    {
        float seg3 = 6.28318 / 24.0000;
        float a3 = mod(atan(uv.y, uv.x) + time * 2.8000, seg3);
        if (a3 > seg3 * 0.5) a3 = seg3 - a3;
        float r3 = length(uv);
        vec2 p3 = vec2(cos(a3), sin(a3)) * r3;
        v += sin(length(p3)*8.0)*0.5+0.5;
    }
    vec3 rgb = clamp(vec3(1.0-clamp(v/4.0000, 0.0, 1.0)*0.9, clamp(v/4.0000, 0.0, 1.0)*0.2, clamp(v/4.0000, 0.0, 1.0)), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}