uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*10.0000 + time*3.1000 + 0.0000) * 0.2500; st.y += cos(st.x*5.5000 + time*3.4100) * 0.0900;    st.x += sin(st.y*12.0000 + time*3.4000 + 1.5700) * 0.2500; st.y += cos(st.x*7.5000 + time*3.6100) * 0.0900;    st.x += sin(st.y*14.0000 + time*3.7000 + 3.1400) * 0.2500; st.y += cos(st.x*9.5000 + time*3.8100) * 0.0900;
    float v = abs(sin(st.x*5.5000 + st.y*10.0000 + time*3.1000));
    vec3 rgb = vec3(0.05, v*1.5, v*0.3);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}