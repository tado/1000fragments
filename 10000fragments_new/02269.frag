uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.20 * pow(abs(cos(ra * 7.0 + t * 2.73)), 1.30);
    v = sin((rr - pet) * 17.31 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 5.40 * sin(t * 1.06) + t * 2.27 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.83 + t * 2.28 + ph) * 0.7;
    float wb = sin(p.y * 16.76 - t * 3.88 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.37;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.57;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 27.1) + 0.5) / 27.1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.27, length(q2) * 5.14 - time * 0.79); }
	{ q3 = vec2(atan(q3.y, q3.x) * 2.09, length(q3) * 3.58 - time * 0.56); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.64);
	float d3 = fieldC(q3, time, 1.94);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.35, 1.30, 1.05) + vec3(0.08, 0.12, 0.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
