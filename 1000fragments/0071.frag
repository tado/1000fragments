uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    float sz = 8.0 + sin(time * 0.5) * 4.0;
    vec2 g = floor(uv * sz);
    float checker = mod(g.x + g.y, 2.0);
    float hue = (g.x + g.y) * 0.1 + time * 0.3;
    vec3 col = checker * vec3(sin(hue)*0.5+0.5, sin(hue+2.094)*0.5+0.5, sin(hue+4.189)*0.5+0.5);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
