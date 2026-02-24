uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st -= 0.5;
    st.x *= resolution.x / resolution.y;
    float d = length(st);
    vec3 rgb = vec3(sin(d*15.7000-time*7.5000)*0.5+0.5,sin(d*22.7650-time*8.2500)*0.5+0.5,sin(d*29.8300-time*9.0000)*0.5+0.5);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}