uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st -= 0.5;
    st.x *= resolution.x / resolution.y;
    float d = length(st);
    vec3 rgb = vec3(abs(sin(d*10.1000-time*7.5000)), abs(cos(d*13.1300-time*5.2500)), 0.5);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}