uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.92 - t * 4.82 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 6.53 * sin(t * 0.53) + t * 2.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.37 / wf * sin(wf * 2.69 * q1.y + time * 2.01); q1.y += 0.35 / wf * cos(wf * 3.78 * q1.x + time * 0.61); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.23 / wf * sin(wf * 3.73 * q2.y + time * 0.88); q2.y += 0.41 / wf * cos(wf * 2.46 * q2.x + time * 1.39); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.70);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.16, 0.43), vec3(0.57, 0.96, 0.62), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
