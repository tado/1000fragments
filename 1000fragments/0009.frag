uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float r = 0.0, g = 0.0, b = 0.0;
    for(float i = 0.0; i < 9.0; i++) {
        float px = sin(time * (0.1 + i * 0.03) + i * 2.1) * 0.6;
        float py = cos(time * (0.13 + i * 0.02) + i * 1.4) * 0.6;
        float d = length(uv - vec2(px, py));
        float f = sin(d * 35.0 - time * 8.0) * 0.5 + 0.5;
        r += f * (sin(i) * 0.5 + 0.5);
        g += f * (sin(i + 2.094) * 0.5 + 0.5);
        b += f * (sin(i + 4.189) * 0.5 + 0.5);
    }
    fragColor = TDOutputSwizzle(vec4(r / 9.0, g / 9.0, b / 9.0, 1.0));
}
