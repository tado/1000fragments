uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.14;
    v = 0.5 * (sin(2.0 * cp.x + t * 1.38) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 0.84) * sin(2.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.97 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.44 + t * 1.45 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.60));
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.50 / wf * sin(wf * 3.40 * q2.y + time * 1.32); q2.y += 0.34 / wf * cos(wf * 2.73 * q2.x + time * 2.00); }
	q2 += vec2(0.26, 0.57) * sin(length(q2) * 5.55 - time * 2.16) * 0.17;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.29);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.37, 0.61, 0.33) * (0.19 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
