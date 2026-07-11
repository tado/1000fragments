uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.68 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.91 + t * 1.46 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.31 * pow(abs(cos(ra * 4.0 + t * 0.55)), 1.99);
    v = sin((rr - pet) * 20.43 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.15; vec2 jc = vec2(0.12 + 0.3 * sin(t * 0.77 + ph), -0.21 + 0.3 * cos(t * 1.76 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 38.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.43 / wf * sin(wf * 3.42 * q1.y + time * 2.02); q1.y += 0.30 / wf * cos(wf * 2.07 * q1.x + time * 1.62); }
	q1 += vec2(-0.24, 0.48) * sin(length(q1) * 5.31 - time * 2.43) * 0.30;
	q3 *= 3.10;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.80);
	float d3 = fieldC(q3, time, 1.34);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.61 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
