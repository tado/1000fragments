uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float r = 0.0, g = 0.0, b = 0.0;
    for(float s = 1.0; s <= 4.0; s++) {
        vec2 grd = fract(uv * pow(2.0, s) + time * 0.05 * s) - 0.5;
        float d = length(grd);
        float v = step(d, 0.3);
        r += v * (sin(s * 1.1 + time * 0.3) * 0.5 + 0.5);
        g += v * (sin(s * 1.1 + time * 0.3 + 2.094) * 0.5 + 0.5);
        b += v * (sin(s * 1.1 + time * 0.3 + 4.189) * 0.5 + 0.5);
    }
    fragColor = TDOutputSwizzle(vec4(r/4.0, g/4.0, b/4.0, 1.0));
}
