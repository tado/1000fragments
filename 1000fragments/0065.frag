uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    st *= 3.0 + sin(time * 0.5) * 2.0;
    vec2 i_st = floor(st), f_st = fract(st);
    float d1 = 10.0, d2 = 10.0;
    for(int y = -1; y <= 1; y++) for(int x = -1; x <= 1; x++) {
        vec2 nb = vec2(float(x), float(y));
        vec2 pt = hash2(i_st + nb);
        pt = 0.5 + 0.5 * sin(time * 3.0 + 6.28 * pt);
        float d = length(nb + pt - f_st);
        if(d < d1) { d2 = d1; d1 = d; } else if(d < d2) d2 = d;
    }
    float v = sin(d1 * 10.0 - time * 3.0) * 0.5 + 0.5;
    float e = smoothstep(0.0, 0.1, d2 - d1);
    fragColor = TDOutputSwizzle(vec4(v * e, (1.0 - e) * 2.0, v * (1.0 - v) * 4.0, 1.0));
}
