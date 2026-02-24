uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.6323,0.1760))*33.2000 - time*6.1000 + 0.0000);
    val += sin(length(st - vec2(0.8491,0.5257))*33.2000 - time*6.6000 + 1.0470);
    val += sin(length(st - vec2(0.5834,0.8399))*33.2000 - time*7.1000 + 2.0940);
    val += sin(length(st - vec2(0.2025,0.6844))*33.2000 - time*7.6000 + 3.1410);
    val += sin(length(st - vec2(0.2327,0.2741))*33.2000 - time*8.1000 + 4.1880);
    val /= 5.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v*2.5, v*0.4, v*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}