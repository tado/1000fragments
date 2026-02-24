uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float stars = 0.0;
    {
        vec2 lv = fract(uv * 24.5000 + vec2(0.0, time * 0.3750)) - 0.5;
        float star = 0.0020 / length(lv);
        stars += star * 0.5000;
    }    {
        vec2 lv = fract(uv * 39.5000 + vec2(0.0, time * 0.7500)) - 0.5;
        float star = 0.0040 / length(lv);
        stars += star * 0.8000;
    }    {
        vec2 lv = fract(uv * 54.5000 + vec2(0.0, time * 1.1250)) - 0.5;
        float star = 0.0060 / length(lv);
        stars += star * 1.1000;
    }    {
        vec2 lv = fract(uv * 69.5000 + vec2(0.0, time * 1.5000)) - 0.5;
        float star = 0.0080 / length(lv);
        stars += star * 1.4000;
    }    {
        vec2 lv = fract(uv * 84.5000 + vec2(0.0, time * 1.8750)) - 0.5;
        float star = 0.0100 / length(lv);
        stars += star * 1.7000;
    }
    stars = clamp(stars, 0.0, 1.0);
    vec3 rgb = clamp(vec3(stars*1.5, stars*0.5, stars*2.0), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}