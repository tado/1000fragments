uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
mat2 rot2(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float scale = 1.0, v = 0.0;
    for(int i = 0; i < 5; i++) {
        uv = rot2(time * 0.15 + float(i) * 0.8) * uv;
        vec2 p = fract(uv * scale) - 0.5;
        v += length(p) / scale;
        scale *= 2.0;
    }
    v = mod(v, 1.0);
    fragColor = TDOutputSwizzle(vec4(1.0 - v, v * 0.5, v * v, 1.0));
}
