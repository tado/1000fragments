uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*7.0000 + time*3.9000 + 0.0000) * 0.2500; st.y += cos(st.x*14.5000 + time*4.2900) * 0.0900;    st.x += sin(st.y*9.0000 + time*4.2000 + 1.5700) * 0.2500; st.y += cos(st.x*16.5000 + time*4.4900) * 0.0900;    st.x += sin(st.y*11.0000 + time*4.5000 + 3.1400) * 0.2500; st.y += cos(st.x*18.5000 + time*4.6900) * 0.0900;
    float v = abs(sin(st.x*14.5000 + st.y*7.0000 + time*3.9000));
    vec3 rgb = vec3(abs(sin(v*3.14159)), abs(sin(v*3.14159+2.094)), abs(sin(v*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}