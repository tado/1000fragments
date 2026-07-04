uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.84 + t * 1.14 + ph) * 0.7;
    float wb = sin(p.y * 16.48 - t * 3.57 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.39;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.40 + sin(p.y * 1.41 + t * 0.96) * 4.92 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.00 + vec2(t * 1.78, -t * 1.49) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 1.77 + time * 1.62) * 0.78;
	q1 = rot2(1.32) * q1;
	q2 *= 1.0 + 0.27 * sin(time * 1.92);
	q3 = fract(q3 * 2.82) - 0.5;
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 1.04;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d3 = fieldC(q3, time, 1.67);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = palette(d * 1.05 + time * 0.17, vec3(0.42, 0.43, 0.60), vec3(0.46, 0.46, 0.49), vec3(1.17, 0.87, 1.18), vec3(0.62, 0.14, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
