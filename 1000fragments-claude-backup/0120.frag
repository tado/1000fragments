uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*8.5000 + time*1.5000 + 0.0000) * 0.0500; st.y += cos(st.x*4.0000 + time*1.6500) * 0.1300;
    float v = abs(sin(st.x*4.0000 + st.y*8.5000 + time*1.5000));
    vec3 rgb = vec3(v);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}