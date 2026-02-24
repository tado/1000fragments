uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = abs(sin(st.y*12.5664 + time*7.9000));
    vec3 rgb = vec3(v*1.8, v*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}