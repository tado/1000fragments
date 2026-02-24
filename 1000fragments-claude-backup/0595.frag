uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float t = time * 1.0000;
    float v = sin(st.x * 60.0000 + t);
    v += sin(st.y * 30.0000 + t * 1.3);
    v += sin((st.x + st.y) * 29.4000 + t * 0.7);
    v += sin(length(st - 0.5) * 90.0000 - t * 2.0);
    v = v * 0.25 + 0.5;
    vec3 rgb = clamp(vec3(abs(sin(v*3.14159)), abs(sin(v*3.14159+2.094)), abs(sin(v*3.14159+4.189))), 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}