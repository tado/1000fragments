uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.8631,0.3321))*37.2000 - time*15.1000 + 0.0000);
    val += sin(length(st - vec2(0.7719,0.7934))*37.2000 - time*15.6000 + 1.0470);
    val += sin(length(st - vec2(0.3050,0.8492))*37.2000 - time*16.1000 + 2.0940);
    val += sin(length(st - vec2(0.1076,0.4224))*37.2000 - time*16.6000 + 3.1410);
    val += sin(length(st - vec2(0.4525,0.1028))*37.2000 - time*17.1000 + 4.1880);
    val /= 5.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v, v*0.1, 1.0-v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}