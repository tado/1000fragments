uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.3157,0.6689))*18.8000 - time*2.5000 + 0.0000);
    val += sin(length(st - vec2(0.6843,0.3311))*18.8000 - time*3.0000 + 1.0470);
    val /= 2.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v*1.8, v*0.7, 0.1);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}