uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.18, t * 1.08 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 9.59 - t * 5.12 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 21.22 - t * 7.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2) - 0.62;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.32 / wf * sin(wf * 1.90 * q2.y + time * 1.54); q2.y += 0.28 / wf * cos(wf * 2.20 * q2.x + time * 0.64); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.74);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.14, 0.48), vec3(0.60, 0.76, 0.50), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
