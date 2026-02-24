uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*14.5000 + time*1.5000 + 0.0000) * 0.1300; st.y += cos(st.x*10.0000 + time*1.6500) * 0.2100;    st.x += sin(st.y*16.5000 + time*1.8000 + 1.5700) * 0.1300; st.y += cos(st.x*12.0000 + time*1.8500) * 0.2100;    st.x += sin(st.y*18.5000 + time*2.1000 + 3.1400) * 0.1300; st.y += cos(st.x*14.0000 + time*2.0500) * 0.2100;
    float v = abs(sin(st.x*10.0000 + st.y*14.5000 + time*1.5000));
    vec3 rgb = vec3(v);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}