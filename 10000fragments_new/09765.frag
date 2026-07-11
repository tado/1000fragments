uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 23.81 - t * 3.42 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 24.73 - t * 2.50 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.65 + vec2(t * 2.10, -t * 2.47) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + -0.23 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.33 / wf * sin(wf * 1.63 * q2.y + time * 1.65); q2.y += 0.25 / wf * cos(wf * 2.77 * q2.x + time * 1.18); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.75);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.62, 0.53, 0.78) + vec3(0.08, 0.19, 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
