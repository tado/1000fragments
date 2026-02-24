uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float stars = 0.0;
    {
        vec2 lv = fract(uv * 31.4000 + vec2(0.0, time * 0.3000)) - 0.5;
        float star = 0.0080 / length(lv);
        stars += star * 0.5000;
    }    {
        vec2 lv = fract(uv * 46.4000 + vec2(0.0, time * 0.6000)) - 0.5;
        float star = 0.0160 / length(lv);
        stars += star * 0.8000;
    }    {
        vec2 lv = fract(uv * 61.4000 + vec2(0.0, time * 0.9000)) - 0.5;
        float star = 0.0240 / length(lv);
        stars += star * 1.1000;
    }    {
        vec2 lv = fract(uv * 76.4000 + vec2(0.0, time * 1.2000)) - 0.5;
        float star = 0.0320 / length(lv);
        stars += star * 1.4000;
    }
    stars = clamp(stars, 0.0, 1.0);
    vec3 rgb = clamp(vec3(stars*0.3, stars*0.7, stars), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}