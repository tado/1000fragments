uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

#define TAU 6.28318530718

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i + vec2(0.0, 0.0)), random(i + vec2(1.0, 0.0)), u.x), 
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(TAU * (c * t + d));
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float voronoi(vec2 x) {
    vec2 n = floor(x);
    vec2 f = fract(x);
    float m_dist = 1.0;
    for(int j=-1; j<=1; j++)
    for(int i=-1; i<=1; i++) {
        vec2 g = vec2(float(i),float(j));
        vec2 o = random2(n + g);
        o = 0.5 + 0.5*sin( time + 6.2831*o );
        vec2 r = g + o - f;
        float d = dot(r,r);
        m_dist = min(m_dist, d);
    }
    return sqrt(m_dist);
}
void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    vec2 p = (st - 0.5) * 6.01;
    float val1 = smoothstep(0.0, 0.040, abs(fract(p.x * 3.28) - 0.5)) * smoothstep(0.0, 0.091, abs(fract(p.y * 3.80) - 0.5));
    p += 0.69;
    float val2 = voronoi(p * 4.43);
    float val = abs(val1 - val2);
    vec3 col = val > 0.46 ? vec3(0.52, 0.25, 0.22) : vec3(0.47, 0.90, 0.50);
    fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
