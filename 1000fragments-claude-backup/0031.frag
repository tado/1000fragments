uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.4751,0.1008))*30.8000 - time*15.1000 + 0.0000);
    val += sin(length(st - vec2(0.5249,0.8992))*30.8000 - time*15.6000 + 1.0470);
    val /= 2.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v, v*0.5, 0.15);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}