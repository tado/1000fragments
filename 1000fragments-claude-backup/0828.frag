uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float radius = length(uv);
    float angle = atan(uv.y, uv.x) + time * 1.1000;
    float spiral = mod(angle * 1.0000 / 6.28318 + radius * 14.2000, 1.0);
    float v = smoothstep(0.1700, 0.0, abs(spiral - 0.5) - 0.0510);
    v *= smoothstep(1.0, 0.5, radius);
    vec3 rgb = vec3(v*0.3, v*1.2, v*0.8);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}