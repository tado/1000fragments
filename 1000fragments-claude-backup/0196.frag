uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st -= 0.5;
    st.x *= resolution.x / resolution.y;
    float d = length(st);
    vec3 rgb = vec3(sin(d*33.2000-time*9.0000)*0.5+0.5,sin(d*34.8600-time*9.9000)*0.5+0.5,sin(d*36.5200-time*10.8000)*0.5+0.5);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}