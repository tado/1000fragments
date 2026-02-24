uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    for(float k = 1.0; k <= 6.0; k++) {
        vec2 p = uv;
        p.x += sin(p.y * k * 3.0 + time * k * 0.5) * 0.15 / k;
        p.y += cos(p.x * k * 3.0 + time * k * 0.4) * 0.15 / k;
        v += sin(p.x * k * 8.0 + p.y * k * 8.0 + time * 2.0) / k;
    }
    v = v * 0.3 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v * v, v, v * 0.2, 1.0));
}
