uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    v = 0.25 * (sin(p.x * 2.16 + t * 3.05 + ph) + sin(p.y * 13.31 - t * 3.05 + ph)
        + sin((p.x + p.y) * 3.95 + t * 3.05 + ph) + sin(length(p) * 11.63 - t * 3.05 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.79 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.01); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.77 * fr * fr; }
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.13);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.77 + time * 0.33, vec3(0.45, 0.45, 0.49), vec3(0.35, 0.38, 0.38), vec3(1.37, 0.80, 0.73), vec3(0.98, 0.59, 0.30));
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.06 + time * 17.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
