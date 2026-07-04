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
    float ma = sin(length(p - vec2(0.21, 0.0)) * 31.39 - t * 7.54 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 23.25 - t * 3.94 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.34; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 18.95 - t * 0.60 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.82 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.45); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.00;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.54; q1 = rot2(2.13) * q1; }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.03, lr * 2.58 + time * 0.38); }
	q2 *= 2.04;
	q3 *= 1.0 + 0.37 * sin(time * 1.39);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.37);
	float d3 = fieldC(q3, time, 0.38);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.51));
	vec3 col = palette(d * 1.18 + time * 0.01, vec3(0.58, 0.45, 0.47), vec3(0.37, 0.35, 0.37), vec3(0.90, 0.89, 1.29), vec3(0.56, 0.61, 0.22));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
