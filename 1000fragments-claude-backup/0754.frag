uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float stars = 0.0;
    {
        vec2 lv = fract(uv * 30.2000 + vec2(0.0, time * 0.4500)) - 0.5;
        float star = 0.0100 / length(lv);
        stars += star * 0.5000;
    }    {
        vec2 lv = fract(uv * 45.2000 + vec2(0.0, time * 0.9000)) - 0.5;
        float star = 0.0200 / length(lv);
        stars += star * 0.8000;
    }    {
        vec2 lv = fract(uv * 60.2000 + vec2(0.0, time * 1.3500)) - 0.5;
        float star = 0.0300 / length(lv);
        stars += star * 1.1000;
    }    {
        vec2 lv = fract(uv * 75.2000 + vec2(0.0, time * 1.8000)) - 0.5;
        float star = 0.0400 / length(lv);
        stars += star * 1.4000;
    }
    stars = clamp(stars, 0.0, 1.0);
    vec3 rgb = clamp(hsb2rgb(vec3(stars*0.3, 0.7, stars)), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}