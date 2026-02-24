uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y; st *= 4.0;
    vec2 i_st = floor(st), f_st = fract(st);
    float m_dist = 1.0; vec2 m_diff = vec2(0.0);
    for(int y = -1; y <= 1; y++) for(int x = -1; x <= 1; x++) {
        vec2 nb = vec2(float(x), float(y));
        vec2 pt = hash2(i_st + nb);
        pt = 0.5 + 0.5 * sin(time * 4.0 + 6.28 * pt);
        vec2 diff = nb + pt - f_st;
        float d = length(diff);
        if(d < m_dist) { m_dist = d; m_diff = diff; }
    }
    float hue = atan(m_diff.y, m_diff.x) / 6.28 + 0.5 + time * 0.1;
    vec3 col = vec3(sin(hue*6.28)*0.5+0.5, sin(hue*6.28+2.094)*0.5+0.5, sin(hue*6.28+4.189)*0.5+0.5);
    fragColor = TDOutputSwizzle(vec4(col * m_dist * 2.0, 1.0));
}
