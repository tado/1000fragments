uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float t = time * 1.6000;
    float v = sin(st.x * 52.0000 + t);
    v += sin(st.y * 37.0000 + t * 1.3);
    v += sin((st.x + st.y) * 10.5000 + t * 0.7);
    v += sin(length(st - 0.5) * 78.0000 - t * 2.0);
    v = v * 0.25 + 0.5;
    vec3 rgb = clamp(vec3(v*1.5, v*0.5, 1.0-v*0.8), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}