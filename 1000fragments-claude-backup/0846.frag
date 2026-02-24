uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float a = 0.4800;
    vec2 s1 = st * 13.0000;
    vec2 s2 = vec2(st.x*cos(a)-st.y*sin(a), st.x*sin(a)+st.y*cos(a)) * 13.5000;
    float g1 = sin(s1.x + time * 0.5000) * sin(s1.y + time * 0.3500);
    float g2 = sin(s2.x - time * 0.4500) * sin(s2.y - time * 0.4000);
    float v = (g1 + g2) * 0.5 + 0.5;
    vec3 rgb = vec3(v*1.8, v*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}