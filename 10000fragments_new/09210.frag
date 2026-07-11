uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.08, t * 0.41 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 21.16 - t * 5.80 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 36.66 - t * 7.57 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.44 / wf * sin(wf * 3.54 * q1.y + time * 1.27); q1.y += 0.32 / wf * cos(wf * 2.06 * q1.x + time * 1.76); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.30 / wf * sin(wf * 2.63 * q2.y + time * 1.00); q2.y += 0.35 / wf * cos(wf * 2.25 * q2.x + time * 0.99); }
	{ q2 = vec2(atan(q2.y, q2.x) * 2.40, length(q2) * 5.60 - time * 0.83); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.56);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.03 + time * 0.56);
	col = mod(col * 1.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
