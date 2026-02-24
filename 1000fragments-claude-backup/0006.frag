uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.7176,0.7742))*10.8000 - time*13.3000 + 0.0000);
    val += sin(length(st - vec2(0.2824,0.2258))*10.8000 - time*13.8000 + 1.0470);
    val /= 2.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v*1.8, v*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}