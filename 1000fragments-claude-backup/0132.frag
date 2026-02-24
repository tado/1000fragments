uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*14.5000 + time*3.1000 + 0.0000) * 0.0500; st.y += cos(st.x*10.0000 + time*3.4100) * 0.1300;
    float v = abs(sin(st.x*10.0000 + st.y*14.5000 + time*3.1000));
    vec3 rgb = vec3(0.1, v*0.6, v);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}