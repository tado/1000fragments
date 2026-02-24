uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.1189,0.3786))*24.4000 - time*15.1000 + 0.0000);
    val += sin(length(st - vec2(0.6214,0.1189))*24.4000 - time*15.6000 + 1.0470);
    val += sin(length(st - vec2(0.8811,0.6214))*24.4000 - time*16.1000 + 2.0940);
    val += sin(length(st - vec2(0.3786,0.8811))*24.4000 - time*16.6000 + 3.1410);
    val /= 4.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(abs(sin(v*3.14159)), abs(sin(v*3.14159+2.094)), abs(sin(v*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}