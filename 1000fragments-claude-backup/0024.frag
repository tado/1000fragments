uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.2758,0.3894))*25.2000 - time*2.5000 + 0.0000);
    val += sin(length(st - vec2(0.5359,0.2526))*25.2000 - time*3.0000 + 1.0470);
    val += sin(length(st - vec2(0.7464,0.4577))*25.2000 - time*3.5000 + 2.0940);
    val += sin(length(st - vec2(0.6163,0.7213))*25.2000 - time*4.0000 + 3.1410);
    val += sin(length(st - vec2(0.3255,0.6790))*25.2000 - time*4.5000 + 4.1880);
    val /= 5.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v*2.5, v*0.4, v*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}