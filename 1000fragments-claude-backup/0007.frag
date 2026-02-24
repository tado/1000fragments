uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.6990,0.8470))*11.6000 - time*15.1000 + 0.0000);
    val += sin(length(st - vec2(0.1000,0.4989))*11.6000 - time*15.6000 + 1.0470);
    val += sin(length(st - vec2(0.7010,0.1542))*11.6000 - time*16.1000 + 2.0940);
    val /= 3.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(0.05, v*1.5, v*0.3);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}