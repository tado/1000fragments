uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*10.0000 + time*2.3000 + 0.0000) * 0.0900; st.y += cos(st.x*5.5000 + time*2.5300) * 0.1700;    st.x += sin(st.y*12.0000 + time*2.6000 + 1.5700) * 0.0900; st.y += cos(st.x*7.5000 + time*2.7300) * 0.1700;
    float v = abs(sin(st.x*5.5000 + st.y*10.0000 + time*2.3000));
    vec3 rgb = vec3(v, v*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}