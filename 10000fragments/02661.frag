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
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
float vnoise3(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));
    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.02 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.38); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.72 + t * 1.11) - 0.5) * 2.0;
    v = sin((p.y * 7.37 + zx * 0.64 + t * 0.55) * 3.1415927 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 6.31, t * 1.86 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.82, -0.82) * sin(length(q1) * 4.68 - time * 1.36) * 0.39;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.54; q1 = rot2(1.40) * q1; }
	q2 = rot2(time * -1.48) * q2;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	{ q3 = vec2(atan(q3.y, q3.x) * 2.50, length(q3) * 4.31 - time * 0.95); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.48);
	float d3 = fieldC(q3, time, 1.76);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = vec3(0.25, 0.49, 0.61) * (0.10 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= 0.89 + 0.17 * sin(gl_FragCoord.y * 1.01 + time * 7.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
