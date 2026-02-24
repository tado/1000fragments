uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float a = 2.0000;
    vec2 s1 = st * 22.5000;
    vec2 s2 = vec2(st.x*cos(a)-st.y*sin(a), st.x*sin(a)+st.y*cos(a)) * 23.0000;
    float g1 = sin(s1.x + time * 0.7000) * sin(s1.y + time * 0.4900);
    float g2 = sin(s2.x - time * 0.6300) * sin(s2.y - time * 0.5600);
    float v = (g1 + g2) * 0.5 + 0.5;
    vec3 rgb = vec3(1.0-v*0.9, v*0.2, v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}