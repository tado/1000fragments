uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.3889,0.7787))*16.4000 - time*11.5000 + 0.0000);
    val += sin(length(st - vec2(0.2213,0.3889))*16.4000 - time*12.0000 + 1.0470);
    val += sin(length(st - vec2(0.6111,0.2213))*16.4000 - time*12.5000 + 2.0940);
    val += sin(length(st - vec2(0.7787,0.6111))*16.4000 - time*13.0000 + 3.1410);
    val /= 4.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(abs(sin(v*3.14159)), abs(sin(v*3.14159+2.094)), abs(sin(v*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}