uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y; st *= 8.0;
    vec2 i_st = floor(st), f_st = fract(st);
    float m_dist = 1.0;
    for(int y = -1; y <= 1; y++) for(int x = -1; x <= 1; x++) {
        vec2 nb = vec2(float(x), float(y));
        vec2 pt = hash2(i_st + nb);
        pt = 0.5 + 0.5 * sin(time * 6.0 + 6.28318 * pt);
        m_dist = min(m_dist, length(nb + pt - f_st));
    }
    float stripe = mod(m_dist * 8.0 - time * 2.0, 1.0);
    float v = step(0.5, stripe);
    fragColor = TDOutputSwizzle(vec4(v * 1.5, v * 0.3, (1.0 - v) * 1.2, 1.0));
}
