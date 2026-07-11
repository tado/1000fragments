uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.60;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.65; kp = rot2(0.72) * kp; kp *= 1.21; }
    v = sin(kp.x * 1.19 - t * 4.57 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.85 + vec2(t * 0.39, -t * 1.01) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.65 + sin(p.y * 2.64 + t * 2.89) * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = (floor(q2 * 19.7) + 0.5) / 19.7;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.47 / wf * sin(wf * 2.83 * q2.y + (time * 0.52) * 1.08); q2.y += 0.25 / wf * cos(wf * 3.12 * q2.x + (time * 0.52) * 1.16); }
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 0.55;
	float d1 = fieldA(q1, (time * 0.52), 0.0);
	float d2 = fieldB(q2, (time * 0.52), 0.01);
	float d3 = fieldC(q3, (time * 0.52), 1.94);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.40, 0.36), vec3(0.64, 0.61, 0.73), smoothstep(0.0, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.943, 1.027) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
