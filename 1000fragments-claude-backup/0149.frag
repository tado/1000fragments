uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*4.0000 + time*4.7000 + 0.0000) * 0.2500; st.y += cos(st.x*11.5000 + time*5.1700) * 0.0900;    st.x += sin(st.y*6.0000 + time*5.0000 + 1.5700) * 0.2500; st.y += cos(st.x*13.5000 + time*5.3700) * 0.0900;    st.x += sin(st.y*8.0000 + time*5.3000 + 3.1400) * 0.2500; st.y += cos(st.x*15.5000 + time*5.5700) * 0.0900;
    float v = abs(sin(st.x*11.5000 + st.y*4.0000 + time*4.7000));
    vec3 rgb = vec3(v, v*0.1, 1.0-v);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}