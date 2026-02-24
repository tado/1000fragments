uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float acc = 0.0;
    for(float i = 0.0; i < 5.0; i++) {
        vec2 c = vec2(sin(time * (0.2 + i * 0.05) + i * 2.5) * 0.7,
                      cos(time * (0.15 + i * 0.04) + i * 1.7) * 0.7);
        float d = length(uv - c);
        acc += sin(d * 30.0 - time * 12.0 + i) * 0.5 + 0.5;
    }
    acc /= 5.0;
    float r = sin(acc * 3.14159) * 0.5 + 0.5;
    float g = sin(acc * 3.14159 + 2.094) * 0.5 + 0.5;
    float b = sin(acc * 3.14159 + 4.189) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(r, g, b, 1.0));
}
