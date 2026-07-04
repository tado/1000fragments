uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 17.65 - t * 1.83 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 8.34 - t * 7.70 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.03 + t * 2.98 + ph) + sin(p.y * 11.10 - t * 2.98 + ph)
        + sin((p.x + p.y) * 9.58 + t * 2.98 + ph) + sin(length(p) * 8.89 - t * 2.98 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.44;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.70; kp = rot2(1.97) * kp; kp *= 1.25; }
    v = sin(kp.x * 1.34 - t * 3.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.80;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.23 / wf * sin(wf * 1.55 * q1.y + time * 1.37); q1.y += 0.46 / wf * cos(wf * 2.51 * q1.x + time * 2.03); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.02));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d3 = fieldC(q3, time, 1.75);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.04, 0.07), vec3(0.84, 0.58, 0.61), cc);
	col *= 0.89 + 0.16 * sin(gl_FragCoord.y * 2.10 + time * 13.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
