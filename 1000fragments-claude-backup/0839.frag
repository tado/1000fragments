uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float radius = length(uv);
    float angle = atan(uv.y, uv.x) + time * 0.9000;
    float spiral = mod(angle * 5.0000 / 6.28318 + radius * 18.6000, 1.0);
    float v = smoothstep(0.2100, 0.0, abs(spiral - 0.5) - 0.0630);
    v *= smoothstep(1.0, 0.5, radius);
    vec3 rgb = vec3(v, v*0.1, 1.0-v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}