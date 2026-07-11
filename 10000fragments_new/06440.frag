uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.37 + 0.32 * pow(abs(cos(ra * 5.0 + t * 1.83)), 1.24);
    v = sin((rr - pet) * 18.07 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.74 + vec2(t * 2.41, -t * 2.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.11;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.80; kp = rot2(0.82) * kp; kp *= 1.24; }
    v = sin(kp.x * 2.55 - t * 4.77 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.x += sin(q1.y * 4.98 + time * 3.34) * 0.10;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.04, lr * 1.94 + time * 0.50); }
	q2 = rot2(length(q2) * -3.56 + time * 1.10) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.96);
	float d3 = fieldC(q3, time, 1.92);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.14 + time * 0.01);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.92 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
