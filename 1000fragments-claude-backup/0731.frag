uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float stars = 0.0;
    {
        vec2 lv = fract(uv * 23.3000 + vec2(0.0, time * 0.5250)) - 0.5;
        float star = 0.0040 / length(lv);
        stars += star * 0.5000;
    }    {
        vec2 lv = fract(uv * 38.3000 + vec2(0.0, time * 1.0500)) - 0.5;
        float star = 0.0080 / length(lv);
        stars += star * 0.8000;
    }    {
        vec2 lv = fract(uv * 53.3000 + vec2(0.0, time * 1.5750)) - 0.5;
        float star = 0.0120 / length(lv);
        stars += star * 1.1000;
    }    {
        vec2 lv = fract(uv * 68.3000 + vec2(0.0, time * 2.1000)) - 0.5;
        float star = 0.0160 / length(lv);
        stars += star * 1.4000;
    }    {
        vec2 lv = fract(uv * 83.3000 + vec2(0.0, time * 2.6250)) - 0.5;
        float star = 0.0200 / length(lv);
        stars += star * 1.7000;
    }
    stars = clamp(stars, 0.0, 1.0);
    vec3 rgb = clamp(vec3(stars*0.4, stars*1.2, stars*0.6), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}