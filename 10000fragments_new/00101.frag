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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.41, t * 1.62 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.83 + ph), vnoise2(p * 2.83 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.83 + 1.16 * wq + vec2(1.7, 9.2) + t * 0.63),
                   vnoise2(p * 2.83 + 3.57 * wq + vec2(8.3, 2.8) - t * 0.51));
    v = vnoise2(p * 2.83 + 1.98 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.72; vec2 jc = vec2(-0.43 + 0.3 * sin(t * 1.60 + ph), 0.61 + 0.3 * cos(t * 0.81 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.36, -0.34) * sin(length(q1) * 4.33 - time * 1.28) * 0.23;
	q2 = fract(q2 * 1.75) - 0.5;
	for(int fo = 0; fo < 4; fo++){ q3 = abs(q3) - 0.21; q3 = rot2(2.00) * q3; }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.71);
	float d3 = fieldC(q3, time, 1.52);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.51 + time * 0.39, vec3(0.58, 0.46, 0.45), vec3(0.44, 0.34, 0.48), vec3(0.79, 1.11, 1.21), vec3(0.76, 0.48, 0.56));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
