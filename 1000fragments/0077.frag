uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;
    vec2 g = floor(uv * 12.0);
    vec2 f = fract(uv * 12.0);
    float stripe = step(0.5, fract(dot(g, vec2(0.7, 0.3)) + time * 0.5));
    float border = step(0.05, f.x) * step(0.05, f.y) * step(f.x, 0.95) * step(f.y, 0.95);
    float hue = dot(g, vec2(0.13, 0.07)) + time * 0.1;
    vec3 col = vec3(sin(hue*6.28)*0.5+0.5, sin(hue*6.28+2.094)*0.5+0.5, sin(hue*6.28+4.189)*0.5+0.5);
    col = mix(vec3(0.0), col * stripe, border);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
