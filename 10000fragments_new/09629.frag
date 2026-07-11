uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.70 + vec2(t * 1.14, -t * 1.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.32 * pow(abs(cos(ra * 4.0 + t * 1.27)), 2.34);
    v = sin((rr - pet) * 11.28 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.14) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.75 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.39 / wf * sin(wf * 2.92 * q2.y + time * 1.81); q2.y += 0.38 / wf * cos(wf * 2.72 * q2.x + time * 2.13); }
	q2 = (floor(q2 * 12.3) + 0.5) / 12.3;
	for(int fo = 0; fo < 5; fo++){ q3 = abs(q3) - 0.41; q3 = rot2(1.66) * q3; }
	q3 = rot2(q3.y * 3.07 + time * 0.61) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.89);
	float d3 = fieldC(q3, time, 1.74);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.18 + time * 0.11, vec3(0.45, 0.59, 0.51), vec3(0.38, 0.36, 0.43), vec3(1.17, 0.94, 1.14), vec3(0.32, 0.65, 0.87));
	col = clamp((col - 0.5) * 1.45 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
