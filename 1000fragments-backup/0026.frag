uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
mat2 rot2(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    for(int i = 0; i < 3; i++) {
        float fi = float(i);
        uv = rot2(time * (0.5 + fi * 0.3)) * uv;
        uv.x += sin(uv.y * 4.0 + time) * 0.2;
    }
    float grid = step(0.48, fract(uv.x * 5.0)) + step(0.48, fract(uv.y * 5.0));
    fragColor = TDOutputSwizzle(vec4(grid, grid * 0.5, 1.0 - grid * 0.5, 1.0));
}
