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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.02 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.57); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 14.21 - t * 5.44 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 38.13 - t * 2.64 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -2.20 + time * 0.63) * q1;
	q1 = rot2(0.68) * q1;
	q2 = (floor(q2 * 10.4) + 0.5) / 10.4;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.54));
	vec3 col = palette(d * 1.28 + time * 0.28, vec3(0.42, 0.40, 0.57), vec3(0.31, 0.45, 0.45), vec3(1.09, 1.29, 0.71), vec3(0.73, 0.60, 0.58));
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
