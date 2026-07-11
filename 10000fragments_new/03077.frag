uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.68 - t * 8.90 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.41 + sin(p.y * 2.47 + t * 3.09) * 1.72 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.73, length(q1) * 3.42 - time * 0.95); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.40 / wf * sin(wf * 2.77 * q1.y + time * 0.72); q1.y += 0.45 / wf * cos(wf * 1.83 * q1.x + time * 0.83); }
	q2 *= 3.00;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.12);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.74, 0.20, 0.86) * (0.24 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
