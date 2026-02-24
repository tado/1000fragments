uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
mat2 rot2(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    vec2 p = uv;
    for(int i = 0; i < 6; i++) {
        p = rot2(time * 0.2 + float(i) * 0.5) * p;
        v += sin(p.x * 15.0) * sin(p.y * 15.0);
        p *= 1.5;
    }
    v = v * 0.1 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v, 1.0 - v, v * v, 1.0));
}
