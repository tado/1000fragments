uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = abs(sin(st.x*18.0000 + time*17.1000))*abs(sin(st.y*18.0000 - time*11.9700));
    vec3 rgb = vec3(v, v*0.1, 1.0-v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}