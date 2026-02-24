uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.4684,0.8987))*14.8000 - time*7.9000 + 0.0000);
    val += sin(length(st - vec2(0.5316,0.1013))*14.8000 - time*8.4000 + 1.0470);
    val /= 2.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v, v*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}