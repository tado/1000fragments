uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.98 + t * 1.55 + ph) * 0.7;
    float wb = sin(p.y * 18.99 - t * 2.19 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.79;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.61 - t * 7.93 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.31 * pow(abs(cos(ra * 5.0 + t * 0.89)), 1.36);
    v = sin((rr - pet) * 23.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.37;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 2.36) - 0.5;
	q3 = rot2(length(q3) * 3.87 + time * 1.08) * q3;
	{ float fr = length(q3); q3 *= 1.0 + 0.40 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.81);
	float d3 = fieldC(q3, time, 1.02);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.43));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.04, 0.27), vec3(0.99, 0.72, 0.76), cc);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
