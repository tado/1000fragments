uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float z = length(uv) + 0.001;
    vec2 tp = uv / z;
    tp.x += sin(tp.y * 3.0 + time) * 0.3;
    float grid = step(0.45, fract(tp.x * 4.0 + time * 0.5)) * step(0.45, fract(tp.y * 4.0));
    float fog = exp(-z * 4.0);
    vec3 col = vec3(0.0, 0.5, 1.0) * grid * fog + vec3(0.05, 0.0, 0.1) * (1.0 - fog);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
