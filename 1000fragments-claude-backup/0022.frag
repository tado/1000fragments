uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.1544,0.4448))*23.6000 - time*13.3000 + 0.0000);
    val += sin(length(st - vec2(0.7206,0.2283))*23.6000 - time*13.8000 + 1.0470);
    val += sin(length(st - vec2(0.6250,0.8269))*23.6000 - time*14.3000 + 2.0940);
    val /= 3.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(0.1, v*0.6, v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}