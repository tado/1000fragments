uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.3936,0.2195))*29.2000 - time*11.5000 + 0.0000);
    val += sin(length(st - vec2(0.7339,0.3122))*29.2000 - time*12.0000 + 1.0470);
    val += sin(length(st - vec2(0.7509,0.6644))*29.2000 - time*12.5000 + 2.0940);
    val += sin(length(st - vec2(0.4212,0.7895))*29.2000 - time*13.0000 + 3.1410);
    val += sin(length(st - vec2(0.2003,0.5145))*29.2000 - time*13.5000 + 4.1880);
    val /= 5.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v, v*0.1, 1.0-v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}