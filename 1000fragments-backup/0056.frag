uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
    uv.x *= resolution.x / resolution.y;
    float r = length(uv) + 0.0001;
    float z = 0.2 / r;
    float a = atan(uv.y, uv.x);
    float stripe = mod(a / 3.14159 * 5.0 + z - time * 0.8, 2.0);
    float v = step(1.0, stripe);
    float depth_fade = min(z * 0.15, 1.0);
    fragColor = TDOutputSwizzle(vec4(v * depth_fade, v * depth_fade * 0.3, depth_fade * (1.0 - v), 1.0));
}
