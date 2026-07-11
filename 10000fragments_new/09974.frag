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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.38 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.95); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.01 - t * 6.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.76) - 0.5;
	q2 += vec2(0.70, -0.59) * sin(length(q2) * 4.25 - time * 0.97) * 0.15;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.34);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.44 + time * 0.05, vec3(0.46, 0.41, 0.41), vec3(0.45, 0.30, 0.44), vec3(0.79, 0.92, 0.80), vec3(0.98, 0.14, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
