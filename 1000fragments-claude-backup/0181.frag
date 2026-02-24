uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st -= 0.5;
    st.x *= resolution.x / resolution.y;
    float d = length(st);
    vec3 rgb = vec3(sin(d*22.7000-time*10.5000)*0.5+0.5,sin(d*29.2830-time*11.5500)*0.5+0.5,sin(d*35.8660-time*12.6000)*0.5+0.5);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}