uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.32 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.77 + t * 1.12 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.61 + vec2(t * 1.18, -t * 1.67) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.28; q1 = rot2(2.07) * q1; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.33 / wf * sin(wf * 3.78 * q1.y + time * 0.81); q1.y += 0.33 / wf * cos(wf * 2.16 * q1.x + time * 0.93); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.55);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.28, 0.39), vec3(0.81, 0.91, 0.44), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
