uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.15 + ph), vnoise2(p * 4.15 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.15 + 3.60 * wq + vec2(1.7, 9.2) + t * 0.36),
                   vnoise2(p * 4.15 + 2.22 * wq + vec2(8.3, 2.8) - t * 0.75));
    v = vnoise2(p * 4.15 + 3.10 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.87 + ph), vnoise2(p * 2.87 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.87 + 1.15 * wq + vec2(1.7, 9.2) + t * 0.85),
                   vnoise2(p * 2.87 + 3.23 * wq + vec2(8.3, 2.8) - t * 0.49));
    v = vnoise2(p * 2.87 + 2.04 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.47; q1 = rot2(1.17) * q1; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.54, 0.80, 0.98) * (0.21 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
