uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*5.5000 + time*3.1000 + 0.0000) * 0.2100; st.y += cos(st.x*13.0000 + time*3.4100) * 0.0500;    st.x += sin(st.y*7.5000 + time*3.4000 + 1.5700) * 0.2100; st.y += cos(st.x*15.0000 + time*3.6100) * 0.0500;
    float v = abs(sin(st.x*13.0000 + st.y*5.5000 + time*3.1000));
    vec3 rgb = vec3(0.1, v*0.6, v);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}