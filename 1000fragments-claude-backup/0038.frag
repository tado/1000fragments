uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.7921,0.3073))*36.4000 - time*13.3000 + 0.0000);
    val += sin(length(st - vec2(0.6927,0.7921))*36.4000 - time*13.8000 + 1.0470);
    val += sin(length(st - vec2(0.2079,0.6927))*36.4000 - time*14.3000 + 2.0940);
    val += sin(length(st - vec2(0.3073,0.2079))*36.4000 - time*14.8000 + 3.1410);
    val /= 4.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v*0.3, v*1.2, v*0.8);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}