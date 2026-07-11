uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.56 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.34 + t * 2.06 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.98 + t * 3.77 + ph) + sin(p.y * 8.74 - t * 3.77 + ph)
        + sin((p.x + p.y) * 9.18 + t * 3.77 + ph) + sin(length(p) * 8.69 - t * 3.77 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.76;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.44 / wf * sin(wf * 3.17 * q2.y + time * 2.13); q2.y += 0.27 / wf * cos(wf * 1.77 * q2.x + time * 1.48); }
	q2 = fract(q2 * 2.28) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.83);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.43));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 1.44, 1.27) + vec3(0.08, 0.14, 0.16);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
