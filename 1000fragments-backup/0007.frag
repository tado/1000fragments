uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float bright = 0.0;
    for(float i = 0.0; i < 12.0; i++) {
        float a = i * 6.28318 / 12.0 + time * 0.3;
        vec2 c = vec2(cos(a) * 0.55, sin(a) * 0.55);
        float d = length(uv - c);
        bright += 0.015 / (d * d + 0.001);
    }
    float hue = time * 0.2;
    fragColor = TDOutputSwizzle(vec4(
        bright * (sin(hue) * 0.5 + 0.5),
        bright * (sin(hue + 2.094) * 0.5 + 0.5),
        bright * (sin(hue + 4.189) * 0.5 + 0.5), 1.0));
}
