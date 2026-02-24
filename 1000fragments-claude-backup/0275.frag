uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = abs(sin(st.x*6.0000 + time*15.5000))*abs(sin(st.y*6.0000 - time*10.8500));
    vec3 rgb = vec3(1.0-v*0.9, v*0.2, v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}