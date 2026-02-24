uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.3233,0.8021))*17.2000 - time*13.3000 + 0.0000);
    val += sin(length(st - vec2(0.1581,0.4253))*17.2000 - time*13.8000 + 1.0470);
    val += sin(length(st - vec2(0.4654,0.1517))*17.2000 - time*14.3000 + 2.0940);
    val += sin(length(st - vec2(0.8205,0.3594))*17.2000 - time*14.8000 + 3.1410);
    val += sin(length(st - vec2(0.7327,0.7614))*17.2000 - time*15.3000 + 4.1880);
    val /= 5.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v*2.5, v*0.4, v*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}