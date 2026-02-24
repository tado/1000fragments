uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.5706,0.2084))*32.4000 - time*4.3000 + 0.0000);
    val += sin(length(st - vec2(0.7916,0.5706))*32.4000 - time*4.8000 + 1.0470);
    val += sin(length(st - vec2(0.4294,0.7916))*32.4000 - time*5.3000 + 2.0940);
    val += sin(length(st - vec2(0.2084,0.4294))*32.4000 - time*5.8000 + 3.1410);
    val /= 4.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(abs(sin(v*3.14159)), abs(sin(v*3.14159+2.094)), abs(sin(v*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}