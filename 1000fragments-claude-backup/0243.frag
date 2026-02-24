uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = abs(sin(st.x*15.0000 + time*2.7000))*abs(sin(st.y*15.0000 - time*1.8900));
    vec3 rgb = vec3(abs(sin(v*3.14159)), abs(sin(v*3.14159+2.094)), abs(sin(v*3.14159+4.189)));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}