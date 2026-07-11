uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.00 + vec2(t * 2.77, -t * 1.62) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 8.03 - t * 3.63 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 13.35 - t * 2.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.25 / wf * sin(wf * 2.10 * q1.y + time * 1.31); q1.y += 0.29 / wf * cos(wf * 2.86 * q1.x + time * 1.98); }
	{ float fr = length(q1); q1 *= 1.0 + -0.68 * fr * fr; }
	q2 = rot2(length(q2) * 3.36 + time * 1.43) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.91, 0.88, 1.21) + vec3(0.04, 0.24, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
