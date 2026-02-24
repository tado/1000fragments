uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float radius = length(uv);
    float angle = atan(uv.y, uv.x) + time * 0.9000;
    float spiral = mod(angle * 7.0000 / 6.28318 + radius * 13.8000, 1.0);
    float v = smoothstep(0.1300, 0.0, abs(spiral - 0.5) - 0.0390);
    v *= smoothstep(1.0, 0.5, radius);
    vec3 rgb = vec3(0.05, v*1.5, v*0.3);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}