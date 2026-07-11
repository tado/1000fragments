uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.67 - t * 6.97 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.31 * pow(abs(cos(ra * 3.0 + t * 0.68)), 1.28);
    v = sin((rr - pet) * 15.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.29 / wf * sin(wf * 2.81 * q1.y + time * 1.03); q1.y += 0.49 / wf * cos(wf * 3.78 * q1.x + time * 1.19); }
	q1 = rot2(length(q1) * -2.12 + time * 0.80) * q1;
	{ float fr = length(q2); q2 *= 1.0 + 0.68 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.00);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.50 + time * 0.31, vec3(0.54, 0.59, 0.49), vec3(0.38, 0.40, 0.34), vec3(1.32, 0.72, 0.75), vec3(0.23, 0.22, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
