uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0;
    for(float i = 0.0; i < 8.0; i++) {
        float a = i * 3.14159 / 4.0 + time * 0.1;
        vec2 dir = vec2(cos(a), sin(a));
        v += abs(sin(dot(uv, dir) * 20.0 + time * 3.0)) / 8.0;
    }
    fragColor = TDOutputSwizzle(vec4(v * 2.0, v * 0.5, 1.0 - v, 1.0));
}
