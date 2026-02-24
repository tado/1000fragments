uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.5219,0.2510))*31.6000 - time*2.5000 + 0.0000);
    val += sin(length(st - vec2(0.7047,0.6435))*31.6000 - time*3.0000 + 1.0470);
    val += sin(length(st - vec2(0.2734,0.6056))*31.6000 - time*3.5000 + 2.0940);
    val /= 3.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(0.1, v*0.6, v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}