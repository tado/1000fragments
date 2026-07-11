uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.75 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.66 + t * 1.65 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.70 + sr * 4.68 - t * 0.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.51, -0.40) * sin(length(q1) * 4.86 - time * 1.88) * 0.33;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.50 / wf * sin(wf * 2.27 * q1.y + time * 1.72); q1.y += 0.33 / wf * cos(wf * 3.92 * q1.x + time * 0.90); }
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.58; q2 = rot2(2.08) * q2; }
	q2.x += sin(q2.y * 3.35 + time * 3.85) * 0.16;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.70);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.70));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.12, 0.28), vec3(0.82, 0.98, 0.48), cc);
	col = mod(col * 2.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
