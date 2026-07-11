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
    float wr = length(p) + 0.28 * vnoise2(p * 5.04 + t * 0.33);
    v = sin(wr * 22.85 - t * 2.35 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.35 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.22); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.05 + t * 3.44 + ph) + sin(p.y * 3.93 - t * 3.44 + ph)
        + sin((p.x + p.y) * 4.34 + t * 3.44 + ph) + sin(length(p) * 3.43 - t * 3.44 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.75;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * -1.32 + time * 0.42) * q1;
	q1 = sin(q1 * 1.00 + time * 2.05) * 0.72;
	q3 = rot2(0.66) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.58);
	float d3 = fieldC(q3, time, 0.90);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.12, 0.05), vec3(0.65, 0.89, 0.87), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
