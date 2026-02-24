uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
mat2 rot2(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    for(float i = 1.0; i <= 5.0; i++) {
        vec2 p = rot2(time * 0.3 * i + i) * uv;
        v += abs(sin(p.x * 20.0 * i)) / i;
    }
    v = mod(v, 1.0);
    fragColor = TDOutputSwizzle(vec4(v, v * v, 1.0 - v, 1.0));
}
