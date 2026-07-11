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
    vec2 zp = p * 7.40;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.97)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.58 - t * 6.57 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.67 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.10); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.46 + time * 0.45) * q1;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.54, length(q1) * 2.20 - time * 0.98); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.42, length(q2) * 4.29 - time * 0.72); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.84);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.37 + time * 0.34, vec3(0.57, 0.52, 0.55), vec3(0.38, 0.48, 0.43), vec3(1.01, 1.21, 1.03), vec3(0.29, 0.56, 0.82));
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
