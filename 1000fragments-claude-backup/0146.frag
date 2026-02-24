uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*11.5000 + time*2.3000 + 0.0000) * 0.1300; st.y += cos(st.x*7.0000 + time*2.5300) * 0.2100;    st.x += sin(st.y*13.5000 + time*2.6000 + 1.5700) * 0.1300; st.y += cos(st.x*9.0000 + time*2.7300) * 0.2100;    st.x += sin(st.y*15.5000 + time*2.9000 + 3.1400) * 0.1300; st.y += cos(st.x*11.0000 + time*2.9300) * 0.2100;
    float v = abs(sin(st.x*7.0000 + st.y*11.5000 + time*2.3000));
    vec3 rgb = vec3(v*1.8, v*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}