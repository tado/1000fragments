uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y; st -= 0.5;
    float r = length(st), a = atan(st.y, st.x);
    st = vec2(a / 6.28318 * 6.0, r * 5.0 - time * 0.5);
    vec2 i_st = floor(st), f_st = fract(st);
    float m_dist = 1.0;
    for(int y = -1; y <= 1; y++) for(int x = -1; x <= 1; x++) {
        vec2 nb = vec2(float(x), float(y));
        vec2 pt = hash2(i_st + nb);
        pt = 0.5 + 0.5 * sin(time * 5.0 + 6.28 * pt);
        m_dist = min(m_dist, length(nb + pt - f_st));
    }
    float v = 1.0 - m_dist;
    fragColor = TDOutputSwizzle(vec4(v * v * 2.0, v * 0.5, v * 1.5, 1.0));
}
