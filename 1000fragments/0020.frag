uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv -= 0.5;
    uv.x += sin(uv.y * 10.0 + time * 3.0) * 0.1;
    uv.y += cos(uv.x * 10.0 + time * 2.0) * 0.1;
    float v = sin(uv.x * 20.0 + time) * sin(uv.y * 20.0 + time);
    v = v * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v, v * 0.5, 1.0 - v, 1.0));
}
