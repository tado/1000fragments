uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    {
        float seg0 = 6.28318 / 5.0000;
        float a0 = mod(atan(uv.y, uv.x) + time * 0.4000, seg0);
        if (a0 > seg0 * 0.5) a0 = seg0 - a0;
        float r0 = length(uv);
        vec2 p0 = vec2(cos(a0), sin(a0)) * r0;
        v += step(0.5, sin(p0.x*8.0)*sin(p0.y*8.0)*0.5+0.5);
    }    {
        float seg1 = 6.28318 / 10.0000;
        float a1 = mod(atan(uv.y, uv.x) + time * 0.8000, seg1);
        if (a1 > seg1 * 0.5) a1 = seg1 - a1;
        float r1 = length(uv);
        vec2 p1 = vec2(cos(a1), sin(a1)) * r1;
        v += step(0.5, sin(p1.x*8.0)*sin(p1.y*8.0)*0.5+0.5);
    }    {
        float seg2 = 6.28318 / 15.0000;
        float a2 = mod(atan(uv.y, uv.x) + time * 1.2000, seg2);
        if (a2 > seg2 * 0.5) a2 = seg2 - a2;
        float r2 = length(uv);
        vec2 p2 = vec2(cos(a2), sin(a2)) * r2;
        v += step(0.5, sin(p2.x*8.0)*sin(p2.y*8.0)*0.5+0.5);
    }
    vec3 rgb = clamp(vec3(0.1, clamp(v/3.0000, 0.0, 1.0)*0.6, clamp(v/3.0000, 0.0, 1.0)), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}