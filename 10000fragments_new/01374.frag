uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 5.08 * sin(t * 0.83) + t * 2.60 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.94 + vec2(t * 1.92, -t * 2.19) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.49 / wf * sin(wf * 2.29 * q1.y + time * 0.64); q1.y += 0.40 / wf * cos(wf * 2.10 * q1.x + time * 0.74); }
	q2 = abs(q2) - 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.17);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.84, 1.43, 0.89) + vec3(0.15, 0.10, 0.13);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.52 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
