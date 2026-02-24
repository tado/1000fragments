uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
    p.x *= resolution.x / resolution.y;
    float depth = 0.3 / (length(p) + 0.001);
    vec2 tp = p / length(p) * depth;
    tp += vec2(time * 0.3, 0.0);
    float grid = max(step(0.47, fract(tp.x)), step(0.47, fract(tp.y)));
    float fog = exp(-length(p) * 3.0);
    fragColor = TDOutputSwizzle(vec4(grid * fog * 0.0, grid * fog * 1.0, grid * fog * 2.0, 1.0));
}
