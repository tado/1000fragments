uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.5000,0.5000))*34.0000 - time*7.9000 + 0.0000);
    val /= 1.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(1.0-v*0.9, v*0.2, v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}