uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*14.5000 + time*4.7000 + 0.0000) * 0.2100; st.y += cos(st.x*10.0000 + time*5.1700) * 0.0500;    st.x += sin(st.y*16.5000 + time*5.0000 + 1.5700) * 0.2100; st.y += cos(st.x*12.0000 + time*5.3700) * 0.0500;
    float v = abs(sin(st.x*10.0000 + st.y*14.5000 + time*4.7000));
    vec3 rgb = vec3(v*2.5, v*0.4, v*3.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}