uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*14.5000 + time*3.9000 + 0.0000) * 0.2100; st.y += cos(st.x*10.0000 + time*4.2900) * 0.0500;    st.x += sin(st.y*16.5000 + time*4.2000 + 1.5700) * 0.2100; st.y += cos(st.x*12.0000 + time*4.4900) * 0.0500;
    float v = abs(sin(st.x*10.0000 + st.y*14.5000 + time*3.9000));
    vec3 rgb = vec3(v*0.3, v*1.2, v*0.8);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}