uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 4.46 * sin(t * 1.45) + t * 1.63 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.70;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.72; kp = rot2(1.06) * kp; kp *= 1.33; }
    v = sin(kp.x * 1.85 - t * 1.98 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.84 + sr * 19.68 - t * 4.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.28 / wf * sin(wf * 2.98 * q2.y + time * 0.63); q2.y += 0.32 / wf * cos(wf * 2.25 * q2.x + time * 1.46); }
	q2 = fract(q2 * 2.10) - 0.5;
	q3.y += sin(q3.x * 7.61 + time * 3.06) * 0.26;
	q3 = (floor(q3 * 28.4) + 0.5) / 28.4;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.38);
	float d3 = fieldC(q3, time, 1.82);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.70, 1.35, 0.81) + vec3(0.15, 0.02, 0.03);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.73 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
