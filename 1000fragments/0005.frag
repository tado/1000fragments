uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
    float r = 0.0, g = 0.0, b = 0.0;
    for(float i = 0.0; i < 7.0; i++) {
        vec2 c = vec2(sin(time * 0.2 + i * 6.28318 / 7.0) * 0.4,
                      cos(time * 0.2 + i * 6.28318 / 7.0) * 0.4);
        float d = length(uv - c);
        float wave = sin(d * 40.0 - time * 20.0) * 0.5 + 0.5;
        r += wave * (sin(i * 1.1) * 0.5 + 0.5);
        g += wave * (sin(i * 1.1 + 2.1) * 0.5 + 0.5);
        b += wave * (sin(i * 1.1 + 4.2) * 0.5 + 0.5);
    }
    fragColor = TDOutputSwizzle(vec4(r / 7.0, g / 7.0, b / 7.0, 1.0));
}
