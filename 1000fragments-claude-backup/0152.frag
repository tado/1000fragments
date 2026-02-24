uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*8.5000 + time*3.1000 + 0.0000) * 0.1300; st.y += cos(st.x*4.0000 + time*3.4100) * 0.2100;    st.x += sin(st.y*10.5000 + time*3.4000 + 1.5700) * 0.1300; st.y += cos(st.x*6.0000 + time*3.6100) * 0.2100;    st.x += sin(st.y*12.5000 + time*3.7000 + 3.1400) * 0.1300; st.y += cos(st.x*8.0000 + time*3.8100) * 0.2100;
    float v = abs(sin(st.x*4.0000 + st.y*8.5000 + time*3.1000));
    vec3 rgb = vec3(0.1, v*0.6, v);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}