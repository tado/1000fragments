uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*4.0000 + time*3.1000 + 0.0000) * 0.0900; st.y += cos(st.x*11.5000 + time*3.4100) * 0.1700;    st.x += sin(st.y*6.0000 + time*3.4000 + 1.5700) * 0.0900; st.y += cos(st.x*13.5000 + time*3.6100) * 0.1700;
    float v = abs(sin(st.x*11.5000 + st.y*4.0000 + time*3.1000));
    vec3 rgb = vec3(0.05, v*1.5, v*0.3);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}