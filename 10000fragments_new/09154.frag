uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.80 + vec2(t * 1.33, -t * 1.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.43 + t * 0.55 + ph) * 0.7;
    float wb = sin(p.y * 11.22 - t * 3.73 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.26;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.74;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.38 / wf * sin(wf * 1.72 * q2.y + time * 1.50); q2.y += 0.32 / wf * cos(wf * 1.72 * q2.x + time * 1.18); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.36, 0.90, 0.47) * (0.14 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = mod(col * 1.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
