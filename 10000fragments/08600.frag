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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.61;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.85) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 2.96) * sin(2.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.00 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.01); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.53;
    v = 0.5 * (sin(5.0 * cp.x + t * 1.02) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 0.89) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.35;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 2.13 + time * 1.70) * 0.20;
	q2 = fract(q2 * 1.51) - 0.5;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.92;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.18);
	float d3 = fieldC(q3, time, 1.40);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = vec3(0.30, 0.56, 0.43) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
