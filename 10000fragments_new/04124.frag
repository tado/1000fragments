uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 7.89 * sin(t * 0.96) + t * 5.88 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.16, t * 1.75 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.95;
	{ float fr = length(q2); q2 *= 1.0 + -0.71 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.41 / wf * sin(wf * 2.90 * q2.y + time * 1.92); q2.y += 0.29 / wf * cos(wf * 2.42 * q2.x + time * 1.74); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.30);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.05, 0.16), vec3(0.88, 0.82, 0.68), cc);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.68 + time * 17.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
