uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x += sin(st.y*8.5000 + time*4.7000 + 0.0000) * 0.0500; st.y += cos(st.x*4.0000 + time*5.1700) * 0.1300;
    float v = abs(sin(st.x*4.0000 + st.y*8.5000 + time*4.7000));
    vec3 rgb = vec3(v*2.5, v*0.4, v*3.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}