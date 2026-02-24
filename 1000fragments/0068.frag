uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y; st *= 5.0;
    vec2 i_st = floor(st), f_st = fract(st);
    float m_dist = 1.0;
    for(int y = -1; y <= 1; y++) for(int x = -1; x <= 1; x++) {
        vec2 nb = vec2(float(x), float(y));
        vec2 pt = hash2(i_st + nb);
        pt = 0.5 + 0.5 * sin(time * 2.0 + 6.28 * pt);
        float d = abs(nb.x + pt.x - f_st.x) + abs(nb.y + pt.y - f_st.y);
        m_dist = min(m_dist, d);
    }
    float v = sin(m_dist * 15.0 - time * 4.0) * 0.5 + 0.5;
    fragColor = TDOutputSwizzle(vec4(v * 0.3, v, v * 0.5, 1.0));
}
