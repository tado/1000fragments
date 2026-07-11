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
    float ma = sin(length(p - vec2(0.36, 0.0)) * 16.40 - t * 4.21 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 39.60 - t * 5.29 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.60 + 0.20 * pow(abs(cos(ra * 3.0 + t * 1.04)), 0.92);
    v = sin((rr - pet) * 13.17 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.61 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.09); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(time * 1.39) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.13);
	float d3 = fieldC(q3, time, 0.02);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.30, 1.17, 1.49) + vec3(0.24, 0.05, 0.22);
	col = clamp((col - 0.5) * 1.64 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
