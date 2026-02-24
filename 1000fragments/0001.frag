uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float val = 0.0;
    for(float i = 0.0; i < 8.0; i++) {
        vec2 c = vec2(cos(time * 0.3 + i * 1.2) * 0.6, sin(time * 0.4 + i * 0.9) * 0.6);
        float d = length(uv - c);
        val += sin(d * 20.0 - time * 8.0) / (d + 0.3);
    }
    val *= 0.15;
    fragColor = TDOutputSwizzle(vec4(val * 1.2, val * 0.4, val * 2.0, 1.0));
}
