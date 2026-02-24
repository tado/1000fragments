uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st -= 0.5;
    st.x *= resolution.x / resolution.y;
    float d = length(st);
    vec3 rgb = vec3(abs(sin(d*31.1000-time*4.5000)), abs(cos(d*40.4300-time*3.1500)), 0.5);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}