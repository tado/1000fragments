uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    st *= 5.7000;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    float m_dist = 1.0;
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
        vec2 nb = vec2(float(x), float(y));
        vec2 pt = random2(i_st + nb);
        pt = 0.5 + 0.5 * sin(time * 0.9500 + 6.28318 * pt);
        float dist = length(nb + pt - f_st);
        m_dist = min(m_dist, dist);
    }
    vec3 rgb = clamp(vec3(m_dist) + (1.0 - step(0.1200, m_dist)) * vec3(0.0, 1.0, 4.0) * 0.5, 0.0, 1.0);
    fragColor = TDOutputSwizzle(vec4(rgb, 1.0));
}