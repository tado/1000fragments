uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*13.0000 + time*2.3000 + 0.0000) * 0.2500; st.y += cos(st.x*8.5000 + time*2.5300) * 0.0900;    st.x += sin(st.y*15.0000 + time*2.6000 + 1.5700) * 0.2500; st.y += cos(st.x*10.5000 + time*2.7300) * 0.0900;    st.x += sin(st.y*17.0000 + time*2.9000 + 3.1400) * 0.2500; st.y += cos(st.x*12.5000 + time*2.9300) * 0.0900;
    float v = abs(sin(st.x*8.5000 + st.y*13.0000 + time*2.3000));
    vec3 rgb = vec3(v, v*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}