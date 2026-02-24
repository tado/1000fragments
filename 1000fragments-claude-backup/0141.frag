uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*4.0000 + time*2.3000 + 0.0000) * 0.1700; st.y += cos(st.x*11.5000 + time*2.5300) * 0.2500;
    float v = abs(sin(st.x*11.5000 + st.y*4.0000 + time*2.3000));
    vec3 rgb = vec3(v, v*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}