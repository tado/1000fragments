uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
mat2 rot2(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    uv = rot2(time * 0.3) * uv;
    uv = abs(uv);
    float v = step(uv.x, 0.01) + step(uv.y, 0.01);
    for(float i = 1.0; i < 6.0; i++) {
        vec2 p = rot2(time * 0.1 * i) * uv * i;
        v += step(fract(p.x), 0.05) + step(fract(p.y), 0.05);
    }
    v = min(v, 1.0);
    fragColor = TDOutputSwizzle(vec4(v, v * 0.7, v * 0.3, 1.0));
}
