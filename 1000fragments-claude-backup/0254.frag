uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = abs(sin((st.x+st.y)*4.4400 + time*7.1000));
    vec3 rgb = vec3(v*2.5, v*0.4, v*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}