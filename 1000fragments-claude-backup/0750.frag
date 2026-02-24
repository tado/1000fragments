uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float stars = 0.0;
    {
        vec2 lv = fract(uv * 29.0000 + vec2(0.0, time * 0.1500)) - 0.5;
        float star = 0.0020 / length(lv);
        stars += star * 0.5000;
    }    {
        vec2 lv = fract(uv * 44.0000 + vec2(0.0, time * 0.3000)) - 0.5;
        float star = 0.0040 / length(lv);
        stars += star * 0.8000;
    }    {
        vec2 lv = fract(uv * 59.0000 + vec2(0.0, time * 0.4500)) - 0.5;
        float star = 0.0060 / length(lv);
        stars += star * 1.1000;
    }    {
        vec2 lv = fract(uv * 74.0000 + vec2(0.0, time * 0.6000)) - 0.5;
        float star = 0.0080 / length(lv);
        stars += star * 1.4000;
    }
    stars = clamp(stars, 0.0, 1.0);
    vec3 rgb = clamp(vec3(stars), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}