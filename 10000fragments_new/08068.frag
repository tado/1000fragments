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
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.14 * cos(sa * 7.0 + t * 1.51 + ph);
    v = sin((sr - petal) * 16.05);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.57, t * 2.30 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.14 + ph), vnoise2(p * 4.14 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.14 + 2.25 * wq + vec2(1.7, 9.2) + t * 0.96),
                   vnoise2(p * 4.14 + 3.85 * wq + vec2(8.3, 2.8) - t * 0.49));
    v = vnoise2(p * 4.14 + 3.12 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.17; q1 = rot2(0.90) * q1; }
	q2 += vec2(-0.39, 0.72) * sin(length(q2) * 3.65 - time * 2.45) * 0.30;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.15, length(q2) * 3.81 - time * 0.76); }
	for(int fo = 0; fo < 5; fo++){ q3 = abs(q3) - 0.49; q3 = rot2(0.49) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d3 = fieldC(q3, time, 1.57);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.83 + time * 0.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
