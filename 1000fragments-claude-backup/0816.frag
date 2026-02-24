uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float radius = length(uv);
    float angle = atan(uv.y, uv.x) + time * 1.1000;
    float spiral = mod(angle * 3.0000 / 6.28318 + radius * 9.4000, 1.0);
    float v = smoothstep(0.0900, 0.0, abs(spiral - 0.5) - 0.0270);
    v *= smoothstep(1.0, 0.5, radius);
    vec3 rgb = vec3(v*1.8, v*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}