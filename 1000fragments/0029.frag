uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 p = uv;
    for(int i = 0; i < 6; i++) {
        p = abs(p) / dot(p, p) - 0.5;
        p.x += sin(time * 0.1 + float(i)) * 0.05;
    }
    float v = length(p);
    v = sin(v * 10.0 - time * 3.0) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v, v * 0.3, 1.0 - v, 1.0));
}
