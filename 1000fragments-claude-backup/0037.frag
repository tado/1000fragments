uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.7229,0.2992))*35.6000 - time*11.5000 + 0.0000);
    val += sin(length(st - vec2(0.5624,0.7934))*35.6000 - time*12.0000 + 1.0470);
    val += sin(length(st - vec2(0.2147,0.4073))*35.6000 - time*12.5000 + 2.0940);
    val /= 3.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(0.05, v*1.5, v*0.3);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}