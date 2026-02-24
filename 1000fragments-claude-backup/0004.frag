uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.7063,0.6412))*9.2000 - time*9.7000 + 0.0000);
    val += sin(length(st - vec2(0.4295,0.7399))*9.2000 - time*10.2000 + 1.0470);
    val += sin(length(st - vec2(0.2501,0.5071))*9.2000 - time*10.7000 + 2.0940);
    val += sin(length(st - vec2(0.4160,0.2645))*9.2000 - time*11.2000 + 3.1410);
    val += sin(length(st - vec2(0.6980,0.3474))*9.2000 - time*11.7000 + 4.1880);
    val /= 5.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v*2.5, v*0.4, v*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}