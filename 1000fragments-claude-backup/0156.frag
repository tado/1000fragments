uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*14.5000 + time*2.3000 + 0.0000) * 0.0500; st.y += cos(st.x*10.0000 + time*2.5300) * 0.1300;
    float v = abs(sin(st.x*10.0000 + st.y*14.5000 + time*2.3000));
    vec3 rgb = vec3(v*1.8, v*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}