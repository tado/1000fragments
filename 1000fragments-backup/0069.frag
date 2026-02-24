uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y; st *= 6.0;
    vec2 i_st = floor(st), f_st = fract(st);
    float m_dist = 1.0; float cell_val = 0.0;
    for(int y = -1; y <= 1; y++) for(int x = -1; x <= 1; x++) {
        vec2 nb = vec2(float(x), float(y));
        vec2 pt = hash2(i_st + nb);
        pt = 0.5 + 0.5 * sin(time * 4.0 + 6.28 * pt);
        float d = length(nb + pt - f_st);
        if(d < m_dist) { m_dist = d; cell_val = hash2(i_st + nb).x; }
    }
    float edge = 1.0 - smoothstep(0.0, 0.05, m_dist);
    vec3 col = mix(vec3(cell_val, 1.0 - cell_val, sin(cell_val * 6.28) * 0.5 + 0.5), vec3(1.0), edge);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
